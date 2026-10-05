import type { Rule } from '@repo/types'
import type { McpClientSource } from './client-source'

export interface McpRuleUsage {
  slug: string
  category: string
}

export interface McpToolUsage {
  toolName: string
  outcome: 'success' | 'error'
  durationMs: number
  requestedRule?: McpRuleUsage
  returnedRules: McpRuleUsage[]
  clientSource?: McpClientSource
}

const RULE_TOOLS = new Set(['get_rule', 'check_rule', 'fix_rule', 'explain_rule'])
const RETURNED_FIELDS: Record<string, string> = {
  search_rules: 'rules',
  review_code: 'issues',
  audit_url: 'issues',
  get_workflow: 'steps',
  get_checklist_rules: 'rules',
  get_quick_reference: 'items'
}

/** Read only an explicitly named property from an unknown object. */
function field(value: unknown, key: string): unknown {
  return typeof value === 'object' && value !== null ? Reflect.get(value, key) : undefined
}

/** Build a bounded analytics record using canonical corpus metadata only. */
export function buildToolUsage(
  toolName: string,
  args: unknown,
  result: unknown,
  rules: Rule[],
  outcome: McpToolUsage['outcome'],
  durationMs: number
): McpToolUsage {
  const canonical = new Map(rules.map(rule => [rule.slug, rule]))
  const requestedSlug = field(args, 'slug')
  const requested =
    RULE_TOOLS.has(toolName) && typeof requestedSlug === 'string'
      ? canonical.get(requestedSlug)
      : undefined
  const candidates = field(result, RETURNED_FIELDS[toolName] ?? '')
  const returned = new Map<string, McpRuleUsage>()

  if (outcome === 'success' && Array.isArray(candidates)) {
    for (const candidate of candidates) {
      const slug = field(candidate, 'slug') ?? field(candidate, 'rule')
      const rule = typeof slug === 'string' ? canonical.get(slug) : undefined
      if (rule) returned.set(rule.slug, { slug: rule.slug, category: rule.primaryCategory })
    }
  }

  return {
    toolName,
    outcome,
    durationMs: Math.max(0, Math.round(durationMs)),
    ...(requested
      ? { requestedRule: { slug: requested.slug, category: requested.primaryCategory } }
      : {}),
    returnedRules: [...returned.values()]
  }
}

/** Notify an optional analytics observer without affecting MCP execution. */
export function notifyToolUsage(
  observer: ((usage: McpToolUsage) => void) | undefined,
  usage: McpToolUsage
): void {
  try {
    observer?.(usage)
  } catch {
    // Analytics observers must never alter the tool result.
  }
}
