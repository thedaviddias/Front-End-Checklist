'use client'

import { Button } from '@repo/design-system/ui/button'
import { useState } from 'react'

/** Offer an explicit newsletter opt-in independently of account creation. */
export function NewsletterSettings() {
  const [status, setStatus] = useState<'idle' | 'pending' | 'subscribed' | 'error'>('idle')

  /** Subscribe only after the user selects the signup button. */
  async function subscribe() {
    setStatus('pending')
    try {
      const response = await fetch('/api/subscribe/me', { method: 'POST' })
      setStatus(response.ok ? 'subscribed' : 'error')
    } catch {
      setStatus('error')
    }
  }

  return (
    <section className="mt-8" aria-labelledby="newsletter-heading">
      <h2 id="newsletter-heading" className="mb-4 font-semibold text-foreground text-lg">
        Newsletter
      </h2>
      <div className="space-y-4 rounded-lg border border-border bg-card p-6">
        <p className="text-foreground-muted text-sm">
          Get Front-End Checklist news by email. Signing in does not subscribe you. Selecting
          Subscribe signs up your account email; you can unsubscribe using the link in any
          newsletter.
        </p>
        <Button onClick={subscribe} disabled={status === 'pending' || status === 'subscribed'}>
          {status === 'pending'
            ? 'Subscribing…'
            : status === 'subscribed'
              ? 'Subscribed'
              : 'Subscribe'}
        </Button>
        <p role="status" className="text-foreground-muted text-sm">
          {status === 'subscribed' && 'You are subscribed to the newsletter.'}
          {status === 'error' && 'Subscription failed. Please try again.'}
        </p>
      </div>
    </section>
  )
}
