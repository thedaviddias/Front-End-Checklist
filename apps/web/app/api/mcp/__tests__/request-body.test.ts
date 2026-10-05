/** @jest-environment node */
import { getPostCacheInput, readBoundedJson } from '@/app/api/mcp/request-body'

describe('MCP request boundaries', () => {
  it.each([undefined, '1'])('rejects oversized bodies with Content-Length %s', async length => {
    const request = new Request('https://mcp.frontendchecklist.io', {
      method: 'POST',
      headers: length ? { 'Content-Length': length } : {},
      body: JSON.stringify({ code: 'x'.repeat(128) })
    })
    expect(await readBoundedJson(request, 64)).toEqual({ ok: false, tooLarge: true })
  })

  it('counts UTF-8 bytes instead of characters', async () => {
    const request = new Request('https://mcp.frontendchecklist.io', {
      method: 'POST',
      body: JSON.stringify('界'.repeat(8))
    })
    expect(await readBoundedJson(request, 16)).toEqual({ ok: false, tooLarge: true })
  })

  it('cancels a chunked stream as soon as it exceeds the limit', async () => {
    const cancel = jest.fn()
    const stream = new ReadableStream({
      pull(controller) {
        controller.enqueue(new Uint8Array(8))
      },
      cancel
    })
    const request = new Request('https://mcp.frontendchecklist.io', {
      method: 'POST',
      body: stream,
      duplex: 'half'
    } as RequestInit)
    expect(await readBoundedJson(request, 12)).toEqual({ ok: false, tooLarge: true })
    expect(cancel).toHaveBeenCalledTimes(1)
  })

  it('accepts JSON at the byte limit and distinguishes malformed JSON', async () => {
    const valid = new Request('https://mcp.frontendchecklist.io', { method: 'POST', body: '{}' })
    expect(await readBoundedJson(valid, 2)).toEqual({ ok: true, body: {} })
    const invalid = new Request('https://mcp.frontendchecklist.io', { method: 'POST', body: '{' })
    expect(await readBoundedJson(invalid, 2)).toEqual({ ok: false, tooLarge: false })
  })

  it.each([
    'accept',
    'content-type',
    'mcp-protocol-version',
    'mcp-method',
    'mcp-name',
    'mcp-session-id',
    'last-event-id'
  ])('separates %s transport contexts in cache inputs', name => {
    const url = 'https://mcp.frontendchecklist.io'
    const body = { jsonrpc: '2.0', id: 1, method: 'tools/list' }
    expect(getPostCacheInput(new Request(url), body)).not.toEqual(
      getPostCacheInput(new Request(url, { headers: { [name]: 'different' } }), body)
    )
  })
})
