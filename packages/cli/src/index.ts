/**
 * Front-End Checklist CLI — agent-first by design:
 * JSON when piped, stable exit codes, no prompts, `schema` for discovery.
 */
import { type CliOptions, EXIT, parseCliArgs, UsageError } from './args'
import { runAudit } from './commands/audit'
import { runCategories, runChecklist, runChecklists, runRule, runSearch } from './commands/lookup'
import { runReview } from './commands/review'
import { loadContent } from './content'
import { writeJson } from './output'
import { buildSchema, readSkill, renderHelp } from './spec'

/** Replaced at build time; the dev fallback reads package.json. */
declare const __CLI_VERSION__: string | undefined
const VERSION = typeof __CLI_VERSION__ === 'string' ? __CLI_VERSION__ : '0.0.0-dev'

/**
 * Run one command and return its exit code.
 *
 * @param options - Parsed CLI options.
 * @returns Exit code.
 */
async function dispatch(options: CliOptions): Promise<number> {
  switch (options.command) {
    case 'schema':
      writeJson(buildSchema(VERSION))
      return EXIT.ok
    case 'skill':
      process.stdout.write(readSkill())
      return EXIT.ok
    case 'review':
      return runReview(options, loadContent().rules)
    case 'audit':
      return runAudit(options, loadContent().rules)
    case 'search':
      return runSearch(options, loadContent())
    case 'rule':
      return runRule(options, loadContent())
    case 'checklists':
      return runChecklists(options, loadContent())
    case 'checklist':
      return runChecklist(options, loadContent())
    case 'categories':
      return runCategories(options, loadContent())
    default:
      throw new UsageError(
        options.command ? `Unknown command "${options.command}".` : 'Missing command.'
      )
  }
}

/**
 * Report an error in the active output mode and return the exit code.
 *
 * @param error - Thrown value.
 * @param json - Whether output is JSON.
 * @returns Exit code.
 */
function reportError(error: unknown, json: boolean): number {
  const message = error instanceof Error ? error.message : String(error)
  const usage = error instanceof UsageError
  if (json) writeJson({ error: message, ...(usage ? { hint: 'frontendchecklist schema' } : {}) })
  process.stderr.write(
    `frontendchecklist: ${message}\n${usage ? 'Run `frontendchecklist --help`.\n' : ''}`
  )
  return EXIT.usage
}

/**
 * Entry point.
 */
async function main(): Promise<void> {
  const isTty = process.stdout.isTTY === true
  let options: CliOptions
  try {
    options = parseCliArgs(process.argv.slice(2), isTty)
  } catch (error) {
    process.exitCode = reportError(error, !isTty)
    return
  }

  if (options.version) {
    process.stdout.write(`${VERSION}\n`)
    return
  }
  if (options.help || (!options.command && isTty)) {
    process.stdout.write(`${renderHelp(VERSION)}\n`)
    return
  }

  try {
    process.exitCode = await dispatch(options)
  } catch (error) {
    process.exitCode = reportError(error, options.format === 'json')
  }
}

main()
