import { SITE_URL } from '@repo/config'
import { executeAuditUrl } from '@repo/mcp/tools'
import type { Rule } from '@repo/types'
import { type CliOptions, EXIT, meetsPriority, UsageError } from '../args'
import { type Finding, printFindings } from '../output'

/**
 * Save an audit to the Front-End Checklist dashboard and return its public URL.
 *
 * @param url - Audited URL.
 * @param payload - Audit result.
 * @returns Report URL, or undefined when saving failed.
 */
async function saveReport(url: string, payload: unknown): Promise<string | undefined> {
  const baseUrl = process.env.FRONTENDCHECKLIST_BASE_URL ?? SITE_URL
  try {
    const response = await fetch(`${baseUrl}/api/audits`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url, result: payload })
    })
    if (!response.ok) return undefined
    const body: unknown = await response.json()
    const publicId =
      typeof body === 'object' && body !== null ? Reflect.get(body, 'publicId') : undefined
    return typeof publicId === 'string' ? `${baseUrl}/en/report/${publicId}` : undefined
  } catch {
    return undefined
  }
}

/**
 * `frontendchecklist audit <url>` — fetch a public https page and review its HTML.
 *
 * @param options - Parsed CLI options.
 * @param rules - Rule corpus.
 * @returns Exit code.
 */
export async function runAudit(options: CliOptions, rules: Rule[]): Promise<number> {
  const url = options.positionals[0]
  if (!url)
    throw new UsageError('audit needs a URL, e.g. `frontendchecklist audit https://example.com`')

  const result = await executeAuditUrl(
    {
      url,
      ...(options.focus.length > 0 ? { focus: options.focus } : {}),
      minPriority: options.minPriority
    },
    rules
  )
  if ('error' in result) throw new UsageError(result.error)

  const findings: Finding[] = result.issues.map(issue => ({
    target: result.source.url,
    rule: issue.rule,
    title: issue.title,
    priority: issue.priority,
    issue: issue.issue,
    ...(issue.fixPrompt ? { fix: issue.fixPrompt } : {})
  }))
  const failOn = options.failOn
  const failing = failOn ? findings.filter(f => meetsPriority(f.priority, failOn)) : []
  const reportUrl = options.save ? await saveReport(result.source.url, result) : undefined
  if (options.save && !reportUrl)
    process.stderr.write('Could not save the report to the dashboard.\n')

  printFindings(options.format, `Front-End Checklist audit — ${result.source.url}`, findings, {
    command: 'audit',
    url: result.source.url,
    summary: result.summary,
    failOn: failOn ?? null,
    failing: failing.length,
    findings,
    suggestions: result.suggestions,
    ...(reportUrl ? { reportUrl } : {})
  })
  if (reportUrl && options.format !== 'json') process.stderr.write(`Report saved: ${reportUrl}\n`)
  return failing.length > 0 ? EXIT.violations : EXIT.ok
}
