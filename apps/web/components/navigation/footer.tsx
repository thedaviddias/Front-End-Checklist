import {
  GITHUB_REPO_URL,
  routeAbout,
  routeGuide,
  routeGuides,
  routeHome,
  routeMcp,
  routeMentions,
  SOCIAL
} from '@repo/config'
import { XBrandIcon } from '@repo/design-system/brand-icons'
import Link from 'next/link'
import { getCachedGitHubStars } from '@/lib/cache'
import { formatGitHubStars } from '@/lib/github'
import { ThemeToggleWithLabel } from './theme-toggle'

const PRODUCT_LINKS = [
  { href: routeGuides(), label: 'Guides' },
  { href: routeGuide(), label: 'How to Use This Checklist' }
] as const

const PROJECT_LINKS = [
  { href: routeAbout(), label: 'About' },
  { href: routeMentions(), label: 'Community Mentions' },
  { href: GITHUB_REPO_URL, label: 'Source Code', external: true },
  { href: '/sitemap.xml', label: 'Sitemap' },
  { href: '/privacy', label: 'Privacy Policy' },
  { href: '/terms', label: 'Terms of Service' }
] as const

const AGENT_LINKS = [
  { href: routeMcp(), label: 'MCP Overview' },
  { href: '/llms.txt', label: 'llms.txt' }
] as const

interface FooterLinkItem {
  href: string
  label: string
  external?: boolean
}

interface FooterLinkColumnProps {
  title: string
  titleId: string
  links: readonly FooterLinkItem[]
}

const footerLinkClass =
  'inline-flex rounded text-sm text-foreground-muted transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring'

const metaPillClass =
  'inline-flex items-center gap-2 rounded-full border border-border bg-background px-3 py-1.5 text-foreground text-sm shadow-sm'

/**
 * Render a titled footer navigation column.
 *
 * @param props - Footer column props.
 * @returns Footer navigation group.
 */
function FooterLinkColumn({ title, titleId, links }: FooterLinkColumnProps) {
  return (
    <nav aria-labelledby={titleId}>
      <h3
        id={titleId}
        className="font-medium text-[11px] text-foreground-subtle uppercase tracking-[0.22em]"
      >
        {title}
      </h3>

      <ul className="mt-4 space-y-3">
        {links.map(link => (
          <li key={link.href}>
            {link.external ? (
              <a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className={footerLinkClass}
              >
                {link.label}
                <span className="sr-only"> (opens in new tab)</span>
              </a>
            ) : (
              <Link href={link.href} className={footerLinkClass}>
                {link.label}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </nav>
  )
}

/**
 * Site footer with a launchpad CTA, structured navigation, and compact trust row.
 */
export async function Footer() {
  const githubStars = await getCachedGitHubStars()

  return (
    <footer className="relative overflow-hidden border-border border-t bg-background">
      <div className="pointer-events-none absolute inset-0 bg-linear-to-b from-background via-background to-background-subtle" />

      <div className="container-wide relative py-12 sm:py-16">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.2fr)_repeat(3,minmax(0,1fr))]">
          <div className="max-w-sm">
            <Link
              href={routeHome()}
              className="font-heading font-semibold text-2xl text-foreground transition-colors hover:text-accent"
            >
              Front-End Checklist
            </Link>

            <p className="mt-4 text-foreground-muted leading-relaxed">
              Open-source rules, curated workflows, and AI-friendly resources for teams that want
              sharper front-end quality without guesswork.
            </p>

            <p className="mt-6 text-foreground-subtle text-sm leading-relaxed">
              Built for modern HTML, CSS, JavaScript, performance, accessibility, and SEO work.
            </p>
          </div>

          <FooterLinkColumn title="Explore" titleId="footer-product-nav" links={PRODUCT_LINKS} />
          <FooterLinkColumn title="Project" titleId="footer-project-nav" links={PROJECT_LINKS} />
          <FooterLinkColumn title="For AI Agents" titleId="footer-agents-nav" links={AGENT_LINKS} />
        </div>

        <div className="mt-10 flex flex-col gap-5 border-border border-t pt-6 xl:flex-row xl:items-center xl:justify-between">
          <div className="flex flex-col gap-4">
            <p className="text-foreground-muted text-sm">
              Front-End Checklist. Open source, MIT licensed.
              <span aria-hidden="true" className="px-2 text-foreground-subtle">
                /
              </span>
              Created by{' '}
              <a
                href={SOCIAL.authorUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                David Dias
                <span className="sr-only"> (opens in new tab)</span>
              </a>
              .
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            <ThemeToggleWithLabel />

            <a
              href={GITHUB_REPO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={metaPillClass}
              aria-label={
                githubStars === null
                  ? 'Open the GitHub repository'
                  : `Open the GitHub repository with ${formatGitHubStars(githubStars, '')} stars`
              }
            >
              <span>GitHub</span>
              {githubStars !== null && (
                <span className="text-foreground-muted">
                  &middot; {formatGitHubStars(githubStars, '')}
                </span>
              )}
              <span className="sr-only"> (opens in new tab)</span>
            </a>

            <a
              href={SOCIAL.x}
              target="_blank"
              rel="noopener noreferrer"
              className={metaPillClass}
              aria-label="Open the X profile"
            >
              <XBrandIcon className="h-3.5 w-3.5" />
              <span className="sr-only"> (opens in new tab)</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
