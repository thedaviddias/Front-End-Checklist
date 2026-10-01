import { lookup as lookupCallback } from 'node:dns'
import { lookup } from 'node:dns/promises'
import { BlockList, isIP, type LookupFunction } from 'node:net'
import { BOT_USER_AGENT } from '@repo/config'
import type { Category, Priority, Rule } from '@repo/types'
import { Agent } from 'undici'
import {
  NUMBER_SCHEMA,
  OPEN_WORLD_READ_ONLY_TOOL_ANNOTATIONS,
  PRIORITY_SCHEMA,
  STRING_ARRAY_SCHEMA,
  STRING_SCHEMA
} from './metadata'
import { executeReviewCode, type ReviewCodeResult } from './review-code'

export interface AuditUrlInput {
  url: string
  focus?: Category[]
  minPriority?: Priority
}

export interface AuditUrlResult extends ReviewCodeResult {
  source: {
    url: string
    fetchedAt: string
    contentLength: number
  }
}

export const auditUrlDefinition = {
  name: 'audit_url',
  title: 'Audit Live URL',
  description: `Fetches a public https:// page and runs the same static review as review_code on its HTML, returning prioritized issues with fix guidance. Use it when the user gives the URL of a deployed site instead of source code. Localhost, private networks, and plain http URLs are refused. Follow up on each issue with fix_rule or get_rule.`,
  annotations: OPEN_WORLD_READ_ONLY_TOOL_ANNOTATIONS,
  inputSchema: {
    type: 'object' as const,
    properties: {
      url: {
        type: 'string',
        description:
          'Public URL to audit. Must use https://. Private IPs and localhost are blocked.'
      },
      focus: {
        type: 'array',
        items: {
          type: 'string',
          enum: [
            'html',
            'css',
            'javascript',
            'performance',
            'accessibility',
            'seo',
            'security',
            'images'
          ]
        },
        description: 'Only check these categories (default: auto-detected from the fetched HTML).'
      },
      minPriority: {
        type: 'string',
        enum: ['critical', 'high', 'medium', 'low'],
        description: 'Lowest priority to report (default: medium).'
      }
    },
    required: ['url']
  },
  outputSchema: {
    type: 'object' as const,
    properties: {
      summary: {
        type: 'object',
        properties: {
          totalChecks: NUMBER_SCHEMA,
          issuesFound: NUMBER_SCHEMA,
          criticalIssues: NUMBER_SCHEMA,
          highIssues: NUMBER_SCHEMA,
          categories: STRING_ARRAY_SCHEMA
        }
      },
      issues: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            rule: STRING_SCHEMA,
            title: STRING_SCHEMA,
            priority: PRIORITY_SCHEMA,
            issue: STRING_SCHEMA,
            fixPrompt: STRING_SCHEMA
          }
        }
      },
      suggestions: STRING_ARRAY_SCHEMA,
      source: {
        type: 'object',
        properties: {
          url: STRING_SCHEMA,
          fetchedAt: STRING_SCHEMA,
          contentLength: NUMBER_SCHEMA
        }
      },
      error: STRING_SCHEMA
    }
  }
}

const FETCH_TIMEOUT_MS = 8000
const MAX_REDIRECTS = 3
export const MAX_AUDIT_RESPONSE_BYTES = 2 * 1024 * 1024

/**
 * Non-public address space: private, loopback, link-local, CGNAT, reserved,
 * multicast, and IPv6 ranges that embed IPv4 (mapped and NAT64).
 */
// Separate lists: a single BlockList also matches IPv4 addresses against the
// IPv4-mapped `::ffff:0:0/96` rule, which would block every public IPv4 host.
const BLOCKED_IPV4 = new BlockList()
const BLOCKED_IPV6 = new BlockList()
for (const [network, prefix] of [
  ['0.0.0.0', 8],
  ['10.0.0.0', 8],
  ['100.64.0.0', 10],
  ['127.0.0.0', 8],
  ['169.254.0.0', 16],
  ['172.16.0.0', 12],
  ['192.0.0.0', 24],
  ['192.168.0.0', 16],
  ['198.18.0.0', 15],
  ['224.0.0.0', 4],
  ['240.0.0.0', 4]
] as const) {
  BLOCKED_IPV4.addSubnet(network, prefix, 'ipv4')
}
for (const [network, prefix] of [
  ['::', 127],
  ['::ffff:0:0', 96],
  ['64:ff9b::', 96],
  ['fc00::', 7],
  ['fe80::', 10],
  ['ff00::', 8]
] as const) {
  BLOCKED_IPV6.addSubnet(network, prefix, 'ipv6')
}

/**
 * Check whether an IP literal points at non-public address space.
 *
 * @param address - IPv4 or IPv6 literal (without brackets).
 * @returns True when the address must not be fetched.
 */
export function isBlockedAddress(address: string): boolean {
  const family = isIP(address)
  if (family === 0) {
    return true
  }

  return family === 4 ? BLOCKED_IPV4.check(address, 'ipv4') : BLOCKED_IPV6.check(address, 'ipv6')
}

/**
 * Connect-time DNS lookup that refuses non-public addresses. Validating the
 * hostname before `fetch` is not enough on its own: the name could resolve
 * differently when the socket connects (DNS rebinding).
 */
const publicOnlyLookup: LookupFunction = (hostname, options, callback) => {
  lookupCallback(hostname, { ...options, all: true }, (error, addresses) => {
    if (error) {
      callback(error, '', 0)
      return
    }

    const blocked = addresses.find(entry => isBlockedAddress(entry.address))
    if (blocked || addresses.length === 0) {
      callback(new Error(`Blocked non-public address for ${hostname}`), '', 0)
      return
    }

    if (options.all) {
      callback(null, addresses)
      return
    }
    callback(null, addresses[0].address, addresses[0].family)
  })
}

const publicOnlyDispatcher = new Agent({ connect: { lookup: publicOnlyLookup } })

type HostResolver = (hostname: string) => Promise<string[]>

const resolveHost: HostResolver = async hostname =>
  (await lookup(hostname, { all: true, verbatim: true })).map(entry => entry.address)

type UrlValidation = { valid: true; url: URL } | { valid: false; error: string }

/**
 * Validate that a URL is safe to fetch (no SSRF vectors).
 *
 * Checks the scheme and host, then resolves the hostname so names that point
 * at private addresses are rejected too.
 *
 * @param rawUrl - URL supplied by the caller or a redirect `Location`.
 * @param resolve - DNS resolver, injectable for tests.
 * @returns The parsed URL or a user-facing error.
 */
export async function validateAuditUrl(
  rawUrl: string,
  resolve: HostResolver = resolveHost
): Promise<UrlValidation> {
  let parsed: URL
  try {
    parsed = new URL(rawUrl)
  } catch {
    return { valid: false, error: `Invalid URL: "${rawUrl}"` }
  }

  if (parsed.protocol !== 'https:') {
    return { valid: false, error: 'Only https:// URLs are supported' }
  }

  if (parsed.username || parsed.password) {
    return { valid: false, error: 'URLs with embedded credentials are not allowed' }
  }

  const hostname = parsed.hostname.toLowerCase().replace(/^\[|\]$/g, '')

  if (hostname === 'localhost' || hostname.endsWith('.localhost')) {
    return { valid: false, error: 'Private/localhost URLs are not allowed' }
  }

  if (isIP(hostname) !== 0) {
    return isBlockedAddress(hostname)
      ? { valid: false, error: 'Private IP addresses are not allowed' }
      : { valid: true, url: parsed }
  }

  let addresses: string[]
  try {
    addresses = await resolve(hostname)
  } catch {
    return { valid: false, error: `Could not resolve host: ${hostname}` }
  }

  if (addresses.length === 0 || addresses.some(isBlockedAddress)) {
    return { valid: false, error: 'URL resolves to a private IP address, which is not allowed' }
  }

  return { valid: true, url: parsed }
}

/**
 * Read a response body as text, refusing anything over the size cap.
 *
 * @param response - Fetch response with an HTML body.
 * @returns Decoded body, or null when the cap is exceeded.
 */
async function readCappedText(response: Response): Promise<string | null> {
  const declaredLength = Number(response.headers.get('content-length'))
  if (declaredLength > MAX_AUDIT_RESPONSE_BYTES) {
    await response.body?.cancel()
    return null
  }

  if (!response.body) {
    return ''
  }

  const reader = response.body.getReader()
  const chunks: Uint8Array[] = []
  let received = 0

  while (true) {
    const { done, value } = await reader.read()
    if (done) {
      break
    }

    received += value.byteLength
    if (received > MAX_AUDIT_RESPONSE_BYTES) {
      await reader.cancel()
      return null
    }
    chunks.push(value)
  }

  return new TextDecoder().decode(Buffer.concat(chunks))
}

/**
 * Fetch a page, following redirects manually so every hop is re-validated.
 *
 * @param url - Validated starting URL.
 * @param resolve - DNS resolver, injectable for tests.
 * @returns The final response and URL, or a user-facing error.
 */
async function fetchWithValidatedRedirects(
  url: URL,
  resolve: HostResolver
): Promise<{ response: Response; url: URL } | { error: string }> {
  let current = url
  const signal = AbortSignal.timeout(FETCH_TIMEOUT_MS)

  for (let hop = 0; hop <= MAX_REDIRECTS; hop++) {
    // `dispatcher` is an undici extension to RequestInit supported by Node's fetch.
    const init: RequestInit & { dispatcher: Agent } = {
      headers: {
        'User-Agent': BOT_USER_AGENT,
        Accept: 'text/html,application/xhtml+xml'
      },
      redirect: 'manual',
      signal,
      // Re-checks resolved addresses at connect time.
      dispatcher: publicOnlyDispatcher
    }
    const response = await fetch(current.toString(), init)

    const location = response.headers.get('location')
    if (response.status < 300 || response.status >= 400 || !location) {
      return { response, url: current }
    }

    await response.body?.cancel()
    const next = await validateAuditUrl(new URL(location, current).toString(), resolve)
    if (!next.valid) {
      return { error: `Redirect blocked: ${next.error}` }
    }
    current = next.url
  }

  return { error: `Too many redirects (max ${MAX_REDIRECTS})` }
}

/**
 * Execute audit_url tool
 */
export async function executeAuditUrl(
  input: AuditUrlInput,
  rules: Rule[],
  resolve: HostResolver = resolveHost
): Promise<AuditUrlResult | { error: string }> {
  const { url: rawUrl, focus, minPriority } = input

  // Validate URL safety
  const validation = await validateAuditUrl(rawUrl, resolve)
  if (!validation.valid) {
    return { error: validation.error }
  }

  // Fetch the page HTML
  let html: string
  let url: URL
  try {
    const fetched = await fetchWithValidatedRedirects(validation.url, resolve)
    if ('error' in fetched) {
      return { error: fetched.error }
    }

    const { response } = fetched
    url = fetched.url

    if (!response.ok) {
      await response.body?.cancel()
      return { error: `Failed to fetch URL: HTTP ${response.status} ${response.statusText}` }
    }

    const contentType = response.headers.get('content-type') || ''
    if (!contentType.includes('text/html') && !contentType.includes('application/xhtml')) {
      await response.body?.cancel()
      return { error: `URL does not serve HTML content (got: ${contentType})` }
    }

    const text = await readCappedText(response)
    if (text === null) {
      return {
        error: `Page is larger than the ${MAX_AUDIT_RESPONSE_BYTES / (1024 * 1024)}MB audit limit`
      }
    }
    html = text
  } catch (err) {
    if (err instanceof Error && err.name === 'TimeoutError') {
      return { error: `Request timed out after ${FETCH_TIMEOUT_MS / 1000} seconds` }
    }
    const cause = err instanceof Error && err.cause instanceof Error ? err.cause : err
    return {
      error: `Failed to fetch URL: ${cause instanceof Error ? cause.message : 'Unknown error'}`
    }
  }

  // Run the same review as review_code
  const reviewResult = executeReviewCode({ code: html, focus, minPriority }, rules)

  return {
    ...reviewResult,
    source: {
      url: url.toString(),
      fetchedAt: new Date().toISOString(),
      contentLength: html.length
    }
  }
}
