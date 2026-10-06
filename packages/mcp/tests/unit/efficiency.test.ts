import {
  budgetViolations,
  measureText,
  percentile,
  type Sample
} from '../../scripts/efficiency/measure'

const sample: Sample = {
  id: 'example',
  text: measureText('Hello, world!'),
  structured: measureText('{}'),
  wire: measureText('{"ok":true}'),
  p50Ms: 1,
  p95Ms: 2
}
const budgets = { example: { textTokens: 100, structuredTokens: 100, wireBytes: 100, p95Ms: 100 } }

it('uses real reference-encoding tokens rather than a character heuristic', () => {
  expect(measureText('Hello, world!').tokens).toBe(4)
  expect(measureText('مرحبا 京都').bytes).toBeGreaterThan('مرحبا 京都'.length)
  expect(measureText('<|endoftext|>').tokens).toBeGreaterThan(0)
  expect(measureText('').tokens).toBe(0)
})
it('computes nearest-rank percentiles without mutating samples', () => {
  const values = [4, 1, 3, 2]
  expect(percentile(values, 0.5)).toBe(2)
  expect(percentile(values, 0.95)).toBe(4)
  expect(values).toEqual([4, 1, 3, 2])
  expect(() => percentile([], 0.95)).toThrow()
  expect(() => percentile([NaN], 0.95)).toThrow()
})
it('accepts all metrics at the exact budget', () => {
  expect(
    budgetViolations([sample], {
      example: {
        textTokens: sample.text.tokens,
        structuredTokens: sample.structured.tokens,
        wireBytes: sample.wire.bytes,
        p95Ms: sample.p95Ms
      }
    })
  ).toEqual([])
})
it.each(['textTokens', 'structuredTokens', 'wireBytes', 'p95Ms'] as const)(
  'fails an exceeded %s budget',
  key => {
    expect(budgetViolations([sample], { example: { ...budgets.example, [key]: 0 } })).toHaveLength(
      1
    )
  }
)
it('fails missing, unknown and duplicate measurements', () => {
  expect(budgetViolations([], budgets)).toEqual(['Missing scenario: example'])
  expect(budgetViolations([sample], {})).toEqual(['Unbudgeted scenario: example'])
  expect(budgetViolations([sample, sample], budgets)).toContain('Duplicate measurement IDs')
})
it('rejects nonfinite timing rather than allowing NaN to pass', () => {
  expect(budgetViolations([{ ...sample, p95Ms: NaN }], budgets)).toHaveLength(1)
})
