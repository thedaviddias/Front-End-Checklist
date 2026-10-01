import { Client, StreamableHTTPClientTransport } from '@modelcontextprotocol/client'
import * as z from 'zod'
import { pick, RULE_SLUGS, toolCall } from './config'

/** A worker that can run any operation against the server. */
export interface Worker {
  run: (operation: string) => Promise<void>
  close: () => Promise<void>
}

const ANY_RESULT = z.object({}).loose()

/**
 * Check whether a JSON-RPC response body reports a failure.
 *
 * @param body - Parsed response body.
 * @returns Error text, or undefined on success.
 */
function jsonRpcFailure(body: unknown): string | undefined {
  if (typeof body !== 'object' || body === null) return 'non-object response'
  const error = Reflect.get(body, 'error')
  if (error) return JSON.stringify(error).slice(0, 160)
  const result = Reflect.get(body, 'result')
  if (typeof result === 'object' && result !== null && Reflect.get(result, 'isError') === true) {
    return JSON.stringify(Reflect.get(result, 'content')).slice(0, 160)
  }
  return undefined
}

/**
 * POST one stateless 2025-era JSON-RPC request and throw on failure.
 *
 * @param url - MCP endpoint.
 * @param id - JSON-RPC request id.
 * @param method - JSON-RPC method.
 * @param params - Optional params.
 */
async function postJsonRpc(
  url: string,
  id: number,
  method: string,
  params?: Record<string, unknown>
): Promise<void> {
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'content-type': 'application/json', accept: 'application/json, text/event-stream' },
    body: JSON.stringify({ jsonrpc: '2.0', id, method, ...(params ? { params } : {}) })
  })
  const failure = jsonRpcFailure(await response.json())
  if (failure) throw new Error(failure)
}

/**
 * Create a 2025-era worker that speaks stateless JSON-RPC over plain fetch.
 *
 * @param url - MCP endpoint.
 * @returns Worker.
 */
export function createLegacyWorker(url: string): Worker {
  let id = 0

  return {
    run: operation => {
      id += 1
      switch (operation) {
        case 'connect':
          return postJsonRpc(url, id, 'initialize', {
            protocolVersion: '2025-06-18',
            capabilities: {},
            clientInfo: { name: 'mcp-load-test', version: '1.0.0' }
          })
        case 'tools/list':
          return postJsonRpc(url, id, 'tools/list')
        case 'resources/read':
          return postJsonRpc(url, id, 'resources/read', {
            uri: `frontendchecklist://rules/${pick(RULE_SLUGS)}`
          })
        case 'prompts/get':
          return postJsonRpc(url, id, 'prompts/get', {
            name: 'explain_rule_prompt',
            arguments: { slug: pick(RULE_SLUGS) }
          })
        case 'skills/list':
          return postJsonRpc(url, id, 'skills/list', {})
        default:
          return postJsonRpc(url, id, 'tools/call', toolCall(operation))
      }
    },
    close: async () => {}
  }
}

/**
 * Connect an official v2 client pinned to the 2026-07-28 revision.
 *
 * @param url - MCP endpoint.
 * @returns Connected client.
 */
async function connectModernClient(url: string): Promise<Client> {
  const client = new Client(
    { name: 'mcp-load-test', version: '1.0.0' },
    { versionNegotiation: { mode: { pin: '2026-07-28' } } }
  )
  await client.connect(new StreamableHTTPClientTransport(new URL(url)))
  return client
}

/**
 * Run one operation on a connected 2026-07-28 client.
 *
 * @param client - Connected client.
 * @param url - MCP endpoint (for fresh connects).
 * @param operation - Operation name.
 */
async function runModernOperation(client: Client, url: string, operation: string): Promise<void> {
  switch (operation) {
    case 'connect': {
      const fresh = await connectModernClient(url)
      await fresh.close()
      return
    }
    case 'tools/list':
      await client.listTools()
      return
    case 'resources/read':
      await client.readResource({ uri: `frontendchecklist://rules/${pick(RULE_SLUGS)}` })
      return
    case 'prompts/get':
      await client.getPrompt({ name: 'explain_rule_prompt', arguments: { slug: pick(RULE_SLUGS) } })
      return
    case 'skills/list':
      await client.request({ method: 'skills/list', params: {} }, ANY_RESULT)
      return
    default: {
      const result = await client.callTool(toolCall(operation))
      if (result.isError) throw new Error(JSON.stringify(result.content).slice(0, 160))
    }
  }
}

/**
 * Create a 2026-07-28 worker using the official v2 client.
 *
 * @param url - MCP endpoint.
 * @returns Worker.
 */
export async function createModernWorker(url: string): Promise<Worker> {
  const client = await connectModernClient(url)

  return {
    run: operation => runModernOperation(client, url, operation),
    close: () => client.close()
  }
}
