import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import path from 'node:path'
import { z } from 'zod'
import { budgetViolations } from './efficiency/measure'
import { measureEfficiency } from './efficiency/run'

/** Run deterministic context budgets plus generous local timing ceilings. */
async function main(): Promise<void> {
  const args = process.argv.slice(2).filter(arg => arg !== '--')
  if (args.length !== 0 && (args.length !== 2 || args[0] !== '--out'))
    throw new Error('Usage: efficiency [--out report.json]')
  const repoRoot = path.resolve(__dirname, '../../..')
  const report = await measureEfficiency(repoRoot)
  const positive = z.number().positive()
  const budgets = z
    .object({
      definitionTokens: positive,
      instructionTokens: positive,
      scenarios: z.record(
        z.string(),
        z.object({
          textTokens: positive,
          structuredTokens: positive,
          wireBytes: positive,
          p95Ms: positive
        })
      )
    })
    .parse(JSON.parse(readFileSync(path.join(__dirname, 'efficiency/budgets.json'), 'utf8')))
  const violations = [
    ...budgetViolations(report.samples, budgets.scenarios),
    ...report.corpusWarnings
  ]
  if (report.definitionContext.tokens > budgets.definitionTokens)
    violations.push('Tool definition context exceeds token budget')
  if (report.instructions.tokens > budgets.instructionTokens)
    violations.push('Server instructions exceed token budget')
  if (report.toolCount !== 11) violations.push(`Expected 11 tools; found ${report.toolCount}`)
  const output = { ...report, passed: violations.length === 0, violations }
  if (args[1]) {
    const out = path.resolve(args[1])
    mkdirSync(path.dirname(out), { recursive: true })
    writeFileSync(out, `${JSON.stringify(output, null, 2)}\n`)
  }
  console.log(JSON.stringify(output, null, 2))
  if (violations.length) process.exitCode = 1
}
main().catch(error => {
  console.error(error)
  process.exitCode = 1
})
