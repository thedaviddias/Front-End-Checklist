import { MDXContent } from '@content-collections/mdx/react'
import { routeMcp } from '@repo/config'
import type { BreadcrumbItemData } from '@repo/design-system/custom/navigation/breadcrumb'
import { PageBreadcrumbs } from '@repo/design-system/custom/navigation/page-breadcrumbs'
import type { RuleResource, RuleSource } from '@repo/types'
import { AnimatedPage } from '@/components/animation/motion'
import { AIPrompts } from '@/components/rules/detail/ai-prompts'
import { mdxComponents } from '@/components/rules/detail/mdx-components'
import { RuleFeedbackCard } from '@/components/rules/detail/rule-feedback-card'
import { generateRuleSchema, JsonLd } from '@/lib/seo'
import { RelatedRulesSection } from './related-rules-section'
import {
  RuleAnchorNav,
  RulePageHeader,
  RuleResourcesSection,
  RuleSidebar
} from './rule-page-sections'

interface RelatedRuleLink {
  id: string
  title: string
  slug: string
  primaryCategory: string
  description?: string
}

interface ToolLink {
  name: string
  url: string
}

interface RulePageContentProps {
  baseUrl: string
  breadcrumbItems: BreadcrumbItemData[]
  rule: {
    id: string
    slug: string
    title: string
    description?: string
    priority: 'critical' | 'high' | 'medium' | 'low'
    difficulty?: string
    estimatedTime?: number
    primaryCategory: string
    categories: string[]
    content?: string
    filePath?: string
    whyItMatters?: string | null
    tldr?: string[]
    prompts?: Record<string, string> | undefined
    mdx: string
    tools?: Array<string | { name: string; url: string | null }>
  }
  relatedRules: RelatedRuleLink[]
  resources?: RuleResource[]
  sources?: RuleSource[]
  toolsWithUrls?: ToolLink[]
  anchorNavItems: Array<{ label: string; anchor: string }>
}

/**
 * Render the full rule detail layout once all data is available.
 *
 * @param props - Layout props for the rule detail page.
 */
export function RulePageContent({
  baseUrl,
  breadcrumbItems,
  rule,
  relatedRules,
  resources,
  sources,
  toolsWithUrls,
  anchorNavItems
}: RulePageContentProps) {
  const toolNames = rule.tools
    ?.map(tool => (typeof tool === 'object' ? tool.name : tool))
    .filter((name): name is string => Boolean(name))

  return (
    <AnimatedPage>
      <div className="container-content py-6 sm:py-8">
        <PageBreadcrumbs
          items={breadcrumbItems}
          baseUrl={baseUrl}
          includeJsonLd
          className="sm:mb-6"
        />
        <JsonLd
          data={generateRuleSchema({
            title: rule.title,
            description: rule.description || '',
            slug: rule.slug,
            primaryCategory: rule.primaryCategory,
            difficulty: rule.difficulty,
            estimatedTime: rule.estimatedTime,
            tools: toolNames
          })}
        />

        <div className="grid gap-8 lg:grid-cols-[1fr_280px]">
          <div className="min-w-0">
            <article>
              <RulePageHeader
                rule={{ ...rule, content: rule.content }}
                hasPrompts={Boolean(rule.prompts)}
              />

              <RuleAnchorNav items={anchorNavItems} />

              <section aria-labelledby="content-heading" className="prose mb-8 max-w-none">
                <h2 id="content-heading" className="sr-only">
                  Rule Details
                </h2>
                <MDXContent code={rule.mdx} components={mdxComponents} />
              </section>

              {rule.prompts && (
                <section aria-labelledby="use-with-ai" className="mt-12">
                  <div className="relative overflow-hidden rounded-2xl border border-border bg-background/85 p-5 shadow-sm sm:p-6">
                    <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-accent/50 to-transparent" />
                    <div className="prose max-w-none">
                      <h2 id="use-with-ai">Use with AI</h2>
                      <p className="mb-0! text-foreground-muted">
                        Copy these prompts to use with your AI assistant, or{' '}
                        <a href={routeMcp()} className="underline">
                          install the MCP server
                        </a>{' '}
                        to use directly from Claude, Cursor, or Windsurf.
                      </p>
                    </div>
                    <div className="mt-6">
                      <AIPrompts prompts={rule.prompts} />
                    </div>
                  </div>
                </section>
              )}
            </article>

            <RuleResourcesSection sources={sources} resources={resources} tools={toolsWithUrls} />

            {relatedRules.length > 0 && <RelatedRulesSection relatedRules={relatedRules} />}

            <RuleFeedbackCard ruleId={rule.id} />
          </div>

          <RuleSidebar key={rule.id} contentSelector="article" relatedRules={relatedRules} />
        </div>
      </div>
    </AnimatedPage>
  )
}
