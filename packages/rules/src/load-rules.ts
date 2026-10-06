import * as fs from 'node:fs'
import * as path from 'node:path'
import { fileURLToPath } from 'node:url'
import { parse } from 'yaml'
import type {
  FrontendChecklistCategory,
  FrontendChecklistPriority,
  FrontendChecklistRule,
  FrontendChecklistRulePrompts,
  FrontendChecklistSubcategory
} from './types.js'
import { RULE_CATEGORIES, RULE_SUBCATEGORIES } from './types.js'

const CURRENT_DIR = path.dirname(fileURLToPath(import.meta.url))
const PACKAGE_RULES_DIR = path.resolve(CURRENT_DIR, '../rules/en')
const MONOREPO_RULES_DIR = path.resolve(CURRENT_DIR, '../../content/rules/en')

/** Narrow YAML mappings before reading authored metadata. */
function isMapping(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

/** Read only strings; YAML collections and booleans are not prompt text. */
function stringField(mapping: Record<string, unknown>, key: string): string | undefined {
  const value = mapping[key]
  return typeof value === 'string' ? value : undefined
}

/**
 * Check whether a string is a valid rule priority.
 *
 * @param value - Priority candidate.
 * @returns True when the priority is supported.
 */
function isRulePriority(value: string): value is FrontendChecklistPriority {
  return value === 'critical' || value === 'high' || value === 'medium' || value === 'low'
}

/**
 * Check whether a string is a valid rule category.
 *
 * @param value - Category candidate.
 * @returns True when the category is supported.
 */
function isRuleCategory(value: string): value is FrontendChecklistCategory {
  return RULE_CATEGORIES.some(category => category === value)
}

/**
 * Check whether a string is a valid rule subcategory.
 *
 * @param value - Subcategory candidate.
 * @returns True when the subcategory is supported.
 */
function isRuleSubcategory(value: string): value is FrontendChecklistSubcategory {
  return RULE_SUBCATEGORIES.some(subcategory => subcategory === value)
}

/** Read categories from parsed inline or block YAML arrays. */
function parseCategories(frontmatter: Record<string, unknown>): FrontendChecklistCategory[] {
  const values: unknown = frontmatter.categories
  if (!Array.isArray(values)) return []
  return values
    .filter((value): value is string => typeof value === 'string')
    .map(value => value.trim().toLowerCase())
    .filter(isRuleCategory)
}

/**
 * Resolve the default rule directory for the current execution environment.
 *
 * Inside the monorepo the canonical `packages/content/rules` tree wins: the
 * packaged `rules/` copy is only refreshed by `sync:rules` at pack time, so a
 * leftover copy would otherwise serve stale rules. Published installs have no
 * monorepo tree and use the packaged copy.
 *
 * @returns Filesystem path containing the MDX rules.
 */
function resolveDefaultRulesDir(): string {
  if (fs.existsSync(MONOREPO_RULES_DIR)) {
    return MONOREPO_RULES_DIR
  }

  return PACKAGE_RULES_DIR
}

/**
 * Read AI prompt strings from parsed YAML, preserving folding and chomping semantics.
 *
 * @param frontmatter - Parsed YAML metadata.
 * @returns Prompt object when prompt fields exist.
 */
function parsePrompts(
  frontmatter: Record<string, unknown>
): FrontendChecklistRulePrompts | undefined {
  const prompts = frontmatter.prompts
  if (!isMapping(prompts)) return undefined
  const check = stringField(prompts, 'check') ?? ''
  const fix = stringField(prompts, 'fix') ?? ''
  const explain = stringField(prompts, 'explain') ?? ''
  const codeReview = stringField(prompts, 'codeReview')
  if (!check && !fix && !explain && !codeReview) return undefined
  return { check, fix, explain, ...(codeReview ? { codeReview } : {}) }
}

/**
 * Load rule records from the package or monorepo content tree.
 *
 * @param rulesDir - Optional override for the rules directory.
 * @returns Normalized rule records for the rules package.
 */
export function loadRules(rulesDir: string = resolveDefaultRulesDir()): FrontendChecklistRule[] {
  if (!fs.existsSync(rulesDir)) {
    return []
  }

  const rules: FrontendChecklistRule[] = []
  const categories = fs.readdirSync(rulesDir)

  for (const category of categories) {
    const categoryPath = path.join(rulesDir, category)
    if (!fs.statSync(categoryPath).isDirectory()) continue

    const files = fs.readdirSync(categoryPath).filter(file => file.endsWith('.mdx'))

    for (const file of files) {
      const filePath = path.join(categoryPath, file)
      const content = fs.readFileSync(filePath, 'utf-8')
      const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/)

      if (!frontmatterMatch) continue

      const parsed: unknown = parse(frontmatterMatch[1])
      if (!isMapping(parsed)) throw new Error(`Invalid YAML mapping in ${filePath}`)
      const frontmatter = parsed
      const body = content.slice(frontmatterMatch[0].length).trim()
      const slug = file.replace('.mdx', '')
      const title = stringField(frontmatter, 'title') || slug
      const priorityField = stringField(frontmatter, 'priority')
      const priority = priorityField && isRulePriority(priorityField) ? priorityField : 'medium'
      const subcategoryField = stringField(frontmatter, 'subcategory')
      const subcategory =
        subcategoryField && isRuleSubcategory(subcategoryField) ? subcategoryField : undefined
      const categoriesArray = parseCategories(frontmatter)
      const prompts = parsePrompts(frontmatter)
      const categoryFallback = category.toLowerCase()
      const primaryCategory = isRuleCategory(categoryFallback)
        ? (categoriesArray[0] ?? categoryFallback)
        : categoriesArray[0]

      if (!primaryCategory) {
        continue
      }

      rules.push({
        title,
        slug,
        categories: categoriesArray.length > 0 ? categoriesArray : [primaryCategory],
        ...(subcategory ? { subcategory } : {}),
        priority,
        ...(prompts ? { prompts } : {}),
        content: body,
        primaryCategory,
        url: `/rules/${primaryCategory}/${slug}`
      })
    }
  }

  return rules
}
