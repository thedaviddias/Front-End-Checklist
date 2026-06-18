import { prisma } from '@repo/auth/prisma'
import { MCP_SERVER_URL, SITE_URL } from '@repo/config'
import {
  getTelemetryStats,
  getToolDefinitions,
  handleMcpHttpRequest,
  MCP_PROMPTS,
  MCP_PROTOCOL_VERSION,
  MCP_RESOURCE_TEMPLATES,
  MCP_SERVER_INFO,
  MCP_SERVER_INSTRUCTIONS
} from '@repo/mcp'
import { CATEGORIES, type Category, SUBCATEGORIES, type Subcategory } from '@repo/types'
import { GET_CACHE_HEADERS } from '@/lib/mcp-cache'
import {
  checkRateLimit,
  createRateLimitHeaders,
  getClientIp,
  type RateLimitResult
} from '@/lib/rate-limit'
import { TELEMETRY_EVENTS } from '@/lib/telemetry-events'
import { captureServerException, trackServerEvent } from '@/lib/telemetry-server'
import { getChecklists, getRules } from './content-helpers'
import { createCorsHeaders, isOriginAllowed, mergeHeaders } from './route-helpers'

const MAX_BATCH_SIZE = 10
const MAX_REQUEST_SIZE = 100 * 1024 // 100KB

/** Set to "true" or "1" to enable DB and in-memory MCP telemetry (usage counts). */
const MCP_TELEMETRY_ENABLED =
  process.env.MCP_TELEMETRY_ENABLED === 'true' || process.env.MCP_TELEMETRY_ENABLED === '1'

interface McpRequest {
  jsonrpc: '2.0'
  id: string | number
  method: string
  params?: Record<string, unknown>
}

const VALID_CATEGORIES = new Set<string>(CATEGORIES)
const VALID_SUBCATEGORIES = new Set<string>(SUBCATEGORIES)

/**
 * Check whether a string is a supported rule category.
 *
 * @param value - Category candidate to validate.
 * @returns True when the category is supported by the shared rule type.
 */
function isCategory(value: string): value is Category {
  return VALID_CATEGORIES.has(value)
}

/**
 * Check whether a string is a supported rule subcategory.
 *
 * @param value - Subcategory candidate to validate.
 * @returns True when the value is a known subcategory.
 */
function isSubcategory(value: string): value is Subcategory {
  return VALID_SUBCATEGORIES.has(value)
}

/**
 * Check whether the payload is a valid MCP request envelope.
 *
 * @param value - Candidate request payload.
 * @returns True when the payload is a single JSON-RPC MCP request.
 */
function isMcpRequest(value: unknown): value is McpRequest {
  if (typeof value !== 'object' || value === null) {
    return false
  }

  return (
    Reflect.get(value, 'jsonrpc') === '2.0' &&
    typeof Reflect.get(value, 'method') === 'string' &&
    (typeof Reflect.get(value, 'id') === 'string' || typeof Reflect.get(value, 'id') === 'number')
  )
}

/**
 * Check whether the payload is a valid MCP request batch.
 *
 * @param value - Candidate request payload.
 * @returns True when the payload is an array of valid MCP requests.
 */
function isMcpRequestBatch(value: unknown): value is McpRequest[] {
  return Array.isArray(value) && value.every(isMcpRequest)
}

/**
 * Extract tool names from a single or batch request for DB telemetry.
 *
 * @param body - Parsed request body.
 * @returns Tool names for any tools/call entries in the payload.
 */
function extractToolNamesFromRequest(body: unknown): string[] {
  if (isMcpRequestBatch(body)) {
    return body
      .filter(req => req.method === 'tools/call' && typeof req.params?.name === 'string')
      .map(req => req.params!.name as string)
  }

  if (isMcpRequest(body) && body.method === 'tools/call' && typeof body.params?.name === 'string') {
    return [body.params.name]
  }

  return []
}

/**
 * Create a JSON-RPC error response with MCP-safe headers.
 *
 * @param request - Incoming request used for CORS/origin handling.
 * @param status - HTTP status.
 * @param code - JSON-RPC error code.
 * @param message - Error summary.
 * @param data - Optional error details.
 * @param rateLimitResult - Optional rate-limit metadata for headers.
 * @returns A ready-to-send error response.
 */
function createErrorResponse(
  request: Request,
  status: number,
  code: number,
  message: string,
  data?: string,
  rateLimitResult?: RateLimitResult
): Response {
  const headers = rateLimitResult
    ? mergeHeaders(createCorsHeaders(request), createRateLimitHeaders(rateLimitResult))
    : createCorsHeaders(request)

  return Response.json(
    {
      jsonrpc: '2.0',
      id: null,
      error: { code, message, ...(data ? { data } : {}) }
    },
    { status, headers }
  )
}

/**
 * Merge SDK response headers with route-level CORS/rate-limit headers.
 *
 * @param request - Incoming request.
 * @param response - Response returned by the SDK transport.
 * @param rateLimitResult - Optional rate-limit metadata.
 * @returns A response suitable for the Next.js route.
 */
function withRouteHeaders(
  request: Request,
  response: Response,
  rateLimitResult?: RateLimitResult
): Response {
  const headers = new Headers(response.headers)

  for (const [key, value] of Object.entries(createCorsHeaders(request))) {
    headers.set(key, value)
  }

  if (rateLimitResult) {
    for (const [key, value] of Object.entries(createRateLimitHeaders(rateLimitResult))) {
      headers.set(key, value)
    }
  }

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers
  })
}

/**
 * Decide whether a GET request is intended for the SDK transport or for human-readable metadata.
 *
 * @param request - Incoming GET request.
 * @returns True when the request looks like an MCP transport request.
 */
function isTransportGetRequest(request: Request): boolean {
  const accept = request.headers.get('accept') || ''

  return (
    accept.includes('text/event-stream') ||
    request.headers.has('mcp-session-id') ||
    request.headers.has('mcp-protocol-version') ||
    request.headers.has('last-event-id')
  )
}

/**
 * Handle MCP POST requests.
 */
export async function POST(request: Request) {
  if (!isOriginAllowed(request)) {
    return createErrorResponse(
      request,
      403,
      -32600,
      'Origin not allowed',
      'Cross-origin browser requests must originate from a trusted Front-End Checklist origin.'
    )
  }

  const contentLength = request.headers.get('content-length')
  if (contentLength && parseInt(contentLength, 10) > MAX_REQUEST_SIZE) {
    return createErrorResponse(
      request,
      413,
      -32600,
      'Request too large',
      `Maximum request size is ${MAX_REQUEST_SIZE / 1024}KB`
    )
  }

  const clientIp = getClientIp(request)
  const rateLimitResult = await checkRateLimit(clientIp)

  if (!rateLimitResult.success) {
    const retryAfter = Math.ceil((rateLimitResult.reset - Date.now()) / 1000)
    return new Response(
      JSON.stringify({
        jsonrpc: '2.0',
        id: null,
        error: {
          code: -32000,
          message: 'Rate limit exceeded',
          data: `Try again in ${retryAfter} seconds`
        }
      }),
      {
        status: 429,
        headers: {
          ...createCorsHeaders(request),
          ...createRateLimitHeaders(rateLimitResult),
          'Retry-After': String(retryAfter),
          'Content-Type': 'application/json'
        }
      }
    )
  }

  let body: unknown
  try {
    body = await request.json()
  } catch {
    return createErrorResponse(request, 400, -32700, 'Parse error', 'Invalid JSON', rateLimitResult)
  }

  if (Array.isArray(body) && body.length > MAX_BATCH_SIZE) {
    return createErrorResponse(
      request,
      400,
      -32600,
      'Batch too large',
      `Maximum batch size is ${MAX_BATCH_SIZE}`,
      rateLimitResult
    )
  }

  try {
    const response = await handleMcpHttpRequest(
      request,
      () => getRules(isCategory, isSubcategory),
      getChecklists,
      {
        maxResponseChars: process.env.MCP_MAX_RESPONSE_CHARS
          ? parseInt(process.env.MCP_MAX_RESPONSE_CHARS, 10)
          : undefined,
        telemetryEnabled: MCP_TELEMETRY_ENABLED
      },
      body
    )

    if (MCP_TELEMETRY_ENABLED) {
      const toolNames = extractToolNamesFromRequest(body)
      if (toolNames.length > 0) {
        prisma.mcpToolCall
          .createMany({
            data: toolNames.map(toolName => ({ toolName }))
          })
          .catch(() => {
            // Telemetry must not break MCP responses.
          })

        for (const toolName of toolNames) {
          trackServerEvent(TELEMETRY_EVENTS.mcpToolCalled, {
            toolName
          })
        }
      }
    }

    return withRouteHeaders(request, response, rateLimitResult)
  } catch (error) {
    captureServerException(error, {
      route: '/api/mcp',
      extra: {
        method: 'POST'
      }
    })
    return createErrorResponse(
      request,
      500,
      -32603,
      'Internal error',
      error instanceof Error ? error.message : 'Unknown error',
      rateLimitResult
    )
  }
}

/**
 * Handle OPTIONS for CORS preflight.
 */
export async function OPTIONS(request: Request) {
  if (!isOriginAllowed(request)) {
    return new Response(null, {
      status: 403,
      headers: createCorsHeaders(request)
    })
  }

  return new Response(null, {
    status: 204,
    headers: createCorsHeaders(request)
  })
}

/**
 * Handle GET for either transport compatibility or human-readable metadata.
 */
export async function GET(request: Request) {
  if (!isOriginAllowed(request)) {
    return createErrorResponse(
      request,
      403,
      -32600,
      'Origin not allowed',
      'Cross-origin browser requests must originate from a trusted Front-End Checklist origin.'
    )
  }

  if (isTransportGetRequest(request)) {
    const clientIp = getClientIp(request)
    const rateLimitResult = await checkRateLimit(clientIp)

    if (!rateLimitResult.success) {
      const retryAfter = Math.ceil((rateLimitResult.reset - Date.now()) / 1000)
      return new Response(
        JSON.stringify({
          jsonrpc: '2.0',
          id: null,
          error: {
            code: -32000,
            message: 'Rate limit exceeded',
            data: `Try again in ${retryAfter} seconds`
          }
        }),
        {
          status: 429,
          headers: {
            ...createCorsHeaders(request),
            ...createRateLimitHeaders(rateLimitResult),
            'Retry-After': String(retryAfter),
            'Content-Type': 'application/json'
          }
        }
      )
    }

    try {
      return withRouteHeaders(
        request,
        await handleMcpHttpRequest(
          request,
          () => getRules(isCategory, isSubcategory),
          getChecklists,
          {
            maxResponseChars: process.env.MCP_MAX_RESPONSE_CHARS
              ? parseInt(process.env.MCP_MAX_RESPONSE_CHARS, 10)
              : undefined,
            telemetryEnabled: MCP_TELEMETRY_ENABLED
          }
        ),
        rateLimitResult
      )
    } catch (error) {
      captureServerException(error, {
        route: '/api/mcp',
        extra: {
          method: 'GET',
          transportRequest: true
        }
      })
      return createErrorResponse(
        request,
        500,
        -32603,
        'Internal error',
        error instanceof Error ? error.message : 'Unknown error'
      )
    }
  }

  const usage = MCP_TELEMETRY_ENABLED ? getTelemetryStats() : {}
  const tools = getToolDefinitions(getChecklists()).map((tool: { name: string }) => tool.name)

  return Response.json(
    {
      name: MCP_SERVER_INFO.name,
      version: MCP_SERVER_INFO.version,
      description: 'MCP server exposing Front-End Checklist rules to AI agents',
      instructions: MCP_SERVER_INSTRUCTIONS,
      protocolVersion: MCP_PROTOCOL_VERSION,
      endpoint: MCP_SERVER_URL,
      tools,
      recommendedUsage: {
        frontendCodeReview:
          'Use review_code first for pasted HTML, CSS, JavaScript, React, or Next.js code.',
        ruleLookup: 'Use search_rules to find relevant rules, then get_rule for full guidance.',
        broadAudits:
          'Use get_workflow or get_checklist_rules for launch, accessibility, SEO, security, and performance audits.',
        liveSites: 'Use audit_url for public https:// pages.'
      },
      prompts: [...MCP_PROMPTS],
      resourceTemplates: Object.values(MCP_RESOURCE_TEMPLATES),
      documentation: `${SITE_URL}/en/mcp`,
      ...(Object.keys(usage).length > 0 ? { usage } : {})
    },
    {
      headers: mergeHeaders(createCorsHeaders(request), GET_CACHE_HEADERS)
    }
  )
}
