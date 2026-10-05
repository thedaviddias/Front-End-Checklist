/** @jest-environment node */
import type { McpToolUsage } from '@repo/mcp'

const mockAfter = jest.fn()
const mockTrack = jest.fn()
const mockCreateMany = jest.fn()
jest.mock('server-only', () => ({}))
jest.mock('next/server', () => ({ after: mockAfter }))
jest.mock('@repo/auth/prisma', () => ({ prisma: { mcpToolCall: { createMany: mockCreateMany } } }))
jest.mock('@thedaviddias/analytics/server', () => ({
  hasOpenPanelServerConfig: true,
  opServer: { track: mockTrack }
}))
const { scheduleMcpTelemetry } = require('../mcp-telemetry') as typeof import('../mcp-telemetry')
const usage: McpToolUsage = {
  toolName: 'get_rule',
  outcome: 'success',
  durationMs: 5,
  requestedRule: { slug: 'doctype', category: 'html' },
  returnedRules: [{ slug: 'alt-text', category: 'accessibility' }]
}

describe('post-response MCP event delivery', () => {
  const originalEnvironment = process.env.NODE_ENV
  beforeEach(() => {
    jest.clearAllMocks()
    Object.assign(process.env, { NODE_ENV: 'production' })
  })
  afterAll(() => {
    Object.assign(process.env, { NODE_ENV: originalEnvironment })
  })

  it('awaits delivery inside the serverless lifetime hook', async () => {
    let complete: (() => void) | undefined
    mockTrack.mockImplementation(
      () =>
        new Promise<void>(resolve => {
          complete = resolve
        })
    )
    scheduleMcpTelemetry([{ ...usage, requestedRule: undefined, returnedRules: [] }])
    expect(mockTrack).not.toHaveBeenCalled()
    let settled = false
    const delivery = mockAfter.mock.calls[0][0]().then(() => {
      settled = true
    })
    await Promise.resolve()
    expect(settled).toBe(false)
    complete?.()
    await delivery
    expect(settled).toBe(true)
  })

  it('sends tool, requested-rule and returned-rule events with safe dimensions', async () => {
    mockTrack.mockResolvedValue(undefined)
    scheduleMcpTelemetry([usage])
    await mockAfter.mock.calls[0][0]()
    expect(mockTrack.mock.calls.map(([name]) => name)).toEqual([
      'mcp_tool_called',
      'mcp_rule_requested',
      'mcp_rule_returned'
    ])
    expect(mockTrack.mock.calls[1][1]).toMatchObject({ ruleSlug: 'doctype', category: 'html' })
    expect(
      mockTrack.mock.calls.every(([, properties]) => properties.clientPlatform === 'unknown')
    ).toBe(true)
    expect(mockCreateMany).toHaveBeenCalledWith({ data: [{ toolName: 'get_rule' }] })
  })

  it('isolates synchronous storage and analytics failures and attempts every event', async () => {
    mockCreateMany.mockImplementation(() => {
      throw new Error('database unavailable')
    })
    mockTrack.mockImplementation(() => {
      throw new Error('analytics unavailable')
    })
    scheduleMcpTelemetry([usage])
    await expect(mockAfter.mock.calls[0][0]()).resolves.toBeUndefined()
    expect(mockTrack).toHaveBeenCalledTimes(3)
  })

  it('propagates the same bounded source dimensions to tool and rule events', async () => {
    mockTrack.mockResolvedValue(undefined)
    mockCreateMany.mockResolvedValue({ count: 1 })
    const clientSource = {
      clientPlatform: 'claude',
      clientProduct: 'claude',
      clientSourceEvidence: 'user_agent'
    } as const
    scheduleMcpTelemetry([{ ...usage, clientSource }])
    await mockAfter.mock.calls[0][0]()
    for (const [, properties] of mockTrack.mock.calls) {
      expect(properties).toMatchObject(clientSource)
    }
  })

  it('does not schedule empty requests or send development usage to OpenPanel', async () => {
    scheduleMcpTelemetry([])
    expect(mockAfter).not.toHaveBeenCalled()
    Object.assign(process.env, { NODE_ENV: 'development' })
    mockCreateMany.mockResolvedValue({ count: 1 })
    scheduleMcpTelemetry([usage])
    await mockAfter.mock.calls[0][0]()
    expect(mockTrack).not.toHaveBeenCalled()
  })
})
