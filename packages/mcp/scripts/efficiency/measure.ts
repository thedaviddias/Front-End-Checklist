import { createHash } from 'node:crypto'
import { countTokens } from 'gpt-tokenizer/encoding/o200k_base'

/** Stable offline size metric; provider framing and billing are not included. */
export function measureText(text: string) {
  return {
    bytes: Buffer.byteLength(text, 'utf8'),
    tokens: countTokens(text, { disallowedSpecial: new Set() }),
    sha256: createHash('sha256').update(text).digest('hex')
  }
}

/** Nearest-rank percentiles; reject absent or invalid measurements. */
export function percentile(values: number[], fraction: number): number {
  if (
    !values.length ||
    values.some(value => !Number.isFinite(value) || value < 0) ||
    fraction <= 0 ||
    fraction > 1
  )
    throw new Error('Invalid percentile sample')
  const sorted = [...values].sort((a, b) => a - b)
  return sorted[Math.ceil(sorted.length * fraction) - 1]!
}

export interface Sample {
  id: string
  text: ReturnType<typeof measureText>
  structured: ReturnType<typeof measureText>
  wire: ReturnType<typeof measureText>
  p50Ms: number
  p95Ms: number
}
export interface Budget {
  textTokens: number
  structuredTokens: number
  wireBytes: number
  p95Ms: number
}

/** Explicitly fail unknown/missing scenarios so coverage cannot silently shrink. */
export function budgetViolations(samples: Sample[], budgets: Record<string, Budget>): string[] {
  const failures: string[] = []
  const ids = samples.map(sample => sample.id)
  if (new Set(ids).size !== ids.length) failures.push('Duplicate measurement IDs')
  for (const id of Object.keys(budgets))
    if (!ids.includes(id)) failures.push(`Missing scenario: ${id}`)
  for (const sample of samples) {
    const budget = budgets[sample.id]
    if (!budget) {
      failures.push(`Unbudgeted scenario: ${sample.id}`)
      continue
    }
    const metrics = {
      textTokens: sample.text.tokens,
      structuredTokens: sample.structured.tokens,
      wireBytes: sample.wire.bytes,
      p95Ms: sample.p95Ms
    }
    for (const key of ['textTokens', 'structuredTokens', 'wireBytes', 'p95Ms'] as const) {
      if (!Number.isFinite(metrics[key]) || metrics[key] > budget[key]) {
        failures.push(`${sample.id}.${key}: ${metrics[key]} exceeds ${budget[key]}`)
      }
    }
  }
  return failures
}
