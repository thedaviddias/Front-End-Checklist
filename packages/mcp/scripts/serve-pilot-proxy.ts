import { appendFileSync, writeFileSync } from 'node:fs'
import path from 'node:path'
import { startPilotProxy } from './impact/pilot-proxy'

/** Run one non-resumable dollar-budget session; existing ledgers cannot be overwritten. */
async function main() {
  const apiKey = process.env.ANTHROPIC_API_KEY
  const token = process.env.FEC_PILOT_LOCAL_TOKEN
  if (!apiKey || !token || token.length < 24)
    throw new Error('Set ANTHROPIC_API_KEY and a random FEC_PILOT_LOCAL_TOKEN (24+ characters)')
  const ledger = path.resolve(process.env.FEC_PILOT_LEDGER ?? '/tmp/fec-pilot-usage.jsonl')
  writeFileSync(ledger, '', { flag: 'wx', mode: 0o600 })
  const proxy = await startPilotProxy(apiKey, token, entry => {
    appendFileSync(
      ledger,
      `${JSON.stringify({ at: new Date().toISOString(), ...Object(entry) })}\n`
    )
  })
  console.log(`FEC_PILOT_API_URL=${proxy.url}`)
  process.on('SIGINT', () => {
    void proxy.close()
  })
  process.on('SIGTERM', () => {
    void proxy.close()
  })
}
main().catch(() => {
  console.error(
    'Pilot proxy startup failed: check environment and use a new, non-existing ledger path.'
  )
  process.exitCode = 1
})
