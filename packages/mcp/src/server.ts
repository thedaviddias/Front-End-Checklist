import {
  createMcpHandler,
  isLegacyRequest,
  McpServer,
  SUPPORTED_PROTOCOL_VERSIONS,
  WebStandardStreamableHTTPServerTransport
} from '@modelcontextprotocol/server'
import { SITE_URL } from '@repo/config'
import type { CuratedChecklist, Rule } from '@repo/types'
import { APPS_EXTENSION, registerApps } from './server-apps'
import { registerPrompts } from './server-prompts'
import { registerResources } from './server-resources'
import { loadSkills, registerSkills, SKILLS_EXTENSION } from './server-skills'
import { registerTools } from './server-tools'
import { MCP_SERVER_ICON } from './tools/metadata'
import { DEFAULT_MAX_RESPONSE_CHARS } from './utils/response-cap'

/** Stateless 2026-07-28 revision, negotiated per request via `server/discover`. */
export const MCP_MODERN_PROTOCOL_VERSION = '2026-07-28'

/** Every protocol revision the server answers, newest first. */
export const MCP_PROTOCOL_VERSIONS = [
  MCP_MODERN_PROTOCOL_VERSION,
  ...SUPPORTED_PROTOCOL_VERSIONS
] as const

export { MCP_SERVER_ICON }

export const MCP_SERVER_INFO = {
  name: 'frontend-checklist-mcp',
  title: 'Front-End Checklist',
  version: '2.0.1',
  websiteUrl: `${SITE_URL}/mcp`,
  icons: [MCP_SERVER_ICON]
}

/** Rule content only changes on deploy, so list/read results can be cached publicly. */
const CONTENT_CACHE_HINT = { ttlMs: 60 * 60 * 1000, cacheScope: 'public' } as const

export const MCP_SERVER_INSTRUCTIONS = [
  'Use Front-End Checklist whenever the user is reviewing, implementing, debugging, or auditing frontend code.',
  'Reach for this server for HTML, CSS, JavaScript, TypeScript, React, Next.js, accessibility, performance, SEO, security, images, privacy, i18n, testing, and launch-readiness work.',
  'For pasted or inspected frontend code, call review_code first as a conservative static heuristic pass, then use its suggestions plus search_rules, get_rule, fix_rule, explain_rule, or check_rule for deeper remediation.',
  'If review_code returns no issues, treat that as no provable static issue found; follow suggestions or retrieve relevant rules before concluding the implementation is clean.',
  'For broad audits, call get_workflow or get_checklist_rules before checking individual rules. For live public pages, use audit_url.'
].join(' ')

export const MCP_RESOURCE_TEMPLATES = {
  rule: 'frontendchecklist://rules/{slug}',
  checklist: 'frontendchecklist://checklists/{slug}'
} as const

export const MCP_PROMPTS = [
  'review_code_prompt',
  'explain_rule_prompt',
  'fix_rule_prompt',
  'audit_url_prompt',
  'workflow_prompt'
] as const

interface McpServerOptions {
  maxResponseChars?: number
  telemetryEnabled?: boolean
  /** Directory of generated agent skills to serve via the Skills extension. */
  skillsDir?: string
}

/**
 * Telemetry storage (in-memory, anonymous)
 */
const telemetryCounters: Map<string, number> = new Map()

function recordTelemetry(toolName: string): void {
  telemetryCounters.set(toolName, (telemetryCounters.get(toolName) || 0) + 1)
}

/**
 * Get telemetry stats
 */
export function getTelemetryStats(): Record<string, number> {
  return Object.fromEntries(telemetryCounters)
}

/**
 * Reset telemetry (for testing)
 */
export function resetTelemetry(): void {
  telemetryCounters.clear()
}

/**
 * Default a missing or wildcard `Accept` header (plain `curl` sends a bare
 * wildcard) so such callers get a response instead of a 406.
 */
function withDefaultAcceptHeader(request: Request, parsedBody?: unknown): Request {
  const accept = request.headers.get('accept')?.trim()
  if (accept && accept !== '*/*') {
    return request
  }

  const headers = new Headers(request.headers)
  headers.set('accept', 'application/json, text/event-stream')

  if (parsedBody === undefined && request.method !== 'GET' && request.method !== 'HEAD') {
    return new Request(request.url, {
      method: request.method,
      headers,
      body: request.body,
      duplex: 'half'
    } as RequestInit & { duplex: 'half' })
  }

  return new Request(request.url, {
    method: request.method,
    headers
  })
}

/**
 * Create an SDK-backed MCP server instance with tools, resources, and prompts.
 */
export function createMcpServer(
  getRules: () => Rule[] | Promise<Rule[]>,
  getChecklists: () => CuratedChecklist[] = () => [],
  options: McpServerOptions = {}
) {
  const maxResponseChars = options.maxResponseChars ?? DEFAULT_MAX_RESPONSE_CHARS
  const telemetryEnabled = options.telemetryEnabled !== false
  const skills = options.skillsDir ? loadSkills(options.skillsDir) : []
  const server = new McpServer(MCP_SERVER_INFO, {
    instructions: MCP_SERVER_INSTRUCTIONS,
    // Content is static per deploy, so no list-changed notifications (and no
    // long-lived `subscriptions/listen` streams on serverless) are offered.
    capabilities: {
      tools: { listChanged: false },
      prompts: { listChanged: false },
      resources: { listChanged: false },
      extensions: {
        [APPS_EXTENSION]: {},
        ...(skills.length > 0 ? { [SKILLS_EXTENSION]: {} } : {})
      }
    },
    cacheHints: {
      'server/discover': CONTENT_CACHE_HINT,
      'tools/list': CONTENT_CACHE_HINT,
      'prompts/list': CONTENT_CACHE_HINT,
      'resources/list': CONTENT_CACHE_HINT,
      'resources/templates/list': CONTENT_CACHE_HINT,
      'resources/read': CONTENT_CACHE_HINT
    }
  })

  registerTools(
    server,
    getRules,
    getChecklists,
    maxResponseChars,
    telemetryEnabled,
    recordTelemetry
  )
  registerResources(
    server,
    getRules,
    getChecklists,
    MCP_RESOURCE_TEMPLATES.rule,
    MCP_RESOURCE_TEMPLATES.checklist
  )
  registerPrompts(server, getRules, getChecklists)
  registerApps(server)

  if (skills.length > 0) {
    registerSkills(server, () => skills)
  }

  return server
}

/**
 * Serve one stateless HTTP request for either protocol era.
 *
 * 2026-07-28 requests go through the SDK's `createMcpHandler`; 2025-era
 * requests keep a fresh per-request transport with plain JSON responses.
 */
export async function handleMcpHttpRequest(
  request: Request,
  getRules: () => Rule[] | Promise<Rule[]>,
  getChecklists: () => CuratedChecklist[] = () => [],
  options: McpServerOptions = {},
  parsedBody?: unknown
) {
  const buildServer = () => createMcpServer(getRules, getChecklists, options)
  const normalizedRequest = withDefaultAcceptHeader(request, parsedBody)
  const handlerOptions = parsedBody === undefined ? undefined : { parsedBody }

  if (await isLegacyRequest(normalizedRequest, parsedBody)) {
    const server = buildServer()
    const transport = new WebStandardStreamableHTTPServerTransport({
      sessionIdGenerator: undefined,
      enableJsonResponse: true
    })

    try {
      await server.connect(transport)
      return await transport.handleRequest(normalizedRequest, handlerOptions)
    } finally {
      await transport.close()
      await server.close()
    }
  }

  // Default 'auto' response mode already answers with plain JSON because no tool emits
  // mid-call notifications; forcing 'json' logged a warning on every request.
  const handler = createMcpHandler(buildServer, { legacy: 'reject' })

  try {
    return await handler.fetch(normalizedRequest, handlerOptions)
  } finally {
    await handler.close()
  }
}

export type FrontendChecklistMcpServer = ReturnType<typeof createMcpServer>
