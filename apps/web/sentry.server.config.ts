import * as Sentry from '@sentry/nextjs'
import { SENTRY_DATA_COLLECTION } from '@/lib/sentry-data-collection'

const dsn = process.env.SENTRY_DSN?.trim() || process.env.NEXT_PUBLIC_SENTRY_DSN?.trim()

Sentry.init({
  dsn,
  enabled: Boolean(dsn) && process.env.NODE_ENV === 'production',
  environment: process.env.NEXT_PUBLIC_ENVIRONMENT ?? process.env.NODE_ENV ?? 'development',
  release: process.env.NEXT_PUBLIC_APP_VERSION,
  dataCollection: SENTRY_DATA_COLLECTION,
  tracesSampleRate: 0.1
})
