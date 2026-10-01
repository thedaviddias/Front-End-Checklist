import { type Era, type Options, pickOperation } from './config'
import { createLegacyWorker, createModernWorker, type Worker } from './workers'

interface OperationStats {
  latencies: number[]
  errors: number
  firstError?: string
}

interface ServerStats {
  cpuMicros: number
  rssBytes: number
}

export interface StageReport {
  concurrency: number
  /** Server CPU (user+system) per request; robust to machine contention. Local server only. */
  serverCpuMsPerRequest?: number
  serverRssMb?: number
  durationSeconds: number
  requests: number
  requestsPerSecond: number
  errorRate: number
  operations: Record<
    string,
    {
      count: number
      errors: number
      p50: number
      p95: number
      p99: number
      max: number
      firstError?: string
    }
  >
}

/**
 * Compute a percentile from sorted latencies.
 *
 * @param sorted - Ascending latencies in ms.
 * @param p - Percentile between 0 and 100.
 * @returns Latency in ms rounded to 0.1.
 */
function percentile(sorted: number[], p: number): number {
  if (sorted.length === 0) return 0
  const index = Math.min(sorted.length - 1, Math.ceil((p / 100) * sorted.length) - 1)
  return Math.round(sorted[Math.max(0, index)] * 10) / 10
}

/**
 * Read CPU and memory counters from the standalone server's /__stats endpoint.
 *
 * @param url - MCP endpoint of the standalone server.
 * @returns Counters, or undefined for servers without the endpoint.
 */
async function readServerStats(url: string): Promise<ServerStats | undefined> {
  try {
    const response = await fetch(new URL('/__stats', url))
    if (!response.ok) return undefined
    const body: unknown = await response.json()
    if (typeof body !== 'object' || body === null) return undefined
    return {
      cpuMicros: Number(Reflect.get(body, 'cpuMicros')),
      rssBytes: Number(Reflect.get(body, 'rssBytes'))
    }
  } catch {
    return undefined
  }
}

/**
 * Create the workers for a stage, alternating eras in mixed mode.
 *
 * @param url - MCP endpoint.
 * @param concurrency - Number of workers.
 * @param era - Requested era mix.
 * @returns Ready workers.
 */
function createWorkers(url: string, concurrency: number, era: Options['era']): Promise<Worker[]> {
  return Promise.all(
    Array.from({ length: concurrency }, (_, index) => {
      const workerEra: Era = era === 'mixed' ? (index % 2 === 0 ? 'modern' : 'legacy') : era
      return workerEra === 'modern'
        ? createModernWorker(url)
        : Promise.resolve(createLegacyWorker(url))
    })
  )
}

/**
 * Keep one worker busy with random operations until the deadline.
 *
 * @param worker - Worker to drive.
 * @param deadline - performance.now() value at which to stop.
 * @param stats - Per-operation stats to update.
 */
async function driveWorker(
  worker: Worker,
  deadline: number,
  stats: Map<string, OperationStats>
): Promise<void> {
  while (performance.now() < deadline) {
    const operation = pickOperation()
    const entry = stats.get(operation) ?? { latencies: [], errors: 0 }
    stats.set(operation, entry)
    const begin = performance.now()
    try {
      await worker.run(operation)
      entry.latencies.push(performance.now() - begin)
    } catch (error) {
      entry.errors += 1
      entry.firstError ??= error instanceof Error ? error.message : String(error)
    }
  }
}

/**
 * Turn raw per-operation stats into a stage report.
 *
 * @param concurrency - Stage concurrency.
 * @param stats - Per-operation stats.
 * @param elapsedSeconds - Measured stage duration.
 * @param before - Server counters before the stage.
 * @param after - Server counters after the stage.
 * @returns Stage report.
 */
function summarizeStage(
  concurrency: number,
  stats: Map<string, OperationStats>,
  elapsedSeconds: number,
  before?: ServerStats,
  after?: ServerStats
): StageReport {
  let requests = 0
  let errors = 0
  const operations: StageReport['operations'] = {}
  for (const [name, entry] of [...stats.entries()].sort()) {
    const sorted = [...entry.latencies].sort((a, b) => a - b)
    requests += sorted.length + entry.errors
    errors += entry.errors
    operations[name] = {
      count: sorted.length,
      errors: entry.errors,
      p50: percentile(sorted, 50),
      p95: percentile(sorted, 95),
      p99: percentile(sorted, 99),
      max: percentile(sorted, 100),
      ...(entry.firstError ? { firstError: entry.firstError } : {})
    }
  }

  const serverCpuMsPerRequest =
    before && after && requests > 0
      ? Math.round(((after.cpuMicros - before.cpuMicros) / 1000 / requests) * 100) / 100
      : undefined

  return {
    concurrency,
    ...(serverCpuMsPerRequest === undefined ? {} : { serverCpuMsPerRequest }),
    ...(after ? { serverRssMb: Math.round(after.rssBytes / 1024 / 1024) } : {}),
    durationSeconds: Math.round(elapsedSeconds * 10) / 10,
    requests,
    requestsPerSecond: Math.round((requests / elapsedSeconds) * 10) / 10,
    errorRate: requests === 0 ? 0 : Math.round((errors / requests) * 10000) / 100,
    operations
  }
}

/**
 * Run one concurrency stage.
 *
 * @param url - MCP endpoint.
 * @param concurrency - Parallel workers.
 * @param options - Load-test options.
 * @returns Stage report.
 */
export async function runStage(
  url: string,
  concurrency: number,
  options: Options
): Promise<StageReport> {
  const stats = new Map<string, OperationStats>()
  const workers = await createWorkers(url, concurrency, options.era)

  const before = await readServerStats(url)
  const started = performance.now()
  const deadline = started + options.durationSeconds * 1000
  await Promise.all(workers.map(worker => driveWorker(worker, deadline, stats)))
  const elapsedSeconds = (performance.now() - started) / 1000
  const after = await readServerStats(url)

  await Promise.allSettled(workers.map(worker => worker.close()))
  return summarizeStage(concurrency, stats, elapsedSeconds, before, after)
}
