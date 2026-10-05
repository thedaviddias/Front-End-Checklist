import { SITE_URL } from '@repo/config'
import type { CuratedChecklist, Rule } from '@repo/types'
import {
  NUMBER_SCHEMA,
  READ_ONLY_TOOL_ANNOTATIONS,
  RULE_PROMPTS_SCHEMA,
  STRING_SCHEMA
} from './metadata'

export interface GetChecklistRulesInput {
  checklist: string
  includeContent?: boolean
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
}

export interface GetChecklistRulesError {
  success: false
  error: {
    message: string
    availableChecklists: Array<{ slug: string; title: string }>
  }
}

export type GetChecklistRulesOutput = GetChecklistRulesResult | GetChecklistRulesError

export function buildGetChecklistRulesDefinition(checklists: CuratedChecklist[]) {
  const availableSlugs = checklists.map(c => c.slug)

  return {
    name: 'get_checklist_rules',
    title: 'Get Checklist Rules',
    description: `Returns titles, priorities, verification and remediation prompts for every rule in a curated checklist. Use it when the user requests guidance for an entire checklist. includeContent optionally adds each rule’s long-form body. Available checklists: ${availableSlugs.join(', ')}.`,
    annotations: READ_ONLY_TOOL_ANNOTATIONS,
    inputSchema: {
      type: 'object' as const,
      properties: {
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
              content: STRING_SCHEMA
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
  description: `Returns titles, priorities, verification and remediation prompts for every rule in a curated checklist. Use it when the user requests guidance for an entire checklist. includeContent optionally adds each rule’s long-form body.`,
  annotations: READ_ONLY_TOOL_ANNOTATIONS,
  inputSchema: {
    type: 'object' as const,
    properties: {
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
            content: STRING_SCHEMA
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

  return {
    success: true,
    checklist: {
      slug: checklist.slug,
      title: checklist.title,
      description: checklist.description,
      totalRules: ruleDetails.length,
      criticalCount,
      highCount
    },
    rules: ruleDetails
  }
}
