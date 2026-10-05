import { loadRules } from '@frontendchecklist/rules/load-rules'
import { z } from 'zod'
import { loadLocalChecklists } from '../../src/content-loader'
import { handleMcpHttpRequest, MCP_SERVER_INSTRUCTIONS } from '../../src/server'
import { measureChecklistTraversal } from './checklist-traversal'
import { measureText, percentile, type Sample } from './measure'

const responseSchema = z.object({
  error: z.unknown().optional(),
  result: z
    .object({
      isError: z.boolean().optional(),
      content: z.array(z.object({ type: z.string(), text: z.string().optional() })).optional(),
      structuredContent: z.unknown().optional(),
      tools: z
        .array(
          z
            .object({ name: z.string(), description: z.string(), inputSchema: z.unknown() })
            .passthrough()
        )
        .optional()
    })
    .passthrough()
    .optional()
})

const SCENARIOS = [
  { id: 'tools-list', method: 'tools/list', params: {} },
  { id: 'search-default', tool: 'search_rules', args: { query: 'image accessibility' } },
  { id: 'search-max', tool: 'search_rules', args: { query: 'accessibility', limit: 100 } },
  {
    id: 'review-page',
    tool: 'review_code',
    args: {
      code: '<html><head><title>Shop</title></head><body><img src="/shoe.jpg"><button><svg></svg></button><form><input type="email"></form></body></html>',
      minPriority: 'low'
    }
  },
  { id: 'rule-full', tool: 'get_rule', args: { slug: 'alt-text' } },
  { id: 'rule-check', tool: 'check_rule', args: { slug: 'alt-text' } },
  { id: 'rule-fix', tool: 'fix_rule', args: { slug: 'alt-text' } },
  { id: 'rule-explain', tool: 'explain_rule', args: { slug: 'alt-text' } },
  { id: 'categories', tool: 'list_categories', args: {} },
  { id: 'quick-reference', tool: 'get_quick_reference', args: { category: 'accessibility' } },
  { id: 'workflow', tool: 'get_workflow', args: { slug: 'launch-checklist' } },
  { id: 'checklist', tool: 'get_checklist_rules', args: { checklist: 'launch-checklist' } },
  {
    id: 'checklist-full',
    tool: 'get_checklist_rules',
    args: { checklist: 'launch-checklist', includeContent: true }
  }
]

/** Exercise the SDK-backed HTTP handler locally, with real corpus and no telemetry or network. */
export async function measureEfficiency(repoRoot: string) {
  const rules = loadRules(`${repoRoot}/packages/content/rules/en`)
  const checklists = loadLocalChecklists(repoRoot)
  if (!rules.length || !checklists.length) throw new Error('Real rule/checklist corpus is required')
  const promptPlaceholders = rules
    .filter(
      rule =>
        !rule.prompts ||
        [rule.prompts.check, rule.prompts.fix, rule.prompts.explain].some(
          value => !value || value.trim().length < 6 || /^[>|][+-]?$/.test(value)
        )
    )
    .map(rule => rule.slug)
  const samples: Sample[] = []
  let definitionContext = measureText('')
  let toolCount = 0
  for (const scenario of SCENARIOS) {
    const body = {
      jsonrpc: '2.0',
      id: 1,
      method: scenario.method ?? 'tools/call',
      params: scenario.params ?? { name: scenario.tool, arguments: scenario.args }
    }
    const times: number[] = []
    let lastWire = ''
    for (let trial = 0; trial < 23; trial++) {
      const request = new Request('https://benchmark.invalid/mcp', {
        method: 'POST',
        headers: { 'content-type': 'application/json', 'mcp-protocol-version': '2025-06-18' },
        body: JSON.stringify(body)
      })
      const started = performance.now()
      const response = await handleMcpHttpRequest(
        request,
        () => rules,
        () => checklists,
        { telemetryEnabled: false },
        body
      )
      lastWire = await response.text()
      const elapsed = performance.now() - started
      if (!response.ok)
        throw new Error(`${scenario.id}: HTTP ${response.status}: ${lastWire.slice(0, 300)}`)
      const iteration = responseSchema.parse(JSON.parse(lastWire))
      if (iteration.error || !iteration.result || iteration.result.isError)
        throw new Error(`${scenario.id}: invalid tool result`)
      if (trial >= 3) times.push(elapsed)
    }
    const parsed = responseSchema.parse(JSON.parse(lastWire))
    if (parsed.error || !parsed.result || parsed.result.isError)
      throw new Error(`${scenario.id}: tool error: ${lastWire.slice(0, 300)}`)
    const result = parsed.result
    if (result.tools) {
      toolCount = result.tools.length
      definitionContext = measureText(
        JSON.stringify(
          result.tools.map(tool => ({
            name: tool.name,
            description: tool.description,
            inputSchema: tool.inputSchema
          }))
        )
      )
    }
    samples.push({
      id: scenario.id,
      text: measureText((result.content ?? []).map(block => block.text ?? '').join('\n')),
      structured: measureText(JSON.stringify(result.structuredContent ?? result.tools ?? null)),
      wire: measureText(lastWire),
      p50Ms: percentile(times, 0.5),
      p95Ms: percentile(times, 0.95)
    })
  }
  return {
    version: 1,
    measuredAt: new Date().toISOString(),
    runtime: { node: process.version, platform: process.platform, arch: process.arch },
    encoding: 'o200k_base',
    tokenizer: 'gpt-tokenizer@4.0.0',
    corpusWarnings: promptPlaceholders.length
      ? [
          `Public loader returned missing or placeholder prompts for ${promptPlaceholders.length} rules; small prompt responses do not prove efficiency. Recalibrate after loader repair.`
        ]
      : [],
    ruleCount: rules.length,
    checklistCount: checklists.length,
    toolCount,
    iterations: 20,
    warmups: 3,
    protocol: '2025-06-18',
    definitionContext,
    instructions: measureText(MCP_SERVER_INSTRUCTIONS),
    samples,
    checklistTraversal: await measureChecklistTraversal(rules, checklists),
    limitations: [
      'Offline reference-encoding counts, not billed tokens for every provider.',
      'Client may forward text, structured content, or both; surfaces are reported separately.',
      'Local warm HTTP-handler timing excludes network, cold start, corpus loading and LLM time.',
      'audit_url network fetch is excluded; no paid API requests or user telemetry.'
    ]
  }
}
