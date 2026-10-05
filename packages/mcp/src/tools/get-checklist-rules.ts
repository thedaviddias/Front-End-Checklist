import { createHash } from 'node:crypto'
import { SITE_URL } from '@repo/config'
import type { CuratedChecklist, Rule } from '@repo/types'
import { decodeCursor, encodeCursor } from '../utils/pagination'
import {
  NUMBER_SCHEMA,
  READ_ONLY_TOOL_ANNOTATIONS,
  RULE_PROMPTS_SCHEMA,
  STRING_SCHEMA
} from './metadata'

export interface GetChecklistRulesInput {
  checklist: string
  includeContent?: boolean
  limit?: number
  cursor?: string
}

export interface ChecklistRuleDetail {
  slug: string
  title: string
  priority: 'critical' | 'high' | 'medium' | 'low'
  category: string
  prompts?: {
    check: string
    fix: string
    explain: string
    codeReview?: string
  }
  relatedRules?: Array<{ slug: string; reason: string }>
  url: string
  content?: string
  contentOmitted?: boolean
  detailsOmitted?: boolean
}

export interface GetChecklistRulesResult {
  success: true
  checklist: {
    slug: string
    title: string
    description: string
    totalRules: number
    criticalCount: number
    highCount: number
  }
  rules: ChecklistRuleDetail[]
  nextCursor: string | null
  hasMore: boolean
  guidance: string
}

export interface GetChecklistRulesError {
  success: false
  error: {
    message: string
    availableChecklists: Array<{ slug: string; title: string }>
  }
}

export type GetChecklistRulesOutput = GetChecklistRulesResult | GetChecklistRulesError

/** Bound the complete pretty JSON payload, including pagination, before SDK text wrapping. */
export const MAX_CHECKLIST_RESPONSE_BYTES = 16_000
const PAGINATION_INPUT = {
  limit: {
    type: 'integer',
    minimum: 1,
    maximum: 50,
    default: 20,
    description:
      'Maximum rules per page, 1–50. Default 20; the response byte budget may return fewer.'
  },
  cursor: {
    type: 'string',
    description:
      'Continuation cursor from nextCursor. Omit for the first page; keep checklist and includeContent unchanged.'
  }
}
const PAGINATION_OUTPUT = {
  nextCursor: { type: ['string', 'null'] },
  hasMore: { type: 'boolean' },
  guidance: STRING_SCHEMA
}

/** Build the checklist-backed definition with discoverable continuation arguments. */
export function buildGetChecklistRulesDefinition(checklists: CuratedChecklist[]) {
  const availableSlugs = checklists.map(c => c.slug)

  return {
    name: 'get_checklist_rules',
    title: 'Get Checklist Rules',
    description: `Returns titles, priorities, verification and remediation prompts for a bounded page of a curated checklist. Use it when the user requests guidance for an entire checklist. Follow nextCursor until null. includeContent optionally adds long-form bodies; oversized bodies are explicitly omitted. Available checklists: ${availableSlugs.join(', ')}.`,
    annotations: READ_ONLY_TOOL_ANNOTATIONS,
    inputSchema: {
      type: 'object' as const,
      properties: {
        ...PAGINATION_INPUT,
        checklist: {
          type: 'string',
          enum: availableSlugs,
          description: `Checklist slug. Available: ${availableSlugs.map(s => `'${s}'`).join(', ')}`
        },
        includeContent: {
          type: 'boolean',
          description:
            'Include full MDX body content (large). Default false returns title, description, prompts, and metadata only.'
        }
      },
      required: ['checklist']
    },
    outputSchema: {
      type: 'object' as const,
      properties: {
        ...PAGINATION_OUTPUT,
        checklist: {
          type: 'object',
          properties: {
            slug: STRING_SCHEMA,
            title: STRING_SCHEMA,
            description: STRING_SCHEMA,
            totalRules: NUMBER_SCHEMA,
            criticalCount: NUMBER_SCHEMA,
            highCount: NUMBER_SCHEMA
          }
        },
        rules: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              slug: STRING_SCHEMA,
              title: STRING_SCHEMA,
              priority: {
                type: 'string',
                enum: ['critical', 'high', 'medium', 'low']
              },
              category: STRING_SCHEMA,
              prompts: RULE_PROMPTS_SCHEMA,
              url: STRING_SCHEMA,
              content: STRING_SCHEMA,
              contentOmitted: { type: 'boolean' },
              detailsOmitted: { type: 'boolean' }
            }
          }
        },
        error: {
          type: 'object',
          properties: {
            message: STRING_SCHEMA
          }
        }
      }
    }
  }
}

export const getChecklistRulesDefinition = {
  name: 'get_checklist_rules',
  title: 'Get Checklist Rules',
  description: `Returns titles, priorities, verification and remediation prompts for a bounded page of a curated checklist. Use it when the user requests guidance for an entire checklist. Follow nextCursor until null. includeContent optionally adds long-form bodies; oversized bodies are explicitly omitted.`,
  annotations: READ_ONLY_TOOL_ANNOTATIONS,
  inputSchema: {
    type: 'object' as const,
    properties: {
      ...PAGINATION_INPUT,
      checklist: {
        type: 'string',
        description: 'Checklist slug, e.g. "launch-checklist".'
      },
      includeContent: {
        type: 'boolean',
        description: "Include each rule's full MDX body (large). Default false."
      }
    },
    required: ['checklist']
  },
  outputSchema: {
    type: 'object' as const,
    properties: {
      ...PAGINATION_OUTPUT,
      checklist: {
        type: 'object',
        properties: {
          slug: STRING_SCHEMA,
          title: STRING_SCHEMA,
          description: STRING_SCHEMA,
          totalRules: NUMBER_SCHEMA,
          criticalCount: NUMBER_SCHEMA,
          highCount: NUMBER_SCHEMA
        }
      },
      rules: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            slug: STRING_SCHEMA,
            title: STRING_SCHEMA,
            priority: {
              type: 'string',
              enum: ['critical', 'high', 'medium', 'low']
            },
            category: STRING_SCHEMA,
            prompts: RULE_PROMPTS_SCHEMA,
            url: STRING_SCHEMA,
            content: STRING_SCHEMA,
            contentOmitted: { type: 'boolean' },
            detailsOmitted: { type: 'boolean' }
          }
        }
      },
      error: {
        type: 'object',
        properties: {
          message: STRING_SCHEMA
        }
      }
    }
  }
}

/**
 * Execute get_checklist_rules tool
 */
export function executeGetChecklistRules(
  input: GetChecklistRulesInput,
  rules: Rule[],
  checklists: CuratedChecklist[]
): GetChecklistRulesOutput {
  const { checklist: slug, includeContent = false } = input

  const checklist = checklists.find(c => c.slug === slug)

  if (!checklist) {
    return {
      success: false,
      error: {
        message: `Unknown checklist: '${slug}'`,
        availableChecklists: checklists.map(c => ({ slug: c.slug, title: c.title }))
      }
    }
  }

  const ruleDetails: ChecklistRuleDetail[] = []

  for (const ruleRef of checklist.rules) {
    const [, ruleSlug] = ruleRef.includes('/') ? ruleRef.split('/') : ['', ruleRef]
    const rule = rules.find(r => r.slug === ruleSlug)

    if (!rule) continue

    const detail: ChecklistRuleDetail = {
      slug: rule.slug,
      title: rule.title,
      priority: rule.priority,
      category: rule.primaryCategory,
      prompts: rule.prompts,
      relatedRules: rule.relatedRules,
      url: `${SITE_URL}/rules/${rule.primaryCategory}/${rule.slug}`
    }

    if (includeContent) {
      detail.content = rule.content
    }

    ruleDetails.push(detail)
  }

  const criticalCount = ruleDetails.filter(r => r.priority === 'critical').length
  const highCount = ruleDetails.filter(r => r.priority === 'high').length

  return paginateChecklist(input, {
    success: true,
    checklist: {
      slug: checklist.slug,
      title: checklist.title,
      description: checklist.description,
      totalRules: ruleDetails.length,
      criticalCount,
      highCount
    },
    rules: ruleDetails,
    nextCursor: null,
    hasMore: false,
    guidance:
      'Follow nextCursor with the same checklist and includeContent. For omitted content or details, call get_rule with that rule slug.'
  })
}

/** Return a bounded error without echoing arbitrarily large input or content. */
function pageError(message: string): GetChecklistRulesError {
  return { success: false, error: { message, availableChecklists: [] } }
}

/** Measure the exact JSON serialization used by the SDK text response. */
function fitsPage(result: GetChecklistRulesResult): boolean {
  return Buffer.byteLength(JSON.stringify(result, null, 2), 'utf8') <= MAX_CHECKLIST_RESPONSE_BYTES
}

/** Page whole rules; never cut JSON, skip an oversized rule silently, or repeat a stale cursor. */
function paginateChecklist(
  input: GetChecklistRulesInput,
  complete: GetChecklistRulesResult
): GetChecklistRulesOutput {
  const limit = input.limit ?? 20
  if (!Number.isInteger(limit) || limit < 1 || limit > 50)
    return pageError('limit must be an integer from 1 to 50.')
  const version = createHash('sha256')
    .update(JSON.stringify([complete.checklist, input.includeContent ?? false, complete.rules]))
    .digest('hex')
  const cursor = input.cursor === undefined ? { offset: 0, version } : decodeCursor(input.cursor)
  if (
    !cursor ||
    !Number.isSafeInteger(cursor.offset) ||
    cursor.offset < 0 ||
    cursor.version !== version ||
    (input.cursor !== undefined && cursor.offset >= complete.rules.length)
  ) {
    return pageError(
      'Invalid or stale cursor. Restart without cursor; keep checklist and includeContent unchanged.'
    )
  }
  const result: GetChecklistRulesResult = { ...complete, rules: [] }
  if (!fitsPage(result))
    return pageError(
      'Checklist metadata exceeds the response budget. Use get_workflow and retrieve individual rules.'
    )
  for (
    let index = cursor.offset;
    index < complete.rules.length && result.rules.length < limit;
    index++
  ) {
    const detail = complete.rules[index]!
    const more = index + 1 < complete.rules.length
    const nextCursor = more ? encodeCursor({ offset: index + 1, version }) : null
    const candidate = { ...result, rules: [...result.rules, detail], hasMore: more, nextCursor }
    if (fitsPage(candidate)) {
      Object.assign(result, candidate)
      continue
    }
    // Try this rule on the next page before omitting any requested fields.
    if (result.rules.length > 0) break
    const { content, ...metadata } = detail
    const compact = { ...metadata, ...(content !== undefined ? { contentOmitted: true } : {}) }
    const withoutBody = { ...candidate, rules: [compact] }
    if (fitsPage(withoutBody)) {
      Object.assign(result, withoutBody)
      continue
    }
    const stub: ChecklistRuleDetail = {
      slug: detail.slug,
      title: detail.title,
      priority: detail.priority,
      category: detail.category,
      url: detail.url,
      detailsOmitted: true,
      ...(content !== undefined ? { contentOmitted: true } : {})
    }
    const minimal = { ...candidate, rules: [stub] }
    if (!fitsPage(minimal))
      return pageError(
        'Rule metadata exceeds the page budget. Use the checklist workflow to retrieve individual rules.'
      )
    Object.assign(result, minimal)
  }
  return result
}
