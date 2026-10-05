import type { Category, Rule } from '@repo/types'
import { NUMBER_SCHEMA, READ_ONLY_TOOL_ANNOTATIONS, STRING_SCHEMA } from './metadata'

export type PriorityFilter = 'all' | 'critical' | 'critical+high' | 'critical+high+medium'

export interface QuickReferenceItem {
  slug: string
  title: string
  priority: 'critical' | 'high' | 'medium' | 'low'
  checkPrompt: string
}

export interface QuickReference {
  category: string
  displayName: string
  priorityFilter: PriorityFilter
  items: QuickReferenceItem[]
  totalCount: number
  markdown: string
}

export interface GetQuickReferenceInput {
  category: string
  priorityFilter?: PriorityFilter
  format?: 'json' | 'markdown' | 'checklist'
}

export interface GetQuickReferenceResult {
  success: true
  reference: QuickReference
}

export interface GetQuickReferenceError {
  success: false
  error: {
    message: string
    availableCategories?: string[]
  }
}

export type GetQuickReferenceOutput = GetQuickReferenceResult | GetQuickReferenceError

/**
 * Category display names
 */
const CATEGORY_DISPLAY_NAMES: Record<Category, string> = {
  html: 'HTML',
  css: 'CSS',
  javascript: 'JavaScript',
  performance: 'Performance',
  accessibility: 'Accessibility',
  seo: 'SEO',
  security: 'Security',
  images: 'Images',
  testing: 'Testing',
  privacy: 'Privacy',
  pwa: 'PWA',
  i18n: 'Internationalization'
}

function isCategory(value: string): value is Category {
  return value in CATEGORY_DISPLAY_NAMES
}

/**
 * Priority emoji for markdown output
 */
const PRIORITY_EMOJI: Record<string, string> = {
  critical: '🔴',
  high: '🟠',
  medium: '🟡',
  low: '🟢'
}

/**
 * Tool definition for get_quick_reference
 */
export const getQuickReferenceDefinition = {
  name: 'get_quick_reference',
  title: 'Get Quick Reference',
  description: `Returns a compact checklist for one frontend category, filtered by priority and formatted as JSON, Markdown, or a task list. Use it when the user requests a concise checklist for a deployment, review, or team handoff.`,
  annotations: READ_ONLY_TOOL_ANNOTATIONS,
  inputSchema: {
    type: 'object' as const,
    properties: {
      category: {
        type: 'string',
        description:
          "Category name, e.g. 'accessibility', 'performance', or 'seo' (see list_categories)."
      },
      priorityFilter: {
        type: 'string',
        enum: ['all', 'critical', 'critical+high', 'critical+high+medium'],
        description:
          "Filter by priority level (default: 'critical+high'). Use 'all' for comprehensive lists, 'critical' for essentials only."
      },
      format: {
        type: 'string',
        enum: ['json', 'markdown', 'checklist'],
        description:
          "Output format (default: 'json'). Use 'markdown' for readable docs, 'checklist' for copy-paste task lists."
      }
    },
    required: ['category']
  },
  outputSchema: {
    type: 'object' as const,
    properties: {
      category: STRING_SCHEMA,
      displayName: STRING_SCHEMA,
      priorityFilter: STRING_SCHEMA,
      items: {
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
            checkPrompt: STRING_SCHEMA
          }
        }
      },
      totalCount: NUMBER_SCHEMA,
      markdown: STRING_SCHEMA,
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
 * Check if a priority matches the filter
 */
function matchesPriorityFilter(
  priority: 'critical' | 'high' | 'medium' | 'low',
  filter: PriorityFilter
): boolean {
  switch (filter) {
    case 'all':
      return true
    case 'critical':
      return priority === 'critical'
    case 'critical+high':
      return priority === 'critical' || priority === 'high'
    case 'critical+high+medium':
      return priority !== 'low'
    default:
      return true
  }
}

/**
 * Generate markdown format output
 */
function generateMarkdown(
  displayName: string,
  items: QuickReferenceItem[],
  filter: PriorityFilter
): string {
  const filterLabel =
    filter === 'all'
      ? 'All Priorities'
      : filter === 'critical'
        ? 'Critical Only'
        : filter === 'critical+high'
          ? 'Critical + High'
          : 'Critical + High + Medium'

  let md = `## ${displayName} Quick Reference (${filterLabel})\n\n`

  if (items.length === 0) {
    md += '_No rules match the selected priority filter._\n'
    return md
  }

  // Group by priority
  const critical = items.filter(i => i.priority === 'critical')
  const high = items.filter(i => i.priority === 'high')
  const medium = items.filter(i => i.priority === 'medium')
  const low = items.filter(i => i.priority === 'low')

  if (critical.length > 0) {
    md += `### ${PRIORITY_EMOJI.critical} Critical\n`
    critical.forEach(item => {
      md += `- **${item.title}** (\`${item.slug}\`)\n`
    })
    md += '\n'
  }

  if (high.length > 0) {
    md += `### ${PRIORITY_EMOJI.high} High\n`
    high.forEach(item => {
      md += `- **${item.title}** (\`${item.slug}\`)\n`
    })
    md += '\n'
  }

  if (medium.length > 0) {
    md += `### ${PRIORITY_EMOJI.medium} Medium\n`
    medium.forEach(item => {
      md += `- **${item.title}** (\`${item.slug}\`)\n`
    })
    md += '\n'
  }

  if (low.length > 0) {
    md += `### ${PRIORITY_EMOJI.low} Low\n`
    low.forEach(item => {
      md += `- **${item.title}** (\`${item.slug}\`)\n`
    })
    md += '\n'
  }

  return md
}

/**
 * Generate checklist format output
 */
function generateChecklist(
  displayName: string,
  items: QuickReferenceItem[],
  filter: PriorityFilter
): string {
  const filterLabel =
    filter === 'all'
      ? 'All'
      : filter === 'critical'
        ? 'Critical'
        : filter === 'critical+high'
          ? 'Critical+High'
          : 'Critical+High+Medium'

  let md = `# ${displayName} Checklist (${filterLabel})\n\n`

  if (items.length === 0) {
    md += '_No items to check._\n'
    return md
  }

  items.forEach(item => {
    md += `- [ ] ${item.title}\n`
  })

  return md
}

/**
 * Execute get_quick_reference tool
 */
export function executeGetQuickReference(
  input: GetQuickReferenceInput,
  rules: Rule[]
): GetQuickReferenceOutput {
  const { category, priorityFilter = 'critical+high', format = 'json' } = input

  // Normalize category
  const normalizedCategory = category.toLowerCase().trim()

  // Get available categories
  const availableCategories = [
    ...new Set(rules.flatMap(r => r.categories.map(c => c.toLowerCase())))
  ]

  // Find rules in this category
  const categoryRules = rules.filter(r =>
    r.categories.some(c => c.toLowerCase() === normalizedCategory)
  )

  if (categoryRules.length === 0) {
    return {
      success: false,
      error: {
        message: `No rules found for category '${category}'`,
        availableCategories
      }
    }
  }

  // Filter by priority and build items
  const items: QuickReferenceItem[] = categoryRules
    .filter(r => matchesPriorityFilter(r.priority, priorityFilter))
    .map(r => ({
      slug: r.slug,
      title: r.title,
      priority: r.priority,
      checkPrompt: r.prompts?.check || `Check ${r.title}`
    }))
    .sort((a, b) => {
      // Sort by priority (critical first)
      const priorityOrder = { critical: 0, high: 1, medium: 2, low: 3 }
      return priorityOrder[a.priority] - priorityOrder[b.priority]
    })

  const displayName = isCategory(normalizedCategory)
    ? CATEGORY_DISPLAY_NAMES[normalizedCategory]
    : category

  // Generate markdown based on format
  let markdown: string
  if (format === 'checklist') {
    markdown = generateChecklist(displayName, items, priorityFilter)
  } else {
    markdown = generateMarkdown(displayName, items, priorityFilter)
  }

  const reference: QuickReference = {
    category: normalizedCategory,
    displayName,
    priorityFilter,
    items,
    totalCount: items.length,
    markdown
  }

  return {
    success: true,
    reference
  }
}
