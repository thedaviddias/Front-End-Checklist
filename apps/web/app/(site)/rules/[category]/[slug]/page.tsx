import { routeHome, routeRules, routeRulesCategory } from '@repo/config'
import type { BreadcrumbItemData } from '@repo/design-system/custom/navigation/breadcrumb'
import { allRules } from 'content-collections'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { SITE_LANGUAGE } from '@/app/(site)/layout'
import { ChecklistActionBar } from '@/components/checklists/actions/checklist-action-bar'
import { buildChecklistActionBarProps } from '@/components/checklists/actions/checklist-action-bar-props'
import { cachePublicContent } from '@/lib/public-content-cache'
import { getRuleRawContent } from '@/lib/rule-content'
import { generateRuleMetadata, siteConfig } from '@/lib/seo'
import { QueryProvider } from '@/providers/query-provider'
import { RulePageContent } from './rule-page-content'
import {
  categoryNames,
  isRuleResource,
  isRuleSource,
  resolveRelatedRules
} from './rule-page-helpers'

const BASE_URL = siteConfig.url

interface PageProps {
  params: Promise<{ category: string; slug: string }>
}

/**
 * Generate static params for all rules.
 */
export function generateStaticParams() {
  return allRules.map(rule => ({
    category: rule.primaryCategory,
    slug: rule.slug
  }))
}

/**
 * Generate metadata for the rule detail page.
 *
 * @param props - Rule page params.
 * @returns Metadata for the matching rule.
 */
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const lang = SITE_LANGUAGE
  const rule = allRules.find(item => item.slug === slug && item.language === lang)

  if (!rule) {
    return { title: 'Rule Not Found' }
  }

  return generateRuleMetadata({
    title: rule.title,
    description: rule.description || `Best practices for ${rule.title} in frontend development.`,
    slug: rule.slug,
    primaryCategory: rule.primaryCategory,
    priority: rule.priority,
    difficulty: rule.difficulty
  })
}

export default async function RulePage({ params }: PageProps) {
  'use cache'
  cachePublicContent()

  const { category, slug } = await params
  const lang = SITE_LANGUAGE
  const rule = allRules.find(item => item.slug === slug && item.language === lang)

  if (!rule) {
    notFound()
  }

  const rawContent = rule.filePath ? await getRuleRawContent(rule.filePath) : ''

  const fromFrontmatter = resolveRelatedRules(lang, category, slug, rule.relatedRules, allRules)
  const relatedRules =
    fromFrontmatter.length > 0
      ? fromFrontmatter
      : allRules
          .filter(
            item =>
              item.language === lang && item.primaryCategory === category && item.slug !== slug
          )
          .slice(0, 5)
          .map(item => ({
            id: item.id,
            title: item.title,
            slug: item.slug,
            primaryCategory: item.primaryCategory,
            description: item.description
          }))

  const categoryRules = allRules
    .filter(item => item.language === lang && item.primaryCategory === category)
    .map(item => ({
      id: item.id,
      title: item.title,
      description: item.description,
      priority: item.priority,
      primaryCategory: item.primaryCategory,
      subcategory: item.subcategory
    }))

  const allRulesForLang = allRules
    .filter(item => item.language === lang)
    .map(item => ({ id: item.id, primaryCategory: item.primaryCategory }))

  const categoryDisplayName = categoryNames[category] || category
  const breadcrumbItems: BreadcrumbItemData[] = [
    { label: 'Home', href: routeHome() },
    { label: 'Rules', href: routeRules() },
    { label: categoryDisplayName, href: routeRulesCategory(category) },
    { label: rule.title }
  ]

  const resources = rule.resources?.filter(isRuleResource)
  const sources = rule.sources?.filter(isRuleSource)
  const toolsWithUrls = rule.tools?.filter(
    (tool: string | { name: string; url: string | null }): tool is { name: string; url: string } =>
      typeof tool === 'object' && tool.url !== null
  )

  const hasSources = Boolean(sources && sources.length > 0)
  const hasResources = Boolean(
    (toolsWithUrls && toolsWithUrls.length > 0) || (resources && resources.length > 0)
  )

  const anchorNavItems = [
    { label: 'Details', anchor: 'content-heading' },
    ...(rule.prompts ? [{ label: 'Use with AI', anchor: 'use-with-ai' }] : []),
    ...(hasSources ? [{ label: 'Sources', anchor: 'sources-heading' }] : []),
    ...(hasResources ? [{ label: 'Resources', anchor: 'resources-heading' }] : []),
    ...(relatedRules.length > 0
      ? [{ label: 'Related', anchor: 'related-rules-section-heading' }]
      : [])
  ]

  return (
    <QueryProvider>
      <RulePageContent
        baseUrl={BASE_URL}
        breadcrumbItems={breadcrumbItems}
        rule={{ ...rule, content: rawContent }}
        relatedRules={relatedRules}
        resources={resources}
        sources={sources}
        toolsWithUrls={toolsWithUrls}
        anchorNavItems={anchorNavItems}
      />

      <ChecklistActionBar
        {...buildChecklistActionBarProps({
          allRules: allRulesForLang,
          scopeRules: categoryRules,
          currentCategory: category
        })}
      />
    </QueryProvider>
  )
}
