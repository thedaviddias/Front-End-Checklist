import { readdirSync, readlinkSync } from 'node:fs'
import path from 'node:path'
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
import { readRuleRawContent } from '@/lib/rule-content'
import { isChecklistDifficulty } from './route-helpers'

let cachedRulesPromise: Promise<Rule[]> | null = null

/** Generated agent skills served through the MCP Skills extension (traced in next.config.js). */
export const SKILLS_DIR = path.join(process.cwd(), '..', '..', 'skills')

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
  cachedRulesPromise ??= buildRules(isCategory, isSubcategory).catch(error => {
    // Never cache a failure: the next request should retry instead of failing forever.
    cachedRulesPromise = null
    if (error instanceof Error && 'code' in error && error.code === 'EMFILE') {
      console.error('[mcp] EMFILE while loading rules', describeOpenFileDescriptors())
    }
    throw error
  })

  return cachedRulesPromise
}

/**
 * Summarize this process's open file descriptors by target kind (Linux only).
 *
 * @returns Counts per descriptor kind, or a note when `/proc` is unavailable.
 */
function describeOpenFileDescriptors(): Record<string, number> | string {
  try {
    const counts: Record<string, number> = {}
    for (const fd of readdirSync('/proc/self/fd')) {
      let target = 'unknown'
      try {
        target = readlinkSync(`/proc/self/fd/${fd}`)
      } catch {
        // Descriptor closed while listing.
      }
      const kind = target.startsWith('/') ? path.dirname(target) : target.replace(/\[.*$/, '')
      counts[kind] = (counts[kind] ?? 0) + 1
    }
    return counts
  } catch {
    return 'unavailable'
  }
}

/** Raw MDX reads in flight at once, kept well under the function's file-descriptor limit. */
const RULE_READ_CONCURRENCY = 16

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
  const built: Rule[] = []

  for (let start = 0; start < enRules.length; start += RULE_READ_CONCURRENCY) {
    const batch = enRules.slice(start, start + RULE_READ_CONCURRENCY)
    built.push(
      ...(await Promise.all(batch.map(rule => buildRule(rule, isCategory, isSubcategory))))
    )
  }

  return built
}

/**
 * Convert one content-collection rule into the MCP rule shape, reading its raw MDX body.
 *
 * @param rule - Content-collection rule record.
 * @param isCategory - Category validator.
 * @param isSubcategory - Subcategory validator.
 * @returns MCP rule record.
 */
async function buildRule(
  rule: (typeof allRules)[number],
  isCategory: (value: string) => value is Category,
  isSubcategory: (value: string) => value is Subcategory
): Promise<Rule> {
  const subcategory =
    typeof rule.subcategory === 'string' && isSubcategory(rule.subcategory)
      ? rule.subcategory
      : undefined
  const content = rule.filePath ? await readRuleRawContent(rule.filePath) : ''

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
