import { cacheLife } from 'next/cache'

const PUBLIC_CONTENT_CACHE_LIFE = {
  stale: 86_400,
  revalidate: 604_800,
  expire: 31_536_000
} as const

/**
 * Apply the long-lived cache profile used for static public content pages.
 */
export function cachePublicContent(): void {
  cacheLife(PUBLIC_CONTENT_CACHE_LIFE)
}
