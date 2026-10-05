import { createHash } from 'node:crypto'
import { LRUCache } from 'lru-cache'

/**
 * LRU Cache for MCP POST request responses
 *
 * Since rules only change on deployment, we can cache responses aggressively.
 * The cache will be cleared on each deployment (new serverless instance).
 */

interface CachedResponse {
  data: unknown
  timestamp: number
}

// Cache configuration
const CACHE_MAX_ENTRIES = 500
const CACHE_TTL_MS = 60 * 60 * 1000 // 1 hour

// Create the LRU cache
const responseCache = new LRUCache<string, CachedResponse>({
  max: CACHE_MAX_ENTRIES,
  ttl: CACHE_TTL_MS,
  // Don't update TTL on access (fixed expiration)
  updateAgeOnGet: false,
  updateAgeOnHas: false
})

/**
 * Generate a cache key from a request body
 * Hash the complete cache input without retaining potentially large request keys.
 */
export function generateCacheKey(body: unknown): string {
  return createHash('sha256').update(JSON.stringify(body)).digest('hex')
}

/**
 * Get a cached response for the given request body
 * Returns undefined if not in cache or expired
 */
export function getCachedResponse(body: unknown): unknown | undefined {
  const key = generateCacheKey(body)
  const cached = responseCache.get(key)

  if (cached) {
    return cached.data
  }

  return undefined
}

/**
 * Cache a response for the given request body
 */
export function setCachedResponse(body: unknown, response: unknown): void {
  const key = generateCacheKey(body)
  responseCache.set(key, {
    data: response,
    timestamp: Date.now()
  })
}

/**
 * Get cache statistics for monitoring
 */
export function getCacheStats(): {
  size: number
  maxSize: number
  hitRate: number
} {
  const size = responseCache.size
  // LRUCache doesn't track hits/misses by default, so we return 0
  return {
    size,
    maxSize: CACHE_MAX_ENTRIES,
    hitRate: 0
  }
}

/**
 * Clear the cache (useful for testing)
 */
export function clearCache(): void {
  responseCache.clear()
}

/**
 * Cache headers for GET requests
 * These tell Vercel's CDN and browsers how to cache the response
 */
export const GET_CACHE_HEADERS = {
  // Browser cache: 1 hour
  // CDN cache: 24 hours
  // Stale-while-revalidate: 7 days (serve stale while fetching new)
  'Cache-Control': 'public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800'
}
