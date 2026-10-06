import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

/**
 * Continues requests through Next.js proxy while keeping the matcher centralized.
 * @param request - Incoming request metadata.
 * @returns The unmodified next response.
 */
export async function proxy(request: NextRequest) {
  return NextResponse.next({ request })
}

export const config = {
  matcher: [
    {
      source:
        '/((?!api/mcp(?:/|$)|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|css|js|map)$).*)',
      // MCP requests are rewritten after proxy matching, so exclude the entire host too.
      // The route already enforces its own origin, size, and rate-limit checks.
      missing: [{ type: 'host', value: 'mcp\\.frontendchecklist\\.io' }]
    }
  ]
}
