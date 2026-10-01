import { readdirSync, readFileSync, statSync } from 'node:fs'
import path from 'node:path'
import { executeReviewCode } from '@repo/mcp/tools'
import type { Rule } from '@repo/types'
import { type CliOptions, EXIT, meetsPriority, UsageError } from '../args'
import { type Finding, printFindings } from '../output'

/** Files the static heuristics understand. */
const REVIEWABLE = new Set([
  '.html',
  '.htm',
  '.jsx',
  '.tsx',
  '.js',
  '.mjs',
  '.ts',
  '.vue',
  '.svelte',
  '.astro',
  '.css',
  '.scss'
])
const SKIPPED_DIRS = new Set([
  'node_modules',
  '.git',
  '.next',
  'dist',
  'build',
  'coverage',
  '.turbo'
])
const MAX_FILE_BYTES = 1024 * 1024

/**
 * Expand files and directories into reviewable file paths.
 *
 * @param target - File or directory path.
 * @returns Reviewable files (directories are walked, vendor dirs skipped).
 */
function expandTarget(target: string): string[] {
  let stats: ReturnType<typeof statSync>
  try {
    stats = statSync(target)
  } catch {
    throw new UsageError(`No such file or directory: ${target}`)
  }
  if (stats.isFile()) return [target]

  return readdirSync(target, { withFileTypes: true }).flatMap(entry => {
    const child = path.join(target, entry.name)
    if (entry.isDirectory()) return SKIPPED_DIRS.has(entry.name) ? [] : expandTarget(child)
    return REVIEWABLE.has(path.extname(entry.name)) ? [child] : []
  })
}

/**
 * Read all of stdin.
 *
 * @returns Stdin as text.
 */
async function readStdin(): Promise<string> {
  const chunks: Buffer[] = []
  for await (const chunk of process.stdin) {
    chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk)
  }
  return Buffer.concat(chunks).toString('utf-8')
}

/**
 * Collect the sources to review: files/directories, or stdin for `-` / piped input.
 *
 * @param positionals - Paths from the command line.
 * @returns Pairs of target label and source code.
 */
async function collectSources(
  positionals: string[]
): Promise<Array<{ target: string; code: string }>> {
  if (positionals.length === 0 || positionals[0] === '-') {
    if (process.stdin.isTTY) {
      throw new UsageError(
        'review needs file/directory paths, or code on stdin (e.g. `git diff | frontendchecklist review -`)'
      )
    }
    const code = await readStdin()
    if (!code.trim()) throw new UsageError('No code received on stdin.')
    return [{ target: 'stdin', code }]
  }

  return positionals
    .flatMap(expandTarget)
    .filter(file => statSync(file).size <= MAX_FILE_BYTES)
    .map(file => ({ target: file, code: readFileSync(file, 'utf-8') }))
}

/**
 * `frontendchecklist review <paths...|->` — static heuristic review of local code.
 *
 * @param options - Parsed CLI options.
 * @param rules - Rule corpus.
 * @returns Exit code.
 */
export async function runReview(options: CliOptions, rules: Rule[]): Promise<number> {
  const sources = await collectSources(options.positionals)
  const files = sources.map(({ target, code }) => {
    const result = executeReviewCode(
      {
        code,
        ...(options.focus.length > 0 ? { focus: options.focus } : {}),
        minPriority: options.minPriority
      },
      rules
    )
    return { target, ...result }
  })

  const findings: Finding[] = files.flatMap(file =>
    file.issues.map(issue => ({
      target: file.target,
      rule: issue.rule,
      title: issue.title,
      priority: issue.priority,
      issue: issue.issue,
      ...(issue.fixPrompt ? { fix: issue.fixPrompt } : {})
    }))
  )
  const failOn = options.failOn
  const failing = failOn ? findings.filter(f => meetsPriority(f.priority, failOn)) : []

  printFindings(options.format, `Front-End Checklist review — ${files.length} file(s)`, findings, {
    command: 'review',
    files: files.length,
    issues: findings.length,
    failOn: failOn ?? null,
    failing: failing.length,
    findings
  })
  return failing.length > 0 ? EXIT.violations : EXIT.ok
}
