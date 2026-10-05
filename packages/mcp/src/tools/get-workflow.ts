import type { CuratedChecklist, Rule } from '@repo/types'
import { NUMBER_SCHEMA, READ_ONLY_TOOL_ANNOTATIONS, STRING_SCHEMA } from './metadata'

export interface WorkflowStep {
  slug: string
  title: string
  priority: 'critical' | 'high' | 'medium' | 'low'
  order: number
  category: string
}

export interface Workflow {
  slug: string
  title: string
  description: string
  icon: string
  estimatedTime?: string
  difficulty?: 'beginner' | 'intermediate' | 'advanced'
  steps: WorkflowStep[]
  totalRules: number
  criticalCount: number
  highCount: number
}

export interface GetWorkflowInput {
  slug: string
}

export interface GetWorkflowResult {
  success: true
  workflow: Workflow
}

export interface GetWorkflowError {
  success: false
  error: {
    message: string
    availableWorkflows: Array<{ slug: string; title: string }>
  }
}

export type GetWorkflowOutput = GetWorkflowResult | GetWorkflowError

/**
 * Build the tool definition dynamically based on available checklists
 */
export function buildGetWorkflowDefinition(checklists: CuratedChecklist[]) {
  const availableSlugs = checklists.map(c => c.slug)

  return {
    name: 'get_workflow',
    title: 'Get Audit Workflow',
    description: `Returns the ordered steps of a curated audit workflow, including rule slugs, priorities, and categories. Use it when the user requests a structured audit such as a pre-launch checklist. Available workflows: ${availableSlugs.join(', ')}.`,
    annotations: READ_ONLY_TOOL_ANNOTATIONS,
    inputSchema: {
      type: 'object' as const,
      properties: {
        slug: {
          type: 'string',
          enum: availableSlugs,
          description: `The checklist workflow slug. Available: ${availableSlugs.map(s => `'${s}'`).join(', ')}`
        }
      },
      required: ['slug']
    },
    outputSchema: {
      type: 'object' as const,
      properties: {
        slug: STRING_SCHEMA,
        title: STRING_SCHEMA,
        description: STRING_SCHEMA,
        icon: STRING_SCHEMA,
        estimatedTime: STRING_SCHEMA,
        difficulty: STRING_SCHEMA,
        totalRules: NUMBER_SCHEMA,
        criticalCount: NUMBER_SCHEMA,
        highCount: NUMBER_SCHEMA,
        steps: {
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
              order: NUMBER_SCHEMA,
              category: STRING_SCHEMA
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

/**
 * Static tool definition (used when checklists aren't loaded yet)
 */
export const getWorkflowDefinition = {
  name: 'get_workflow',
  title: 'Get Audit Workflow',
  description: `Returns the ordered steps of a curated audit workflow, including rule slugs, priorities, and categories. Use it when the user requests a structured audit such as a pre-launch checklist.`,
  annotations: READ_ONLY_TOOL_ANNOTATIONS,
  inputSchema: {
    type: 'object' as const,
    properties: {
      slug: {
        type: 'string',
        description: 'Workflow (checklist) slug, e.g. "launch-checklist".'
      }
    },
    required: ['slug']
  },
  outputSchema: {
    type: 'object' as const,
    properties: {
      slug: STRING_SCHEMA,
      title: STRING_SCHEMA,
      description: STRING_SCHEMA,
      icon: STRING_SCHEMA,
      estimatedTime: STRING_SCHEMA,
      difficulty: STRING_SCHEMA,
      totalRules: NUMBER_SCHEMA,
      criticalCount: NUMBER_SCHEMA,
      highCount: NUMBER_SCHEMA,
      steps: {
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
            order: NUMBER_SCHEMA,
            category: STRING_SCHEMA
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
 * Execute get_workflow tool
 */
export function executeGetWorkflow(
  input: GetWorkflowInput,
  rules: Rule[],
  checklists: CuratedChecklist[]
): GetWorkflowOutput {
  const { slug } = input

  // Find the checklist by slug
  const checklist = checklists.find(c => c.slug === slug)

  if (!checklist) {
    return {
      success: false,
      error: {
        message: `Unknown workflow: '${slug}'`,
        availableWorkflows: checklists.map(c => ({
          slug: c.slug,
          title: c.title
        }))
      }
    }
  }

  // Build workflow steps from the checklist's rule references
  const steps: WorkflowStep[] = []

  for (let i = 0; i < checklist.rules.length; i++) {
    const ruleRef = checklist.rules[i]
    // Rule refs are in format "category/slug" (e.g., "accessibility/keyboard-navigation")
    const [category, ruleSlug] = ruleRef.includes('/') ? ruleRef.split('/') : ['', ruleRef]

    // Find the matching rule
    const rule = rules.find(r => r.slug === ruleSlug)

    if (rule) {
      steps.push({
        slug: rule.slug,
        title: rule.title,
        priority: rule.priority,
        order: i + 1,
        category: rule.primaryCategory || category
      })
    }
  }

  // Count by priority
  const criticalCount = steps.filter(s => s.priority === 'critical').length
  const highCount = steps.filter(s => s.priority === 'high').length

  const workflow: Workflow = {
    slug: checklist.slug,
    title: checklist.title,
    description: checklist.description,
    icon: checklist.icon,
    estimatedTime: checklist.estimatedTime,
    difficulty: checklist.difficulty,
    steps,
    totalRules: steps.length,
    criticalCount,
    highCount
  }

  return {
    success: true,
    workflow
  }
}
