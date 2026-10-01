/**
 * MCP load test and profiler.
 *
 * Drives a weighted mix of real MCP operations at stepped concurrency and
 * reports throughput, p50/p95/p99 latency, errors, and server CPU per request.
 *
 * Usage (from the repo root):
 *   pnpm mcp:load                                  # local server, mixed eras
 *   pnpm mcp:load -- --concurrency 1,16,64 --duration 20
 *   pnpm mcp:load -- --era modern                  # 2026-07-28 clients only
 *   pnpm mcp:load -- --profile                     # CPU-profile the server
 *   pnpm mcp:load -- --compare .mcp-load/previous.json
 *   pnpm mcp:load -- --url http://localhost:3000/api/mcp   # any running server
 *
 * Without --url, a standalone server (scripts/serve.ts) is spawned in its own
 * process so client and server do not share an event loop. Do not aim this at
 * production: it is rate limited (30 req/min per IP) and you would only
 * measure the limiter.
 */
import type { ChildProcess } from 'node:child_process'
import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { parseOptions } from './load/config'
import { type LoadReport, printStage, summarizeProfile } from './load/report'
import { runStage } from './load/stage'
import { spawnStandaloneServer, stopStandaloneServer } from './spawn-server'

/**
 * Current 1-minute load average rounded to 0.1.
 *
 * @returns Load average.
 */
function loadAverage(): number {
  return Math.round(os.loadavg()[0] * 10) / 10
}

/**
 * Attach the CPU hot-spot summary when a profile was captured.
 *
 * @param report - Report to update.
 * @param profileDir - Directory the server wrote its .cpuprofile to.
 */
function attachProfile(report: LoadReport, profileDir: string | undefined): void {
  if (!profileDir || !existsSync(profileDir)) return
  const file = readdirSync(profileDir).find(name => name.endsWith('.cpuprofile'))
  if (!file) return
  report.profileTop = summarizeProfile(path.join(profileDir, file))
  console.log(`\n== Server CPU hot spots (self time) — ${path.join(profileDir, file)}`)
  console.table(report.profileTop)
}

/**
 * Run the load test end to end.
 */
async function main(): Promise<void> {
  const options = parseOptions(process.argv.slice(2))
  const outDir = path.dirname(options.out)
  mkdirSync(outDir, { recursive: true })
  const profileDir = options.profile
    ? path.join(outDir, 'profiles', path.basename(options.out, '.json'))
    : undefined
  if (profileDir) mkdirSync(profileDir, { recursive: true })

  let child: ChildProcess | undefined
  let url = options.url
  if (!url) {
    ;({ child, url } = await spawnStandaloneServer(profileDir))
  } else if (options.profile) {
    console.warn('--profile only applies to the spawned local server; ignoring for --url.')
  }

  console.log(`Target ${url} | era ${options.era} | ${options.durationSeconds}s per stage`)
  const baseline: LoadReport | undefined = options.compare
    ? JSON.parse(readFileSync(options.compare, 'utf-8'))
    : undefined

  // Warm up caches (rule corpus, skills, schema compilation) before measuring.
  await runStage(url, 2, { ...options, durationSeconds: 2 })

  const cpus = os.cpus().length
  const report: LoadReport = {
    createdAt: new Date().toISOString(),
    target: url,
    machine: { cpus, loadStart: loadAverage() },
    era: options.era,
    stages: []
  }
  if (report.machine.loadStart > cpus) {
    console.warn(
      `⚠ Machine is busy (load ${report.machine.loadStart} on ${cpus} CPUs): wall-clock numbers are noisy; compare server CPU ms/req instead.`
    )
  }

  for (const concurrency of options.concurrency) {
    const stage = await runStage(url, concurrency, options)
    report.stages.push(stage)
    printStage(
      stage,
      baseline?.stages.find(previous => previous.concurrency === concurrency)
    )
  }

  if (child) await stopStandaloneServer(child)
  attachProfile(report, profileDir)

  report.machine.loadEnd = loadAverage()
  writeFileSync(options.out, `${JSON.stringify(report, null, 2)}\n`)
  console.log(`\nReport: ${options.out}`)

  if (report.stages.some(stage => stage.errorRate > 1)) {
    console.error('Error rate above 1% in at least one stage.')
    process.exitCode = 1
  }
}

main().catch(error => {
  console.error(error)
  process.exit(1)
})
