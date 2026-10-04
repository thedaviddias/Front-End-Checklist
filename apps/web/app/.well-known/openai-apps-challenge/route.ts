/**
 * Serve the exact OpenAI domain challenge without exposing an unconfigured value.
 * The dashboard supplies this public verification token; it is not an API credential.
 */
export async function GET() {
  const token = process.env.OPENAI_APPS_CHALLENGE_TOKEN?.trim()
  if (!token) {
    return new Response('Not found', { status: 404 })
  }

  return new Response(token, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'no-store',
      'X-Content-Type-Options': 'nosniff'
    }
  })
}
