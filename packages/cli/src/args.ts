import { parseArgs } from 'node:util'
import { CATEGORIES, type Category, type Priority } from '@repo/types'

export const PRIORITIES: readonly Priority[] = ['critical', 'high', 'medium', 'low']

export type OutputFormat = 'json' | 'text' | 'md' | 'html'

export interface CliOptions {
  command: string
  positionals: string[]
  format: OutputFormat
  focus: Category[]
  minPriority: Priority
  failOn?: Priority
  limit: number
  save: boolean
  help: boolean
  version: boolean
}

/** Exit codes are part of the CLI contract; see `frontendchecklist schema`. */
export const EXIT = { ok: 0, violations: 1, usage: 2 } as const

/** Thrown for bad input; mapped to exit code 2 with a JSON-friendly message. */
export class UsageError extends Error {}

/**
 * Check whether a value is a supported rule priority.
 *
 * @param value - Candidate value.
 * @returns True for critical, high, medium, or low.
 */
export function isPriority(value: unknown): value is Priority {
  return PRIORITIES.some(priority => priority === value)
}

/**
 * Check whether a value is a supported rule category.
 *
 * @param value - Candidate value.
 * @returns True for a known category slug.
 */
function isCategory(value: string): value is Category {
  return CATEGORIES.some(category => category === value)
}

/**
 * Parse a comma-separated category list, rejecting unknown categories.
 *
 * @param value - Raw flag value.
 * @returns Category slugs.
 */
function parseFocus(value: string | undefined): Category[] {
  if (!value) return []
  const focus: Category[] = []
  for (const raw of value.split(',')) {
    const category = raw.trim().toLowerCase()
    if (!category) continue
    if (!isCategory(category)) {
      throw new UsageError(`Unknown category "${category}". Valid: ${CATEGORIES.join(', ')}`)
    }
    focus.push(category)
  }
  return focus
}

/**
 * Parse an optional priority flag.
 *
 * @param flag - Flag name, for error messages.
 * @param value - Raw flag value.
 * @returns The priority, or undefined when absent.
 */
function parsePriority(flag: string, value: string | undefined): Priority | undefined {
  if (value === undefined) return undefined
  if (!isPriority(value)) {
    throw new UsageError(`--${flag} must be one of: ${PRIORITIES.join(', ')}`)
  }
  return value
}

/**
 * Resolve the output format. Machine-readable JSON is the default whenever
 * stdout is not a terminal, so agents and pipes never get decorated text.
 *
 * @param json - Whether --json was passed.
 * @param format - Raw --format value.
 * @param isTty - Whether stdout is a terminal.
 * @returns Output format.
 */
function parseFormat(json: boolean, format: string | undefined, isTty: boolean): OutputFormat {
  if (json) return 'json'
  if (format === undefined) return isTty ? 'text' : 'json'
  if (format === 'console') return 'text' // pre-1.0 name
  if (format === 'json' || format === 'text' || format === 'md' || format === 'html') return format
  throw new UsageError('--format must be one of: json, text, md, html')
}

/**
 * Read a string flag value from parseArgs output.
 *
 * @param values - Parsed flag values.
 * @param key - Flag name.
 * @returns The string value, or undefined when absent.
 */
function stringValue(values: Record<string, unknown>, key: string): string | undefined {
  const value = values[key]
  return typeof value === 'string' ? value : undefined
}

/**
 * Parse process arguments into CLI options.
 *
 * @param argv - Arguments after the executable and script path.
 * @param isTty - Whether stdout is a terminal.
 * @returns Parsed options.
 */
export function parseCliArgs(argv: string[], isTty: boolean): CliOptions {
  let parsed: ReturnType<typeof parseArgs>
  try {
    parsed = parseArgs({
      args: argv,
      allowPositionals: true,
      strict: true,
      options: {
        json: { type: 'boolean', default: false },
        format: { type: 'string', short: 'f' },
        focus: { type: 'string', short: 'c' },
        // Pre-1.0 flag name, kept as an alias of --focus.
        categories: { type: 'string' },
        'min-priority': { type: 'string' },
        'fail-on': { type: 'string' },
        limit: { type: 'string', short: 'n' },
        save: { type: 'boolean', default: false },
        help: { type: 'boolean', short: 'h', default: false },
        version: { type: 'boolean', short: 'v', default: false }
      }
    })
  } catch (error) {
    throw new UsageError(error instanceof Error ? error.message : String(error))
  }

  const { values, positionals } = parsed
  const limit = Number(stringValue(values, 'limit') ?? 10)
  if (!Number.isInteger(limit) || limit < 1 || limit > 100) {
    throw new UsageError('--limit must be an integer between 1 and 100')
  }

  return {
    command: positionals[0] ?? '',
    positionals: positionals.slice(1),
    format: parseFormat(values.json === true, stringValue(values, 'format'), isTty),
    focus: parseFocus(stringValue(values, 'focus') ?? stringValue(values, 'categories')),
    minPriority: parsePriority('min-priority', stringValue(values, 'min-priority')) ?? 'low',
    failOn: parsePriority('fail-on', stringValue(values, 'fail-on')),
    limit,
    save: values.save === true,
    help: values.help === true,
    version: values.version === true
  }
}

/**
 * Check whether an issue priority meets or exceeds a threshold.
 *
 * @param priority - Issue priority.
 * @param threshold - Minimum priority that counts.
 * @returns True when the issue is at or above the threshold.
 */
export function meetsPriority(priority: Priority, threshold: Priority): boolean {
  return PRIORITIES.indexOf(priority) <= PRIORITIES.indexOf(threshold)
}
