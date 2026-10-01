import { readFileSync } from 'node:fs'
import { type Options, REPO_ROOT } from './config'
import type { StageReport } from './stage'

export interface ProfileEntry {
  selfMs: number
  selfPct: number
  fn: string
}

export interface LoadReport {
  createdAt: string
  target: string
  /** 1-minute load average at start/end vs CPU count; comparisons are unreliable when busy. */
  machine: { cpus: number; loadStart: number; loadEnd?: number }
  era: Options['era']
  stages: StageReport[]
  profileTop?: ProfileEntry[]
}

/**
 * Label a V8 profile node as "function file:line".
 *
 * @param node - Profile node.
 * @returns Human-readable label.
 */
function labelProfileNode(node: unknown): string {
  const frame = Reflect.get(Object(node), 'callFrame')
  const fn = String(Reflect.get(Object(frame), 'functionName') || '(anonymous)')
  const url = String(Reflect.get(Object(frame), 'url') || '')
  const line = Number(Reflect.get(Object(frame), 'lineNumber')) + 1
  const where = url
    ? `${url.replace(/^file:\/\//, '').replace(`${REPO_ROOT}/`, '')}:${line}`
    : '(native)'
  return `${fn} ${where}`
}

/**
 * Summarize the hottest functions in a V8 CPU profile by self time.
 *
 * @param file - Path to a .cpuprofile file.
 * @returns Top functions by self time.
 */
export function summarizeProfile(file: string): ProfileEntry[] {
  const profile: unknown = JSON.parse(readFileSync(file, 'utf-8'))
  const nodes: unknown = Reflect.get(Object(profile), 'nodes')
  const samples: unknown = Reflect.get(Object(profile), 'samples')
  const deltas: unknown = Reflect.get(Object(profile), 'timeDeltas')
  if (!Array.isArray(nodes) || !Array.isArray(samples) || !Array.isArray(deltas)) return []

  const labels = new Map<number, string>(
    nodes.map(node => [Number(Reflect.get(Object(node), 'id')), labelProfileNode(node)])
  )
  const selfMicros = new Map<string, number>()
  let total = 0
  samples.forEach((id, index) => {
    const label = labels.get(Number(id)) ?? '(unknown)'
    const delta = Number(deltas[index]) || 0
    total += delta
    selfMicros.set(label, (selfMicros.get(label) ?? 0) + delta)
  })

  return [...selfMicros.entries()]
    .filter(([label]) => !/^\((idle|program|garbage collector)\)/.test(label))
    .sort((a, b) => b[1] - a[1])
    .slice(0, 20)
    .map(([fn, micros]) => ({
      fn,
      selfMs: Math.round(micros / 1000),
      selfPct: Math.round((micros / total) * 1000) / 10
    }))
}

/**
 * Format a relative change against a baseline value.
 *
 * @param now - Current value.
 * @param before - Baseline value.
 * @returns " (+12%)"-style suffix, or an empty string without a baseline.
 */
function formatDelta(now: number, before?: number): string {
  if (before === undefined || before === 0) return ''
  const percent = Math.round(((now - before) / before) * 100)
  return ` (${percent >= 0 ? '+' : ''}${percent}%)`
}

/**
 * Print a stage as a table, with deltas against a baseline stage when given.
 *
 * @param stage - Stage to print.
 * @param baseline - Matching stage from a previous report.
 */
export function printStage(stage: StageReport, baseline?: StageReport): void {
  const cpu =
    stage.serverCpuMsPerRequest === undefined
      ? ''
      : `, server CPU ${stage.serverCpuMsPerRequest} ms/req${formatDelta(stage.serverCpuMsPerRequest, baseline?.serverCpuMsPerRequest)}, RSS ${stage.serverRssMb} MB`
  console.log(
    `\n== concurrency ${stage.concurrency}: ${stage.requests} req in ${stage.durationSeconds}s → ${stage.requestsPerSecond} req/s${formatDelta(stage.requestsPerSecond, baseline?.requestsPerSecond)}, errors ${stage.errorRate}%${cpu}`
  )
  console.table(
    Object.fromEntries(
      Object.entries(stage.operations).map(([name, op]) => [
        name,
        {
          count: op.count,
          errors: op.errors,
          'p50 ms': op.p50,
          'p95 ms': `${op.p95}${formatDelta(op.p95, baseline?.operations[name]?.p95)}`,
          'p99 ms': op.p99,
          'max ms': op.max
        }
      ])
    )
  )
  for (const [name, op] of Object.entries(stage.operations)) {
    if (op.firstError) console.log(`  first ${name} error: ${op.firstError}`)
  }
}
