import { routeHome, routeRules } from '@repo/config'
import type { BreadcrumbItemData } from '@repo/design-system/custom/navigation/breadcrumb'
import { PageBreadcrumbs } from '@repo/design-system/custom/navigation/page-breadcrumbs'
import { allRules } from 'content-collections'
import type { Metadata } from 'next'
import { Suspense } from 'react'
import { SITE_LANGUAGE } from '@/app/(site)/layout'
import { ChecklistActionBar } from '@/components/checklists/actions/checklist-action-bar'
import { buildChecklistActionBarProps } from '@/components/checklists/actions/checklist-action-bar-props'
import { PageHero } from '@/components/content/page/page-hero'
import { RulesBrowser, RulesBrowserSkeleton } from '@/components/rules/browser/rules-browser'
import { ShareButton } from '@/components/rules/detail/share-button'
import { cachePublicContent } from '@/lib/public-content-cache'
import {
  categoryConfig,
  generateCategoryMetadata,
  generateCategorySchema,
  JsonLd,
  siteConfig
} from '@/lib/seo'
import { QueryProvider } from '@/providers/query-provider'

// Base URL for structured data
const BASE_URL = siteConfig.url

interface PageProps {
  params: Promise<{ category: string }>
}

/** Returns static params for all known rule categories. */
export function generateStaticParams() {
  return Object.keys(categoryConfig).map(category => ({ category }))
}

/** Generates SEO metadata for a category page based on its rule count. */
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { category } = await params
  const ruleCount = allRules.filter(rule => rule.primaryCategory === category).length
  return generateCategoryMetadata(category, ruleCount)
}

export default async function CategoryPage({ params }: PageProps) {
  'use cache'
  cachePublicContent()

  const { category } = await params
  const lang = SITE_LANGUAGE
  const config = categoryConfig[category] || {
    title: category,
    description: 'Web development best practices.',
    seoDescription: 'Web development best practices and guidelines.'
  }

  // Get rules for this category and language
  const rules = allRules.filter(rule => rule.language === lang && rule.primaryCategory === category)

  // Breadcrumb items for navigation and SEO structured data
  const breadcrumbItems: BreadcrumbItemData[] = [
    { label: 'Home', href: routeHome() },
    { label: 'Rules', href: routeRules() },
    { label: config.title } // Current page - no href
  ]

  return (
    <QueryProvider>
      <div className="container-content py-12 sm:py-16 lg:pt-5 lg:pb-20">
        <PageBreadcrumbs items={breadcrumbItems} baseUrl={BASE_URL} includeJsonLd />
        <JsonLd
          data={generateCategorySchema({
            name: config.title,
            description: config.seoDescription,
            rules: rules.map(rule => ({
              title: rule.title,
              slug: rule.slug,
              primaryCategory: rule.primaryCategory
            }))
          })}
        />

        <PageHero
          title={config.title}
          description={config.description}
          actions={<ShareButton title={config.title} />}
        />

        {/* Rules Browser */}
        <Suspense fallback={<RulesBrowserSkeleton count={rules.length} />}>
          <RulesBrowser
            rules={rules.map(rule => ({
              id: rule.id,
              title: rule.title,
              description: rule.description,
              slug: rule.slug,
              priority: rule.priority,
              primaryCategory: rule.primaryCategory,
              categories: rule.categories,
              subcategory: rule.subcategory,
              language: rule.language
            }))}
            showCategoryFilter={false}
            groupBySubcategory
            currentCategory={category}
          />
        </Suspense>
      </div>

      <ChecklistActionBar
        {...buildChecklistActionBarProps({
          allRules: allRules.filter(rule => rule.language === lang),
          scopeRules: rules,
          currentCategory: category
        })}
      />
    </QueryProvider>
  )
}
