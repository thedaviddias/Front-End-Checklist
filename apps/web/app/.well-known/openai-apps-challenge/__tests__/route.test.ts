/** @jest-environment node */

import { GET } from '@/app/.well-known/openai-apps-challenge/route'

describe('OpenAI domain challenge', () => {
  const originalToken = process.env.OPENAI_APPS_CHALLENGE_TOKEN

  afterEach(() => {
    if (originalToken === undefined) delete process.env.OPENAI_APPS_CHALLENGE_TOKEN
    else process.env.OPENAI_APPS_CHALLENGE_TOKEN = originalToken
  })

  it('returns 404 until the portal challenge is configured', async () => {
    delete process.env.OPENAI_APPS_CHALLENGE_TOKEN
    expect((await GET()).status).toBe(404)
  })

  it('returns just the token as uncached plain text', async () => {
    process.env.OPENAI_APPS_CHALLENGE_TOKEN = 'portal-test-token'
    const response = await GET()
    expect(await response.text()).toBe('portal-test-token')
    expect(response.headers.get('content-type')).toBe('text/plain; charset=utf-8')
    expect(response.headers.get('cache-control')).toBe('no-store')
  })
})
