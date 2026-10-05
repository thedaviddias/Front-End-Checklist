import type { Rule } from '@repo/types'
import type { CheckRuleResponse, ErrorWithSuggestions } from '../types'
import { ruleNotFound } from '../utils/rule-not-found'
import {
  CATEGORY_ARRAY_SCHEMA,
  ERROR_WITH_SUGGESTIONS_SCHEMA,
  READ_ONLY_TOOL_ANNOTATIONS,
  RULE_SLUG_DESCRIPTION,
  STRING_SCHEMA
} from './metadata'

export interface CheckRuleInput {
  slug: string
  code?: string
}

export interface CheckRuleResult {
  success: true
  result: CheckRuleResponse
}

export interface CheckRuleError {
  success: false
  error: ErrorWithSuggestions
}

export type CheckRuleOutput = CheckRuleResult | CheckRuleError

/**
 * Tool definition for check_rule
 */
export const checkRuleDefinition = {
  name: 'check_rule',
  title: 'Check Rule Compliance',
  description: `Checks a code snippet against one named frontend rule using static heuristics and returns findings and verification guidance. Without code, returns manual verification guidance. Use it when the user requests a check of a specific rule or a proposed fix. Results do not establish rendered-state or runtime conformance.`,
  annotations: READ_ONLY_TOOL_ANNOTATIONS,
  inputSchema: {
    type: 'object' as const,
    properties: {
      slug: {
        type: 'string',
        description: RULE_SLUG_DESCRIPTION
      },
      code: {
        type: 'string',
        description: 'Code to test against the rule. Omit to get manual verification steps.'
      }
    },
    required: ['slug']
  },
  outputSchema: {
    type: 'object' as const,
    properties: {
      slug: STRING_SCHEMA,
      title: STRING_SCHEMA,
      checkPrompt: STRING_SCHEMA,
      analysis: STRING_SCHEMA,
      fixPrompt: STRING_SCHEMA,
      message: STRING_SCHEMA,
      suggestions: ERROR_WITH_SUGGESTIONS_SCHEMA.properties.suggestions,
      categories: CATEGORY_ARRAY_SCHEMA
    }
  }
}

/**
 * Simple heuristic analysis of code against a rule
 * In a real implementation, this could use more sophisticated analysis
 */
function analyzeCode(code: string, rule: Rule): { hasIssues: boolean; analysis: string } {
  const slug = rule.slug.toLowerCase()
  const lowerCode = code.toLowerCase()

  // Basic heuristic checks based on common rule patterns
  const checks: Array<{ condition: boolean; issue: string }> = []

  // Alt text check
  if (slug.includes('alt') || slug.includes('alternative')) {
    const imgMatches = code.match(/<img[^>]*>/gi) || []
    for (const img of imgMatches) {
      if (!img.includes('alt=') && !img.includes('alt =')) {
        checks.push({
          condition: true,
          issue: 'Found <img> element without alt attribute'
        })
      } else if (img.match(/alt\s*=\s*["']\s*["']/)) {
        // Empty alt is sometimes intentional for decorative images
        // Only flag if not explicitly decorative
        if (!img.includes('role="presentation"') && !img.includes('aria-hidden')) {
          checks.push({
            condition: true,
            issue: 'Found <img> with empty alt attribute (may be intentional for decorative images)'
          })
        }
      }
    }
  }

  // Doctype check
  if (slug.includes('doctype')) {
    if (!lowerCode.includes('<!doctype html>')) {
      checks.push({
        condition: true,
        issue: 'Missing <!DOCTYPE html> declaration'
      })
    }
  }

  // Semantic HTML checks
  if (slug.includes('semantic')) {
    const divCount = (lowerCode.match(/<div/g) || []).length
    const semanticTags = ['<header', '<nav', '<main', '<section', '<article', '<aside', '<footer']
    const semanticCount = semanticTags.reduce(
      (count, tag) => count + (lowerCode.match(new RegExp(tag, 'g')) || []).length,
      0
    )

    if (divCount > 5 && semanticCount === 0) {
      checks.push({
        condition: true,
        issue: 'Heavy use of <div> elements without semantic HTML elements'
      })
    }
  }

  // Meta viewport check
  if (slug.includes('viewport')) {
    if (lowerCode.includes('<head') && !lowerCode.includes('viewport')) {
      checks.push({
        condition: true,
        issue: 'Missing viewport meta tag'
      })
    }
  }

  // Language attribute check
  if (slug.includes('lang') || slug.includes('language')) {
    if (lowerCode.includes('<html') && !lowerCode.match(/<html[^>]*lang\s*=/i)) {
      checks.push({
        condition: true,
        issue: 'Missing lang attribute on <html> element'
      })
    }
  }

  // HTTPS check
  if (slug.includes('https') || slug.includes('secure')) {
    if (lowerCode.match(/http:\/\/(?!localhost)/)) {
      checks.push({
        condition: true,
        issue: 'Found non-HTTPS URLs in code'
      })
    }
  }

  // Build analysis response
  const issues = checks.filter(c => c.condition)
  const hasIssues = issues.length > 0

  let analysis: string
  if (hasIssues) {
    analysis = `Found ${issues.length} potential issue(s):\n\n${issues.map((i, idx) => `${idx + 1}. ${i.issue}`).join('\n')}\n\nReview the check prompt below for verification guidance.`
  } else {
    analysis = `No obvious issues detected for rule "${rule.title}". However, manual review is recommended using the check prompt below.`
  }

  return { hasIssues, analysis }
}

/**
 * Execute check_rule tool
 */
export function executeCheckRule(input: CheckRuleInput, rules: Rule[]): CheckRuleOutput {
  const { slug, code } = input

  // Find rule by slug
  const rule = rules.find(r => r.slug === slug)

  if (!rule) {
    return { success: false, error: ruleNotFound(slug, rules) }
  }

  const checkPrompt = rule.prompts?.check || 'No check prompt available for this rule.'

  // If no code provided, just return the check prompt
  if (!code) {
    return {
      success: true,
      result: {
        slug: rule.slug,
        title: rule.title,
        checkPrompt
      }
    }
  }

  // Analyze code against rule
  const { hasIssues, analysis } = analyzeCode(code, rule)

  const result: CheckRuleResponse = {
    slug: rule.slug,
    title: rule.title,
    checkPrompt,
    analysis
  }

  // Include fix prompt only if issues detected
  if (hasIssues && rule.prompts?.fix) {
    result.fixPrompt = rule.prompts.fix
  }

  return {
    success: true,
    result
  }
}
