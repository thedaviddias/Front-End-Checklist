import 'server-only'

import { prisma } from '@repo/auth/prisma'
import { MCP_SERVER_INFO, type McpToolUsage } from '@repo/mcp'
import { hasOpenPanelServerConfig, opServer } from '@thedaviddias/analytics/server'
import { after } from 'next/server'
import { TELEMETRY_EVENTS } from '@/lib/telemetry-events'

/** Deliver safe aggregate MCP events after the response, with serverless lifetime support. */
export function scheduleMcpTelemetry(usages: McpToolUsage[]): void {
  if (usages.length === 0) return

  after(async () => {
    const writes: Promise<unknown>[] = [
      Promise.resolve().then(() =>
        prisma.mcpToolCall.createMany({ data: usages.map(usage => ({ toolName: usage.toolName })) })
      )
    ]

    if (process.env.NODE_ENV === 'production' && hasOpenPanelServerConfig) {
      for (const usage of usages) {
        const common = {
          source: 'mcp',
          toolName: usage.toolName,
          serverVersion: MCP_SERVER_INFO.version
        }
        writes.push(
          Promise.resolve().then(() =>
            opServer.track(TELEMETRY_EVENTS.mcpToolCalled, {
              ...common,
              outcome: usage.outcome,
              durationMs: usage.durationMs,
              returnedRuleCount: usage.returnedRules.length
            })
          )
        )
        const requestedRule = usage.requestedRule
        if (requestedRule) {
          writes.push(
            Promise.resolve().then(() =>
              opServer.track(TELEMETRY_EVENTS.mcpRuleRequested, {
                ...common,
                ruleSlug: requestedRule.slug,
                category: requestedRule.category,
                outcome: usage.outcome
              })
            )
          )
        }
        for (const rule of usage.returnedRules) {
          writes.push(
            Promise.resolve().then(() =>
              opServer.track(TELEMETRY_EVENTS.mcpRuleReturned, {
                ...common,
                ruleSlug: rule.slug,
                category: rule.category
              })
            )
          )
        }
      }
    }

    await Promise.allSettled(writes)
  })
}
