/**
 * Run the official MCP conformance suite against the standalone server.
 *
 * Usage: pnpm mcp:conformance [--url http://localhost:3000/api/mcp]
 *
 * Without --url, scripts/serve.ts is spawned on a free port. Failures listed in
 * conformance-baseline.yml are expected (fixture-only scenarios); any other
 * failure, or a baseline entry that starts passing, fails the run.
 */
import { spawn } from 'node:child_process'
import path from 'node:path'
import { spawnStandaloneServer, stopStandaloneServer } from './spawn-server'

const SUITE_VERSION = '0.1.16'
const packageRoot = path.resolve(__dirname, '..')
const urlFlag = process.argv.indexOf('--url')
const externalUrl = urlFlag >= 0 ? process.argv[urlFlag + 1] : undefined

/**
 * Run the suite and propagate its exit code.
 */
async function main(): Promise<void> {
  const server = externalUrl ? undefined : await spawnStandaloneServer()
  const url = externalUrl ?? server?.url ?? ''

  const exitCode = await new Promise<number>(resolve => {
    const suite = spawn(
      'npx',
      [
        '-y',
        `@modelcontextprotocol/conformance@${SUITE_VERSION}`,
        'server',
        '--url',
        url,
        '--expected-failures',
        path.join(packageRoot, 'conformance-baseline.yml')
      ],
      { stdio: 'inherit' }
    )
    suite.on('exit', code => resolve(code ?? 1))
  })

  if (server) await stopStandaloneServer(server.child)
  process.exit(exitCode)
}

main().catch(error => {
  console.error(error)
  process.exit(1)
})
