import ogs from 'open-graph-scraper'

const BOT_USER_AGENT = `FrontEndChecklistBot/2.0 (+${process.env.NEXT_PUBLIC_SITE_URL || 'https://frontendchecklist.io'})`

export interface UrlMetadata {
  title: string
  description?: string
  author?: string
  siteName?: string
  image?: string
}

const NON_HTML_EXTENSIONS = new Set([
  '.pdf',
  '.png',
  '.jpg',
  '.jpeg',
  '.gif',
  '.webp',
  '.svg',
  '.zip',
  '.gz',
  '.mp4',
  '.mp3',
  '.mov',
  '.avi',
  '.webm'
])

/**
 * Decide whether a URL is a reasonable candidate for Open Graph scraping.
 * @param url - URL to evaluate.
 * @returns True when the URL likely points to an HTML document.
 */
function shouldFetchUrlMetadata(url: string): boolean {
  try {
    const parsedUrl = new URL(url)

    if (!['http:', 'https:'].includes(parsedUrl.protocol)) {
      return false
    }

    const lowerPath = parsedUrl.pathname.toLowerCase()
    const extension = lowerPath.includes('.') ? lowerPath.slice(lowerPath.lastIndexOf('.')) : ''

    return !NON_HTML_EXTENSIONS.has(extension)
  } catch {
    return false
  }
}

/**
 * Decide whether a scraper error is expected and safe to suppress.
 * @param message - Error message returned by the scraper.
 * @returns True when the failure should not be logged.
 */
function isIgnorableMetadataError(message: string): boolean {
  const normalized = message.toLowerCase()

  return (
    normalized.includes('404') ||
    normalized.includes('403') ||
    normalized.includes('must scrape an html page') ||
    normalized.includes('content-type') ||
    normalized.includes('invalid url')
  )
}

/**
 * Normalize scraper failures into a single comparable error string.
 * @param error - Unknown scraper error value.
 * @returns Normalized error message.
 */
function getMetadataErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    return error.message
  }

  if (typeof error === 'string') {
    return error
  }

  if (typeof error === 'object' && error !== null) {
    const result = Reflect.get(error, 'result')
    if (typeof result === 'object' && result !== null) {
      const nestedError = Reflect.get(result, 'error')
      if (typeof nestedError === 'string') {
        return nestedError
      }
    }

    const message = Reflect.get(error, 'message')
    if (typeof message === 'string') {
      return message
    }
  }

  return 'Unknown metadata error'
}

/**
 * Fetch metadata from a URL using Open Graph scraper
 * Falls back to basic HTML title/description if OG tags aren't available
 */
export async function fetchUrlMetadata(url: string): Promise<UrlMetadata | null> {
  if (!shouldFetchUrlMetadata(url)) {
    return null
  }

  try {
    const { result, error } = await ogs({
      url,
      timeout: 10,
      fetchOptions: {
        headers: {
          'User-Agent': BOT_USER_AGENT
        }
      }
    })

    if (error || !result.success) {
      const message = typeof result.error === 'string' ? result.error : 'Unknown metadata error'

      if (!isIgnorableMetadataError(message)) {
        console.warn(`[url-metadata] Failed to fetch metadata for ${url}: ${message}`)
      }

      return null
    }

    // Extract the best available title
    const title = result.ogTitle || result.twitterTitle || result.dcTitle || extractDomainName(url)

    // Extract description
    const description = result.ogDescription || result.twitterDescription || result.dcDescription

    // Extract author (try multiple sources)
    const author = result.author || result.ogArticleAuthor?.[0] || result.dcCreator

    // Extract site name
    const siteName = result.ogSiteName || result.twitterSite

    // Extract image
    const image = result.ogImage?.[0]?.url || result.twitterImage?.[0]?.url

    return {
      title,
      description,
      author,
      siteName,
      image
    }
  } catch (err) {
    const message = getMetadataErrorMessage(err)

    if (!isIgnorableMetadataError(message)) {
      console.warn(`[url-metadata] Error fetching ${url}: ${message}`)
    }

    return null
  }
}

/**
 * Extract a readable name from the domain
 */
function extractDomainName(url: string): string {
  try {
    const hostname = new URL(url).hostname.replace('www.', '')
    // Capitalize first letter of each part
    return hostname
      .split('.')
      .slice(0, -1) // Remove TLD
      .map(part => part.charAt(0).toUpperCase() + part.slice(1))
      .join(' ')
  } catch {
    return url
  }
}

/**
 * Cache for metadata to avoid re-fetching during builds
 * This persists across the build process
 */
const metadataCache = new Map<string, UrlMetadata | null>()

/**
 * Fetch metadata with caching
 * Used during build to avoid duplicate requests
 */
export async function fetchUrlMetadataCached(url: string): Promise<UrlMetadata | null> {
  if (metadataCache.has(url)) {
    return metadataCache.get(url) || null
  }

  const metadata = await fetchUrlMetadata(url)
  metadataCache.set(url, metadata)
  return metadata
}

/**
 * Batch fetch metadata for multiple URLs
 * Useful for processing all resources in a rule
 */
export async function fetchUrlMetadataBatch(
  urls: string[]
): Promise<Map<string, UrlMetadata | null>> {
  const results = new Map<string, UrlMetadata | null>()

  // Process in parallel with a concurrency limit
  const CONCURRENCY = 5
  for (let i = 0; i < urls.length; i += CONCURRENCY) {
    const batch = urls.slice(i, i + CONCURRENCY)
    const promises = batch.map(async url => {
      const metadata = await fetchUrlMetadataCached(url)
      results.set(url, metadata)
    })
    await Promise.all(promises)
  }

  return results
}
