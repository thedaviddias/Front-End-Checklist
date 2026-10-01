/**
 * @jest-environment node
 */

const mockCreateMany = jest.fn()
const mockCheckRateLimit = jest.fn()
const mockGetRuleRawContent = jest.fn()
const mockGetCachedResponse = jest.fn()
const mockSetCachedResponse = jest.fn()

jest.mock('@repo/auth/prisma', () => ({
  prisma: {
    mcpToolCall: {
      createMany: mockCreateMany
    }
  }
}))

jest.mock('@/lib/rate-limit', () => ({
  checkRateLimit: mockCheckRateLimit,
  createRateLimitHeaders: jest.fn(() => ({})),
  getClientIp: jest.fn(() => '127.0.0.1')
}))

jest.mock('@/lib/rule-content', () => ({
  getRuleRawContent: mockGetRuleRawContent,
  readRuleRawContent: mockGetRuleRawContent
}))

jest.mock('@/lib/mcp-cache', () => ({
  GET_CACHE_HEADERS: { 'Cache-Control': 'public, max-age=60' },
  getCachedResponse: mockGetCachedResponse,
  setCachedResponse: mockSetCachedResponse
}))

jest.mock('content-collections', () => ({
  allRules: [
    {
      id: 'rule-1',
      title: 'Use HTML5 Doctype',
      description: 'Add the html5 doctype.',
      slug: 'doctype',
      language: 'en',
      categories: ['html'],
      priority: 'critical',
      prompts: {
        check: 'Check for <!DOCTYPE html>.',
        fix: 'Add <!DOCTYPE html>.',
        explain: 'Standards mode needs it.'
      },
      primaryCategory: 'html',
      url: '/en/rules/html/doctype',
      filePath: 'rules/en/html/doctype.mdx'
    }
  ],
  allChecklists: [
    {
      id: 'launch-checklist',
      slug: 'launch-checklist',
      title: 'Launch Checklist',
      description: 'Checks before release.',
      icon: 'rocket',
      rules: ['html/doctype'],
      estimatedTime: '15 minutes',
      difficulty: 'beginner',
      order: 1,
      featured: true,
      language: 'en',
      url: '/en/checklists/launch-checklist'
    }
  ]
}))

const { GET, OPTIONS, POST } = require('../route') as typeof import('../route')

describe('mcp route', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    mockCheckRateLimit.mockResolvedValue({
      success: true,
      limit: 100,
      remaining: 99,
      reset: Date.now() + 60_000
    })
    mockGetRuleRawContent.mockResolvedValue('# Doctype\n\n<!DOCTYPE html>')
    mockGetCachedResponse.mockReturnValue(null)
    mockCreateMany.mockResolvedValue({ count: 1 })
  })

  it('returns standardized MCP metadata with checklist-backed tools', async () => {
    const response = await GET(new Request('https://mcp.frontendchecklist.io'))

    expect(response.status).toBe(200)
    await expect(response.json()).resolves.toMatchObject({
      name: 'frontend-checklist-mcp',
      instructions: expect.stringContaining('Use Front-End Checklist'),
      protocolVersion: '2026-07-28',
      supportedProtocolVersions: expect.arrayContaining(['2026-07-28', '2025-11-25', '2025-06-18']),
      tools: expect.arrayContaining(['get_workflow', 'get_checklist_rules', 'get_rule']),
      recommendedUsage: {
        frontendCodeReview: expect.stringContaining('review_code'),
        ruleLookup: expect.stringContaining('search_rules')
      }
    })
  })

  it('still negotiates 2025-era protocol versions through initialize', async () => {
    const response = await POST(
      new Request('https://mcp.frontendchecklist.io', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          jsonrpc: '2.0',
          id: 1,
          method: 'initialize',
          params: {
            protocolVersion: '2025-06-18',
            capabilities: {},
            clientInfo: {
              name: 'jest-client',
              version: '1.0.0'
            }
          }
        })
      })
    )

    expect(response.status).toBe(200)
    await expect(response.json()).resolves.toMatchObject({
      result: {
        protocolVersion: '2025-06-18',
        serverInfo: {
          name: 'frontend-checklist-mcp'
        },
        instructions: expect.stringContaining('review_code')
      }
    })
  })

  it('exposes tool annotations and output schemas from the route surface', async () => {
    const response = await POST(
      new Request('https://mcp.frontendchecklist.io', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          jsonrpc: '2.0',
          id: 1,
          method: 'tools/list'
        })
      })
    )

    expect(response.status).toBe(200)

    const payload = (await response.json()) as {
      result: {
        tools: Array<{
          name: string
          title?: string
          outputSchema?: unknown
          annotations?: Record<string, unknown>
        }>
      }
    }

    expect(payload.result.tools).toHaveLength(11)
    expect(payload.result.tools.find(tool => tool.name === 'review_code')).toMatchObject({
      title: 'Review Frontend Code'
    })
    expect(payload.result.tools.find(tool => tool.name === 'get_workflow')).toMatchObject({
      outputSchema: expect.any(Object),
      annotations: {
        readOnlyHint: true,
        destructiveHint: false,
        idempotentHint: true
      }
    })
  })

  it('rejects untrusted browser origins', async () => {
    const response = await POST(
      new Request('https://mcp.frontendchecklist.io', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Origin: 'https://evil.example.com'
        },
        body: JSON.stringify({
          jsonrpc: '2.0',
          id: 1,
          method: 'initialize'
        })
      })
    )

    expect(response.status).toBe(403)
  })

  it('echoes trusted origins during OPTIONS preflight', async () => {
    const response = await OPTIONS(
      new Request('https://mcp.frontendchecklist.io', {
        method: 'OPTIONS',
        headers: {
          Origin: 'https://mcp.frontendchecklist.io'
        }
      })
    )

    expect(response.status).toBe(204)
    expect(response.headers.get('Access-Control-Allow-Origin')).toBe(
      'https://mcp.frontendchecklist.io'
    )
    expect(response.headers.get('Access-Control-Allow-Headers')).toEqual(
      expect.stringContaining('Mcp-Protocol-Version')
    )
  })
})
