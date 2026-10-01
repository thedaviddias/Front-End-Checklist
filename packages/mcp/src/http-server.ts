import { createServer, type IncomingMessage, type Server, type ServerResponse } from 'node:http'
import path from 'node:path'
import {
  hostHeaderValidationResponse,
  localhostAllowedHostnames,
  localhostAllowedOrigins,
  originValidationResponse
} from '@modelcontextprotocol/server'
import { loadLocalChecklists, loadLocalRules } from './content-loader'
import { handleMcpHttpRequest } from './server'

export interface LocalMcpHttpServer {
  url: string
  server: Server
  close: () => Promise<void>
}

interface LocalMcpHttpServerOptions {
  /** Port to bind; 0 picks a free port. */
  port?: number
  /** Repository root containing `packages/content` and `skills`. */
  repoRoot: string
}

/**
 * Read a Node request body into a string.
 *
 * @param req - Incoming Node request.
 * @returns The raw body text.
 */
async function readBody(req: IncomingMessage): Promise<string> {
  const chunks: Buffer[] = []
  for await (const chunk of req) {
    chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk)
  }
  return Buffer.concat(chunks).toString('utf-8')
}

/**
 * Write a web `Response` back through a Node `ServerResponse`.
 *
 * @param response - Response produced by the MCP handler.
 * @param res - Node response to write.
 */
async function writeResponse(response: Response, res: ServerResponse): Promise<void> {
  res.statusCode = response.status
  response.headers.forEach((value, key) => {
    res.setHeader(key, value)
  })
  res.end(Buffer.from(await response.arrayBuffer()))
}

/**
 * Start a standalone Streamable HTTP MCP server backed by the local content tree.
 *
 * It serves the same `handleMcpHttpRequest` pipeline as the Vercel route (both
 * protocol eras, skills included) without Next.js, rate limiting, or CORS, so
 * conformance runs and load tests measure the MCP server itself.
 *
 * @param options - Port and repository root.
 * @returns The bound URL and a close function.
 */
export async function startLocalMcpHttpServer(
  options: LocalMcpHttpServerOptions
): Promise<LocalMcpHttpServer> {
  const rules = loadLocalRules()
  const checklists = loadLocalChecklists(options.repoRoot)
  const skillsDir = path.join(options.repoRoot, 'skills')

  const server = createServer(async (req, res) => {
    try {
      // Harness-only endpoint: kernel-accounted CPU time stays meaningful even
      // on a busy machine, unlike wall-clock throughput.
      if (req.url === '/__stats') {
        const { user, system } = process.cpuUsage()
        res.writeHead(200, { 'content-type': 'application/json' })
        res.end(JSON.stringify({ cpuMicros: user + system, rssBytes: process.memoryUsage().rss }))
        return
      }

      const url = `http://${req.headers.host ?? 'localhost'}${req.url ?? '/'}`
      const headers = new Headers()
      for (const [key, value] of Object.entries(req.headers)) {
        if (typeof value === 'string') headers.set(key, value)
        else if (Array.isArray(value)) headers.set(key, value.join(', '))
      }

      let parsedBody: unknown
      if (req.method === 'POST') {
        const text = await readBody(req)
        try {
          parsedBody = JSON.parse(text)
        } catch {
          res.writeHead(400, { 'content-type': 'application/json' })
          res.end(
            JSON.stringify({
              jsonrpc: '2.0',
              id: null,
              error: { code: -32700, message: 'Parse error' }
            })
          )
          return
        }
      }

      const request = new Request(url, { method: req.method, headers })

      // Localhost servers are the classic DNS-rebinding target: only accept
      // localhost Host headers and localhost (or absent) Origins.
      const rejected =
        hostHeaderValidationResponse(request, localhostAllowedHostnames()) ??
        originValidationResponse(request, localhostAllowedOrigins())
      if (rejected) {
        await writeResponse(rejected, res)
        return
      }
      const response = await handleMcpHttpRequest(
        request,
        () => rules,
        () => checklists,
        { telemetryEnabled: false, skillsDir },
        parsedBody
      )
      await writeResponse(response, res)
    } catch (error) {
      res.writeHead(500, { 'content-type': 'application/json' })
      res.end(
        JSON.stringify({
          jsonrpc: '2.0',
          id: null,
          error: {
            code: -32603,
            message: error instanceof Error ? error.message : 'Internal error'
          }
        })
      )
    }
  })

  await new Promise<void>(resolve => server.listen(options.port ?? 0, '127.0.0.1', resolve))
  const address = server.address()
  if (!address || typeof address === 'string') {
    throw new Error('MCP HTTP server did not bind to a TCP port.')
  }
  const { port } = address

  return {
    url: `http://127.0.0.1:${port}/mcp`,
    server,
    close: () =>
      new Promise<void>((resolve, reject) =>
        server.close(error => (error ? reject(error) : resolve()))
      )
  }
}
