import type { Category, Priority, Rule } from '@repo/types'
import type { RuleSummary, SearchResult } from '../types'
import { markdownToPlainText } from '../utils/mdx-to-markdown'
import { paginate } from '../utils/pagination'
import {
  CATEGORY_ARRAY_SCHEMA,
  NUMBER_SCHEMA,
  PRIORITY_SCHEMA,
  READ_ONLY_TOOL_ANNOTATIONS,
  STRING_SCHEMA
} from './metadata'

export interface SearchRulesInput {
  query?: string
  categories?: Category[]
  priorities?: Priority[]
  limit?: number
  cursor?: string
}

/**
 * Tool definition for search_rules
 */
export const searchRulesDefinition = {
  name: 'search_rules',
  title: 'Search Frontend Rules',
  description: `Searches and filters frontend development rules. **Use PROACTIVELY** when working on frontend code to find relevant best practices - search by technology (e.g., "react", "images"), concern (e.g., "accessibility", "performance"), or specific patterns. Returns summary information for each match - use get_rule for full details.

**Workflow:** Use as a discovery tool before diving deeper. Start with list_categories to see available areas, then search_rules to find specific rules, then get_rule for complete details including code examples.`,
  annotations: READ_ONLY_TOOL_ANNOTATIONS,
  inputSchema: {
    type: 'object' as const,
    properties: {
      query: {
        type: 'string',
        description: 'Free-text search query'
      },
      categories: {
        type: 'array',
        items: {
          type: 'string',
          enum: [
            'html',
            'css',
            'javascript',
            'performance',
            'accessibility',
            'seo',
            'security',
            'images',
            'testing',
            'privacy',
            'pwa',
            'i18n'
          ]
        },
        description: 'Filter by categories (array)'
      },
      priorities: {
        type: 'array',
        items: {
          type: 'string',
          enum: ['critical', 'high', 'medium', 'low']
        },
        description: 'Filter by priorities (array)'
      },
      limit: {
        type: 'integer',
        minimum: 1,
        maximum: 100,
        default: 20,
        description: 'Max results to return (default: 20, max: 100)'
      },
      cursor: {
        type: 'string',
        description: 'Pagination cursor from previous response'
      }
    },
    required: []
  },
  outputSchema: {
    type: 'object' as const,
    properties: {
      rules: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            slug: STRING_SCHEMA,
            title: STRING_SCHEMA,
            priority: PRIORITY_SCHEMA,
            categories: CATEGORY_ARRAY_SCHEMA,
            primaryCategory: STRING_SCHEMA
          }
        }
      },
      nextCursor: STRING_SCHEMA,
      totalCount: NUMBER_SCHEMA
    }
  }
}

/**
 * Framework detection patterns for code examples
 * Maps framework names to regex patterns that identify their usage in code
 */
const FRAMEWORK_PATTERNS: Record<string, RegExp[]> = {
  react: [/from ['"]react['"]/, /import React/i, /<Tab value="react"/i],
  nextjs: [/from ['"]next\//, /next\/image/, /<Tab value="nextjs"/i],
  vue: [/from ['"]vue['"]/, /<script setup>/, /<Tab value="vue"/i],
  angular: [/from ['"]@angular\//, /@Component\(/],
  svelte: [/from ['"]svelte['"]/, /\$:/, /<script lang="ts">/],
  playwright: [/@playwright\/test/, /AxeBuilder/, /<Tab value="playwright"/i],
  vitest: [/from ['"]vitest['"]/, /<Tab value="vitest"/i],
  jest: [/from ['"]jest/, /jest-axe/],
  cypress: [/cy\./, /describe.*cy\./],
  tailwind: [/className=["'][^"']*(?:flex|grid|p-\d|m-\d|text-)/],
  shopify: [/\.liquid/, /{% for/, /<Tab value="shopify"/i],
  wordpress: [/add_action\(/, /add_filter\(/, /<Tab value="wordpress"/i],
  astro: [/from ['"]astro/, /---\s*import/],
  remix: [/from ['"]@remix-run/],
  nuxt: [/from ['"]#/, /useNuxtApp/]
}

interface SearchableRuleData {
  frameworkTags: string[]
  lowerTitle: string
  lowerCategories: string[]
  lowerPriority: string
  lowerPrompts: string
  plainContent: string
}

const SEARCHABLE_RULE_CACHE = new WeakMap<Rule, SearchableRuleData>()

/**
 * Extract framework tags from rule content
 * Detects frameworks/libraries used in code examples
 */
function extractFrameworkTags(rule: Rule): string[] {
  const tags = new Set<string>()
  const content = rule.content

  for (const [framework, patterns] of Object.entries(FRAMEWORK_PATTERNS)) {
    if (patterns.some(pattern => pattern.test(content))) {
      tags.add(framework)
    }
  }

  return Array.from(tags)
}

/**
 * Build and memoize lowercase/search-friendly data for a rule.
 */
function getSearchableRuleData(rule: Rule): SearchableRuleData {
  const cached = SEARCHABLE_RULE_CACHE.get(rule)
  if (cached) {
    return cached
  }

  const data: SearchableRuleData = {
    frameworkTags: extractFrameworkTags(rule),
    lowerTitle: rule.title.toLowerCase(),
    lowerCategories: rule.categories.map(category => category.toLowerCase()),
    lowerPriority: rule.priority.toLowerCase(),
    lowerPrompts: rule.prompts
      ? `${rule.prompts.check} ${rule.prompts.fix} ${rule.prompts.explain}`.toLowerCase()
      : '',
    plainContent: markdownToPlainText(rule.content).toLowerCase()
  }

  SEARCHABLE_RULE_CACHE.set(rule, data)
  return data
}

/**
 * Calculate search score for a rule
 * Tokenizes multi-word queries and scores each word match separately
 */
function calculateSearchScore(rule: Rule, query: string): number {
  const queryWords = query
    .toLowerCase()
    .split(/\s+/)
    .filter(w => w.length > 0)
  let score = 0

  const { frameworkTags, lowerTitle, lowerCategories, lowerPriority, lowerPrompts, plainContent } =
    getSearchableRuleData(rule)

  for (const word of queryWords) {
    // Title match (10 points per word, +5 if title starts with word)
    if (lowerTitle.includes(word)) {
      score += 10
      if (lowerTitle.startsWith(word)) {
        score += 5
      }
    }

    // Framework tag match (8 points - high priority for technology searches)
    if (frameworkTags.some(tag => tag.includes(word) || word.includes(tag))) {
      score += 8
    }

    // Category match (5 points per word)
    for (const cat of lowerCategories) {
      if (cat.includes(word)) {
        score += 5
        break
      }
    }

    // Priority match (3 points)
    if (lowerPriority.includes(word)) {
      score += 3
    }

    // Prompt match (2 points)
    if (lowerPrompts.includes(word)) {
      score += 2
    }

    // Content match (3 points - boosted for better discoverability)
    if (plainContent.includes(word)) {
      score += 3
    }
  }

  return score
}

/**
 * Convert Rule to RuleSummary
 */
function toSummary(rule: Rule): RuleSummary {
  return {
    slug: rule.slug,
    title: rule.title,
    priority: rule.priority,
    categories: rule.categories,
    primaryCategory: rule.primaryCategory
  }
}

/**
 * Execute search_rules tool
 */
export function executeSearchRules(input: SearchRulesInput, rules: Rule[]): SearchResult {
  const { query, categories, priorities, limit = 20, cursor } = input

  let filteredRules = [...rules]

  // Filter by categories
  if (categories && categories.length > 0) {
    filteredRules = filteredRules.filter(rule =>
      rule.categories.some(cat => categories.includes(cat))
    )
  }

  // Filter by priorities
  if (priorities && priorities.length > 0) {
    filteredRules = filteredRules.filter(rule => priorities.includes(rule.priority))
  }

  // Search and score if query provided
  if (query?.trim()) {
    const scoredRules = filteredRules
      .map(rule => ({
        rule,
        score: calculateSearchScore(rule, query.trim())
      }))
      .filter(item => item.score > 0)
      .sort((a, b) => b.score - a.score)

    filteredRules = scoredRules.map(item => item.rule)
  }

  // Paginate results
  const { items, nextCursor, totalCount } = paginate(filteredRules, {
    limit,
    cursor,
    maxLimit: 100
  })

  return {
    rules: items.map(toSummary),
    nextCursor,
    totalCount
  }
}
