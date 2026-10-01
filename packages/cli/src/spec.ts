import { existsSync, readFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { EXIT } from './args'

interface CommandSpec {
  name: string
  usage: string
  summary: string
  examples: string[]
}

/** Single source of truth for `--help` and `frontendchecklist schema`. */
export const COMMANDS: CommandSpec[] = [
  {
    name: 'review',
    usage: 'review <paths...|-> [--focus a,b] [--min-priority p] [--fail-on p]',
    summary:
      'Static heuristic review of local HTML/CSS/JS/JSX/TSX/Vue/Svelte/Astro files or stdin (directories are walked; node_modules, dist, .git skipped).',
    examples: [
      'frontendchecklist review src/',
      'frontendchecklist review index.html --fail-on high',
      'git diff --cached | frontendchecklist review - --json'
    ]
  },
  {
    name: 'audit',
    usage: 'audit <https-url> [--focus a,b] [--fail-on p] [--save]',
    summary:
      'Fetch a public https page and review its HTML. Private/localhost addresses are refused.',
    examples: ['frontendchecklist audit https://example.com --fail-on critical']
  },
  {
    name: 'search',
    usage: 'search [query...] [--focus a,b] [--limit n]',
    summary: 'Find rules by keyword, technology, or category.',
    examples: [
      'frontendchecklist search "image formats"',
      'frontendchecklist search --focus accessibility'
    ]
  },
  {
    name: 'rule',
    usage: 'rule <slug>',
    summary: 'Full rule: why it matters, how to check it, how to fix it, sources.',
    examples: ['frontendchecklist rule alt-text']
  },
  {
    name: 'checklists',
    usage: 'checklists',
    summary: 'List curated checklists (launch, accessibility, performance, ...).',
    examples: ['frontendchecklist checklists']
  },
  {
    name: 'checklist',
    usage: 'checklist <slug>',
    summary: 'Every rule in a curated checklist, ordered for review.',
    examples: ['frontendchecklist checklist launch-checklist']
  },
  {
    name: 'categories',
    usage: 'categories',
    summary: 'Rule categories with rule counts.',
    examples: ['frontendchecklist categories']
  },
  {
    name: 'schema',
    usage: 'schema',
    summary: 'This command reference as JSON, for agents and tooling.',
    examples: ['frontendchecklist schema']
  },
  {
    name: 'skill',
    usage: 'skill',
    summary: 'Print the bundled agent skill (SKILL.md) that teaches agents to use this CLI.',
    examples: ['frontendchecklist skill > .claude/skills/frontendchecklist/SKILL.md']
  }
]

export const GLOBAL_FLAGS = [
  { flag: '--json', description: 'Force JSON output (the default when stdout is not a terminal).' },
  { flag: '--format, -f', description: 'json | text | md | html (md/html for review and audit).' },
  { flag: '--focus, -c', description: 'Comma-separated categories, e.g. accessibility,seo.' },
  {
    flag: '--min-priority',
    description: 'Lowest priority to report: critical | high | medium | low (default low).'
  },
  {
    flag: '--fail-on',
    description: 'Exit 1 when any finding is at or above this priority (review, audit).'
  },
  { flag: '--limit, -n', description: 'Max results for search (1-100, default 10).' },
  {
    flag: '--save',
    description: 'audit only: save the report to frontendchecklist.io and print its URL.'
  },
  { flag: '--help, -h', description: 'Show help.' },
  { flag: '--version, -v', description: 'Show version.' }
]

/**
 * Build the machine-readable command reference.
 *
 * @param version - CLI version.
 * @returns Schema document.
 */
export function buildSchema(version: string) {
  return {
    name: 'frontendchecklist',
    version,
    description: 'Front-End Checklist rules, reviews, and audits from the command line.',
    output:
      'JSON on stdout when not a TTY or with --json; human text otherwise. Logs and errors go to stderr.',
    exitCodes: {
      [EXIT.ok]: 'success, or no findings at/above --fail-on',
      [EXIT.violations]: 'findings at/above --fail-on (review, audit)',
      [EXIT.usage]: 'usage or runtime error (JSON {"error": ...} on stdout when output is JSON)'
    },
    commands: COMMANDS,
    flags: GLOBAL_FLAGS
  }
}

/**
 * Render human help text.
 *
 * @param version - CLI version.
 * @returns Help text.
 */
export function renderHelp(version: string): string {
  return [
    `frontendchecklist ${version} — Front-End Checklist from the command line`,
    '',
    'Commands:',
    ...COMMANDS.map(c => `  ${c.usage}\n      ${c.summary}`),
    '',
    'Flags:',
    ...GLOBAL_FLAGS.map(f => `  ${f.flag.padEnd(18)} ${f.description}`),
    '',
    'Exit codes: 0 ok · 1 findings at/above --fail-on · 2 usage or runtime error',
    'Agents: run `frontendchecklist schema` for this reference as JSON.'
  ].join('\n')
}

/**
 * Read the bundled SKILL.md (package root in both dev and published layouts).
 *
 * @returns SKILL.md text.
 */
export function readSkill(): string {
  const here = path.dirname(fileURLToPath(import.meta.url))
  const candidate = [path.join(here, '../SKILL.md'), path.join(here, '../../SKILL.md')].find(
    existsSync
  )
  if (!candidate) throw new Error('SKILL.md is missing from this installation.')
  return readFileSync(candidate, 'utf-8')
}
