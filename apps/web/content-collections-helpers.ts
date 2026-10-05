import { fetchUrlMetadataCached } from '@/lib/url-metadata'

export type NormalizedTool = { name: string; url: string | null }

export interface NpmPackageResult {
  name: string
  description: string
  version: string
  weeklyDownloads: number
  lastPublish: string
  url: string
  repository?: string
}

const NPM_REGISTRY = 'https://registry.npmjs.org'
const NPM_DOWNLOADS_API = 'https://api.npmjs.org/downloads/point/last-week'

/**
 * Fetch metadata for a single npm package from the registry.
 * Returns null if the package is not found or an error occurs.
 * @param name - npm package name (e.g. "eslint", "@scope/pkg")
 */
async function fetchNpmPackage(name: string): Promise<NpmPackageResult | null> {
  try {
    const encoded = encodeURIComponent(name).replace('%40', '@').replace('%2F', '/')
    const [metaRes, dlRes] = await Promise.all([
      fetch(`${NPM_REGISTRY}/${encoded}/latest`, {
        headers: { Accept: 'application/json' },
        signal: AbortSignal.timeout(10_000)
      }),
      fetch(`${NPM_DOWNLOADS_API}/${encoded}`, {
        headers: { Accept: 'application/json' },
        signal: AbortSignal.timeout(10_000)
      })
    ])

    if (!metaRes.ok) return null

    const meta = (await metaRes.json()) as {
      name: string
      description?: string
      version: string
      time?: { modified?: string }
      repository?: { url?: string } | string
    }
    const downloads = dlRes.ok ? ((await dlRes.json()) as { downloads?: number }) : {}

    const repoUrl =
      typeof meta.repository === 'string'
        ? meta.repository
        : meta.repository?.url?.replace(/^git\+/, '').replace(/\.git$/, '')

    return {
      name: meta.name,
      description: meta.description || '',
      version: meta.version,
      weeklyDownloads: downloads.downloads ?? 0,
      lastPublish: meta.time?.modified ?? new Date().toISOString(),
      url: `https://www.npmjs.com/package/${meta.name}`,
      repository: repoUrl
    }
  } catch {
    return null
  }
}

/**
 * Enrich a list of npm package names with live registry metadata.
 * Only includes packages with >10k weekly downloads and updated in the last 18 months.
 * @param packages - Raw package name strings from frontmatter
 */
export async function enrichNpmPackages(
  packages: string[] | undefined
): Promise<NpmPackageResult[]> {
  if (!packages || packages.length === 0) return []

  const cutoff = new Date()
  cutoff.setMonth(cutoff.getMonth() - 18)

  const results = await Promise.all(packages.map(name => fetchNpmPackage(name)))

  return results.filter((pkg): pkg is NpmPackageResult => {
    if (!pkg) return false
    if (pkg.weeklyDownloads < 10_000) return false
    if (new Date(pkg.lastPublish) < cutoff) return false
    return true
  })
}

type ResourceInput = {
  name?: string
  url: string
  type: string
  author?: string
  description?: string
}

type ResourceOutput = {
  name: string
  url: string
  type: string
  author?: string
  description?: string
  image?: string
  siteName?: string
}

/** Max length for extracted link descriptions (stored and shown in cards). */
const RESOURCE_DESCRIPTION_MAX_LENGTH = 160

/**
 * Truncate and normalize a description string for resource cards.
 */
function truncateDescription(description: string | undefined): string | undefined {
  if (!description || typeof description !== 'string') return undefined
  const trimmed = description.replace(/\s+/g, ' ').trim()
  if (!trimmed) return undefined
  if (trimmed.length <= RESOURCE_DESCRIPTION_MAX_LENGTH) return trimmed
  return `${trimmed.slice(0, RESOURCE_DESCRIPTION_MAX_LENGTH).trimEnd()}…`
}

const VALID_PRIORITIES = new Set(['critical', 'high', 'medium', 'low'])

/**
 * Check whether a priority string belongs to the supported priority union.
 * @param value - Priority candidate to validate.
 */
function isPriority(value: string): value is 'critical' | 'high' | 'medium' | 'low' {
  return VALID_PRIORITIES.has(value)
}

/**
 * Normalize legacy tool definitions into a consistent object format.
 * @param tools - Raw frontmatter tool entries.
 * @returns Normalized tool objects.
 */
export function normalizeTools(
  tools: (string | { name: string; url: string })[] | undefined
): NormalizedTool[] {
  if (!tools) return []
  return tools.map(tool => {
    if (typeof tool === 'string') {
      return { name: tool, url: null }
    }
    return tool
  })
}

/**
 * Enrich resources with metadata fetched from URLs.
 * @param resources - Resource definitions from frontmatter.
 * @returns Resources with resolved display names and metadata.
 */
export async function enrichResources(resources: ResourceInput[]): Promise<ResourceOutput[]> {
  if (!resources || resources.length === 0) return []

  const enriched = await Promise.all(
    resources.map(async (resource): Promise<ResourceOutput> => {
      if (resource.name) {
        return {
          ...resource,
          name: resource.name
        }
      }

      try {
        const metadata = await fetchUrlMetadataCached(resource.url)

        if (metadata) {
          return {
            ...resource,
            name: metadata.title,
            author: resource.author || metadata.author,
            description: truncateDescription(resource.description || metadata.description),
            image: metadata.image,
            siteName: metadata.siteName
          }
        }
      } catch (err) {
        console.warn(`[enrichResources] Failed to fetch metadata for ${resource.url}:`, err)
      }

      return {
        ...resource,
        name: extractResourceName(resource.url)
      }
    })
  )

  return enriched
}

/**
 * Derive a readable fallback title from a resource URL.
 * @param url - Resource URL to inspect.
 */
function extractResourceName(url: string): string {
  try {
    const urlObj = new URL(url)
    const hostname = urlObj.hostname.replace('www.', '')
    const pathSegments = urlObj.pathname.split('/').filter(Boolean)
    if (pathSegments.length > 0) {
      const lastSegment = pathSegments[pathSegments.length - 1]
      const cleaned = lastSegment
        .replace(/\.(html?|php|aspx?)$/i, '')
        .replace(/-/g, ' ')
        .replace(/_/g, ' ')

      return cleaned
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ')
    }

    return hostname
      .split('.')
      .slice(0, -1)
      .map(part => part.charAt(0).toUpperCase() + part.slice(1))
      .join(' ')
  } catch {
    return url
  }
}

/**
 * Normalize legacy numeric priorities to the public priority union.
 * @param priority - Raw priority value from frontmatter.
 * @returns A normalized priority string.
 */
export function normalizePriority(priority: string): 'critical' | 'high' | 'medium' | 'low' {
  if (priority === '1') return 'critical'
  if (priority === '2') return 'high'
  if (priority === '3') return 'medium'
  if (isPriority(priority)) {
    return priority
  }
  return 'medium'
}

/**
 * Generate keyword tokens used by content search and filtering.
 * @param document - Source content document.
 * @param language - Language key for the document.
 * @returns Deduplicated lowercase search keywords.
 */
export function generateSearchKeywords(document: any, language: string): string[] {
  const toolNames = (document.tools || []).map((tool: string | { name: string }) =>
    typeof tool === 'string' ? tool : tool.name
  )

  const keywords = [
    document.title,
    ...(document.categories || document.checklists || []),
    ...(document.tags || []),
    ...toolNames,
    document.description,
    document.subcategory,
    language
  ]

  return keywords
    .filter(Boolean)
    .flatMap(keyword => keyword.toString().toLowerCase().split(/\s+/))
    .filter((keyword, index, array) => array.indexOf(keyword) === index)
}
