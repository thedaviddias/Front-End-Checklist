import type { BreadcrumbItemData } from '@repo/design-system/custom/navigation/breadcrumb'
import { PageBreadcrumbs } from '@repo/design-system/custom/navigation/page-breadcrumbs'
import { allRules } from 'content-collections'
import { Suspense } from 'react'
import { SITE_LANGUAGE } from '@/app/(site)/layout'
import { ChecklistActionBar } from '@/components/checklists/actions/checklist-action-bar'
import { buildChecklistActionBarProps } from '@/components/checklists/actions/checklist-action-bar-props'
import { PageHero } from '@/components/content/page/page-hero'
import { CategoryQuickNav } from '@/components/navigation/quick-nav/category-quick-nav'
import { RulesBrowser, RulesBrowserSkeleton } from '@/components/rules/browser/rules-browser'
import { ShareButton } from '@/components/rules/detail/share-button'
import { cachePublicContent } from '@/lib/public-content-cache'
import { categoryConfig, pageMetadata, siteConfig } from '@/lib/seo'
import { QueryProvider } from '@/providers/query-provider'

export const metadata = pageMetadata.rules

// Base URL for structured data
const BASE_URL = siteConfig.url

export default async function RulesPage() {
  'use cache'
  cachePublicContent()

  const lang = SITE_LANGUAGE

  // Get all rules for the current language
  const langRules = allRules.filter(rule => rule.language === lang)
  const rules = langRules.map(rule => ({
    id: rule.id,
    title: rule.title,
    description: rule.description,
    slug: rule.slug,
    priority: rule.priority,
    primaryCategory: rule.primaryCategory,
    categories: rule.categories,
    subcategory: rule.subcategory,
    language: rule.language
  }))

  // Build categories with their rules for quick nav
  const initialCategoryMap: Record<string, { ruleIds: string[]; count: number }> = {}
  const categoryRulesMap = rules.reduce((acc, rule) => {
    const cat = rule.primaryCategory
    if (!acc[cat]) acc[cat] = { ruleIds: [], count: 0 }
    acc[cat].ruleIds.push(rule.id)
    acc[cat].count++
    return acc
  }, initialCategoryMap)

  const categories = Object.entries(categoryRulesMap)
    .map(([slug, data]) => ({
      slug,
      title: categoryConfig[slug]?.title || slug,
      ruleCount: data.count,
      ruleIds: data.ruleIds
    }))
    .sort((a, b) => a.title.localeCompare(b.title))

  // Breadcrumb items for navigation and SEO structured data
  const breadcrumbItems: BreadcrumbItemData[] = [
    { label: 'Home', href: '/' },
    { label: 'Rules' } // Current page - no href
  ]

  return (
    <QueryProvider>
      <div className="container-content py-12 sm:py-16 lg:pt-5 lg:pb-20">
        <PageBreadcrumbs items={breadcrumbItems} baseUrl={BASE_URL} includeJsonLd />

        <PageHero
          title="All Rules"
          description={`Browse all ${rules.length} frontend development rules and best practices.`}
          actions={<ShareButton title="All Rules" />}
        >
          <CategoryQuickNav categories={categories} />
        </PageHero>

        {/* Rules Browser */}
        <Suspense fallback={<RulesBrowserSkeleton />}>
          <RulesBrowser rules={rules} groupByCategory groupBySubcategory enableCategoryLinks />
        </Suspense>
      </div>

      <ChecklistActionBar {...buildChecklistActionBarProps({ allRules: rules })} />
    </QueryProvider>
  )
}
