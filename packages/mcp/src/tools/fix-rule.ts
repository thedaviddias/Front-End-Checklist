import type { Rule } from '@repo/types'
import type { ErrorWithSuggestions, FixRuleResponse } from '../types'
import { ruleNotFound } from '../utils/rule-not-found'
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
  description: `Returns step-by-step remediation guidance and priority for one named frontend rule. Use it when the user requests implementation or fix instructions for a known issue. Optional codeSnippet provides context; the tool does not edit files or apply changes.`,
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
    return { success: false, error: ruleNotFound(slug, rules) }
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
