import { MDXContent } from '@content-collections/mdx/react'
import { routeGuides, routeHome } from '@repo/config'
import type { BreadcrumbItemData } from '@repo/design-system/custom/navigation/breadcrumb'
import { PageBreadcrumbs } from '@repo/design-system/custom/navigation/page-breadcrumbs'
import { allChecklists, allGuides, allRules } from 'content-collections'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { SITE_LANGUAGE } from '@/app/(site)/layout'
import {
  GuideHeader,
  GuideRelatedSection,
  GuideSidebar
} from '@/components/guides/guide-detail-sections'
import {
  buildGuideChecklistLink,
  buildGuideGuideLink,
  buildGuideRuleLink
} from '@/components/guides/guide-link-builders'
import { mdxComponents } from '@/components/rules/detail/mdx-components'
import { cachePublicContent } from '@/lib/public-content-cache'
import { generateGuideMetadata, generateGuideSchema, JsonLd, siteConfig } from '@/lib/seo'

const BASE_URL = siteConfig.url

interface GuideDetailPageProps {
  params: Promise<{ slug: string }>
}

type SiteRule = (typeof allRules)[number]
type SiteChecklist = (typeof allChecklists)[number]
type SiteGuide = (typeof allGuides)[number]

/**
 * Builds static params for all guide detail pages.
 */
export function generateStaticParams() {
  return allGuides.map(guide => ({
    slug: guide.slug
  }))
}

/**
 * Builds metadata for an individual guide detail page.
 */
export async function generateMetadata({ params }: GuideDetailPageProps): Promise<Metadata> {
  const { slug } = await params
  const guide = allGuides.find(item => item.slug === slug && item.language === SITE_LANGUAGE)

  if (!guide) {
    return { title: 'Guide Not Found' }
  }

  return generateGuideMetadata({
    title: guide.title,
    description: guide.description,
    slug: guide.slug,
    category: guide.category,
    type: guide.type,
    publishedAt: guide.publishedAt,
    updatedAt: guide.updatedAt,
    coverImage: guide.coverImage,
    tags: guide.tags,
    author: guide.author
  })
}

/**
 * Renders a single guide detail page.
 */
export default async function GuideDetailPage({ params }: GuideDetailPageProps) {
  'use cache'
  cachePublicContent()

  const { slug } = await params
  const guide = allGuides.find(item => item.slug === slug && item.language === SITE_LANGUAGE)

  if (!guide) {
    notFound()
  }

  const relatedRules = guide.relatedRules
    .map((ref: string) => {
      const [category, ruleSlug] = ref.split('/')
      return allRules.find(
        (rule: SiteRule) =>
          rule.language === SITE_LANGUAGE &&
          rule.primaryCategory === category &&
          rule.slug === ruleSlug
      )
    })
    .flatMap((rule: SiteRule | undefined) => (rule ? [buildGuideRuleLink(rule)] : []))

  const relatedChecklists = guide.relatedChecklists
    .map((slugValue: string) =>
      allChecklists.find(
        (checklist: SiteChecklist) =>
          checklist.language === SITE_LANGUAGE && checklist.slug === slugValue
      )
    )
    .flatMap((checklist: SiteChecklist | undefined) =>
      checklist ? [buildGuideChecklistLink(checklist)] : []
    )

  const relatedGuides = guide.relatedGuides
    .map((slugValue: string) =>
      allGuides.find(
        (relatedGuide: SiteGuide) =>
          relatedGuide.language === SITE_LANGUAGE && relatedGuide.slug === slugValue
      )
    )
    .flatMap((relatedGuide: SiteGuide | undefined) =>
      relatedGuide ? [buildGuideGuideLink(relatedGuide)] : []
    )

  const breadcrumbItems: BreadcrumbItemData[] = [
    { label: 'Home', href: routeHome() },
    { label: 'Guides', href: routeGuides() },
    { label: guide.title }
  ]

  return (
    <div className="container-content py-8 sm:py-12 lg:py-16">
      <PageBreadcrumbs items={breadcrumbItems} baseUrl={BASE_URL} includeJsonLd />
      <JsonLd
        data={generateGuideSchema({
          title: guide.title,
          description: guide.description,
          slug: guide.slug,
          publishedAt: guide.publishedAt,
          updatedAt: guide.updatedAt,
          coverImage: guide.coverImage,
          category: guide.category,
          type: guide.type,
          tags: guide.tags,
          author: guide.author
        })}
      />

      <GuideHeader guide={guide} />

      <div className="grid gap-8 lg:grid-cols-[1fr_280px]">
        <article className="min-w-0">
          <section className="prose max-w-none" data-guide-content>
            <MDXContent code={guide.mdx} components={mdxComponents} />
          </section>

          <GuideRelatedSection heading="Related Rules" items={relatedRules} />
          <GuideRelatedSection heading="Related Checklists" items={relatedChecklists} />
          <GuideRelatedSection heading="Related Guides" items={relatedGuides} />
        </article>

        <GuideSidebar author={guide.author} />
      </div>
    </div>
  )
}
