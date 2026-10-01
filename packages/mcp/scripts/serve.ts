/**
 * Standalone Streamable HTTP MCP server for conformance runs and load tests.
 *
 * Usage: pnpm --filter @repo/mcp serve [--port 3100]
 * Prints `MCP_URL=<url>` once listening; exits cleanly on SIGINT/SIGTERM so
 * `node --cpu-prof` can flush its profile.
 */
import path from 'node:path'
import { startLocalMcpHttpServer } from '../src/http-server'

const repoRoot = path.resolve(__dirname, '../../..')
const portFlag = process.argv.indexOf('--port')
const port = portFlag >= 0 ? Number(process.argv[portFlag + 1]) : 0

/**
 * Start the server and wire shutdown signals.
 */
async function main(): Promise<void> {
  const { url, close } = await startLocalMcpHttpServer({ port, repoRoot })
  console.log(`MCP_URL=${url}`)

  /**
   * Close the server, then exit so `--cpu-prof` flushes its profile.
   */
  const shutdown = () => {
    close().finally(() => process.exit(0))
  }
  process.on('SIGINT', shutdown)
  process.on('SIGTERM', shutdown)
}

main().catch(error => {
  console.error(error)
  process.exit(1)
})
