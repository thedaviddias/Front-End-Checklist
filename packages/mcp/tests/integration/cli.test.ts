import { spawn } from 'node:child_process'
import path from 'node:path'

/** A 2025-era revision still used by deployed stdio clients. */
const LEGACY_PROTOCOL_VERSION = '2025-06-18'

function waitForJsonLine(command: ReturnType<typeof spawn>): Promise<string> {
  return new Promise((resolve, reject) => {
    let stdout = ''
    let stderr = ''

    const timeout = setTimeout(() => {
      command.kill()
      reject(new Error(`Timed out waiting for CLI response. stderr: ${stderr}`))
    }, 15000)

    command.stdout.on('data', chunk => {
      stdout += chunk.toString()
      const line = stdout
        .split('\n')
        .map(entry => entry.trim())
        .find(entry => entry.startsWith('{') && entry.endsWith('}'))

      if (line) {
        clearTimeout(timeout)
        resolve(line)
      }
    })

    command.stderr.on('data', chunk => {
      stderr += chunk.toString()
    })

    command.on('error', error => {
      clearTimeout(timeout)
      reject(error)
    })

    command.on('exit', code => {
      if (code !== 0 && stdout.trim().length === 0) {
        clearTimeout(timeout)
        reject(new Error(`CLI exited with code ${code}. stderr: ${stderr}`))
      }
    })
  })
}

describe('MCP CLI', () => {
  it('awaits async request handling before writing to stdout', async () => {
    const repoRoot = path.resolve(__dirname, '../../../..')
    const cli = spawn('pnpm', ['--silent', 'tsx', 'packages/mcp/src/cli.ts'], {
      cwd: repoRoot,
      stdio: ['pipe', 'pipe', 'pipe']
    })

    cli.stdin.write(
      `${JSON.stringify({
        jsonrpc: '2.0',
        id: 1,
        method: 'initialize',
        params: {
          protocolVersion: LEGACY_PROTOCOL_VERSION,
          capabilities: {},
          clientInfo: {
            name: 'jest-client',
            version: '1.0.0'
          }
        }
      })}\n`
    )

    const line = await waitForJsonLine(cli)
    cli.stdin.end()
    cli.kill()

    const response = JSON.parse(line) as {
      jsonrpc: string
      id: number
      result: {
        protocolVersion: string
        serverInfo: {
          name: string
        }
      }
    }

    expect(response).toMatchObject({
      jsonrpc: '2.0',
      id: 1,
      result: {
        protocolVersion: LEGACY_PROTOCOL_VERSION,
        serverInfo: {
          name: 'frontend-checklist-mcp'
        }
      }
    })
  }, 20000)
})
