import { createRouteHandler } from '@openpanel/nextjs/server'
import { openPanelApiUrl } from '@thedaviddias/analytics/server'

export const { GET, POST } = createRouteHandler({ apiUrl: openPanelApiUrl })
