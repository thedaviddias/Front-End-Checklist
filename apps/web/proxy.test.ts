/**
 * @jest-environment node
 */

import { unstable_doesMiddlewareMatch } from 'next/experimental/testing/server'
import { config } from '@/proxy'

describe('proxy routing', () => {
  it.each(['/', '/mcp', '/api/mcp', '/api/mcp/nested', '/rules/html/doctype'])(
    'bypasses the proxy for MCP host path %s before host rewrites',
    pathname => {
      expect(
        unstable_doesMiddlewareMatch({
          config,
          nextConfig: {},
          url: `https://mcp.frontendchecklist.io${pathname}`,
          headers: { host: 'mcp.frontendchecklist.io' }
        })
      ).toBe(false)
    }
  )

  it.each(['/api/mcp', '/api/mcp/'])('bypasses the direct MCP route %s', pathname => {
    expect(
      unstable_doesMiddlewareMatch({
        config,
        nextConfig: {},
        url: `https://frontendchecklist.io${pathname}`,
        headers: { host: 'frontendchecklist.io' }
      })
    ).toBe(false)
  })

  it.each(['/', '/mcp', '/rules/html/doctype', '/api/auth/session', '/api/mcp-status'])(
    'preserves website proxy matching for %s',
    pathname => {
      expect(
        unstable_doesMiddlewareMatch({
          config,
          nextConfig: {},
          url: `https://frontendchecklist.io${pathname}`,
          headers: { host: 'frontendchecklist.io' }
        })
      ).toBe(true)
    }
  )

  it.each(['/favicon.ico', '/_next/static/app.js', '/_next/image', '/robots.txt', '/sitemap.xml'])(
    'preserves static asset exclusion for %s',
    pathname => {
      expect(
        unstable_doesMiddlewareMatch({
          config,
          nextConfig: {},
          url: `https://frontendchecklist.io${pathname}`,
          headers: { host: 'frontendchecklist.io' }
        })
      ).toBe(false)
    }
  )
})
