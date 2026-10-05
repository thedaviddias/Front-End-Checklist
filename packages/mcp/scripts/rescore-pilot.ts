import { readFileSync, writeFileSync } from 'node:fs'
import { z } from 'zod'
import { IMPACT_TASKS } from './impact/cases'
import { scoreModelOutput } from './impact/output-score'
import { hash } from './impact/score'

/** Re-score saved sanitized pilot output without modifying evidence or calling any model. */
function main(): void {
  const [input, output] = process.argv.slice(2)
  if (!input || !output)
    throw new Error('Usage: rescore-pilot <saved-corrected.json> <new-report.json>')
  const source = readFileSync(input, 'utf8')
  const run = z
    .object({
      status: z.literal('provisional-static-only'),
      results: z
        .array(
          z.object({
            task: z.string(),
            condition: z.enum(['without-mcp', 'with-mcp']),
            output: z.string()
          })
        )
        .min(1)
    })
    .parse(JSON.parse(source))
  const seen = new Set<string>()
  const results = run.results.map(result => {
    const task = IMPACT_TASKS.find(task => task.id === result.task)
    if (!task) throw new Error(`Unknown task ${result.task}`)
    const key = `${result.condition}:${task.id}`
    if (seen.has(key)) throw new Error(`Duplicate attempt ${key}`)
    seen.add(key)
    return {
      task: task.id,
      condition: result.condition,
      control: task.control,
      ...scoreModelOutput(task, result.output)
    }
  })
  const summary = ['without-mcp', 'with-mcp'].map(condition => {
    const rows = results.filter(result => result.condition === condition)
    return {
      condition,
      attempts: rows.length,
      formatPassed: rows.filter(row => row.formatPass).length,
      staticPassed: rows.filter(row => row.staticPass).length,
      artifactsMissing: rows.filter(row => row.artifact === null).length,
      controlPassed: rows.filter(row => row.control && row.staticPass).length,
      semanticVerified: null
    }
  })
  writeFileSync(
    output,
    `${JSON.stringify(
      {
        version: 1,
        analysis: 'post-hoc; not pre-registered model uplift',
        sourceHash: hash(source),
        extractionContract: 'raw HTML or exactly one explicit HTML fence; no competing markup',
        summary,
        results
      },
      null,
      2
    )}\n`,
    { flag: 'wx' }
  )
  console.log(JSON.stringify(summary, null, 2))
}
main()
