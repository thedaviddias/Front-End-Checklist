'use cache'

import { GITHUB_REPO_API_URL } from '@repo/config'
import { allRules } from 'content-collections'
import { cachePublicContent } from './public-content-cache'
import { getFetchTimeoutOptions } from './remote-data'

// Cache rule data with Next.js 16 Cache Components
/**
 * getCachedRules function.
 * @param lang - lang.
 */
export async function getCachedRules(lang: string) {
  'use cache'
  cachePublicContent()

  return allRules
    .filter(rule => rule.language === lang)
    .map(rule => ({
      id: rule.id,
      title: rule.title,
      description: rule.description,
      slug: rule.slug,
      priority: rule.priority,
      primaryCategory: rule.primaryCategory,
      categories: rule.categories,
      language: rule.language
    }))
}

/**
 * getCachedRulesByCategory function.
 * @param lang - lang.
 * @param category - category.
 */
export async function getCachedRulesByCategory(lang: string, category: string) {
  'use cache'
  cachePublicContent()

  return allRules.filter(rule => rule.language === lang && rule.primaryCategory === category)
}

/**
 * getCachedRule function.
 * @param lang - lang.
 * @param slug - slug.
 */
export async function getCachedRule(lang: string, slug: string) {
  'use cache'
  cachePublicContent()

  return allRules.find(rule => rule.slug === slug && rule.language === lang)
}

/**
 * getCachedCategories function.
 * @param lang - lang.
 */
export async function getCachedCategories(lang: string) {
  'use cache'
  cachePublicContent()

  const rules = allRules.filter(rule => rule.language === lang)
  const categoryCounts: Record<string, number> = {}

  // Count rules by category
  for (const rule of rules) {
    const category = rule.primaryCategory
    categoryCounts[category] = (categoryCounts[category] || 0) + 1
  }

  const categories: Array<{ slug: string; title: string; count: number }> = Object.entries(
    categoryCounts
  ).map(([slug, count]) => ({
    slug,
    title: slug.charAt(0).toUpperCase() + slug.slice(1),
    count: Number(count)
  }))

  return categories.sort((a, b) => b.count - a.count)
}

/**
 * Load and cache the GitHub star count used by server-rendered pages.
 */
export async function getCachedGitHubStars(): Promise<number | null> {
  'use cache'
  cachePublicContent()

  try {
    const response = await fetch(GITHUB_REPO_API_URL, {
      next: { revalidate: 3600 },
      ...getFetchTimeoutOptions()
    })

    if (!response.ok) {
      return null
    }

    const data = await response.json()

    return typeof data.stargazers_count === 'number' && data.stargazers_count >= 0
      ? data.stargazers_count
      : null
  } catch {
    return null
  }
}
