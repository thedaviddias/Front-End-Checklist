import { readdirSync } from 'node:fs'
import path from 'node:path'

export type Era = 'modern' | 'legacy'

export interface Options {
  url?: string
  concurrency: number[]
  durationSeconds: number
  era: Era | 'mixed'
  profile: boolean
  out: string
  compare?: string
}

export const REPO_ROOT = path.resolve(__dirname, '../../../..')

/** Sample frontend code with known issues, so review_code does real work. */
const REVIEW_SNIPPET = `<html><head><title>Shop</title></head><body>
<img src="/hero.jpg"><a href="#" onclick="go()">click here</a>
<div onclick="buy()" style="color:#999;background:#aaa">Buy now</div>
<input type="text" placeholder="Email"><button>Go</button>
<script>eval(location.hash.slice(1)); document.write('<p>hi</p>')</script>
<iframe src="https://example.com/embed"></iframe></body></html>`

const SEARCH_QUERIES = [
  'contrast',
  'images',
  'performance',
  'react',
  'forms',
  'security headers',
  'seo',
  'fonts'
]

const RULES_DIR = path.join(REPO_ROOT, 'packages/content/rules/en')

/** Real rule slugs, so get_rule / resources/read exercise the success path. */
export const RULE_SLUGS = readdirSync(RULES_DIR, { withFileTypes: true })
  .filter(entry => entry.isDirectory())
  .flatMap(entry => readdirSync(path.join(RULES_DIR, entry.name)))
  .filter(file => file.endsWith('.mdx'))
  .map(file => file.replace(/\.mdx$/, ''))

/** Weighted operation mix, roughly matching how agents use the server. */
const OPERATION_WEIGHTS: Array<[string, number]> = [
  ['connect', 5],
  ['tools/list', 15],
  ['search_rules', 25],
  ['get_rule', 20],
  ['review_code', 15],
  ['resources/read', 10],
  ['prompts/get', 5],
  ['skills/list', 5]
]

/**
 * Read the value following a CLI flag.
 *
 * @param argv - Process arguments.
 * @param flag - Flag name, e.g. `--url`.
 * @returns The flag value, or undefined when absent.
 */
function flagValue(argv: string[], flag: string): string | undefined {
  const index = argv.indexOf(flag)
  return index >= 0 ? argv[index + 1] : undefined
}

/**
 * Resolve a user-supplied path against the directory the command was run from.
 * pnpm runs package scripts from packages/mcp, so INIT_CWD is the user's cwd.
 *
 * @param file - Path from a CLI flag.
 * @returns Absolute path, or undefined when no path was given.
 */
function resolveUserPath(file: string | undefined): string | undefined {
  return file ? path.resolve(process.env.INIT_CWD ?? process.cwd(), file) : undefined
}

/**
 * Parse CLI flags into load-test options.
 *
 * @param argv - Process arguments after the script path.
 * @returns Normalized options.
 */
export function parseOptions(argv: string[]): Options {
  const eraValue = flagValue(argv, '--era')
  const era = eraValue === 'modern' || eraValue === 'legacy' ? eraValue : 'mixed'

  return {
    url: flagValue(argv, '--url'),
    concurrency: (flagValue(argv, '--concurrency') ?? '1,8,32')
      .split(',')
      .map(Number)
      .filter(n => n > 0),
    durationSeconds: Number(flagValue(argv, '--duration') ?? 10),
    era,
    profile: argv.includes('--profile'),
    out:
      resolveUserPath(flagValue(argv, '--out')) ??
      path.join(REPO_ROOT, '.mcp-load', `${new Date().toISOString().replace(/[:.]/g, '-')}.json`),
    compare: resolveUserPath(flagValue(argv, '--compare'))
  }
}

/**
 * Pick a random element.
 *
 * @param items - Candidate items.
 * @returns One item.
 */
export function pick<T>(items: T[]): T {
  return items[Math.floor(Math.random() * items.length)]
}

/**
 * Pick an operation name according to OPERATION_WEIGHTS.
 *
 * @returns Operation name.
 */
export function pickOperation(): string {
  const total = OPERATION_WEIGHTS.reduce((sum, [, weight]) => sum + weight, 0)
  let roll = Math.random() * total
  for (const [name, weight] of OPERATION_WEIGHTS) {
    roll -= weight
    if (roll <= 0) return name
  }
  return OPERATION_WEIGHTS[0][0]
}

/**
 * Build the request params for a tools/call operation.
 *
 * @param operation - Operation name.
 * @returns Tool name and arguments.
 */
export function toolCall(operation: string): { name: string; arguments: Record<string, unknown> } {
  if (operation === 'search_rules') {
    return { name: 'search_rules', arguments: { query: pick(SEARCH_QUERIES), limit: 10 } }
  }
  if (operation === 'get_rule') {
    return { name: 'get_rule', arguments: { slug: pick(RULE_SLUGS) } }
  }
  return { name: 'review_code', arguments: { code: REVIEW_SNIPPET } }
}
