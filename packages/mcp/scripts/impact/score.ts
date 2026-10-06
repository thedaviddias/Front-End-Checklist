import { createHash } from 'node:crypto'
import { parse, valid } from 'node-html-parser'
import { z } from 'zod'
import { type Check, IMPACT_TASKS, type ImpactTask, type Split } from './cases'

export const BENCHMARK_VERSION = 2
export const CONDITIONS = ['without-mcp', 'with-mcp'] as const
const count = z.number().int().nonnegative()
const reviewSchema = z
  .object({
    verdict: z.enum(['pass', 'fail']),
    reviewer: z.string().trim().min(1),
    evidence: z.string().trim().min(1),
    candidateHash: z.string().regex(/^[a-f0-9]{64}$/)
  })
  .strict()
export const metadataSchema = z
  .object({
    model: z.string().trim().min(1),
    settings: z.string().trim().min(1),
    timeBudgetSeconds: z.number().positive(),
    promptHash: z.string().regex(/^[a-f0-9]{64}$/),
    mcpEnabled: z.boolean(),
    mcpRevision: z.string().trim().min(1).nullable(),
    corpusRevision: z.string().trim().min(1).nullable(),
    toolCalls: count,
    inputTokens: count.nullable(),
    outputTokens: count.nullable(),
    costUsd: z.number().nonnegative().nullable(),
    elapsedSeconds: z.number().positive().nullable(),
    completedTaskIds: z.array(z.string()).refine(ids => new Set(ids).size === ids.length),
    reviews: z.record(z.string(), reviewSchema)
  })
  .strict()
export type RunMetadata = z.infer<typeof metadataSchema>

/** Hash exact candidate bytes or serialized benchmark inputs for provenance. */
export function hash(value: string): string {
  return createHash('sha256').update(value).digest('hex')
}

/** Bind a run to the complete task corpus and independent grading specification. */
export function corpusHash(): string {
  return hash(JSON.stringify({ version: BENCHMARK_VERSION, tasks: IMPACT_TASKS }))
}

/** Require exactly one matching element; duplicates cannot hide a broken original. */
function passes(root: ReturnType<typeof parse>, assertion: Check): boolean {
  const elements = root.querySelectorAll(assertion.selector)
  if (elements.length !== 1) return false
  const element = elements[0]
  if (!element) return false
  const value = assertion.attribute
    ? element.getAttribute(assertion.attribute)
    : element.textContent
  if (assertion.absent) return value === undefined
  if (assertion.nonempty) return typeof value === 'string' && value.trim().length > 0
  return value === assertion.equals
}

/** Independent static checks are necessary, but do not prove behavior or semantic quality. */
export function scoreTask(task: ImpactTask, code: string | null, metadata: RunMetadata | null) {
  const candidateHash = code === null ? null : hash(code)
  const usable = code !== null && code.trim().length > 0 && valid(code)
  const root = parse(usable ? code : '')
  const failedChecks = task.checks.filter(assertion => !usable || !passes(root, assertion))
  const regressions = task.preserve.filter(assertion => !usable || !passes(root, assertion))
  const controlChanged = task.control && code !== task.initial
  const automatedPass = usable && !failedChecks.length && !regressions.length && !controlChanged
  const review = metadata?.reviews[task.id]
  const currentReview = review?.candidateHash === candidateHash ? review : undefined
  const completed = metadata?.completedTaskIds.includes(task.id) ?? false
  return {
    id: task.id,
    category: task.category,
    split: task.split,
    control: task.control,
    candidateHash,
    completed,
    automatedPass,
    verifiedPass: automatedPass && completed && currentReview?.verdict === 'pass',
    humanReview: currentReview?.verdict ?? 'pending',
    failedChecks,
    regressions,
    controlChanged,
    error: usable ? null : 'Missing, empty, or malformed HTML'
  }
}
export type TaskScore = ReturnType<typeof scoreTask>

/** Keep macro task success, preservation failures and valid-control edits separate. */
export function summarize(tasks: TaskScore[], metadata: RunMetadata | null) {
  const passed = tasks.filter(task => task.automatedPass).length
  const verified = tasks.filter(task => task.verifiedPass).length
  const controls = tasks.filter(task => task.control)
  const repairs = tasks.filter(task => !task.control)
  return {
    tasks: tasks.length,
    automatedPassed: passed,
    automatedSuccessRate: tasks.length ? passed / tasks.length : null,
    verifiedPassed: verified,
    verifiedSuccessRate: tasks.length ? verified / tasks.length : null,
    regressionTasks: tasks.filter(task => task.regressions.length > 0).length,
    repairTasks: repairs.length,
    automatedRepairSuccessRate: repairs.length
      ? repairs.filter(task => task.automatedPass).length / repairs.length
      : null,
    controlTasks: controls.length,
    unnecessaryControlEdits: controls.filter(task => task.controlChanged).length,
    costUsd: metadata?.costUsd ?? null,
    costPerVerifiedTaskUsd:
      metadata?.costUsd !== null && metadata?.costUsd !== undefined && verified > 0
        ? metadata.costUsd / verified
        : null,
    inputTokens: metadata?.inputTokens ?? null,
    outputTokens: metadata?.outputTokens ?? null,
    elapsedSeconds: metadata?.elapsedSeconds ?? null
  }
}

/** Require matched settings and complete evidence before claiming measured MCP uplift. */
export function comparisonProblems(
  without: RunMetadata | null,
  withMcp: RunMetadata | null,
  tasks: ImpactTask[],
  expectedPromptHash: string
): string[] {
  if (!without || !withMcp) return ['Both conditions need run metadata before comparison']
  const problems: string[] = []
  for (const field of ['model', 'settings', 'timeBudgetSeconds'] as const) {
    if (without[field] !== withMcp[field]) problems.push(`Conditions differ: ${field}`)
  }
  if (without.mcpEnabled || !withMcp.mcpEnabled) problems.push('Incorrect MCP assignment')
  if (without.toolCalls > 0) problems.push('No-MCP condition reports MCP calls')
  if (!withMcp.mcpRevision || !withMcp.corpusRevision) problems.push('Missing MCP/corpus revision')
  for (const metadata of [without, withMcp]) {
    if (metadata.promptHash !== expectedPromptHash)
      problems.push('Prompt hash differs from manifest')
    if (
      metadata.completedTaskIds.length !== tasks.length ||
      tasks.some(task => !metadata.completedTaskIds.includes(task.id))
    )
      problems.push('Incomplete task run')
  }
  return problems
}

/** Select one stable corpus split; held-out cases are never included by default. */
export function selectTasks(split: Split | 'all'): ImpactTask[] {
  return IMPACT_TASKS.filter(task => split === 'all' || task.split === split)
}
