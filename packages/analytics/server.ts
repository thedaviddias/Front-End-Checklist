import 'server-only'

import { OpenPanel } from '@openpanel/sdk'

const clientId = process.env.NEXT_PUBLIC_OPENPANEL_CLIENT_ID?.trim() ?? ''
const clientSecret = process.env.OPENPANEL_CLIENT_SECRET?.trim() ?? ''

/** Self-hosted OpenPanel API base (includes `/api`). */
export const openPanelApiUrl =
  process.env.OPENPANEL_API_URL?.trim() || 'https://stats.daviddias.digital/api'

export const hasOpenPanelServerConfig = Boolean(clientId && clientSecret)

export const opServer = new OpenPanel({
  apiUrl: openPanelApiUrl,
  clientId,
  clientSecret
})
