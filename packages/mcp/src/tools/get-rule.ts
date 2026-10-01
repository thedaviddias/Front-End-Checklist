import type { Rule } from '@repo/types'
import type { ErrorWithSuggestions, RelatedRule, RuleResponse } from '../types'
import { findSimilarRules } from '../utils/fuzzy-match'
import { mdxToMarkdown } from '../utils/mdx-to-markdown'
import {
  CATEGORY_ARRAY_SCHEMA,
  ERROR_WITH_SUGGESTIONS_SCHEMA,
  NUMBER_SCHEMA,
  READ_ONLY_TOOL_ANNOTATIONS,
  RULE_PROMPTS_SCHEMA,
  RULE_SLUG_DESCRIPTION,
  STRING_SCHEMA
} from './metadata'

/**
 * Check whether a value is a valid rule subcategory.
 * @param value - Candidate subcategory value.
 * @returns True when the value can be exposed in the MCP response.
 */
function isRuleSubcategory(value: unknown): value is RuleResponse['subcategory'] {
  return typeof value === 'string'
}

/**
 * Rule relationships map - connects related best practices
 * Each key maps to an array of [slug, reason] pairs
 */
const RULE_RELATIONSHIPS: Record<string, Array<[string, string]>> = {
  // Accessibility - Images
  'alt-text': [
    ['decorative-elements', 'Handle decorative images appropriately'],
    ['responsive-images', 'Ensure alt text works with responsive images'],
    ['text-in-images', 'Avoid text that requires alt text']
  ],
  'decorative-elements': [
    ['alt-text', 'Understanding when alt text is needed'],
    ['aria-labels', 'Alternative labeling approaches']
  ],

  // Accessibility - Focus & Navigation
  'focus-styles': [
    ['keyboard-navigation', 'Focus visibility enables keyboard use'],
    ['focus-order', 'Focus order affects navigation flow'],
    ['skip-navigation', 'Skip links need visible focus states']
  ],
  'keyboard-navigation': [
    ['focus-styles', 'Users need to see where focus is'],
    ['focus-order', 'Tab order should be logical'],
    ['skip-navigation', 'Skip links aid keyboard users']
  ],
  'skip-navigation': [
    ['keyboard-navigation', 'Skip links are keyboard-first'],
    ['navigation-landmark', 'Landmarks complement skip links']
  ],

  // Accessibility - Color & Contrast
  'color-contrast': [
    ['dark-mode-css', 'Maintain contrast in dark mode'],
    ['focus-styles', 'Focus indicators need contrast'],
    ['text-resizing', 'Text must remain readable when resized']
  ],
  'dark-mode-css': [
    ['color-contrast', 'Contrast requirements apply in dark mode'],
    ['reduced-motion', 'Respect user preferences']
  ],

  // Accessibility - ARIA
  'aria-labels': [
    ['alt-text', 'ARIA provides alternative text for non-images'],
    ['aria-live-regions', 'Dynamic content announcements']
  ],
  'aria-live-regions': [
    ['aria-labels', 'Related ARIA concepts'],
    ['accessible-notifications', 'Notifications use live regions']
  ],

  // HTML Structure
  'html5-semantic-elements': [
    ['heading-hierarchy', 'Headings are semantic elements'],
    ['navigation-landmark', 'Landmarks use semantic elements'],
    ['doctype', 'HTML5 doctype enables semantic elements']
  ],
  'heading-hierarchy': [
    ['html5-semantic-elements', 'Headings within semantic structure'],
    ['skip-navigation', 'Headings aid navigation']
  ],

  // SEO
  'meta-description': [
    ['meta-title', 'Title and description work together'],
    ['og-tags', 'Social sharing uses similar metadata'],
    ['structured-data', 'Rich metadata for search engines']
  ],
  'meta-title': [
    ['meta-description', 'Title and description appear in SERPs'],
    ['og-tags', 'og:title for social sharing']
  ],
  'structured-data': [
    ['meta-description', 'Additional search metadata'],
    ['og-tags', 'Both enhance search presence'],
    ['breadcrumb-navigation', 'Breadcrumbs can be structured data']
  ],
  'canonical-url': [
    ['hreflang', 'Both prevent duplicate content issues'],
    ['sitemap', 'Sitemaps help with URL discovery']
  ],
  'robots-meta': [
    ['robots-txt', 'Both control search engine behavior'],
    ['canonical-url', 'Use together for SEO control']
  ],

  // Performance - Loading
  'lazy-loading': [
    ['critical-images', 'Above-fold images should not lazy load'],
    ['largest-contentful-paint', 'LCP images need priority loading'],
    ['resource-hints', 'Preload critical resources instead']
  ],
  'resource-hints': [
    ['lazy-loading', 'Preload vs lazy loading strategy'],
    ['critical-images', 'Preload LCP images'],
    ['third-party-scripts', 'Preconnect to third-party origins']
  ],
  'third-party-scripts': [
    ['defer-async', 'Scripts should not block rendering'],
    ['resource-hints', 'Preconnect reduces latency'],
    ['content-security-policy', 'CSP controls allowed scripts']
  ],

  // Performance - Core Web Vitals
  'largest-contentful-paint': [
    ['critical-images', 'LCP often involves hero images'],
    ['lazy-loading', 'Do not lazy load LCP elements'],
    ['image-optimization', 'Image optimization improves LCP']
  ],
  'cumulative-layout-shift': [
    ['dimensions', 'Image dimensions prevent CLS'],
    ['webfont-format', 'Font loading can cause CLS'],
    ['dimensions', 'Explicit dimensions prevent shift']
  ],
  'first-contentful-paint': [
    ['css-critical', 'Critical CSS improves FCP'],
    ['defer-async', 'Non-blocking JS helps FCP']
  ],

  // Images
  'responsive-images': [
    ['dimensions', 'Dimensions for responsive images'],
    ['webp-format', 'Modern formats for responsive images'],
    ['lazy-loading', 'Combine with lazy loading']
  ],
  'webp-format': [
    ['avif-format', 'AVIF as next-gen alternative'],
    ['image-optimization', 'Part of image optimization'],
    ['responsive-images', 'Use with picture element']
  ],
  'image-optimization': [
    ['webp-format', 'Modern formats for smaller files'],
    ['lazy-loading', 'Lazy load optimized images'],
    ['image-compression', 'Compression reduces file size']
  ],

  // JavaScript
  'error-handling': [
    ['memory-leaks', 'Both prevent memory issues'],
    ['javascript-linter', 'Linting catches error handling gaps']
  ],
  'memory-leaks': [
    ['error-handling', 'Handle errors in cleanup'],
    ['defer-async', 'Clean code loads efficiently']
  ],

  // Security
  https: [
    ['content-security-policy', 'Both are security fundamentals'],
    ['new-tab', 'Security for external links']
  ],
  'content-security-policy': [
    ['https', 'CSP works with HTTPS'],
    ['third-party-scripts', 'CSP controls script sources']
  ],
  'new-tab': [
    ['https', 'Security best practices'],
    ['link-text', 'Links should be safe and clear']
  ]
}

export interface GetRuleInput {
  slug: string
  includeUrl?: boolean
}

export interface GetRuleResult {
  success: true
  rule: RuleResponse
}

export interface GetRuleError {
  success: false
  error: ErrorWithSuggestions
}

export type GetRuleOutput = GetRuleResult | GetRuleError

/**
 * Read an optional string property from a rule-like object.
 * @param rule - Rule object to inspect.
 * @param key - Property name to read.
 */
function getOptionalStringProp(rule: Rule, key: string): string | undefined {
  const value = Reflect.get(rule, key)
  return typeof value === 'string' ? value : undefined
}

/**
 * Read an optional numeric property from a rule-like object.
 * @param rule - Rule object to inspect.
 * @param key - Property name to read.
 */
function getOptionalNumberProp(rule: Rule, key: string): number | undefined {
  const value = Reflect.get(rule, key)
  return typeof value === 'number' ? value : undefined
}

/**
 * Normalize arbitrary metadata into a supported rule difficulty value.
 * @param value - Candidate difficulty value.
 */
function toRuleDifficulty(value: unknown): RuleResponse['difficulty'] | undefined {
  if (value === 'beginner' || value === 'intermediate' || value === 'advanced') {
    return value
  }
  return undefined
}

/**
 * Tool definition for get_rule
 */
export const getRuleDefinition = {
  name: 'get_rule',
  title: 'Get Rule Guidance',
  description: `Returns everything about one rule: what it requires, why it matters, how to check and fix it, code examples, sources, and related rules. Use it when you know the rule slug (from search_rules, review_code, or the user) and need its complete guidance. Unknown slugs return similar suggestions. If the user only wants fix steps use fix_rule; if they only ask why it matters use explain_rule.`,
  annotations: READ_ONLY_TOOL_ANNOTATIONS,
  inputSchema: {
    type: 'object' as const,
    properties: {
      slug: {
        type: 'string',
        description: RULE_SLUG_DESCRIPTION
      },
      includeUrl: {
        type: 'boolean',
        description: "Include the rule's web URL in response (default: false)"
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
      content: STRING_SCHEMA,
      categories: CATEGORY_ARRAY_SCHEMA,
      primaryCategory: STRING_SCHEMA,
      priority: {
        type: 'string',
        enum: ['critical', 'high', 'medium', 'low']
      },
      prompts: RULE_PROMPTS_SCHEMA,
      aiContext: STRING_SCHEMA,
      url: STRING_SCHEMA,
      difficulty: STRING_SCHEMA,
      estimatedTime: NUMBER_SCHEMA,
      subcategory: STRING_SCHEMA,
      relatedRules: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            slug: STRING_SCHEMA,
            title: STRING_SCHEMA,
            reason: STRING_SCHEMA
          }
        }
      },
      sources: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            id: STRING_SCHEMA,
            title: STRING_SCHEMA,
            url: STRING_SCHEMA,
            type: STRING_SCHEMA,
            role: STRING_SCHEMA,
            authority: STRING_SCHEMA
          }
        }
      },
      sourceSummary: {
        type: 'object',
        properties: {
          sourceCount: NUMBER_SCHEMA,
          primarySourceCount: NUMBER_SCHEMA,
          sourceRoleCount: NUMBER_SCHEMA
        }
      },
      message: STRING_SCHEMA,
      suggestions: ERROR_WITH_SUGGESTIONS_SCHEMA.properties.suggestions
    }
  }
}

/**
 * Get related rules for a given rule
 * Prioritizes frontmatter-defined relationships, falls back to static map
 */
function getRelatedRules(rule: Rule, allRules: Rule[]): RelatedRule[] {
  // First, check if the rule has frontmatter-defined related rules
  if (rule.relatedRules && rule.relatedRules.length > 0) {
    const relatedRules: RelatedRule[] = []
    for (const ref of rule.relatedRules) {
      const relatedRule = allRules.find(r => r.slug === ref.slug)
      if (relatedRule) {
        relatedRules.push({
          slug: ref.slug,
          title: relatedRule.title,
          reason: ref.reason
        })
      }
    }
    return relatedRules
  }

  // Fallback to static relationships map (for rules not yet updated)
  const relationships = RULE_RELATIONSHIPS[rule.slug]
  if (!relationships) {
    return []
  }

  const relatedRules: RelatedRule[] = []
  for (const [relatedSlug, reason] of relationships) {
    const relatedRule = allRules.find(r => r.slug === relatedSlug)
    if (relatedRule) {
      relatedRules.push({
        slug: relatedSlug,
        title: relatedRule.title,
        reason
      })
    }
  }

  return relatedRules
}

/**
 * Execute get_rule tool
 */
export function executeGetRule(input: GetRuleInput, rules: Rule[]): GetRuleOutput {
  const { slug, includeUrl = false } = input

  // Find rule by slug
  const rule = rules.find(r => r.slug === slug)

  if (!rule) {
    // Find similar rules for suggestions
    const suggestions = findSimilarRules(
      slug,
      rules.map(r => ({ slug: r.slug, title: r.title }))
    )

    return {
      success: false,
      error: {
        error: null,
        result: null,
        suggestions,
        message: `Rule '${slug}' not found.${suggestions.length > 0 ? ' Did you mean one of these?' : ''}`
      }
    }
  }

  // Transform content from MDX to Markdown
  const markdownContent = mdxToMarkdown(rule.content)

  // Build response
  const response: RuleResponse = {
    slug: rule.slug,
    title: rule.title,
    description: `${rule.content.slice(0, 200).replace(/\n/g, ' ').trim()}...`,
    priority: rule.priority,
    categories: rule.categories,
    primaryCategory: rule.primaryCategory,
    content: markdownContent,
    prompts: rule.prompts || {
      check: '',
      fix: '',
      explain: '',
      codeReview: undefined
    }
  }

  // Add optional URL
  if (includeUrl && rule.url) {
    response.url = rule.url
  }

  // Surface aiContext if present for automated review contexts.
  const aiContext = getOptionalStringProp(rule, 'aiContext')
  if (aiContext) {
    response.aiContext = aiContext
  }

  // Add optional fields if present (don't default)
  // Note: These fields may not exist on all rules
  const difficulty = toRuleDifficulty(Reflect.get(rule, 'difficulty'))
  const estimatedTime = getOptionalNumberProp(rule, 'estimatedTime')
  const subcategory = Reflect.get(rule, 'subcategory')

  if (difficulty) {
    response.difficulty = difficulty
  }
  if (estimatedTime) {
    response.estimatedTime = estimatedTime
  }
  if (isRuleSubcategory(subcategory)) {
    response.subcategory = subcategory
  }
  if (rule.sources && rule.sources.length > 0) {
    response.sources = rule.sources
  }
  if (rule.sourceSummary) {
    response.sourceSummary = rule.sourceSummary
  }

  // Add related rules (from frontmatter or fallback to static map)
  const relatedRules = getRelatedRules(rule, rules)
  if (relatedRules.length > 0) {
    response.relatedRules = relatedRules
  }

  return {
    success: true,
    rule: response
  }
}
