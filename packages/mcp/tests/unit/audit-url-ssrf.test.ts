import { executeAuditUrl, isBlockedAddress, validateAuditUrl } from '../../src/tools/audit-url'

const publicResolver = async () => ['93.184.215.14']

describe('audit_url SSRF protection', () => {
  it.each([
    ['0.0.0.0'],
    ['10.1.2.3'],
    ['100.64.0.1'],
    ['127.0.0.1'],
    ['169.254.169.254'],
    ['172.20.0.1'],
    ['192.168.1.1'],
    ['198.18.0.1'],
    ['224.0.0.1'],
    ['::'],
    ['::1'],
    ['::ffff:7f00:1'],
    ['64:ff9b::a00:1'],
    ['fd12:3456::1'],
    ['fe80::1'],
    ['ff02::1']
  ])('blocks non-public address %s', address => {
    expect(isBlockedAddress(address)).toBe(true)
  })

  it.each([['93.184.215.14'], ['2606:2800:21f:cb07:6820:80da:af6b:8b2c']])(
    'allows public address %s',
    address => {
      expect(isBlockedAddress(address)).toBe(false)
    }
  )

  it.each([
    ['http://example.com', 'Only https://'],
    ['https://localhost/', 'Private/localhost'],
    ['https://app.localhost/', 'Private/localhost'],
    ['https://169.254.169.254/latest/meta-data', 'Private IP'],
    ['https://0x7f.1/', 'Private IP'],
    ['https://2130706433/', 'Private IP'],
    ['https://[::ffff:127.0.0.1]/', 'Private IP'],
    ['https://user:pass@example.com/', 'embedded credentials']
  ])('rejects %s', async (url, message) => {
    const result = await validateAuditUrl(url, publicResolver)
    expect(result).toMatchObject({ valid: false, error: expect.stringContaining(message) })
  })

  it('rejects hostnames that resolve to private addresses', async () => {
    const result = await validateAuditUrl('https://internal.example.com/', async () => [
      '93.184.215.14',
      '10.0.0.5'
    ])

    expect(result).toMatchObject({ valid: false, error: expect.stringContaining('private IP') })
  })

  it('accepts public hostnames', async () => {
    const result = await validateAuditUrl('https://example.com/', publicResolver)
    expect(result.valid).toBe(true)
  })

  describe('redirects', () => {
    const originalFetch = global.fetch

    afterEach(() => {
      global.fetch = originalFetch
    })

    it('re-validates every redirect hop', async () => {
      const fetchMock = jest.fn().mockResolvedValue(
        new Response(null, {
          status: 302,
          headers: { location: 'https://169.254.169.254/latest/meta-data' }
        })
      )
      global.fetch = fetchMock

      const result = await executeAuditUrl({ url: 'https://example.com/' }, [], publicResolver)

      expect(result).toEqual({ error: expect.stringContaining('Redirect blocked') })
      expect(fetchMock).toHaveBeenCalledTimes(1)
      expect(fetchMock.mock.calls[0][1]).toMatchObject({ redirect: 'manual' })
    })

    it('refuses pages over the size limit', async () => {
      global.fetch = jest.fn().mockResolvedValue(
        new Response('<html></html>', {
          status: 200,
          headers: { 'content-type': 'text/html', 'content-length': String(10 * 1024 * 1024) }
        })
      )

      const result = await executeAuditUrl({ url: 'https://example.com/' }, [], publicResolver)

      expect(result).toEqual({ error: expect.stringContaining('audit limit') })
    })
  })
})
