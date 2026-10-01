import { request } from 'node:http'
import path from 'node:path'
import { type LocalMcpHttpServer, startLocalMcpHttpServer } from '../../src/http-server'
import { loadRulesFromMdx } from '../quality/rule-loader'

// The published rules package is ESM-only; reuse the test MDX loader under Jest.
jest.mock('../../src/content-loader', () => ({
  loadLocalRules: () => loadRulesFromMdx(),
  loadLocalChecklists: () => []
}))

let server: LocalMcpHttpServer

/**
 * POST a JSON-RPC body with explicit headers (fetch cannot override Host).
 *
 * @param headers - Extra request headers.
 * @param body - JSON-RPC payload.
 * @returns Status code and parsed JSON body.
 */
function post(
  headers: Record<string, string>,
  body: unknown
): Promise<{ status: number; json: unknown }> {
  const url = new URL(server.url)
  const payload = JSON.stringify(body)
  return new Promise((resolve, reject) => {
    const req = request(
      {
        host: url.hostname,
        port: url.port,
        path: url.pathname,
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          accept: 'application/json, text/event-stream',
          'content-length': Buffer.byteLength(payload),
          ...headers
        }
      },
      res => {
        let text = ''
        res.on('data', chunk => {
          text += chunk
        })
        res.on('end', () =>
          resolve({ status: res.statusCode ?? 0, json: text ? JSON.parse(text) : null })
        )
      }
    )
    req.on('error', reject)
    req.end(payload)
  })
}

beforeAll(async () => {
  server = await startLocalMcpHttpServer({ repoRoot: path.resolve(__dirname, '../../../..') })
})

afterAll(async () => {
  await server.close()
})

describe('standalone MCP HTTP server', () => {
  it('serves tools over 2025-era JSON-RPC with the repository corpus', async () => {
    const { status, json } = await post(
      {},
      {
        jsonrpc: '2.0',
        id: 1,
        method: 'tools/call',
        params: { name: 'get_rule', arguments: { slug: 'video-optimization' } }
      }
    )

    expect(status).toBe(200)
    expect(json).toMatchObject({ result: { structuredContent: { slug: 'video-optimization' } } })
  })

  it('rejects DNS-rebinding style Host and Origin headers', async () => {
    const body = { jsonrpc: '2.0', id: 1, method: 'tools/list' }

    expect((await post({ host: 'evil.example' }, body)).status).toBe(403)
    expect((await post({ origin: 'https://evil.example' }, body)).status).toBe(403)
  })
})
