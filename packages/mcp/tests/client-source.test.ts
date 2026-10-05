import { identifyMcpClient } from '../src/client-source'

describe('self-reported MCP client source', () => {
  it.each([
    ['claude-ai', 'claude', 'claude'],
    ['Claude Code', 'claude', 'claude_code'],
    ['codex_cli_rs', 'openai', 'codex'],
    ['codex-mcp-client', 'openai', 'codex'],
    ['ChatGPT', 'openai', 'chatgpt']
  ])('classifies %s without retaining names or versions', (name, vendor, client) => {
    expect(identifyMcpClient({ name, version: 'private version' }, {})).toEqual({
      clientPlatform: vendor,
      clientProduct: client,
      clientSourceEvidence: 'mcp_client_info'
    })
  })
  it('uses OpenAI metadata as a vendor hint without inferring the host surface', () => {
    expect(
      identifyMcpClient(undefined, {
        'openai/userAgent': 'private browser fingerprint',
        'openai/subject': 'private user',
        'openai/session': 'private conversation'
      })
    ).toEqual({
      clientPlatform: 'openai',
      clientProduct: 'unknown',
      clientSourceEvidence: 'openai_metadata'
    })
  })
  it('keeps generic clients and missing signals distinct', () => {
    expect(identifyMcpClient({ name: 'custom-client' }, {}).clientPlatform).toBe('other')
    expect(identifyMcpClient({ name: 'constructor' }, {}).clientPlatform).toBe('other')
    expect(identifyMcpClient(undefined, {}, 'python-httpx/0.28.0').clientPlatform).toBe('unknown')
    expect(identifyMcpClient(undefined, {}, 'Mozilla/5.0 Claude OpenAI').clientPlatform).toBe(
      'unknown'
    )
  })
  it('recognizes explicit user-agent tokens without keeping the fingerprint', () => {
    expect(identifyMcpClient(undefined, {}, 'Claude-User/1.0')).toEqual({
      clientPlatform: 'claude',
      clientProduct: 'claude',
      clientSourceEvidence: 'user_agent'
    })
  })
  it('does not guess when vendor signals conflict', () => {
    expect(identifyMcpClient({ name: 'claude-ai' }, { 'openai/userAgent': 'hint' })).toEqual({
      clientPlatform: 'unknown',
      clientProduct: 'unknown',
      clientSourceEvidence: 'conflicting'
    })
  })
  it('drops oversized or invalid client values', () => {
    expect(
      identifyMcpClient({ name: 'x'.repeat(129) }, { 'openai/userAgent': false }, 'x'.repeat(1025))
    ).toEqual({
      clientPlatform: 'unknown',
      clientProduct: 'unknown',
      clientSourceEvidence: 'unknown'
    })
  })
})
