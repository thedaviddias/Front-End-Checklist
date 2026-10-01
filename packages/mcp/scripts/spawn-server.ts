import { type ChildProcess, spawn } from 'node:child_process'
import path from 'node:path'

/**
 * Spawn the standalone MCP server (scripts/serve.ts) in its own process.
 *
 * @param profileDir - When set, run under `node --cpu-prof` writing here.
 * @returns Child process and the endpoint URL it printed.
 */
export async function spawnStandaloneServer(
  profileDir?: string
): Promise<{ child: ChildProcess; url: string }> {
  const args = [
    ...(profileDir ? ['--cpu-prof', `--cpu-prof-dir=${profileDir}`] : []),
    '--import',
    'tsx',
    path.join(__dirname, 'serve.ts')
  ]
  const child = spawn(process.execPath, args, {
    cwd: path.join(__dirname, '..'),
    stdio: ['ignore', 'pipe', 'inherit']
  })

  const url = await new Promise<string>((resolve, reject) => {
    let output = ''
    child.stdout?.on('data', chunk => {
      output += String(chunk)
      const match = output.match(/MCP_URL=(\S+)/)
      if (match) resolve(match[1])
    })
    child.on('exit', code => reject(new Error(`MCP server exited early (code ${code})`)))
  })

  return { child, url }
}

/**
 * Stop a spawned server and wait for it to exit (flushing any CPU profile).
 *
 * @param child - Spawned server process.
 */
export async function stopStandaloneServer(child: ChildProcess): Promise<void> {
  const exited = new Promise(resolve => child.once('exit', resolve))
  child.kill('SIGTERM')
  await exited
}
