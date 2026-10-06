/** Separate hit rate from macro recall over explicitly labeled relevant rules. */
export function retrievalMetrics(results: string[], relevant: string[], k = 5) {
  if (!Number.isInteger(k) || k < 1) throw new Error('k must be a positive integer')
  const expected = new Set(relevant)
  if (!expected.size) throw new Error('A retrieval case needs at least one relevant rule')
  const top = new Set(results.slice(0, k))
  const found = [...expected].filter(slug => top.has(slug)).length
  const rank = results.findIndex(slug => expected.has(slug))
  return {
    hit: found > 0 ? 1 : 0,
    recall: found / expected.size,
    reciprocalRank: rank < 0 ? 0 : 1 / (rank + 1)
  }
}
