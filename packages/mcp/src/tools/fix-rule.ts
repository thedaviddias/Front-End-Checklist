import type { Rule } from '@repo/types'
import type { ErrorWithSuggestions, FixRuleResponse } from '../types'
import { findSimilarRules } from '../utils/fuzzy-match'
import {
  ERROR_WITH_SUGGESTIONS_SCHEMA,
  PRIORITY_SCHEMA,
  READ_ONLY_TOOL_ANNOTATIONS,
  RULE_SLUG_DESCRIPTION,
  STRING_SCHEMA
} from './metadata'

export interface FixRuleInput {
  slug: string
  codeSnippet?: string
}

export interface FixRuleResult {
  success: true
  result: FixRuleResponse
}

export interface FixRuleError {
  success: false
  error: ErrorWithSuggestions
}

export type FixRuleOutput = FixRuleResult | FixRuleError

/**
 * Tool definition for fix_rule
 */
export const fixRuleDefinition = {
  name: 'fix_rule',
  title: 'Get Rule Fix',
  description: `Returns step-by-step remediation instructions for one rule, with its priority so multiple issues can be triaged. Use it when an issue has been found (by review_code, audit_url, or check_rule) and the user wants it fixed. Pass codeSnippet to get guidance framed around their code.`,
  annotations: READ_ONLY_TOOL_ANNOTATIONS,
  inputSchema: {
    type: 'object' as const,
    properties: {
      slug: {
        type: 'string',
        description: RULE_SLUG_DESCRIPTION
      },
      codeSnippet: {
        type: 'string',
        description: 'Code that violates the rule, so the fix guidance can reference it.'
      }
    },
    required: ['slug']
  },
  outputSchema: {
    type: 'object' as const,
    properties: {
      slug: STRING_SCHEMA,
      title: STRING_SCHEMA,
      fixPrompt: STRING_SCHEMA,
      priority: PRIORITY_SCHEMA,
      codeContext: STRING_SCHEMA,
      message: STRING_SCHEMA,
      suggestions: ERROR_WITH_SUGGESTIONS_SCHEMA.properties.suggestions
    }
  }
}

/**
 * Execute fix_rule tool
 */
export function executeFixRule(input: FixRuleInput, rules: Rule[]): FixRuleOutput {
  const { slug, codeSnippet } = input

  // Find rule by slug
  const rule = rules.find(r => r.slug === slug)

  if (!rule) {
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

  const fixPrompt = rule.prompts?.fix || 'No fix prompt available for this rule.'

  const result: FixRuleResponse = {
    slug: rule.slug,
    title: rule.title,
    fixPrompt,
    priority: rule.priority,
    ...(codeSnippet?.trim() ? { codeContext: codeSnippet.trim() } : {})
  }
  return {
    success: true,
    result
  }
}
