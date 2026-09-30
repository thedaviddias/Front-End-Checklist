import type { McpServer } from '@modelcontextprotocol/server'

/** MCP Apps extension identifier (SEP-1865). */
export const APPS_EXTENSION = 'io.modelcontextprotocol/ui'
export const MCP_APP_MIME_TYPE = 'text/html;profile=mcp-app'
export const REVIEW_REPORT_UI_URI = 'ui://frontend-checklist/review-report'

/** Tools whose `ReviewCodeResult` payload the review report view renders. */
export const REVIEW_REPORT_TOOLS = new Set(['review_code', 'audit_url'])

/**
 * Self-contained report view. It speaks the MCP Apps postMessage dialect
 * directly (no bundled SDK, no external resources, so the host's default CSP
 * applies) and renders only through `textContent`, because issue text can echo
 * content from an audited page.
 */
const REVIEW_REPORT_HTML = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Front-End Checklist report</title>
<style>
  :root {
    color-scheme: light dark;
    --bg: var(--color-background-primary, Canvas);
    --fg: var(--color-text-primary, CanvasText);
    --muted: var(--color-text-secondary, GrayText);
    --border: var(--color-border-primary, color-mix(in srgb, CanvasText 15%, transparent));
    --critical: var(--color-text-danger, #c62828);
    --high: var(--color-text-warning, #b45309);
    --medium: var(--color-text-info, #1d4ed8);
    --low: var(--color-text-secondary, #6b7280);
  }
  * { box-sizing: border-box; }
  body { margin: 0; padding: 16px; background: var(--bg); color: var(--fg);
    font: 14px/1.5 var(--font-sans, system-ui, sans-serif); }
  h1 { font-size: 16px; margin: 0 0 4px; }
  .source { color: var(--muted); font-size: 12px; margin: 0 0 12px; overflow-wrap: anywhere; }
  .stats { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 16px; }
  .stat { border: 1px solid var(--border); border-radius: 8px; padding: 6px 10px; min-width: 88px; }
  .stat b { display: block; font-size: 18px; }
  .stat span { color: var(--muted); font-size: 12px; }
  ul { list-style: none; margin: 0; padding: 0; display: grid; gap: 8px; }
  li { border: 1px solid var(--border); border-radius: 8px; padding: 10px 12px; }
  .badge { display: inline-block; font-size: 11px; font-weight: 600; text-transform: uppercase;
    letter-spacing: .04em; margin-right: 8px; }
  .critical { color: var(--critical); } .high { color: var(--high); }
  .medium { color: var(--medium); } .low { color: var(--low); }
  .rule { color: var(--muted); font-size: 12px; font-family: var(--font-mono, ui-monospace, monospace); }
  .issue { margin: 4px 0 0; }
  .empty, .suggestions { color: var(--muted); }
  .suggestions { margin-top: 16px; font-size: 13px; }
</style>
</head>
<body>
<main id="app"><p class="empty">Waiting for the review result…</p></main>
<script>
(() => {
  const app = document.getElementById('app')
  let nextId = 1

  const post = message => window.parent.postMessage({ jsonrpc: '2.0', ...message }, '*')

  /**
   * Create an element whose text is set via textContent (never parsed as HTML).
   *
   * @param tag - Element tag name.
   * @param className - Optional class list.
   * @param text - Optional text content.
   * @returns The new element.
   */
  const el = (tag, className, text) => {
    const node = document.createElement(tag)
    if (className) node.className = className
    if (text !== undefined) node.textContent = String(text)
    return node
  }

  const render = result => {
    const data = result && result.structuredContent
    app.replaceChildren()
    if (!data || !data.summary) {
      const text = result && result.content && result.content[0] && result.content[0].text
      app.append(el('p', 'empty', (data && (data.error || data.message)) || text || 'No report data.'))
      return
    }

    app.append(el('h1', '', data.source ? 'Page audit' : 'Code review'))
    if (data.source && data.source.url) app.append(el('p', 'source', data.source.url))

    const stats = el('div', 'stats')
    for (const [label, value] of [
      ['Issues', data.summary.issuesFound],
      ['Critical', data.summary.criticalIssues],
      ['High', data.summary.highIssues],
      ['Checks', data.summary.totalChecks]
    ]) {
      const stat = el('div', 'stat')
      stat.append(el('b', '', value ?? 0), el('span', '', label))
      stats.append(stat)
    }
    app.append(stats)

    const issues = Array.isArray(data.issues) ? data.issues : []
    if (issues.length === 0) {
      app.append(el('p', 'empty', 'No provable static issues found.'))
    } else {
      const list = el('ul')
      for (const issue of issues) {
        const item = el('li')
        const priority = ['critical', 'high', 'medium', 'low'].includes(issue.priority)
          ? issue.priority
          : 'low'
        const heading = el('div')
        heading.append(el('span', 'badge ' + priority, priority), el('strong', '', issue.title))
        item.append(heading, el('div', 'rule', issue.rule), el('p', 'issue', issue.issue))
        list.append(item)
      }
      app.append(list)
    }

    const suggestions = Array.isArray(data.suggestions) ? data.suggestions : []
    if (suggestions.length > 0) {
      app.append(el('p', 'suggestions', suggestions.join(' ')))
    }
  }

  const applyHostContext = context => {
    const variables = context && context.styles && context.styles.variables
    if (variables) {
      for (const [key, value] of Object.entries(variables)) {
        if (key.startsWith('--') && typeof value === 'string') {
          document.documentElement.style.setProperty(key, value)
        }
      }
    }
    if (context && context.theme) document.documentElement.style.colorScheme = context.theme
  }

  window.addEventListener('message', event => {
    const message = event.data
    if (!message || message.jsonrpc !== '2.0') return

    if (message.id === 1 && message.result) {
      applyHostContext(message.result.hostContext)
      post({ method: 'ui/notifications/initialized', params: {} })
      return
    }
    if (message.method === 'ui/notifications/tool-result') render(message.params)
    if (message.method === 'ui/notifications/host-context-changed') applyHostContext(message.params)
  })

  post({
    id: nextId++,
    method: 'ui/initialize',
    params: {
      protocolVersion: '2026-01-26',
      appInfo: { name: 'frontend-checklist-review-report', version: '1.0.0' },
      appCapabilities: { availableDisplayModes: ['inline'] }
    }
  })

  let lastHeight = 0
  new ResizeObserver(() => {
    const height = Math.ceil(document.documentElement.scrollHeight)
    if (height === lastHeight) return
    lastHeight = height
    post({
      method: 'ui/notifications/size-changed',
      params: { width: Math.ceil(document.documentElement.scrollWidth), height }
    })
  }).observe(document.body)
})()
</script>
</body>
</html>
`

/**
 * `_meta` for tools that render in the review report view.
 *
 * @param toolName - Registered tool name.
 * @returns MCP Apps tool metadata, or undefined for text-only tools.
 */
export function getToolUiMeta(toolName: string): Record<string, unknown> | undefined {
  return REVIEW_REPORT_TOOLS.has(toolName)
    ? { ui: { resourceUri: REVIEW_REPORT_UI_URI } }
    : undefined
}

/**
 * Register the MCP Apps UI resource that renders review_code / audit_url results.
 * Hosts without MCP Apps support ignore it and keep using the text output.
 *
 * @param server - MCP server instance.
 */
export function registerApps(server: McpServer): void {
  server.registerResource(
    'review_report_app',
    REVIEW_REPORT_UI_URI,
    {
      title: 'Front-End Checklist Review Report',
      description: 'Interactive view of review_code and audit_url results.',
      mimeType: MCP_APP_MIME_TYPE
    },
    async () => ({
      contents: [
        {
          uri: REVIEW_REPORT_UI_URI,
          mimeType: MCP_APP_MIME_TYPE,
          text: REVIEW_REPORT_HTML,
          _meta: { ui: { prefersBorder: true } }
        }
      ]
    })
  )
}
