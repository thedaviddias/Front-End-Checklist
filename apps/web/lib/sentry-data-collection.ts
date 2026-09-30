/** Header, query-param, and URL fragments that can carry client IPs or identity. */
const IDENTITY_KEY_DENYLIST = ['forwarded', '-ip', 'remote-', 'via', '-user']

/**
 * Sentry v11 `dataCollection` baseline matching the v10 `sendDefaultPii: false` behavior.
 *
 * v11 collects cookies, bodies, user info, and query data by default when this
 * option is unset, so every category is pinned explicitly to keep PII out.
 */
export const SENTRY_DATA_COLLECTION = {
  userInfo: false,
  cookies: false,
  httpHeaders: {
    request: { deny: IDENTITY_KEY_DENYLIST },
    response: { deny: IDENTITY_KEY_DENYLIST }
  },
  httpBodies: [],
  urlQueryParams: { deny: IDENTITY_KEY_DENYLIST },
  genAI: { inputs: false, outputs: false },
  databaseQueryData: false,
  queues: false,
  graphQL: { document: false, variables: false }
}
