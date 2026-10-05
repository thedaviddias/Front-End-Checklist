import { MCP_SERVER_URL, SITE_URL } from '@repo/config'
import {
  getTelemetryStats,
  getToolDefinitions,
  handleMcpHttpRequest,
  MCP_PROMPTS,
  MCP_PROTOCOL_VERSIONS,
  MCP_RESOURCE_TEMPLATES,
  MCP_SERVER_INFO,
  MCP_SERVER_INSTRUCTIONS,
  type McpToolUsage
} from '@repo/mcp'
import { CATEGORIES, type Category, SUBCATEGORIES, type Subcategory } from '@repo/types'
import { GET_CACHE_HEADERS, getCachedResponse, setCachedResponse } from '@/lib/mcp-cache'
import { scheduleMcpTelemetry } from '@/lib/mcp-telemetry'
import {
  checkRateLimit,
  createRateLimitHeaders,
  getClientIp,
  type RateLimitResult
} from '@/lib/rate-limit'
import { captureServerException } from '@/lib/telemetry-server'
import { getChecklists, getRules, SKILLS_DIR } from './content-helpers'
import { getPostCacheInput, readBoundedJson } from './request-body'
import {
  createCorsHeaders,
  isOriginAllowed,
  isTransportGetRequest,
  mergeHeaders
} from './route-helpers'

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

interface CachedMcpResponse {
  body: string
  headers: Array<[string, string]>
  status: number
  statusText: string
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
 * Check whether an MCP request is safe to cache at the response-envelope level.
 *
 * Tool lists are static for a deployment and do not contain user payloads.
 */
function isCacheableMcpPostBody(body: unknown): boolean {
  return isMcpRequest(body) && body.method === 'tools/list'
}

/**
 * Check whether a cached value has the serialized response shape expected by this route.
 */
function isCachedMcpResponse(value: unknown): value is CachedMcpResponse {
  if (typeof value !== 'object' || value === null) {
    return false
  }

  return (
    typeof Reflect.get(value, 'body') === 'string' &&
    Array.isArray(Reflect.get(value, 'headers')) &&
    typeof Reflect.get(value, 'status') === 'number' &&
    typeof Reflect.get(value, 'statusText') === 'string'
  )
}

/**
 * Recreate a cached MCP response before per-request CORS and rate-limit headers are merged.
 */
function cachedMcpResponseToResponse(cached: CachedMcpResponse): Response {
  return new Response(cached.body, {
    status: cached.status,
    statusText: cached.statusText,
    headers: new Headers(cached.headers)
  })
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

  const parsed = await readBoundedJson(request, MAX_REQUEST_SIZE)
  if (!parsed.ok) {
    return createErrorResponse(
      request,
      parsed.tooLarge ? 413 : 400,
      parsed.tooLarge ? -32600 : -32700,
      parsed.tooLarge ? 'Request too large' : 'Parse error',
      parsed.tooLarge ? `Maximum request size is ${MAX_REQUEST_SIZE / 1024}KB` : 'Invalid JSON',
      rateLimitResult
    )
  }
  const body = parsed.body

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

  const usages: McpToolUsage[] = []
  try {
    const cacheableBody = isCacheableMcpPostBody(body)
    const cacheInput = getPostCacheInput(request, body)
    const cachedResponse = cacheableBody ? getCachedResponse(cacheInput) : undefined

    if (isCachedMcpResponse(cachedResponse)) {
      return withRouteHeaders(request, cachedMcpResponseToResponse(cachedResponse), rateLimitResult)
    }

    const response = await handleMcpHttpRequest(
      request,
      () => getRules(isCategory, isSubcategory),
      getChecklists,
      {
        maxResponseChars: process.env.MCP_MAX_RESPONSE_CHARS
          ? parseInt(process.env.MCP_MAX_RESPONSE_CHARS, 10)
          : undefined,
        telemetryEnabled: MCP_TELEMETRY_ENABLED,
        onToolCompleted: usage => usages.push(usage),
        skillsDir: SKILLS_DIR
      },
      body
    )

    if (cacheableBody && response.ok) {
      const clonedResponse = response.clone()
      setCachedResponse(cacheInput, {
        body: await clonedResponse.text(),
        headers: Array.from(clonedResponse.headers.entries()),
        status: clonedResponse.status,
        statusText: clonedResponse.statusText
      } satisfies CachedMcpResponse)
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
  } finally {
    scheduleMcpTelemetry(usages)
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
            telemetryEnabled: MCP_TELEMETRY_ENABLED,
            skillsDir: SKILLS_DIR
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
      title: MCP_SERVER_INFO.title,
      version: MCP_SERVER_INFO.version,
      icons: MCP_SERVER_INFO.icons,
      description: 'MCP server exposing Front-End Checklist rules to AI agents',
      instructions: MCP_SERVER_INSTRUCTIONS,
      protocolVersion: MCP_PROTOCOL_VERSIONS[0],
      supportedProtocolVersions: [...MCP_PROTOCOL_VERSIONS],
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
      documentation: `${SITE_URL}/mcp`,
      ...(Object.keys(usage).length > 0 ? { usage } : {})
    },
    {
      headers: mergeHeaders(createCorsHeaders(request), GET_CACHE_HEADERS)
    }
  )
}
