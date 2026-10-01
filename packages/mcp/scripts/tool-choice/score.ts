import type { CaseGroup, ToolChoiceCase } from './cases'

/** What the model did first: a tool name, `none` (answered directly), or a failure. */
export type TrialOutcome = string | 'none' | 'refusal' | 'error'

export interface TrialUsage {
  inputTokens: number
  outputTokens: number
  cacheReadTokens: number
  cacheWriteTokens: number
}

export interface CaseResult {
  id: string
  group: CaseGroup
  expect: string[]
  outcomes: TrialOutcome[]
}

export interface GroupScore {
  cases: number
  accuracy: number
  passAtK: number
  passHatK: number
}

export interface ToolChoiceScore {
  trialsPerCase: number
  overall: GroupScore
  byGroup: Partial<Record<CaseGroup, GroupScore>>
  /** `expected -> chosen` counts for every wrong trial. */
  confusions: Record<string, number>
  /** Share of trials that called a tool when no tool was expected. */
  overTriggerRate: number
  /** Share of trials that answered directly when a tool was expected. */
  underTriggerRate: number
  refusals: number
  errors: number
}

/**
 * Whether one trial picked an acceptable first action.
 *
 * @param testCase - Case under test.
 * @param outcome - What the model did.
 * @returns True when the outcome is acceptable.
 */
export function isCorrect(
  testCase: Pick<ToolChoiceCase, 'expect'>,
  outcome: TrialOutcome
): boolean {
  return testCase.expect.length === 0 ? outcome === 'none' : testCase.expect.includes(outcome)
}

/**
 * Score a set of case results.
 *
 * pass@k: share of cases solved in at least one of k trials (can the model get it).
 * pass^k: share of cases solved in all k trials (does it get it every time); this is
 * the number that matters for an agent users rely on.
 *
 * @param results - Case results.
 * @returns Group score.
 */
function scoreGroup(results: CaseResult[]): GroupScore {
  const trials = results.flatMap(result =>
    result.outcomes.map(outcome => isCorrect(result, outcome))
  )
  const perCase = results.map(result => result.outcomes.map(outcome => isCorrect(result, outcome)))
  /**
   * Safe ratio.
   *
   * @param count - Numerator.
   * @param total - Denominator.
   * @returns count / total, or 0 when total is 0.
   */
  const share = (count: number, total: number) => (total === 0 ? 0 : count / total)
  return {
    cases: results.length,
    accuracy: share(trials.filter(Boolean).length, trials.length),
    passAtK: share(perCase.filter(case_ => case_.some(Boolean)).length, results.length),
    passHatK: share(perCase.filter(case_ => case_.every(Boolean)).length, results.length)
  }
}

/**
 * Score every case result.
 *
 * @param results - Case results (all with the same number of trials).
 * @returns Overall, per-group, and confusion metrics.
 */
export function scoreToolChoice(results: CaseResult[]): ToolChoiceScore {
  const byGroup: ToolChoiceScore['byGroup'] = {}
  for (const group of new Set(results.map(result => result.group))) {
    byGroup[group] = scoreGroup(results.filter(result => result.group === group))
  }

  const confusions: Record<string, number> = {}
  let noToolTrials = 0
  let overTriggers = 0
  let toolTrials = 0
  let underTriggers = 0
  for (const result of results) {
    for (const outcome of result.outcomes) {
      if (result.expect.length === 0) {
        noToolTrials++
        if (outcome !== 'none' && outcome !== 'refusal' && outcome !== 'error') overTriggers++
      } else {
        toolTrials++
        if (outcome === 'none') underTriggers++
      }
      if (!isCorrect(result, outcome)) {
        const key = `${result.expect.join('|') || 'none'} -> ${outcome}`
        confusions[key] = (confusions[key] ?? 0) + 1
      }
    }
  }

  const outcomes = results.flatMap(result => result.outcomes)
  return {
    trialsPerCase: results[0]?.outcomes.length ?? 0,
    overall: scoreGroup(results),
    byGroup,
    confusions,
    overTriggerRate: noToolTrials === 0 ? 0 : overTriggers / noToolTrials,
    underTriggerRate: toolTrials === 0 ? 0 : underTriggers / toolTrials,
    refusals: outcomes.filter(outcome => outcome === 'refusal').length,
    errors: outcomes.filter(outcome => outcome === 'error').length
  }
}

/**
 * Sum token usage across trials.
 *
 * @param usages - Per-trial usage.
 * @returns Totals.
 */
export function sumUsage(usages: TrialUsage[]): TrialUsage {
  return usages.reduce(
    (total, usage) => ({
      inputTokens: total.inputTokens + usage.inputTokens,
      outputTokens: total.outputTokens + usage.outputTokens,
      cacheReadTokens: total.cacheReadTokens + usage.cacheReadTokens,
      cacheWriteTokens: total.cacheWriteTokens + usage.cacheWriteTokens
    }),
    { inputTokens: 0, outputTokens: 0, cacheReadTokens: 0, cacheWriteTokens: 0 }
  )
}
