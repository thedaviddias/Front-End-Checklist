import { githubNewIssueUrl, routeHome } from '@repo/config'
import { PageBreadcrumbs } from '@repo/design-system/custom/navigation/page-breadcrumbs'
import { ExternalLink } from '@repo/design-system/icons'
import { Button } from '@repo/design-system/ui/button'
import { PageHero } from '@/components/content/page/page-hero'
import { MentionsBrowser } from '@/components/mentions/browser/mentions-browser'
import { getMentions } from '@/lib/mentions'
import { cachePublicContent } from '@/lib/public-content-cache'
import { pageMetadata } from '@/lib/seo'

export const metadata = pageMetadata.mentions

const mentions = getMentions()

export default async function MentionsPage() {
  'use cache'
  cachePublicContent()

  return (
    <div className="container-content py-12 sm:py-16 lg:pt-5 lg:pb-20">
      <PageBreadcrumbs
        items={[{ label: 'Home', href: routeHome() }, { label: 'Community Mentions' }]}
      />

      <PageHero
        title={
          <h1 className="mb-4 font-semibold text-4xl text-foreground tracking-tight">
            Community Mentions
          </h1>
        }
        description={
          <p className="text-foreground-muted text-lg leading-relaxed">
            See where the Front-End Checklist has been featured across the web. From articles and
            blog posts to tweets and YouTube videos, our community keeps spreading the word.
          </p>
        }
        maxWidth="narrow"
        className="mb-12 sm:mb-16 lg:mb-16"
      />

      {/* Interactive Mentions Browser */}
      <MentionsBrowser mentions={mentions} />

      {/* Submit CTA */}
      <div className="mt-16 border-border border-t pt-12 text-center">
        <h2 className="mb-2 font-medium text-foreground text-xl">Know of a mention?</h2>
        <p className="mb-6 text-foreground-muted">
          Help us grow this list by letting us know where you've seen the Front-End Checklist
          mentioned.
        </p>
        <Button asChild variant="outline">
          <a
            href={`${githubNewIssueUrl('New Mention')}&labels=mention`}
            target="_blank"
            rel="noopener noreferrer"
          >
            Submit a Mention
            <ExternalLink className="ml-2 h-3.5 w-3.5 opacity-50" aria-hidden="true" />
          </a>
        </Button>
      </div>
    </div>
  )
}
