/** Independent MCP A/B benchmark CLI. Never calls a model or executes candidate code. */
import * as fs from 'node:fs'
import * as os from 'node:os'
import * as path from 'node:path'
import { IMPACT_TASKS } from '../../packages/mcp/scripts/impact/cases'
import { scoreTask } from '../../packages/mcp/scripts/impact/score'
import { initBenchmark, scoreBenchmark } from '../../packages/mcp/scripts/impact/workspace'

/** Challenge all references, broken inputs, deletion, and workspace lifecycle. */
function selfTest(): void {
  for (const task of IMPACT_TASKS) {
    if (!scoreTask(task, task.reference, null).automatedPass)
      throw new Error(`Reference failed: ${task.id}`)
    if (scoreTask(task, task.initial, null).automatedPass !== task.control)
      throw new Error(`Baseline failed: ${task.id}`)
    for (const code of [null, '', '<!-- removed -->']) {
      if (scoreTask(task, code, null).automatedPass) throw new Error(`Deletion passed: ${task.id}`)
    }
  }
  const parent = fs.mkdtempSync(path.join(os.tmpdir(), 'mcp-impact-'))
  try {
    const root = path.join(parent, 'run')
    initBenchmark(root, 'all')
    for (const task of IMPACT_TASKS) {
      fs.writeFileSync(path.join(root, 'with-mcp', task.id, 'candidate.html'), task.reference)
    }
    const report = scoreBenchmark(root)
    if (
      report.withMcp.summary.automatedSuccessRate !== 1 ||
      report.comparisonValid ||
      report.verifiedSuccessDelta !== null
    ) {
      throw new Error('Fixture success must not masquerade as a verified agent result')
    }
    console.log(
      `Self-test passed: ${IMPACT_TASKS.length} tasks; references, baselines, deletion and unverified-run guards.`
    )
  } finally {
    fs.rmSync(parent, { recursive: true, force: true })
  }
}

/** Parse a small, explicit command surface without silent fallback on unknown flags. */
function main(): void {
  const args = process.argv.slice(2).filter(arg => arg !== '--')
  const [command, directory, flag, split = 'development'] = args
  if (command === '--self-test' && args.length === 1) {
    selfTest()
    return
  }
  if (
    command === '--init' &&
    directory &&
    (args.length === 2 || (args.length === 4 && flag === '--split')) &&
    (split === 'development' || split === 'held-out' || split === 'all')
  ) {
    initBenchmark(directory, split)
    console.log(`Created ${split} benchmark: ${path.resolve(directory)}`)
    return
  }
  if (command === '--score' && directory && args.length === 2) {
    console.log(JSON.stringify(scoreBenchmark(directory), null, 2))
    return
  }
  throw new Error(
    'Usage: pnpm mcp:impact -- --init <dir> [--split development|held-out|all] | --score <dir> | --self-test'
  )
}

try {
  main()
} catch (error) {
  console.error(error instanceof Error ? error.message : String(error))
  process.exitCode = 1
}
