/** Self-reported client classification for aggregate analytics, never authorization. */
export interface McpClientSource {
  clientPlatform: 'claude' | 'openai' | 'other' | 'unknown'
  clientProduct: 'claude' | 'claude_code' | 'codex' | 'chatgpt' | 'other' | 'unknown'
  clientSourceEvidence:
    | 'mcp_client_info'
    | 'openai_metadata'
    | 'user_agent'
    | 'conflicting'
    | 'unknown'
}

const UNKNOWN: McpClientSource = {
  clientPlatform: 'unknown',
  clientProduct: 'unknown',
  clientSourceEvidence: 'unknown'
}
const PRODUCTS: Record<string, McpClientSource['clientProduct']> = {
  claude: 'claude',
  'claude-ai': 'claude',
  'claude-desktop': 'claude',
  'claude-code': 'claude_code',
  'claude-code-cli': 'claude_code',
  codex: 'codex',
  codex_cli_rs: 'codex',
  'codex-cli': 'codex',
  'codex-mcp-client': 'codex',
  chatgpt: 'chatgpt',
  'chatgpt-mcp-client': 'chatgpt'
}

/** Inspect one named metadata field without retaining its surrounding payload. */
function field(value: unknown, key: string): unknown {
  return typeof value === 'object' && value !== null ? Reflect.get(value, key) : undefined
}

/** Normalize a bounded, explicitly recognized product name to a fixed analytics label. */
function product(value: unknown): McpClientSource['clientProduct'] | undefined {
  if (typeof value !== 'string' || value.length > 128) return undefined
  const name = value.trim().toLowerCase().replace(/\s+/g, '-')
  return Object.hasOwn(PRODUCTS, name) ? PRODUCTS[name] : undefined
}

/** Resolve a product's vendor without inferring which model the client used. */
function platform(value: McpClientSource['clientProduct']): McpClientSource['clientPlatform'] {
  if (value === 'claude' || value === 'claude_code') return 'claude'
  if (value === 'codex' || value === 'chatgpt') return 'openai'
  return value
}

/** Derive best-effort source labels from per-call signals; discard raw names and agents. */
export function identifyMcpClient(
  clientInfo: unknown,
  meta: unknown,
  userAgent?: string | null
): McpClientSource {
  const name = field(clientInfo, 'name')
  const declaredProduct = product(name)
  const openaiAgent = field(meta, 'openai/userAgent')
  const openaiHint =
    typeof openaiAgent === 'string' && openaiAgent.length > 0 && openaiAgent.length <= 1024
  // Require explicit product tokens; generic browser, SDK and crawler names stay unknown.
  const agentToken =
    typeof userAgent === 'string' && userAgent.length <= 1024
      ? userAgent
          .match(
            /^(claude-code|claude-user|claude-desktop|codex_cli_rs|codex|chatgpt)(?:\/|\s|$)/i
          )?.[1]
          ?.toLowerCase()
      : undefined
  const agentProduct = agentToken === 'claude-user' ? 'claude' : product(agentToken)
  const knownPlatforms = [
    declaredProduct && platform(declaredProduct),
    openaiHint && 'openai',
    agentProduct && platform(agentProduct)
  ].filter(Boolean)
  if (new Set(knownPlatforms).size > 1) return { ...UNKNOWN, clientSourceEvidence: 'conflicting' }
  if (declaredProduct)
    return {
      clientPlatform: platform(declaredProduct),
      clientProduct: declaredProduct,
      clientSourceEvidence: 'mcp_client_info'
    }
  // OpenAI explicitly documents this optional analytics hint, not a stable host surface ID.
  if (openaiHint)
    return {
      clientPlatform: 'openai',
      clientProduct: 'unknown',
      clientSourceEvidence: 'openai_metadata'
    }
  if (agentProduct)
    return {
      clientPlatform: platform(agentProduct),
      clientProduct: agentProduct,
      clientSourceEvidence: 'user_agent'
    }
  if (typeof name === 'string' && name.length > 0 && name.length <= 128)
    return {
      clientPlatform: 'other',
      clientProduct: 'other',
      clientSourceEvidence: 'mcp_client_info'
    }
  return { ...UNKNOWN }
}
