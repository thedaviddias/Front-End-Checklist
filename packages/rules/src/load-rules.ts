import * as fs from 'node:fs'
import * as path from 'node:path'
import { fileURLToPath } from 'node:url'
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

/**
 * Extract a simple YAML field from frontmatter without a full parser.
 *
 * @param yaml - Raw frontmatter text.
 * @param field - Field name to extract.
 * @returns Field value when present, otherwise null.
 */
function extractYamlField(yaml: string, field: string): string | null {
  const singleLineMatch = yaml.match(new RegExp(`${field}:\\s*["']?([^"'\\n]+)["']?`))
  if (singleLineMatch) {
    return singleLineMatch[1].trim()
  }

  const multiLineMatch = yaml.match(new RegExp(`${field}:\\s*[|>]\\s*\\n((?:\\s{2,}.*\\n?)+)`))
  if (multiLineMatch) {
    return multiLineMatch[1]
      .split('\n')
      .map(line => line.trim())
      .filter(Boolean)
      .join(' ')
      .trim()
  }

  return null
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

/**
 * Normalize a YAML array item or inline scalar into a clean value.
 *
 * @param value - Raw YAML value.
 * @returns Trimmed value without wrapping quotes.
 */
function normalizeYamlListValue(value: string): string {
  return value
    .trim()
    .replace(/^['"]|['"]$/g, '')
    .toLowerCase()
}

/**
 * Parse a categories field from inline or block-style YAML.
 *
 * @param frontmatter - Raw YAML frontmatter text.
 * @returns Supported categories in declared order.
 */
function parseCategories(frontmatter: string): FrontendChecklistCategory[] {
  const inlineMatch = frontmatter.match(/categories:\s*\[(.*?)\]/s)
  if (inlineMatch) {
    return inlineMatch[1].split(',').map(normalizeYamlListValue).filter(isRuleCategory)
  }

  const blockMatch = frontmatter.match(/^categories:\s*\n((?:\s+- .+\n?)+)/m)
  if (!blockMatch) {
    return []
  }

  return blockMatch[1]
    .split('\n')
    .map(line => line.replace(/^\s+-\s*/, ''))
    .map(normalizeYamlListValue)
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
 * Parse AI prompt strings from raw frontmatter.
 *
 * @param frontmatter - Raw YAML frontmatter text.
 * @returns Prompt object when prompt fields exist.
 */
function parsePrompts(frontmatter: string): FrontendChecklistRulePrompts | undefined {
  const promptsMatch = frontmatter.match(/prompts:\s*\n([\s\S]*?)(?=\n[a-zA-Z]|$)/)
  if (!promptsMatch) {
    return undefined
  }

  const promptsBlock = promptsMatch[1]
  const check = extractYamlField(promptsBlock, 'check') || ''
  const fix = extractYamlField(promptsBlock, 'fix') || ''
  const explain = extractYamlField(promptsBlock, 'explain') || ''
  const codeReview = extractYamlField(promptsBlock, 'codeReview') || undefined

  if (!check && !fix && !explain && !codeReview) {
    return undefined
  }

  return {
    check,
    fix,
    explain,
    ...(codeReview ? { codeReview } : {})
  }
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

      const frontmatter = frontmatterMatch[1]
      const body = content.slice(frontmatterMatch[0].length).trim()
      const slug = file.replace('.mdx', '')
      const title = extractYamlField(frontmatter, 'title') || slug
      const priorityField = extractYamlField(frontmatter, 'priority')
      const priority = priorityField && isRulePriority(priorityField) ? priorityField : 'medium'
      const subcategoryField = extractYamlField(frontmatter, 'subcategory')
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
