import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'

// Rate limiter configuration for MCP endpoint
// Uses sliding window algorithm: 30 requests per minute per IP

let ratelimit: Ratelimit | null = null
let waitlistRatelimit: Ratelimit | null = null

/**
 * Read Redis REST credentials from either direct Upstash env names or Vercel KV integration names.
 */
function getRedisRestCredentials(): { url?: string; token?: string } {
  return {
    url: process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL,
    token: process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN
  }
}

/**
 * Get or create the rate limiter instance
 * Returns null if Upstash credentials are not configured
 */
function getRatelimiter(): Ratelimit | null {
  if (ratelimit) return ratelimit

  const { url, token } = getRedisRestCredentials()

  if (!url || !token) {
    console.warn('[rate-limit] Upstash credentials not configured, rate limiting disabled')
    return null
  }

  try {
    const redis = new Redis({ url, token })

    ratelimit = new Ratelimit({
      redis,
      // Sliding window: 30 requests per 60 seconds
      limiter: Ratelimit.slidingWindow(30, '60 s'),
      // Prefix for Redis keys
      prefix: 'mcp-ratelimit',
      // Analytics disabled by default (costs extra)
      analytics: false
    })

    return ratelimit
  } catch (error) {
    console.error('[rate-limit] Failed to initialize rate limiter:', error)
    return null
  }
}

/**
 * Get or create the waitlist rate limiter (stricter: 5 requests per minute per IP)
 */
function getWaitlistRatelimiter(): Ratelimit | null {
  if (waitlistRatelimit) return waitlistRatelimit

  const { url, token } = getRedisRestCredentials()

  if (!url || !token) return null

  try {
    const redis = new Redis({ url, token })
    waitlistRatelimit = new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(5, '60 s'),
      prefix: 'waitlist-ratelimit',
      analytics: false
    })
    return waitlistRatelimit
  } catch (error) {
    console.error('[rate-limit] Failed to initialize waitlist rate limiter:', error)
    return null
  }
}

/**
 * Check waitlist rate limit for a given identifier
 */
export async function checkWaitlistRateLimit(identifier: string): Promise<RateLimitResult> {
  const limiter = getWaitlistRatelimiter()
  if (!limiter) {
    return { success: true, limit: 5, remaining: 5, reset: Date.now() + 60000 }
  }
  try {
    const result = await limiter.limit(identifier)
    return {
      success: result.success,
      limit: result.limit,
      remaining: result.remaining,
      reset: result.reset
    }
  } catch (error) {
    console.error('[rate-limit] Waitlist rate limit check failed:', error)
    return { success: true, limit: 5, remaining: 5, reset: Date.now() + 60000 }
  }
}

export interface RateLimitResult {
  success: boolean
  limit: number
  remaining: number
  reset: number
}

/**
 * Check rate limit for a given identifier (typically IP address)
 * Returns success=true if under limit, or rate limit info if exceeded
 */
export async function checkRateLimit(identifier: string): Promise<RateLimitResult> {
  const limiter = getRatelimiter()

  // If rate limiting is not configured, allow all requests
  if (!limiter) {
    return {
      success: true,
      limit: 30,
      remaining: 30,
      reset: Date.now() + 60000
    }
  }

  try {
    const result = await limiter.limit(identifier)
    return {
      success: result.success,
      limit: result.limit,
      remaining: result.remaining,
      reset: result.reset
    }
  } catch (error) {
    // On error, gracefully degrade to allowing the request
    console.error('[rate-limit] Rate limit check failed:', error)
    return {
      success: true,
      limit: 30,
      remaining: 30,
      reset: Date.now() + 60000
    }
  }
}

/**
 * Get the client IP address from a request
 * Handles various proxy headers used by Vercel
 */
export function getClientIp(request: Request): string {
  // Vercel-specific header
  const forwardedFor = request.headers.get('x-forwarded-for')
  if (forwardedFor) {
    // Get the first IP in the chain (original client)
    return forwardedFor.split(',')[0].trim()
  }

  // Vercel real IP header
  const realIp = request.headers.get('x-real-ip')
  if (realIp) {
    return realIp.trim()
  }

  // Fallback for local development
  return '127.0.0.1'
}

/**
 * Create rate limit response headers
 */
export function createRateLimitHeaders(result: RateLimitResult): Record<string, string> {
  return {
    'X-RateLimit-Limit': String(result.limit),
    'X-RateLimit-Remaining': String(result.remaining),
    'X-RateLimit-Reset': String(result.reset)
  }
}
