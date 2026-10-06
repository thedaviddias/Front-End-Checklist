import type { ErrorWithSuggestions } from '../types'
import { findSimilarRules } from './fuzzy-match'

/** Offer bounded, real catalogue candidates and an explicit discovery step; never auto-resolve a guess. */
export function ruleNotFound(
  slug: string,
  rules: Array<{ slug: string; title: string }>
): ErrorWithSuggestions {
  const query = slug.slice(0, 80)
  return {
    error: null,
    result: null,
    suggestions: findSimilarRules(query, rules, { maxResults: 3 }),
    message: `Unknown rule slug '${query}'. Use a returned suggestion if it matches the task; otherwise call search_rules with query '${query.replace(/-/g, ' ')}' and limit 3. Reuse an exact returned slug; do not guess another.`
  }
}
