import { routeChecklists, routeHome, routeMcp, routeRules } from '@repo/config'
import { PageBreadcrumbs } from '@repo/design-system/custom/navigation/page-breadcrumbs'
import { BookOpen, ChevronRight, Lightbulb, Target } from '@repo/design-system/icons'
import Link from 'next/link'
import { PageHero } from '@/components/content/page/page-hero'
import { cachePublicContent } from '@/lib/public-content-cache'
import { pageMetadata } from '@/lib/seo'
import { PriorityCard, StepCard, TipCard } from './guide-components'

export const metadata = pageMetadata.guide

export default async function GuidePage() {
  'use cache'
  cachePublicContent()

  return (
    <div className="container-content py-12 sm:py-16 lg:pt-5 lg:pb-20">
      <PageBreadcrumbs items={[{ label: 'Home', href: routeHome() }, { label: 'Guide' }]} />

      <PageHero
        title="How to Use This Checklist"
        description="The Front-End Checklist works best when you start with the right workflow. Use the paths below to choose whether you are learning, reviewing, launching, or auditing with AI."
        maxWidth="narrow"
      />

      <section aria-labelledby="starting-paths-heading" className="mb-16">
        <div className="mb-6 flex items-center gap-3">
          <div className="rounded-md bg-background-subtle p-2">
            <BookOpen className="h-5 w-5 text-accent" aria-hidden="true" />
          </div>
          <h2 id="starting-paths-heading" className="font-medium text-3xl text-foreground">
            Choose your starting path
          </h2>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Link
            href={`${routeChecklists()}/html-foundations`}
            className="rounded-lg border border-border bg-card p-5 transition-colors hover:border-border-focus"
          >
            <p className="font-medium text-accent text-xs uppercase tracking-[0.16em]">
              Junior developer
            </p>
            <h3 className="mt-2 font-medium text-foreground text-lg">Start with foundations</h3>
            <p className="mt-2 text-foreground-muted text-sm leading-relaxed">
              Begin with HTML Foundations or Accessibility Essentials when you want a reliable first
              pass instead of the full corpus.
            </p>
          </Link>

          <Link
            href={`${routeChecklists()}/comprehensive-audit`}
            className="rounded-lg border border-border bg-card p-5 transition-colors hover:border-border-focus"
          >
            <p className="font-medium text-accent text-xs uppercase tracking-[0.16em]">
              Senior reviewer
            </p>
            <h3 className="mt-2 font-medium text-foreground text-lg">Run a broad audit</h3>
            <p className="mt-2 text-foreground-muted text-sm leading-relaxed">
              Use Comprehensive Web Audit Checklist when you need one cross-discipline pass and a
              prioritized action list.
            </p>
          </Link>

          <Link
            href={`${routeChecklists()}/launch-checklist`}
            className="rounded-lg border border-border bg-card p-5 transition-colors hover:border-border-focus"
          >
            <p className="font-medium text-accent text-xs uppercase tracking-[0.16em]">
              Launch workflow
            </p>
            <h3 className="mt-2 font-medium text-foreground text-lg">Use the release gate</h3>
            <p className="mt-2 text-foreground-muted text-sm leading-relaxed">
              Start with Launch Checklist when the question is not “what should I learn?” but “what
              must be true before this ships?”
            </p>
          </Link>

          <Link
            href={routeMcp()}
            className="rounded-lg border border-border bg-card p-5 transition-colors hover:border-border-focus"
          >
            <p className="font-medium text-accent text-xs uppercase tracking-[0.16em]">
              AI-assisted audit
            </p>
            <h3 className="mt-2 font-medium text-foreground text-lg">Bring the corpus into MCP</h3>
            <p className="mt-2 text-foreground-muted text-sm leading-relaxed">
              Use MCP when you want the same rule corpus available inside code review, URL audits,
              and AI workflows.
            </p>
          </Link>
        </div>
      </section>

      {/* Priority Levels Section */}
      <section aria-labelledby="priority-heading" className="mb-16">
        <div className="mb-6 flex items-center gap-3">
          <div className="rounded-md bg-background-subtle p-2">
            <Target className="h-5 w-5 text-accent" aria-hidden="true" />
          </div>
          <h2 id="priority-heading" className="font-medium text-3xl text-foreground">
            Understanding Priority Levels
          </h2>
        </div>

        <p className="mb-8 max-w-2xl text-foreground-muted">
          Each rule is assigned a priority level based on its impact. Use these to decide what to
          tackle first and what can wait.
        </p>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Critical */}
          <PriorityCard
            level="critical"
            description="Must fix immediately. These issues cause your site to break, block entire user groups, or create security vulnerabilities."
            examples={[
              'Missing DOCTYPE triggers quirks mode',
              'No viewport meta = mobile unusable',
              'Missing alt text blocks screen readers',
              'No HTTPS exposes user data'
            ]}
            action="Fix these before launching"
          />

          {/* High */}
          <PriorityCard
            level="high"
            description="Should fix soon. These create significant barriers or degraded experiences for many users, but workarounds may exist."
            examples={[
              'Poor color contrast hurts readability',
              'Missing meta descriptions hurt SEO',
              'Render-blocking resources slow load',
              'No lazy loading wastes bandwidth'
            ]}
            action="Fix these in your next sprint"
          />

          {/* Medium */}
          <PriorityCard
            level="medium"
            description="Good to have. These improve quality and follow best practices but won't cause major issues if skipped."
            examples={[
              'Print stylesheet for print users',
              'Favicon for browser tabs',
              'CSS organization for maintainability',
              'Code cleanup for professionalism'
            ]}
            action="Address when you have time"
          />

          {/* Low */}
          <PriorityCard
            level="low"
            description="Nice to have. These provide incremental improvements or polish. Users are unlikely to notice if missing."
            examples={[
              'Advanced image optimizations',
              'Progressive JPEG loading',
              'Enhanced metadata beyond basics',
              'Developer tooling setup'
            ]}
            action="Consider for polish phase"
          />
        </div>
      </section>

      {/* Quick Start Section */}
      <section aria-labelledby="quickstart-heading" className="mb-16">
        <div className="mb-6 flex items-center gap-3">
          <div className="rounded-md bg-background-subtle p-2">
            <Lightbulb className="h-5 w-5 text-accent" aria-hidden="true" />
          </div>
          <h2 id="quickstart-heading" className="font-medium text-3xl text-foreground">
            Quick Start Guide
          </h2>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <StepCard
            number={1}
            title="Start with Critical"
            description="Filter by Critical priority and fix those first. These are non-negotiable for a production site."
          />
          <StepCard
            number={2}
            title="Work through High"
            description="Once Critical items are done, move to High priority. These significantly improve user experience."
          />
          <StepCard
            number={3}
            title="Polish with Medium & Low"
            description="Use Medium and Low priorities for ongoing improvements as you refine your site."
          />
        </div>
      </section>

      {/* Tips Section */}
      <section aria-labelledby="tips-heading" className="mb-16">
        <div className="mb-6 flex items-center gap-3">
          <div className="rounded-md bg-background-subtle p-2">
            <BookOpen className="h-5 w-5 text-accent" aria-hidden="true" />
          </div>
          <h2 id="tips-heading" className="font-medium text-3xl text-foreground">
            Pro Tips
          </h2>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <TipCard
            title="Use AI prompts"
            description="Each rule includes AI prompts to check, fix, and explain the issue. Copy them into your AI assistant for help."
          />
          <TipCard
            title="Track your progress"
            description="Mark rules as complete to track your progress. Your checklist state is saved locally in your browser."
          />
          <TipCard
            title="Filter by category"
            description="Working on performance? Filter by that category to focus on related rules without distraction."
          />
          <TipCard
            title="Don't do everything"
            description="Not every rule applies to every project. Skip what doesn't fit your use case."
          />
        </div>
      </section>

      {/* CTA Section */}
      <section className="border-border border-t pt-8">
        <div className="flex flex-wrap gap-3">
          <Link
            href={`${routeRules()}?priority=critical`}
            className="inline-flex items-center gap-2 rounded-md bg-accent px-4 py-2 font-medium text-accent-foreground text-sm transition-colors hover:bg-accent-hover"
          >
            Start with Critical Rules
            <ChevronRight className="h-4 w-4" />
          </Link>
          <Link
            href={routeRules()}
            className="inline-flex items-center gap-2 rounded-md border border-border px-4 py-2 font-medium text-foreground text-sm transition-colors hover:bg-background-subtle"
          >
            Browse All Rules
          </Link>
        </div>
      </section>
    </div>
  )
}
