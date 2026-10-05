type ParsedBody = { ok: true; body: unknown } | { ok: false; tooLarge: boolean }

/**
 * Read JSON while enforcing the byte limit even when Content-Length is absent or inaccurate.
 *
 * @param request - Incoming MCP request.
 * @param maxBytes - Maximum bytes accepted before decoding and parsing JSON.
 * @returns Parsed JSON or the reason the request must be rejected.
 */
export async function readBoundedJson(request: Request, maxBytes: number): Promise<ParsedBody> {
  if (!request.body) return { ok: false, tooLarge: false }

  const reader = request.body.getReader()
  const chunks: Uint8Array[] = []
  let received = 0

  try {
    while (true) {
      const { done, value } = await reader.read()
      if (done) break
      received += value.byteLength
      if (received > maxBytes) {
        await reader.cancel()
        return { ok: false, tooLarge: true }
      }
      chunks.push(value)
    }
    return { ok: true, body: JSON.parse(Buffer.concat(chunks).toString('utf8')) }
  } catch {
    return { ok: false, tooLarge: false }
  } finally {
    reader.releaseLock()
  }
}

/**
 * Include transport negotiation in the response-envelope cache input.
 *
 * @param request - Request whose headers the SDK will validate.
 * @param body - Parsed JSON-RPC request, including its response ID.
 * @returns Cache input specific to the request's transport context.
 */
export function getPostCacheInput(request: Request, body: unknown): object {
  return {
    body,
    headers: [
      'accept',
      'content-type',
      'mcp-protocol-version',
      'mcp-method',
      'mcp-name',
      'mcp-session-id',
      'last-event-id'
    ].map(name => [name, request.headers.get(name)])
  }
}
