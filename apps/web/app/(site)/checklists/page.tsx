import type { BreadcrumbItemData } from '@repo/design-system/custom/navigation/breadcrumb'
import { PageBreadcrumbs } from '@repo/design-system/custom/navigation/page-breadcrumbs'
import { ChevronRight } from '@repo/design-system/icons'
import { allChecklists, allRules } from 'content-collections'
import Link from 'next/link'
import { Suspense } from 'react'
import { SITE_LANGUAGE } from '@/app/(site)/layout'
import {
  ChecklistBrowser,
  ChecklistBrowserSkeleton
} from '@/components/checklists/browser/checklist-browser'
import {
  CHECKLIST_AUDIENCE_LABELS,
  type ChecklistAudience,
  getChecklistCuration
} from '@/components/checklists/checklist-curation'
import { PageHero } from '@/components/content/page/page-hero'
import { cachePublicContent } from '@/lib/public-content-cache'
import { pageMetadata, siteConfig } from '@/lib/seo'
import { QueryProvider } from '@/providers/query-provider'

export const metadata = pageMetadata.checklists

// Base URL for structured data
const BASE_URL = siteConfig.url

const entryPointOrder: ChecklistAudience[] = [
  'junior-dev',
  'senior-reviewer',
  'launch-team',
  'ai-audit'
]

interface RecommendedChecklistEntry {
  audience: ChecklistAudience
  checklist: {
    slug: string
    title: string
  }
  curation: NonNullable<ReturnType<typeof getChecklistCuration>>
}

export default async function ChecklistsPage() {
  'use cache'
  cachePublicContent()

  const lang = SITE_LANGUAGE

  // Get all checklists for the current language
  const checklists = allChecklists
    .filter(checklist => checklist.language === lang)
    .map(checklist => ({
      id: checklist.id,
      slug: checklist.slug,
      title: checklist.title,
      description: checklist.description,
      icon: checklist.icon,
      rules: checklist.rules,
      estimatedTime: checklist.estimatedTime,
      difficulty: checklist.difficulty,
      featured: checklist.featured,
      language: checklist.language
    }))

  const recommendedChecklists: RecommendedChecklistEntry[] = entryPointOrder.flatMap(audience => {
    const match = checklists.find(checklist =>
      getChecklistCuration(checklist.slug)?.audience.includes(audience)
    )
    if (!match) return []
    const curation = getChecklistCuration(match.slug)
    if (!curation) return []
    return [
      {
        audience,
        checklist: match,
        curation
      }
    ]
  })

  // Get all rules and create a map from rule reference (category/slug) to rule ID
  const langRules = allRules.filter(rule => rule.language === lang)
  const ruleRefToId: Record<string, string> = {}
  for (const rule of langRules) {
    // Create reference key in format "category/slug"
    const refKey = `${rule.primaryCategory}/${rule.slug}`
    ruleRefToId[refKey] = rule.id
  }

  // Breadcrumb items for navigation and SEO structured data
  const breadcrumbItems: BreadcrumbItemData[] = [
    { label: 'Home', href: '/' },
    { label: 'Checklists' } // Current page - no href
  ]

  return (
    <QueryProvider>
      <div className="container-content py-12 sm:py-16 lg:pt-5 lg:pb-20">
        <PageBreadcrumbs items={breadcrumbItems} baseUrl={BASE_URL} includeJsonLd />

        <PageHero
          title="Curated Checklists"
          description="Goal-oriented workflows built from the rule corpus. Choose a checklist by outcome, audience, or review style instead of starting from the full catalog every time."
        />

        <section className="mb-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {recommendedChecklists.map(entry => (
            <Link
              key={entry.audience}
              href={`/checklists/${entry.checklist.slug}`}
              className="group rounded-xl border border-border bg-card p-5 transition-all duration-200 hover:border-border-focus hover:shadow-md"
            >
              <p className="font-medium text-[11px] text-accent uppercase tracking-[0.16em]">
                {CHECKLIST_AUDIENCE_LABELS[entry.audience]}
              </p>
              <h2 className="mt-2 font-semibold text-foreground text-lg transition-colors group-hover:text-accent">
                {entry.checklist.title}
              </h2>
              <p className="mt-2 text-foreground-muted text-sm leading-relaxed">
                {entry.curation?.whenToUse}
              </p>
              <div className="mt-4 inline-flex items-center gap-1 text-accent text-sm">
                Start here
                <ChevronRight className="h-4 w-4" aria-hidden="true" />
              </div>
            </Link>
          ))}
        </section>

        <Suspense fallback={<ChecklistBrowserSkeleton count={checklists.length} />}>
          <ChecklistBrowser checklists={checklists} ruleRefToId={ruleRefToId} />
        </Suspense>
      </div>
    </QueryProvider>
  )
}
