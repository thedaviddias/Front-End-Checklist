import type { CuratedChecklist } from '@repo/types'
import { getToolDefinitions } from '../../src/server-tools'

/**
 * Tool-description lint.
 *
 * Agents pick tools from the name + description + input schema alone, so these are the
 * MCP server's real "prompt". The checks below encode the guidance from Anthropic's
 * "Writing effective tools for agents": say what the tool returns, when to use it (and
 * which sibling to use instead), document every parameter, and avoid emphatic wording
 * that makes models over-trigger a tool. The tool-choice eval
 * (`pnpm --filter @repo/mcp eval:tools`) measures whether models actually pick right.
 */

interface JsonSchemaProperty {
  type?: string | string[]
  description?: string
  enum?: readonly unknown[]
  minimum?: number
  maximum?: number
  default?: unknown
}

const CHECKLIST: CuratedChecklist = {
  id: 'launch-checklist',
  slug: 'launch-checklist',
  title: 'Launch Checklist',
  description: 'Fixture checklist used to build checklist-backed tools.',
  icon: 'check',
  rules: ['html/doctype'],
  language: 'en',
  url: '/checklists/launch-checklist'
}

const definitions = getToolDefinitions([CHECKLIST])
const toolNames = new Set(definitions.map(definition => definition.name))

/** Combined description budget: every connected client pays these tokens on each turn. */
const TOTAL_DESCRIPTION_BUDGET = 5500
const DESCRIPTION_LENGTH = { min: 150, max: 650 }
const PARAMETER_DESCRIPTION_MIN = 25
/** Jaccard similarity above which two descriptions are too alike to tell apart. */
const MAX_SIBLING_OVERLAP = 0.35

/** All-caps words that are legitimate acronyms rather than emphasis. */
const ACRONYMS = new Set(['HTML', 'CSS', 'JSON', 'MDX', 'URL', 'URLS', 'SEO', 'HTTPS', 'ARIA'])
const STOPWORDS = new Set(
  'the and for with from that this when use one its are not but you your into than then also only each every rule rules tool code'.split(
    ' '
  )
)

/**
 * Lowercased content words of a description, for overlap scoring.
 *
 * @param text - Description text.
 * @returns Set of distinct content words.
 */
function contentWords(text: string): Set<string> {
  return new Set((text.toLowerCase().match(/[a-z]{3,}/g) ?? []).filter(w => !STOPWORDS.has(w)))
}

/**
 * Jaccard similarity of two word sets.
 *
 * @param a - First set.
 * @param b - Second set.
 * @returns Similarity in [0, 1].
 */
function jaccard(a: Set<string>, b: Set<string>): number {
  const shared = [...a].filter(word => b.has(word)).length
  return shared / (a.size + b.size - shared)
}

/**
 * Input-schema properties of a tool definition.
 *
 * @param definition - Tool definition.
 * @returns Property name → schema entries.
 */
function properties(definition: (typeof definitions)[number]): [string, JsonSchemaProperty][] {
  const schema: { properties?: Record<string, JsonSchemaProperty> } = definition.inputSchema
  return Object.entries(schema.properties ?? {})
}

describe('MCP tool descriptions', () => {
  it.each(definitions.map(d => [d.name, d]))('%s stays within the length budget', (_, d) => {
    expect(d.description.length).toBeGreaterThanOrEqual(DESCRIPTION_LENGTH.min)
    expect(d.description.length).toBeLessThanOrEqual(DESCRIPTION_LENGTH.max)
  })

  it('keeps the combined description budget small', () => {
    const total = definitions.reduce((sum, d) => sum + d.description.length, 0)
    expect(total).toBeLessThanOrEqual(TOTAL_DESCRIPTION_BUDGET)
  })

  it.each(definitions.map(d => [d.name, d]))('%s says when to use it', (_, d) => {
    expect(d.description).toMatch(/\bUse (it|this) (when|to|after|for|as|instead)\b/)
  })

  it.each(definitions.map(d => [d.name, d]))('%s avoids emphatic all-caps wording', (_, d) => {
    const shouted = (d.description.match(/\b[A-Z]{4,}\b/g) ?? []).filter(w => !ACRONYMS.has(w))
    expect(shouted).toEqual([])
    expect(d.description).not.toMatch(/\*\*/)
  })

  it.each(definitions.map(d => [d.name, d]))('%s only references tools that exist', (_, d) => {
    const referenced = d.description.match(/\b[a-z]+(?:_[a-z]+)+\b/g) ?? []
    expect(referenced.filter(name => !toolNames.has(name))).toEqual([])
  })

  it.each(definitions.map(d => [d.name, d]))('%s documents every parameter', (_, d) => {
    const required: string[] = d.inputSchema.required ?? []
    const props = properties(d)
    const problems = required
      .filter(name => !props.some(([prop]) => prop === name))
      .map(name => `${name}: required but not defined`)

    for (const [name, schema] of props) {
      if ((schema.description?.length ?? 0) < PARAMETER_DESCRIPTION_MIN) {
        problems.push(`${name}: description shorter than ${PARAMETER_DESCRIPTION_MIN} chars`)
      }
      const isNumber = schema.type === 'integer' || schema.type === 'number'
      if (isNumber && (schema.minimum === undefined || schema.maximum === undefined)) {
        problems.push(`${name}: numeric input without minimum/maximum`)
      }
      const statesDefault =
        schema.default !== undefined || /default/i.test(schema.description ?? '')
      const needsDefault = schema.enum !== undefined || isNumber || schema.type === 'boolean'
      if (!required.includes(name) && needsDefault && !statesDefault) {
        problems.push(`${name}: optional input does not state its default`)
      }
    }
    expect(problems).toEqual([])
  })

  it('keeps sibling descriptions distinguishable', () => {
    const tooSimilar: string[] = []
    for (let i = 0; i < definitions.length; i++) {
      for (let j = i + 1; j < definitions.length; j++) {
        const score = jaccard(
          contentWords(definitions[i].description),
          contentWords(definitions[j].description)
        )
        if (score > MAX_SIBLING_OVERLAP) {
          tooSimilar.push(`${definitions[i].name} ~ ${definitions[j].name}: ${score.toFixed(2)}`)
        }
      }
    }
    expect(tooSimilar).toEqual([])
  })
})
