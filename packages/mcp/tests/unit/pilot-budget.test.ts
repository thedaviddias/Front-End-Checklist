import { PILOT_MODEL, PilotBudget, validatePilotRequest } from '../../scripts/impact/pilot-budget'
import { startPilotProxy } from '../../scripts/impact/pilot-proxy'

it('reserves before dispatch and stops concurrent or uncertain requests at the dollar ceiling', () => {
  const budget = new PilotBudget()
  for (let i = 0; i < 4; i++) budget.reserve()
  expect(() => budget.reserve()).toThrow('budget exhausted')
  expect(budget.snapshot().committedUsd).toBe(0.82048)
})
it('releases only proven unused cost and prevents double settlement', () => {
  const budget = new PilotBudget()
  const id = budget.reserve()
  expect(() => budget.settle(id, {})).toThrow()
  expect(budget.snapshot().pendingReservations).toBe(1)
  budget.settle(id, { input_tokens: 1000, output_tokens: 100 })
  expect(budget.snapshot().committedUsd).toBe(0.0015)
  expect(() => budget.settle(id, { input_tokens: 0, output_tokens: 0 })).toThrow()
})
it('fails closed for unpriced models, caching, server tools and streaming', () => {
  const valid = { model: PILOT_MODEL, max_tokens: 1024, messages: [] }
  expect(validatePilotRequest(valid).service_tier).toBe('standard_only')
  for (const extra of [
    { model: 'other' },
    { max_tokens: 1025 },
    { stream: true },
    { thinking: { type: 'enabled' } },
    { tools: [{ type: 'web_search_20250305' }] },
    { system: [{ type: 'text', text: 'test', cache_control: { type: 'ephemeral' } }] }
  ])
    expect(() => validatePilotRequest({ ...valid, ...extra })).toThrow()
})

it('guards the HTTP path and measures usage with a fake provider, without paid calls', async () => {
  const forward = jest.fn(
    async () =>
      new Response(
        JSON.stringify({
          usage: { input_tokens: 1000, output_tokens: 100 },
          content: []
        })
      )
  )
  const proxy = await startPilotProxy('test-key', 'local-test-token', () => {}, forward)
  try {
    const body = JSON.stringify({ model: PILOT_MODEL, max_tokens: 1024, messages: [] })
    const invalid = await fetch(`${proxy.url}/v1/messages`, { method: 'POST', body })
    expect(invalid.status).toBe(400)
    expect(forward).not.toHaveBeenCalled()
    const valid = await fetch(`${proxy.url}/v1/messages`, {
      method: 'POST',
      headers: { 'x-api-key': 'local-test-token' },
      body
    })
    expect(valid.status).toBe(200)
    expect(proxy.budget.snapshot().committedUsd).toBe(0.0015)
    expect(forward).toHaveBeenCalledTimes(1)
  } finally {
    await proxy.close()
  }
})
