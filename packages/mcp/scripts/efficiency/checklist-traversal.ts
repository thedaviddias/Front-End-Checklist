import type { CuratedChecklist, Rule } from '@repo/types'
import { z } from 'zod'
import { handleMcpHttpRequest } from '../../src/server'
import { MAX_CHECKLIST_RESPONSE_BYTES } from '../../src/tools/get-checklist-rules'
import { measureText } from './measure'

const pageSchema = z
  .object({
    rules: z.array(z.object({ slug: z.string() }).passthrough()),
    checklist: z.object({ totalRules: z.number() }).passthrough(),
    nextCursor: z.string().nullable()
  })
  .passthrough()
const envelopeSchema = z.object({
  result: z.object({
    isError: z.boolean().optional(),
    structuredContent: pageSchema,
    content: z.array(z.object({ type: z.literal('text'), text: z.string() }))
  })
})

/** Count the complete paginated task too, so smaller pages cannot hide total retrieval cost. */
export async function measureChecklistTraversal(rules: Rule[], checklists: CuratedChecklist[]) {
  let cursor: string | undefined
  let pages = 0
  let textTokens = 0
  let structuredTokens = 0
  let wireBytes = 0
  let omittedDetails = 0
  const slugs = new Set<string>()
  do {
    const body = {
      jsonrpc: '2.0',
      id: 1,
      method: 'tools/call',
      params: {
        name: 'get_checklist_rules',
        arguments: { checklist: 'launch-checklist', includeContent: true, cursor }
      }
    }
    const request = new Request('https://benchmark.invalid/mcp', {
      method: 'POST',
      headers: { 'content-type': 'application/json', 'mcp-protocol-version': '2025-06-18' },
      body: JSON.stringify(body)
    })
    const response = await handleMcpHttpRequest(
      request,
      () => rules,
      () => checklists,
      { telemetryEnabled: false },
      body
    )
    const wire = await response.text()
    if (!response.ok) throw new Error('Checklist traversal HTTP failure')
    const { result } = envelopeSchema.parse(JSON.parse(wire))
    if (result.isError) throw new Error('Checklist traversal tool failure')
    const page = result.structuredContent
    if (Buffer.byteLength(JSON.stringify(page, null, 2)) > MAX_CHECKLIST_RESPONSE_BYTES)
      throw new Error('Unbounded checklist page')
    for (const rule of page.rules) {
      if (slugs.has(rule.slug)) throw new Error('Repeated checklist rule')
      slugs.add(rule.slug)
      if (rule.contentOmitted || rule.detailsOmitted) omittedDetails++
    }
    const text = result.content.map(block => block.text).join('\n')
    textTokens += measureText(text).tokens
    structuredTokens += measureText(JSON.stringify(page)).tokens
    wireBytes += Buffer.byteLength(wire)
    cursor = page.nextCursor ?? undefined
    if (++pages > rules.length + 1) throw new Error('Checklist pagination did not terminate')
    if (!cursor && slugs.size !== page.checklist.totalRules)
      throw new Error('Checklist traversal lost rules')
  } while (cursor)
  return { pages, rules: slugs.size, omittedDetails, textTokens, structuredTokens, wireBytes }
}
