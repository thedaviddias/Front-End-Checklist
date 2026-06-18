import * as Sentry from '@sentry/nextjs'
import { initBotId } from 'botid/client/core'

const dsn = process.env.NEXT_PUBLIC_SENTRY_DSN?.trim()

Sentry.init({
  dsn,
  enabled: Boolean(dsn) && process.env.NODE_ENV === 'production',
  environment: process.env.NEXT_PUBLIC_ENVIRONMENT ?? process.env.NODE_ENV ?? 'development',
  release: process.env.NEXT_PUBLIC_APP_VERSION,
  sendDefaultPii: false,
  tracesSampleRate: 0.1
})

export const onRouterTransitionStart = Sentry.captureRouterTransitionStart

initBotId({
  protect: [
    { path: '/api/waitlist', method: 'POST' },
    { path: '/api/audits', method: 'POST' },
    { path: '/api/checklists', method: 'POST' },
    { path: '/api/checklists/*', method: 'PATCH' },
    { path: '/api/checklists/*', method: 'DELETE' }
  ]
})
