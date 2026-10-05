/** @jest-environment node */
import { clearCache, getCachedResponse, setCachedResponse } from '@/lib/mcp-cache'

describe('MCP response cache isolation', () => {
  afterEach(clearCache)

  it('keeps requests whose IDs collide under the previous hash separate', () => {
    const first = { jsonrpc: '2.0', id: '1r', method: 'tools/list' }
    const second = { jsonrpc: '2.0', id: '30', method: 'tools/list' }
    setCachedResponse(first, { id: first.id, result: {} })
    expect(getCachedResponse(second)).toBeUndefined()
    expect(getCachedResponse(first)).toEqual({ id: '1r', result: {} })
  })
})
