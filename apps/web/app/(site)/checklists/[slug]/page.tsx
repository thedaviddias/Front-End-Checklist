import { PageBreadcrumbs } from '@repo/design-system/custom/navigation/page-breadcrumbs'
import { Clock } from '@repo/design-system/icons'
import { allChecklists, allRules } from 'content-collections'
import { notFound } from 'next/navigation'
import { Suspense } from 'react'
import { SITE_LANGUAGE } from '@/app/(site)/layout'
import { ChecklistActionBar } from '@/components/checklists/actions/checklist-action-bar'
import { buildChecklistActionBarProps } from '@/components/checklists/actions/checklist-action-bar-props'
import {
  CHECKLIST_AUDIENCE_LABELS,
  getChecklistCuration
} from '@/components/checklists/checklist-curation'
import { ChecklistDifficultyBadge } from '@/components/checklists/checklist-difficulty-badge'
import { PageHero } from '@/components/content/page/page-hero'
import { RulesBrowser, RulesBrowserSkeleton } from '@/components/rules/browser/rules-browser'
import { cachePublicContent } from '@/lib/public-content-cache'
import { generateChecklistMetadata, generateChecklistSchema, JsonLd, siteConfig } from '@/lib/seo'
import { QueryProvider } from '@/providers/query-provider'
import { ChecklistMdxContent } from './checklist-mdx-content'

// Base URL for structured data
const BASE_URL = siteConfig.url

interface PageProps {
  params: Promise<{ slug: string }>
}

type ChecklistRule = (typeof allRules)[number]
type ChecklistData = (typeof allChecklists)[number]

/**
 * generateStaticParams function.
 */
export function generateStaticParams() {
  const slugs = new Set<string>()
  for (const checklist of allChecklists) {
    slugs.add(checklist.slug)
  }
  return Array.from(slugs).map(slug => ({ slug }))
}

// Generate metadata for SEO
/**
 * generateMetadata function.
 * @param { params } - { params }.
 */
export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params
  const lang = SITE_LANGUAGE
  const checklist = allChecklists.find((c: ChecklistData) => c.language === lang && c.slug === slug)

  if (!checklist) {
    return { title: 'Checklist Not Found' }
  }

  return generateChecklistMetadata({
    title: checklist.title,
    description: checklist.description,
    slug: checklist.slug,
    ruleCount: checklist.rules.length,
    difficulty: checklist.difficulty
  })
}

export default async function ChecklistDetailPage({ params }: PageProps) {
  'use cache'
  cachePublicContent()

  const { slug } = await params
  const lang = SITE_LANGUAGE

  // Find the checklist
  const checklist = allChecklists.find((c: ChecklistData) => c.language === lang && c.slug === slug)

  if (!checklist) {
    notFound()
  }

  // Get all rules for the current language
  const langRules = allRules.filter(rule => rule.language === lang)

  // Create a map from rule reference (category/slug) to rule data
  const ruleRefMap: Record<string, (typeof langRules)[0]> = {}
  for (const rule of langRules) {
    const refKey = `${rule.primaryCategory}/${rule.slug}`
    ruleRefMap[refKey] = rule
  }

  // Get rules that are part of this checklist
  const checklistRuleCandidates: Array<ChecklistRule | undefined> = checklist.rules.map(
    (ref: string) => ruleRefMap[ref]
  )

  const checklistRules = checklistRuleCandidates
    .filter((rule): rule is ChecklistRule => rule !== undefined)
    .map((rule: ChecklistRule) => ({
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

  const difficulty = checklist.difficulty || 'intermediate'
  const curation = getChecklistCuration(checklist.slug)

  // Breadcrumb items for navigation and SEO structured data
  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Checklists', href: '/checklists' },
    { label: checklist.title } // Current page - no href
  ]

  return (
    <QueryProvider>
      <div className="container-content py-12 sm:py-16 lg:pt-5 lg:pb-20">
        <PageBreadcrumbs items={breadcrumbItems} baseUrl={BASE_URL} includeJsonLd />
        <JsonLd
          data={generateChecklistSchema({
            title: checklist.title,
            description: checklist.description,
            slug: checklist.slug,
            rules: checklistRules.map((rule: (typeof checklistRules)[number]) => ({
              title: rule.title,
              slug: rule.slug,
              primaryCategory: rule.primaryCategory
            })),
            estimatedTime: checklist.estimatedTime,
            difficulty: checklist.difficulty
          })}
        />

        <PageHero title={checklist.title} description={checklist.description}>
          <div className="flex flex-wrap items-center gap-4">
            <ChecklistDifficultyBadge difficulty={difficulty} />
            {checklist.estimatedTime ? (
              <span className="inline-flex items-center gap-1.5 text-foreground-muted text-sm">
                <Clock className="h-4 w-4" aria-hidden="true" />
                {checklist.estimatedTime}
              </span>
            ) : null}
            <span className="text-foreground-muted text-sm">{checklistRules.length} rules</span>
            {curation ? (
              <span className="rounded-full border border-border bg-background-subtle px-2.5 py-1 text-[11px] text-foreground-subtle uppercase tracking-[0.14em]">
                {curation.label}
              </span>
            ) : null}
          </div>
        </PageHero>

        {curation ? (
          <section className="mb-10 grid gap-4 rounded-2xl border border-border bg-card p-5 lg:grid-cols-[1.15fr_1fr]">
            <div className="space-y-4">
              <div>
                <p className="font-medium text-foreground text-sm">Use this checklist when</p>
                <p className="mt-2 text-foreground-muted text-sm leading-relaxed">
                  {curation.whenToUse}
                </p>
              </div>

              <div>
                <p className="font-medium text-foreground text-sm">Expected outcome</p>
                <p className="mt-2 text-foreground-muted text-sm leading-relaxed">
                  {curation.expectedOutcome}
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <p className="font-medium text-foreground text-sm">Best for</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {curation.audience.map(audience => (
                    <span
                      key={audience}
                      className="rounded-full bg-accent/10 px-2.5 py-1 text-[11px] text-accent"
                    >
                      {CHECKLIST_AUDIENCE_LABELS[audience]}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <p className="font-medium text-foreground text-sm">Done looks like</p>
                <p className="mt-2 text-foreground-muted text-sm leading-relaxed">
                  {curation.doneLooksLike}
                </p>
              </div>

              <div>
                <p className="font-medium text-foreground text-sm">How this differs</p>
                <p className="mt-2 text-foreground-muted text-sm leading-relaxed">
                  {curation.differentiator}
                </p>
              </div>
            </div>
          </section>
        ) : null}

        <section className="mb-10">
          <div className="prose max-w-none" data-checklist-content>
            <ChecklistMdxContent code={checklist.mdx} />
          </div>
        </section>

        {/* Rules Browser */}
        <Suspense fallback={<RulesBrowserSkeleton count={checklistRules.length} />}>
          <RulesBrowser rules={checklistRules} showCategoryFilter={true} />
        </Suspense>
      </div>

      <ChecklistActionBar
        {...buildChecklistActionBarProps({
          allRules: langRules,
          scopeRules: checklistRules
        })}
      />
    </QueryProvider>
  )
}
