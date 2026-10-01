import type { Category, Rule } from '@repo/types'
import type { CategoryInfo } from '../types'
import { CATEGORY_META } from '../types'
import { NUMBER_SCHEMA, READ_ONLY_TOOL_ANNOTATIONS, STRING_SCHEMA } from './metadata'

/**
 * Tool definition for list_categories
 */
export const listCategoriesDefinition = {
  name: 'list_categories',
  title: 'List Rule Categories',
  description: `Lists every rule category (accessibility, performance, SEO, security, and more) with its rule count. Use it when the user asks what the checklist covers, or when you need valid category names for the filters of search_rules or get_quick_reference.`,
  annotations: READ_ONLY_TOOL_ANNOTATIONS,
  inputSchema: {
    type: 'object' as const,
    properties: {},
    required: []
  },
  outputSchema: {
    type: 'object' as const,
    properties: {
      categories: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            name: STRING_SCHEMA,
            displayName: STRING_SCHEMA,
            description: STRING_SCHEMA,
            ruleCount: NUMBER_SCHEMA,
            icon: STRING_SCHEMA
          }
        }
      }
    }
  }
}

/**
 * Count rules per category
 */
function countRulesByCategory(rules: Rule[]): Map<Category, number> {
  const counts = new Map<Category, number>()

  for (const rule of rules) {
    for (const category of rule.categories) {
      counts.set(category, (counts.get(category) || 0) + 1)
    }
  }

  return counts
}

/**
 * Iterate typed category metadata entries without casting at the callsite.
 */
function getCategoryMetaEntries(): Array<[Category, (typeof CATEGORY_META)[Category]]> {
  return Object.entries(CATEGORY_META).filter(
    (entry): entry is [Category, (typeof CATEGORY_META)[Category]] => {
      const [name] = entry
      return Object.hasOwn(CATEGORY_META, name)
    }
  )
}

/**
 * Execute list_categories tool
 */
export function executeListCategories(rules: Rule[]): { categories: CategoryInfo[] } {
  const counts = countRulesByCategory(rules)

  const categories: CategoryInfo[] = []

  // Build category info for all known categories
  for (const [category, meta] of getCategoryMetaEntries()) {
    const count = counts.get(category) || 0

    // Only include categories that have rules
    if (count > 0) {
      categories.push({
        name: category,
        displayName: meta.displayName,
        description: meta.description,
        ruleCount: count,
        icon: meta.icon
      })
    }
  }

  // Sort by rule count descending
  categories.sort((a, b) => b.ruleCount - a.ruleCount)

  return { categories }
}
