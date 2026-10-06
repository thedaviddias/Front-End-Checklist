import type { Rule } from '@repo/types'
import type { ErrorWithSuggestions, ExplainRuleResponse } from '../types'
import { ruleNotFound } from '../utils/rule-not-found'
import {
  CATEGORY_ARRAY_SCHEMA,
  ERROR_WITH_SUGGESTIONS_SCHEMA,
  READ_ONLY_TOOL_ANNOTATIONS,
  RULE_SLUG_DESCRIPTION,
  STRING_SCHEMA
} from './metadata'

export interface ExplainRuleInput {
  slug: string
}

export interface ExplainRuleResult {
  success: true
  result: ExplainRuleResponse
}

export interface ExplainRuleError {
  success: false
  error: ErrorWithSuggestions
}

export type ExplainRuleOutput = ExplainRuleResult | ExplainRuleError

/**
 * Tool definition for explain_rule
 */
export const explainRuleDefinition = {
  name: 'explain_rule',
  title: 'Explain Frontend Rule',
  description: `Explains one frontend rule, including its background, impact on users and the business, and related categories. Use it when the user asks why a practice matters or requests educational context. It returns explanation guidance rather than applying a fix.`,
  annotations: READ_ONLY_TOOL_ANNOTATIONS,
  inputSchema: {
    type: 'object' as const,
    properties: {
      slug: {
        type: 'string',
        description: RULE_SLUG_DESCRIPTION
      }
    },
    required: ['slug']
  },
  outputSchema: {
    type: 'object' as const,
    properties: {
      slug: STRING_SCHEMA,
      title: STRING_SCHEMA,
      explainPrompt: STRING_SCHEMA,
      categories: CATEGORY_ARRAY_SCHEMA,
      message: STRING_SCHEMA,
      suggestions: ERROR_WITH_SUGGESTIONS_SCHEMA.properties.suggestions
    }
  }
}

/**
 * Execute explain_rule tool
 */
export function executeExplainRule(input: ExplainRuleInput, rules: Rule[]): ExplainRuleOutput {
  const { slug } = input

  // Find rule by slug
  const rule = rules.find(r => r.slug === slug)

  if (!rule) {
    return { success: false, error: ruleNotFound(slug, rules) }
  }

  const explainPrompt = rule.prompts?.explain || 'No explanation prompt available for this rule.'

  return {
    success: true,
    result: {
      slug: rule.slug,
      title: rule.title,
      explainPrompt,
      categories: rule.categories
    }
  }
}
