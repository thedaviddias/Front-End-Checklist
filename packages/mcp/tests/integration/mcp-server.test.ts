import { Client, StreamableHTTPClientTransport } from '@modelcontextprotocol/client'
import type { CuratedChecklist, Rule } from '@repo/types'
import {
  getTelemetryStats,
  handleMcpHttpRequest,
  MCP_MODERN_PROTOCOL_VERSION,
  MCP_PROMPTS,
  MCP_RESOURCE_TEMPLATES,
  MCP_SERVER_INSTRUCTIONS,
  resetTelemetry
} from '../../src/server'
import type { McpToolUsage } from '../../src/telemetry'

/** A 2025-era revision still used by deployed clients. */
const LEGACY_PROTOCOL_VERSION = '2025-06-18'

const mockRules: Rule[] = [
  {
    title: 'Use HTML5 Doctype',
    slug: 'doctype',
    categories: ['html'],
    priority: 'critical',
    content:
      '# Doctype\n\nThe HTML5 doctype must be declared at the very top of every HTML page.\n\n```html\n<!DOCTYPE html>\n```',
    primaryCategory: 'html',
    url: '/en/rules/html/doctype',
    prompts: {
      check: 'Verify this HTML document has <!DOCTYPE html> at the top.',
      fix: 'Add <!DOCTYPE html> as the first line of the HTML document.',
      explain: 'Explain why HTML5 doctype is required for standards mode rendering.'
    }
  },
  {
    title: 'Add Alternative Text to Images',
    slug: 'alt-tags',
    categories: ['accessibility', 'html'],
    priority: 'critical',
    content: '# Alt Text\n\nAll images must have appropriate alternative text.',
    primaryCategory: 'accessibility',
    url: '/en/rules/accessibility/alt-tags',
    prompts: {
      check: 'Check that all images have appropriate alt text.',
      fix: 'Add descriptive alt text to all images.',
      explain: 'Explain why alt text is essential for accessibility.'
    }
  }
]

const mockChecklists: CuratedChecklist[] = [
  {
    id: 'launch-checklist',
    slug: 'launch-checklist',
    title: 'Launch Checklist',
    description: 'Essential checks before deploying to production.',
    icon: 'rocket',
    rules: ['html/doctype', 'accessibility/alt-tags'],
    estimatedTime: '45 minutes',
    difficulty: 'beginner',
    order: 1,
    featured: true,
    language: 'en',
    url: '/checklists/launch-checklist'
  }
]

async function callMcp(
  body: Record<string, unknown>,
  checklists: CuratedChecklist[] = mockChecklists,
  options: { telemetryEnabled?: boolean; onToolCompleted?: (usage: McpToolUsage) => void } = {}
) {
  const request = new Request('https://example.com/mcp', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  })

  const response = await handleMcpHttpRequest(
    request,
    () => mockRules,
    () => checklists,
    options,
    body
  )

  return {
    status: response.status,
    json: (await response.json()) as Record<string, unknown>
  }
}

function buildInitializeRequest(id: number) {
  return {
    jsonrpc: '2.0' as const,
    id,
    method: 'initialize',
    params: {
      protocolVersion: LEGACY_PROTOCOL_VERSION,
      capabilities: {},
      clientInfo: {
        name: 'jest-client',
        version: '1.0.0'
      }
    }
  }
}

describe('SDK-backed MCP server', () => {
  beforeEach(() => {
    resetTelemetry()
  })

  it('returns initialize metadata through the SDK transport', async () => {
    const { status, json } = await callMcp(buildInitializeRequest(1))

    expect(status).toBe(200)
    expect(json).toMatchObject({
      result: {
        protocolVersion: LEGACY_PROTOCOL_VERSION,
        serverInfo: {
          name: 'frontend-checklist-mcp',
          title: 'Front-End Checklist',
          version: '2.0.1'
        },
        instructions: MCP_SERVER_INSTRUCTIONS,
        capabilities: {
          tools: {},
          prompts: {},
          resources: {}
        }
      }
    })
  })

  it('lists tools with checklist-backed entries only when checklist data exists', async () => {
    const withChecklists = await callMcp({
      jsonrpc: '2.0',
      id: 1,
      method: 'tools/list'
    })

    const withChecklistTools = (
      withChecklists.json.result as {
        tools: Array<{
          name: string
          title?: string
          description?: string
          annotations?: { title?: string; readOnlyHint?: boolean; destructiveHint?: boolean }
        }>
      }
    ).tools

    expect(withChecklistTools.map(tool => tool.name)).toContain('get_workflow')
    expect(withChecklistTools.map(tool => tool.name)).toContain('get_checklist_rules')
    for (const tool of withChecklistTools) {
      expect(tool.annotations).toMatchObject({
        title: tool.title,
        readOnlyHint: true,
        destructiveHint: false
      })
    }
    expect(withChecklistTools.find(tool => tool.name === 'review_code')).toMatchObject({
      title: 'Review Frontend Code',
      description: expect.stringContaining('non-exhaustive static heuristic review')
    })

    const withoutChecklists = await callMcp(
      {
        jsonrpc: '2.0',
        id: 1,
        method: 'tools/list'
      },
      []
    )

    const withoutChecklistTools = (
      withoutChecklists.json.result as { tools: Array<{ name: string }> }
    ).tools.map(tool => tool.name)

    expect(withoutChecklistTools).not.toContain('get_workflow')
    expect(withoutChecklistTools).not.toContain('get_checklist_rules')
  })

  it('returns structured tool results through tools/call', async () => {
    const { json } = await callMcp({
      jsonrpc: '2.0',
      id: 1,
      method: 'tools/call',
      params: {
        name: 'get_rule',
        arguments: {
          slug: 'doctype'
        }
      }
    })

    expect(json).toMatchObject({
      result: {
        structuredContent: {
          slug: 'doctype',
          title: 'Use HTML5 Doctype'
        },
        content: [
          {
            type: 'text'
          }
        ]
      }
    })
  })

  it('lists prompts and returns a workflow prompt', async () => {
    const promptsList = await callMcp({
      jsonrpc: '2.0',
      id: 1,
      method: 'prompts/list'
    })

    const prompts = (promptsList.json.result as { prompts: Array<{ name: string }> }).prompts.map(
      prompt => prompt.name
    )

    expect(prompts).toEqual(expect.arrayContaining([...MCP_PROMPTS]))

    const promptResult = await callMcp({
      jsonrpc: '2.0',
      id: 2,
      method: 'prompts/get',
      params: {
        name: 'workflow_prompt',
        arguments: {
          checklist: 'launch-checklist'
        }
      }
    })

    expect(promptResult.json).toMatchObject({
      result: {
        messages: [
          {
            role: 'user'
          }
        ]
      }
    })
  })

  it('lists resources, resource templates, and reads a rule resource', async () => {
    const resourcesList = await callMcp({
      jsonrpc: '2.0',
      id: 1,
      method: 'resources/list'
    })

    expect(resourcesList.json).toMatchObject({
      result: {
        resources: expect.arrayContaining([
          expect.objectContaining({
            uri: 'frontendchecklist://rules/doctype'
          })
        ])
      }
    })

    const templatesList = await callMcp({
      jsonrpc: '2.0',
      id: 2,
      method: 'resources/templates/list'
    })

    expect(templatesList.json).toMatchObject({
      result: {
        resourceTemplates: expect.arrayContaining([
          expect.objectContaining({ uriTemplate: MCP_RESOURCE_TEMPLATES.rule }),
          expect.objectContaining({ uriTemplate: MCP_RESOURCE_TEMPLATES.checklist })
        ])
      }
    })

    const resourceRead = await callMcp({
      jsonrpc: '2.0',
      id: 3,
      method: 'resources/read',
      params: {
        uri: 'frontendchecklist://rules/doctype'
      }
    })

    expect(resourceRead.json).toMatchObject({
      result: {
        contents: [
          expect.objectContaining({
            uri: 'frontendchecklist://rules/doctype'
          })
        ]
      }
    })
  })

  it('records anonymous tool telemetry through SDK tool execution', async () => {
    await callMcp({
      jsonrpc: '2.0',
      id: 1,
      method: 'tools/call',
      params: {
        name: 'search_rules',
        arguments: {
          query: 'doctype'
        }
      }
    })

    expect(getTelemetryStats()).toMatchObject({
      search_rules: 1
    })
  })

  it('reports successful and failed execution while respecting the telemetry flag', async () => {
    const observer = jest.fn()
    const request = {
      jsonrpc: '2.0',
      id: 1,
      method: 'tools/call',
      params: { name: 'get_rule', arguments: { slug: 'doctype' } }
    }
    await callMcp(request, mockChecklists, { onToolCompleted: observer })
    expect(observer).toHaveBeenLastCalledWith(
      expect.objectContaining({
        toolName: 'get_rule',
        outcome: 'success',
        requestedRule: { slug: 'doctype', category: 'html' }
      })
    )
    await callMcp(
      { ...request, params: { ...request.params, arguments: { slug: 'unknown' } } },
      mockChecklists,
      { onToolCompleted: observer }
    )
    expect(observer).toHaveBeenLastCalledWith(expect.objectContaining({ outcome: 'error' }))
    await callMcp(request, mockChecklists, { telemetryEnabled: false, onToolCompleted: observer })
    expect(observer).toHaveBeenCalledTimes(2)
  })

  it('advertises a description for every tool input property', async () => {
    const { json } = await callMcp({ jsonrpc: '2.0', id: 1, method: 'tools/list' })
    const tools = (
      json.result as {
        tools: Array<{
          name: string
          inputSchema: { properties?: Record<string, { description?: string }> }
        }>
      }
    ).tools

    const undocumented = tools.flatMap(tool =>
      Object.entries(tool.inputSchema.properties ?? {})
        .filter(([, property]) => !property.description)
        .map(([key]) => `${tool.name}.${key}`)
    )

    expect(undocumented).toEqual([])
  })

  it('completes rule slugs for prompt arguments', async () => {
    const { json } = await callMcp({
      jsonrpc: '2.0',
      id: 1,
      method: 'completion/complete',
      params: {
        ref: { type: 'ref/prompt', name: 'explain_rule_prompt' },
        argument: { name: 'slug', value: 'doc' }
      }
    })

    expect(json).toMatchObject({ result: { completion: { values: ['doctype'] } } })
  })

  it('links review tools to the MCP Apps report view', async () => {
    const init = await callMcp(buildInitializeRequest(1))
    expect(init.json).toMatchObject({
      result: { capabilities: { extensions: { 'io.modelcontextprotocol/ui': {} } } }
    })

    const { json } = await callMcp({ jsonrpc: '2.0', id: 2, method: 'tools/list' })
    const tools = (json.result as { tools: Array<{ name: string; _meta?: unknown }> }).tools
    const uiMeta = { ui: { resourceUri: 'ui://frontend-checklist/review-report' } }

    expect(tools.find(tool => tool.name === 'review_code')?._meta).toEqual(uiMeta)
    expect(tools.find(tool => tool.name === 'audit_url')?._meta).toEqual(uiMeta)
    expect(tools.find(tool => tool.name === 'get_rule')?._meta).toBeUndefined()

    const read = await callMcp({
      jsonrpc: '2.0',
      id: 3,
      method: 'resources/read',
      params: { uri: 'ui://frontend-checklist/review-report' }
    })
    const [content] = (read.json.result as { contents: Array<{ mimeType: string; text: string }> })
      .contents
    expect(content.mimeType).toBe('text/html;profile=mcp-app')
    expect(content.text).toContain('ui/initialize')
    expect(content.text).not.toContain('innerHTML')
  })

  it('answers unknown resources with a resource-not-found error', async () => {
    const { json } = await callMcp({
      jsonrpc: '2.0',
      id: 1,
      method: 'resources/read',
      params: { uri: 'frontendchecklist://rules/does-not-exist' }
    })

    expect(json).toMatchObject({ error: { code: expect.any(Number) } })
    expect(json).not.toHaveProperty('result')
  })
})

describe('2026-07-28 protocol revision', () => {
  async function connectModernClient() {
    const client = new Client(
      { name: 'jest-client', version: '1.0.0' },
      { versionNegotiation: { mode: { pin: MCP_MODERN_PROTOCOL_VERSION } } }
    )
    const transport = new StreamableHTTPClientTransport(new URL('https://example.com/mcp'), {
      // Mirror the Next.js route: the body is parsed once before dispatch.
      fetch: async (url, init) => {
        const request = new Request(url, init)
        const parsedBody = request.method === 'POST' ? await request.clone().json() : undefined
        return handleMcpHttpRequest(
          request,
          () => mockRules,
          () => mockChecklists,
          {},
          parsedBody
        )
      }
    })

    await client.connect(transport)
    return client
  }

  it('negotiates the stateless revision through server/discover', async () => {
    const client = await connectModernClient()

    expect(client.getNegotiatedProtocolVersion()).toBe(MCP_MODERN_PROTOCOL_VERSION)
    expect(client.getServerVersion()).toMatchObject({ name: 'frontend-checklist-mcp' })

    await client.close()
  })

  it('lists and calls tools on the modern revision', async () => {
    const client = await connectModernClient()

    const { tools } = await client.listTools()
    expect(tools.map(tool => tool.name)).toContain('search_rules')

    const result = await client.callTool({
      name: 'get_rule',
      arguments: { slug: 'doctype' }
    })
    expect(result.isError).toBeFalsy()
    expect(result.structuredContent).toMatchObject({ slug: 'doctype' })

    await client.close()
  })
})
