import { addSubscriberContact } from '@repo/emails/server'
import { NextResponse } from 'next/server'
import { captureServerException } from '@/lib/telemetry-server'

const SUBSCRIBE_SECRET = process.env.SUBSCRIBE_SECRET

/**
 * Internal API: add an email to the mailing list audience.
 * Reserved for trusted integrations that have already obtained newsletter consent.
 * Do not expose this as a public endpoint without rate limiting and validation.
 */
export async function POST(request: Request) {
  try {
    if (!SUBSCRIBE_SECRET) {
      return NextResponse.json({ error: 'Subscribe not configured' }, { status: 503 })
    }

    const secret = request.headers.get('x-subscribe-secret')
    if (secret !== SUBSCRIBE_SECRET) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    let body: { email?: string }
    try {
      body = await request.json()
    } catch {
      return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
    }

    const email = typeof body.email === 'string' ? body.email.trim() : ''
    if (!email) {
      return NextResponse.json({ error: 'Missing email' }, { status: 400 })
    }

    const result = await addSubscriberContact(email)
    if (!result.success) {
      return NextResponse.json({ error: result.error }, { status: result.statusCode })
    }

    return NextResponse.json(result, { status: result.status === 'created' ? 201 : 200 })
  } catch (error) {
    captureServerException(error, { route: '/api/subscribe' })
    return NextResponse.json({ error: 'Failed to add contact' }, { status: 500 })
  }
}
