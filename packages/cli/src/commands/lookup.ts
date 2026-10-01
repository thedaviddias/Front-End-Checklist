import { SITE_URL } from '@repo/config'
import {
  executeGetChecklistRules,
  executeGetRule,
  executeListCategories,
  executeSearchRules
} from '@repo/mcp/tools'
import { type CliOptions, EXIT, UsageError } from '../args'
import type { Content } from '../content'
import { writeJson, writeLines } from '../output'

/**
 * `frontendchecklist search <query>` — find rules by keyword, category, or priority.
 *
 * @param options - Parsed CLI options.
 * @param content - Rules and checklists.
 * @returns Exit code.
 */
export function runSearch(options: CliOptions, content: Content): number {
  const query = options.positionals.join(' ').trim()
  const result = executeSearchRules(
    {
      ...(query ? { query } : {}),
      ...(options.focus.length > 0 ? { categories: options.focus } : {}),
      limit: options.limit
    },
    content.rules
  )

  if (options.format === 'json') {
    writeJson({ command: 'search', query, total: result.totalCount, rules: result.rules })
  } else {
    writeLines([
      `${result.totalCount} rule(s) match${query ? ` "${query}"` : ''}:`,
      ...result.rules.map(r => `  ${r.slug.padEnd(36)} ${r.priority.padEnd(9)} ${r.title}`),
      '',
      'Details: frontendchecklist rule <slug>'
    ])
  }
  return EXIT.ok
}

/**
 * `frontendchecklist rule <slug>` — full rule: why it matters, how to check and fix it.
 *
 * @param options - Parsed CLI options.
 * @param content - Rules and checklists.
 * @returns Exit code.
 */
export function runRule(options: CliOptions, content: Content): number {
  const slug = options.positionals[0]
  if (!slug) throw new UsageError('rule needs a slug, e.g. `frontendchecklist rule alt-text`')

  const output = executeGetRule({ slug, includeUrl: true }, content.rules)
  if (!output.success) {
    const suggestions = output.error.suggestions.map(s => s.slug)
    throw new UsageError(
      `${output.error.message}${suggestions.length > 0 ? ` Did you mean: ${suggestions.join(', ')}?` : ''}`
    )
  }

  const rule = {
    ...output.rule,
    ...(output.rule.url?.startsWith('/') ? { url: `${SITE_URL}${output.rule.url}` } : {})
  }
  if (options.format === 'json') {
    writeJson({ command: 'rule', rule })
  } else {
    writeLines([
      `# ${rule.title} (${rule.slug})`,
      `Priority: ${rule.priority} · Categories: ${rule.categories.join(', ')}${rule.url ? ` · ${rule.url}` : ''}`,
      '',
      rule.description,
      '',
      '## How to check',
      rule.prompts.check,
      '',
      '## How to fix',
      rule.prompts.fix,
      '',
      rule.content
    ])
  }
  return EXIT.ok
}

/**
 * `frontendchecklist checklists` — list curated checklists (launch, accessibility, ...).
 *
 * @param options - Parsed CLI options.
 * @param content - Rules and checklists.
 * @returns Exit code.
 */
export function runChecklists(options: CliOptions, content: Content): number {
  const checklists = content.checklists.map(c => ({
    slug: c.slug,
    title: c.title,
    description: c.description,
    rules: c.rules.length
  }))
  if (options.format === 'json') {
    writeJson({ command: 'checklists', checklists })
  } else {
    writeLines([
      ...checklists.map(
        c => `  ${c.slug.padEnd(32)} ${String(c.rules).padStart(3)} rules  ${c.title}`
      ),
      '',
      'Rules in a checklist: frontendchecklist checklist <slug>'
    ])
  }
  return EXIT.ok
}

/**
 * `frontendchecklist checklist <slug>` — every rule in a curated checklist.
 *
 * @param options - Parsed CLI options.
 * @param content - Rules and checklists.
 * @returns Exit code.
 */
export function runChecklist(options: CliOptions, content: Content): number {
  const slug = options.positionals[0]
  if (!slug)
    throw new UsageError('checklist needs a slug; list them with `frontendchecklist checklists`')

  const output = executeGetChecklistRules({ checklist: slug }, content.rules, content.checklists)
  if (!output.success) {
    const available = output.error.availableChecklists.map(c => c.slug).join(', ')
    throw new UsageError(`${output.error.message} Available: ${available}`)
  }

  if (options.format === 'json') {
    writeJson({ command: 'checklist', checklist: output.checklist, rules: output.rules })
  } else {
    writeLines([
      `# ${output.checklist.title} — ${output.checklist.totalRules} rules`,
      output.checklist.description,
      '',
      ...output.rules.map(r => `  [${r.priority.padEnd(8)}] ${r.slug.padEnd(36)} ${r.title}`)
    ])
  }
  return EXIT.ok
}

/**
 * `frontendchecklist categories` — rule categories with counts.
 *
 * @param options - Parsed CLI options.
 * @param content - Rules and checklists.
 * @returns Exit code.
 */
export function runCategories(options: CliOptions, content: Content): number {
  const { categories } = executeListCategories(content.rules)
  if (options.format === 'json') {
    writeJson({ command: 'categories', categories })
  } else {
    writeLines(
      categories.map(
        c => `  ${c.name.padEnd(16)} ${String(c.ruleCount).padStart(3)}  ${c.description}`
      )
    )
  }
  return EXIT.ok
}
