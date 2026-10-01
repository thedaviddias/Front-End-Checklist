import type { Priority } from '@repo/types'
import type { OutputFormat } from './args'

/** One finding, normalized across `review` (per file) and `audit` (per URL). */
export interface Finding {
  target: string
  rule: string
  title: string
  priority: Priority
  issue: string
  fix?: string
}

/**
 * Write a JSON document to stdout (machine-readable contract).
 *
 * @param value - Serializable value.
 */
export function writeJson(value: unknown): void {
  process.stdout.write(`${JSON.stringify(value, null, 2)}\n`)
}

/**
 * Write plain lines to stdout.
 *
 * @param lines - Lines to print.
 */
export function writeLines(lines: string[]): void {
  process.stdout.write(`${lines.join('\n')}\n`)
}

/**
 * Escape text for HTML output.
 *
 * @param text - Raw text.
 * @returns Escaped text.
 */
function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

/**
 * Render findings as Markdown.
 *
 * @param title - Report heading.
 * @param findings - Findings to list.
 * @returns Markdown text.
 */
function findingsMarkdown(title: string, findings: Finding[]): string {
  const rows = findings.map(
    f => `| ${f.priority} | \`${f.rule}\` | ${f.target} | ${f.issue.replace(/\|/g, '\\|')} |`
  )
  return [
    `# ${title}`,
    '',
    `${findings.length} issue(s).`,
    '',
    '| Priority | Rule | Target | Issue |',
    '| --- | --- | --- | --- |',
    ...rows
  ].join('\n')
}

/**
 * Render findings as a standalone HTML page.
 *
 * @param title - Report heading.
 * @param findings - Findings to list.
 * @returns HTML document.
 */
function findingsHtml(title: string, findings: Finding[]): string {
  const rows = findings
    .map(
      f =>
        `<tr><td>${escapeHtml(f.priority)}</td><td><code>${escapeHtml(f.rule)}</code></td><td>${escapeHtml(f.target)}</td><td>${escapeHtml(f.issue)}</td></tr>`
    )
    .join('\n')
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><title>${escapeHtml(title)}</title></head><body><h1>${escapeHtml(title)}</h1><table><thead><tr><th>Priority</th><th>Rule</th><th>Target</th><th>Issue</th></tr></thead><tbody>${rows}</tbody></table></body></html>`
}

/**
 * Render findings for a terminal.
 *
 * @param title - Report heading.
 * @param findings - Findings to list.
 * @returns Lines of text.
 */
function findingsText(title: string, findings: Finding[]): string[] {
  if (findings.length === 0) return [title, '', 'No provable static issues found.']
  return [
    title,
    '',
    ...findings.map(
      f => `[${f.priority.toUpperCase()}] ${f.title} (${f.rule}) — ${f.target}\n  ${f.issue}`
    ),
    '',
    `${findings.length} issue(s). Details: frontendchecklist rule <slug>`
  ]
}

/**
 * Print a findings report in the requested format.
 *
 * @param format - Output format.
 * @param title - Report heading.
 * @param findings - Findings to print.
 * @param payload - Full JSON payload for `json` output.
 */
export function printFindings(
  format: OutputFormat,
  title: string,
  findings: Finding[],
  payload: unknown
): void {
  if (format === 'json') {
    writeJson(payload)
  } else if (format === 'md') {
    writeLines([findingsMarkdown(title, findings)])
  } else if (format === 'html') {
    writeLines([findingsHtml(title, findings)])
  } else {
    writeLines(findingsText(title, findings))
  }
}
