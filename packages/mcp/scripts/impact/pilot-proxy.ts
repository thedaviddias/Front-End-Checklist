import { createServer } from 'node:http'
import { PilotBudget, validatePilotRequest } from './pilot-budget'

/** Start a loopback-only budget guard; the real key never enters Promptfoo. */
export async function startPilotProxy(
  apiKey: string,
  localToken: string,
  onUsage: (entry: unknown) => void,
  forward: typeof fetch = fetch
) {
  const budget = new PilotBudget()
  const server = createServer(async (request, response) => {
    response.setHeader('content-type', 'application/json')
    try {
      if (request.method !== 'POST' || request.url?.split('?')[0] !== '/v1/messages')
        throw new Error('Only Messages requests are supported')
      if (request.headers['x-api-key'] !== localToken) throw new Error('Invalid local token')
      let raw = ''
      for await (const chunk of request) {
        raw += chunk.toString()
        if (Buffer.byteLength(raw) > 2_000_000) throw new Error('Request too large')
      }
      const body = validatePilotRequest(JSON.parse(raw))
      const id = budget.reserve()
      // Persist reservation before sending; errors deliberately retain the entire amount.
      onUsage({ event: 'reserved', id, ...budget.snapshot() })
      const upstream = await forward('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        redirect: 'error',
        headers: {
          'content-type': 'application/json',
          'anthropic-version': '2023-06-01',
          'x-api-key': apiKey
        },
        body: JSON.stringify(body),
        signal: AbortSignal.timeout(90_000)
      })
      const text = await upstream.text()
      if (upstream.ok) {
        const result = JSON.parse(text)
        budget.settle(id, result.usage)
        onUsage({ event: 'settled', id, usage: result.usage, ...budget.snapshot() })
      } else {
        onUsage({ event: 'upstream-error', id, status: upstream.status, ...budget.snapshot() })
      }
      response.statusCode = upstream.status
      response.end(text)
    } catch {
      // Do not forward provider error objects or credentials to logs.
      onUsage({ event: 'rejected-or-uncertain', ...budget.snapshot() })
      response.statusCode = 400
      response.end(
        JSON.stringify({
          type: 'error',
          error: {
            type: 'invalid_request_error',
            message:
              'Pilot guard rejected request or retained uncertain usage; inspect local ledger.'
          }
        })
      )
    }
  })
  await new Promise<void>(resolve => server.listen(0, '127.0.0.1', resolve))
  const address = server.address()
  if (!address || typeof address === 'string') throw new Error('Missing loopback address')
  return {
    url: `http://127.0.0.1:${address.port}`,
    budget,
    close: () =>
      new Promise<void>((resolve, reject) =>
        server.close(error => (error ? reject(error) : resolve()))
      )
  }
}
