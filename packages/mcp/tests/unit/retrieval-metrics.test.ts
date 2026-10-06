import { retrievalMetrics } from '../../scripts/retrieval-metrics'

it('distinguishes any hit from recall across all relevant labels', () => {
  expect(retrievalMetrics(['irrelevant', 'a'], ['a', 'b'])).toEqual({
    hit: 1,
    recall: 0.5,
    reciprocalRank: 0.5
  })
})
it('does not double count duplicate returned or labeled rules', () => {
  expect(retrievalMetrics(['a', 'a'], ['a', 'a', 'b']).recall).toBe(0.5)
})
it('respects the cutoff while reciprocal rank uses the returned ranking', () => {
  expect(retrievalMetrics(['x', 'y', 'a'], ['a'], 2)).toEqual({
    hit: 0,
    recall: 0,
    reciprocalRank: 1 / 3
  })
})
it('handles no results and rejects undefined recall or invalid cutoffs', () => {
  expect(retrievalMetrics([], ['a'])).toEqual({ hit: 0, recall: 0, reciprocalRank: 0 })
  expect(() => retrievalMetrics([], [])).toThrow()
  expect(() => retrievalMetrics([], ['a'], 0)).toThrow()
})
