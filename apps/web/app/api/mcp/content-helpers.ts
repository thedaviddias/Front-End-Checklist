import type {
  Category,
  CuratedChecklist,
  RelatedRuleRef,
  Rule,
  RuleSource,
  RuleSourceSummary,
  Subcategory
} from '@repo/types'
import { allChecklists, allRules } from 'content-collections'
import { getRuleRawContent } from '@/lib/rule-content'
import { isChecklistDifficulty } from './route-helpers'

let cachedRulesPromise: Promise<Rule[]> | null = null

/**
 * Check whether a value has the shape of a related-rule reference.
 *
 * @param value - Candidate related-rule record.
 * @returns True when the record is safe to expose through MCP.
 */
export function isRelatedRule(value: {
  slug?: unknown
  reason?: unknown
}): value is RelatedRuleRef {
  return typeof value.slug === 'string' && typeof value.reason === 'string'
}

/**
 * Check whether a value is a complete rule source record.
 *
 * @param value - Candidate source record.
 * @returns True when the value contains the full MCP-safe source shape.
 */
export function isRuleSource(value: Partial<RuleSource> | null | undefined): value is RuleSource {
  return (
    Boolean(value) &&
    typeof value?.id === 'string' &&
    typeof value?.title === 'string' &&
    typeof value?.url === 'string' &&
    typeof value?.type === 'string' &&
    typeof value?.role === 'string' &&
    typeof value?.authority === 'string'
  )
}

/**
 * Check whether a value is a complete rule source-summary record.
 *
 * @param value - Candidate summary record.
 * @returns True when the value contains all expected summary counts.
 */
export function isRuleSourceSummary(
  value: Partial<RuleSourceSummary> | null | undefined
): value is RuleSourceSummary {
  return (
    Boolean(value) &&
    typeof value?.sourceCount === 'number' &&
    typeof value?.primarySourceCount === 'number' &&
    typeof value?.sourceRoleCount === 'number'
  )
}

/**
 * Transform content-collection rules into the package-facing MCP rule shape.
 *
 * @param isCategory - Category validator.
 * @param isSubcategory - Subcategory validator.
 * @returns English rule records with raw markdown content attached.
 */
export async function getRules(
  isCategory: (value: string) => value is Category,
  isSubcategory: (value: string) => value is Subcategory
): Promise<Rule[]> {
  cachedRulesPromise ??= buildRules(isCategory, isSubcategory)

  return cachedRulesPromise
}

/**
 * Build the English rule corpus exposed through MCP.
 *
 * The corpus only changes on deployment, so keeping it in memory avoids repeated raw MDX reads on
 * every MCP request handled by a warm serverless instance.
 */
async function buildRules(
  isCategory: (value: string) => value is Category,
  isSubcategory: (value: string) => value is Subcategory
): Promise<Rule[]> {
  const enRules = allRules.filter(rule => rule.language === 'en')

  return Promise.all(
    enRules.map(async rule => {
      const subcategory =
        typeof rule.subcategory === 'string' && isSubcategory(rule.subcategory)
          ? rule.subcategory
          : undefined
      const content = rule.filePath ? await getRuleRawContent(rule.filePath) : ''

      return {
        title: rule.title,
        slug: rule.slug,
        categories: rule.categories.filter(isCategory),
        priority: rule.priority,
        prompts: rule.prompts,
        content,
        primaryCategory: rule.primaryCategory,
        url: rule.url,
        ...(rule.sources ? { sources: rule.sources.filter(isRuleSource) } : {}),
        ...(isRuleSourceSummary(rule.sourceSummary) ? { sourceSummary: rule.sourceSummary } : {}),
        ...(subcategory ? { subcategory } : {}),
        ...(rule.relatedRules ? { relatedRules: rule.relatedRules.filter(isRelatedRule) } : {})
      }
    })
  )
}

/**
 * Transform content-collection checklists into the shared MCP checklist shape.
 *
 * @returns Curated English checklist records.
 */
export function getChecklists(): CuratedChecklist[] {
  return allChecklists
    .filter(checklist => checklist.language === 'en')
    .map(checklist => ({
      id: checklist.id,
      slug: checklist.slug,
      title: checklist.title,
      description: checklist.description,
      icon: checklist.icon,
      rules: checklist.rules,
      estimatedTime: checklist.estimatedTime,
      ...(isChecklistDifficulty(checklist.difficulty) ? { difficulty: checklist.difficulty } : {}),
      ...(typeof checklist.order === 'number' ? { order: checklist.order } : {}),
      ...(typeof checklist.featured === 'boolean' ? { featured: checklist.featured } : {}),
      language: checklist.language,
      url: checklist.url
    }))
}
