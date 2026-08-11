# @thedaviddias/analytics

Unified analytics package for **OpenPanel**. Drop the provider into your Next.js layout to get pageviews, outbound link tracking, and user identification out of the box.

## Exports

| Import path                                            | Description                                                              |
| ------------------------------------------------------ | ------------------------------------------------------------------------ |
| `@thedaviddias/analytics`                              | `AnalyticsProvider` — renders nonce-aware OpenPanel scripts              |
| `@thedaviddias/analytics/head`                         | `AnalyticsHead` — backwards-compatible wrapper around `AnalyticsProvider` |
| `@thedaviddias/analytics/server`                       | `opServer` — server-side OpenPanel SDK singleton                         |
| `@thedaviddias/analytics/providers/openpanel-identify` | `OpenPanelIdentify` — client component that syncs auth user to OpenPanel |

## Environment variables

| Variable                          | Required                      | Scope           | Description                                                                                          |
| --------------------------------- | ----------------------------- | --------------- | ---------------------------------------------------------------------------------------------------- |
| `NEXT_PUBLIC_OPENPANEL_CLIENT_ID` | Yes (for OpenPanel)           | Client + Server | OpenPanel client ID from your self-hosted dashboard                                                  |
| `OPENPANEL_CLIENT_SECRET`         | Only for server-side tracking | Server only     | OpenPanel client secret (never expose to the browser)                                                |
| `OPENPANEL_API_URL`               | No                            | Server only     | Self-hosted API base (default: `https://stats.daviddias.digital/api`). Used by the proxy + SDK.      |

Both variables must be added to `turbo.json` → `tasks.build.env` so Turborepo invalidates the build cache when they change.

## Setup

### 1. Install the package

```bash
pnpm add @thedaviddias/analytics
```

### 2. Add the provider to your root layout

Place `AnalyticsProvider` and `OpenPanelIdentify` inside `<body>`:

```tsx
// app/layout.tsx
import { AnalyticsProvider } from '@thedaviddias/analytics'
import { OpenPanelIdentify } from '@thedaviddias/analytics/providers/openpanel-identify'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AnalyticsProvider
          clientId={process.env.NEXT_PUBLIC_OPENPANEL_CLIENT_ID}
          nonce={nonce}
        />
        <OpenPanelIdentify />
        {children}
      </body>
    </html>
  )
}
```

### 3. Create the OpenPanel proxy route

Create `app/api/op/[...path]/route.ts` to proxy analytics requests through your own domain (avoids ad blockers):

```ts
import { createRouteHandler } from '@openpanel/nextjs/server'
import { openPanelApiUrl } from '@thedaviddias/analytics/server'

export const { GET, POST } = createRouteHandler({ apiUrl: openPanelApiUrl })
```

### 4. Update middleware

Add these to your middleware:

- **Public routes**: Add `'/api/op/(.*)'` so the proxy is accessible without auth.
- **CSP script-src**: Add `https://openpanel.dev` as a fallback origin.
- **Rate-limit skip**: Exclude `/api/op/` paths from rate limiting.
- **HTTP method allow**: Allow `POST` for `/api/op/`.

### 5. Add environment variables to turbo.json

```jsonc
// turbo.json → tasks.build.env
"NEXT_PUBLIC_OPENPANEL_CLIENT_ID",
"OPENPANEL_API_URL",
"OPENPANEL_CLIENT_SECRET",
```

## Server-side event tracking

For API routes and server actions, use the `trackServerEvent` helper with Vercel's `waitUntil`:

```ts
// lib/openpanel-server.ts
import { waitUntil } from '@vercel/functions'
import { opServer } from '@thedaviddias/analytics/server'

export function trackServerEvent(event: string, properties?: Record<string, unknown>) {
  if (process.env.NODE_ENV !== 'production') return
  waitUntil(opServer.track(event, properties ?? {}))
}
```

This requires `@vercel/functions` installed in your app and `OPENPANEL_CLIENT_SECRET` set.

## User identification

`OpenPanelIdentify` automatically syncs the authenticated user to OpenPanel using Better Auth's `authClient.useSession()` hook. When a user signs in, it calls `window.op.identify(...)` with their user ID, name, and email. On sign-out it calls `window.op.clear()`.

## CSP compatibility

The provider intentionally does **not** use `@openpanel/nextjs` for script injection because that package emits an inline `afterInteractive` init script without nonce support. `AnalyticsProvider` renders the OpenPanel loader and init scripts on the server instead, and accepts an optional `nonce` prop so it remains compatible with strict nonce-based CSP deployments.

## How it works

```txt
AnalyticsProvider
  └─ OpenPanelAnalyticsComponent  → loads op1.js via /api/op proxy
       └─ globalProperties: { environment }

OpenPanelIdentify (body)
  └─ authClient.useSession() → window.op.identify() / window.op.clear()

opServer.track() (server)
  └─ OpenPanel SDK → direct API call with clientSecret
```

## Production guards

OpenPanel tracking is gated behind `process.env.NODE_ENV === 'production'` in two places:

1. **Client-side script** — `OpenPanelAnalyticsComponent` renders with `disabled={true}` in non-production.
2. **User identification** — `OpenPanelIdentify` returns early in non-production.
