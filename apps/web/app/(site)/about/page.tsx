import { CreatorProjects } from '@/components/about/creator-projects'
import { UpcomingBook } from '@/components/about/upcoming-book'
import { cachePublicContent } from '@/lib/public-content-cache'
import { pageMetadata } from '@/lib/seo'

export const metadata = {
  ...pageMetadata.home,
  title: 'About the Creator | Front-End Checklist',
  description:
    'Learn more about David Dias, the creator of the Front-End Checklist, and his other projects.'
}

export default async function AboutPage() {
  'use cache'
  cachePublicContent()

  return (
    <main role="main" className="py-12">
      <div className="container-content">
        <h1 className="mb-8 text-center font-bold text-5xl text-foreground">About the Project</h1>
        <div className="prose prose-neutral dark:prose-invert mx-auto mb-16 max-w-3xl text-center">
          <p className="text-foreground-muted text-xl">
            The Front-End Checklist was created to help developers follow best practices and ship
            high-quality websites. It is a community-driven project that has grown into an industry
            standard.
          </p>
        </div>
      </div>

      <UpcomingBook />
      <CreatorProjects />
    </main>
  )
}
