import { GITHUB_REPO_URL, ROUTES, SITE_URL, SOCIAL } from '@repo/config'
import type { Metadata } from 'next'

export const siteConfig = {
  name: 'Front-End Checklist',
  url: SITE_URL,
  description:
    'Trusted front-end quality rules for humans and AI agents. Browse hundreds of actionable rules, run curated workflows, and connect the corpus through MCP.',
  author: {
    name: 'David Dias',
    url: SOCIAL.authorUrl,
    twitter: SOCIAL.authorHandle
  },
  ogImage: '/og-image.png',
  links: {
    github: GITHUB_REPO_URL,
    twitter: SOCIAL.twitter
  },
  locales: ['en'] as const,
  defaultLocale: 'en' as const
} as const

const BASE_KEYWORDS = [
  'frontend',
  'web development',
  'checklist',
  'best practices',
  'HTML',
  'CSS',
  'JavaScript',
  'performance',
  'accessibility',
  'SEO'
]

export const baseMetadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  authors: [{ name: siteConfig.author.name, url: siteConfig.author.url }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1
    }
  },
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
    apple: '/apple-touch-icon.svg'
  },
  manifest: '/site.webmanifest',
  alternates: {
    languages: {
      en: siteConfig.url
    }
  },
  twitter: {
    card: 'summary_large_image',
    creator: siteConfig.author.twitter,
    site: siteConfig.author.twitter,
    images: [`${siteConfig.url}${siteConfig.ogImage}`]
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: siteConfig.name,
    images: [
      {
        url: `${siteConfig.url}${siteConfig.ogImage}`,
        width: 1200,
        height: 630,
        alt: siteConfig.name
      }
    ]
  }
}

interface SEOMetadataProps {
  title: string
  description?: string
  path?: string
  image?: string
  noIndex?: boolean
  type?: 'website' | 'article'
  publishedTime?: string
  modifiedTime?: string
  keywords?: string[]
  authors?: Array<{ name: string; url?: string }>
  creator?: string
}

/**
 * Generate the common metadata payload used by every page.
 *
 * @param props - Metadata overrides for the specific page.
 * @returns The merged Next.js metadata object.
 */
export function generateSEOMetadata({
  title,
  description = siteConfig.description,
  path = '',
  image,
  noIndex = false,
  type = 'website',
  publishedTime,
  modifiedTime,
  keywords = [],
  authors,
  creator
}: SEOMetadataProps): Metadata {
  const url = `${siteConfig.url}${path}`
  const ogImage = image || `${siteConfig.url}${siteConfig.ogImage}`

  return {
    ...baseMetadata,
    title,
    description,
    authors: authors || baseMetadata.authors,
    creator: creator || baseMetadata.creator,
    keywords: [...BASE_KEYWORDS, ...keywords],
    robots: noIndex ? { index: false, follow: false } : baseMetadata.robots,
    alternates: {
      canonical: url,
      languages: {
        en: `${siteConfig.url}${path}`
      }
    },
    openGraph: {
      ...baseMetadata.openGraph,
      title,
      description,
      url,
      type,
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
      ...(publishedTime && { publishedTime }),
      ...(modifiedTime && { modifiedTime })
    },
    twitter: {
      ...baseMetadata.twitter,
      title,
      description,
      images: [ogImage]
    }
  }
}

export const pageMetadata = {
  home: generateSEOMetadata({
    title: 'Front-End Checklist - Web Development Best Practices',
    description:
      'Trusted front-end quality rules for humans and AI agents. Browse hundreds of rules, run curated workflows, and use MCP for structured AI reviews.',
    keywords: ['frontend checklist', 'web development guide', 'launch checklist']
  }),
  rules: generateSEOMetadata({
    title: 'All Frontend Rules',
    description:
      'Browse hundreds of frontend development rules organized by category. Filter by priority, search the corpus, and use the same standards for human and AI reviews.',
    path: ROUTES.rules,
    keywords: ['frontend rules', 'web standards', 'coding guidelines']
  }),
  checklists: generateSEOMetadata({
    title: 'Curated Checklists',
    description:
      'Goal-oriented checklists for web development. Launch preparation, SEO audits, accessibility reviews, and performance optimization guides.',
    path: ROUTES.checklists,
    keywords: ['launch checklist', 'seo audit', 'accessibility checklist', 'performance checklist']
  }),
  guides: generateSEOMetadata({
    title: 'Guides',
    description:
      'Practical frontend guides and insights connected to rules and checklists. Learn workflows, tradeoffs, and implementation patterns that hold up in real projects.',
    path: ROUTES.guides,
    keywords: ['frontend guides', 'web development articles', 'frontend insights', 'how-to guides']
  }),
  learn: generateSEOMetadata({
    title: 'Learning Paths',
    description:
      'Master frontend development step by step. Curated learning paths from beginner to expert covering accessibility, performance, SEO, and more.',
    path: ROUTES.learn,
    keywords: ['frontend learning', 'web development course', 'frontend tutorials']
  }),
  guide: generateSEOMetadata({
    title: 'How to Use This Checklist',
    description:
      'Learn how to use the Front-End Checklist effectively. Understand priority levels (critical, high, medium, low) and optimize your workflow.',
    path: ROUTES.guide,
    keywords: ['checklist guide', 'priority levels', 'workflow optimization']
  }),
  lists: generateSEOMetadata({
    title: 'Lists',
    description: 'Your custom checklists for tracking frontend development progress.',
    path: ROUTES.lists,
    noIndex: true
  }),
  audits: generateSEOMetadata({
    title: 'Audit History',
    description: 'Review and share your saved frontend audit reports.',
    path: ROUTES.audits,
    noIndex: true
  }),
  mentions: generateSEOMetadata({
    title: 'Community Mentions',
    description:
      'See where the Front-End Checklist has been featured across the web. Articles, tweets, and YouTube videos from the developer community.',
    path: ROUTES.mentions,
    keywords: ['frontend checklist mentions', 'community', 'articles', 'reviews', 'social proof']
  }),
  mcp: generateSEOMetadata({
    title: 'Frontend Code Review MCP Server',
    description:
      'Connect AI agents to 385 Front-End Checklist rules for React, Next.js, HTML, CSS, JavaScript, accessibility, performance, SEO, security, and launch audits.',
    path: ROUTES.mcp,
    keywords: [
      'MCP',
      'model context protocol',
      'frontend MCP',
      'React code review',
      'Next.js code review',
      'AI code review',
      'Claude',
      'Codex',
      'Cursor',
      'AI integration',
      'frontend rules API'
    ]
  }),
  report: generateSEOMetadata({
    title: 'Audit report',
    description:
      'Front-End Checklist audit report. View issues, suggestions, and fix guidance for a frontend audit.',
    path: ROUTES.report,
    noIndex: true
  }),
  profile: generateSEOMetadata({
    title: 'Profile',
    description:
      'View your frontend checklist completion stats, category breakdown, and shared checklists.',
    path: ROUTES.profile,
    noIndex: true
  }),
  settings: generateSEOMetadata({
    title: 'Settings',
    description: 'Manage your account, email preferences, export data, or delete your account.',
    path: ROUTES.settings,
    noIndex: true
  })
}

export const categoryConfig: Record<
  string,
  { title: string; description: string; seoDescription: string }
> = {
  html: {
    title: 'HTML',
    description:
      'Semantic markup, accessibility attributes, and document structure best practices.',
    seoDescription:
      'HTML best practices for semantic markup, accessibility, forms, and document structure. Essential rules for building well-structured web pages.'
  },
  css: {
    title: 'CSS',
    description: 'Styling conventions, responsive design, and performance optimization.',
    seoDescription:
      'CSS best practices for styling, responsive design, performance optimization, and maintainable stylesheets. Modern CSS techniques and patterns.'
  },
  javascript: {
    title: 'JavaScript',
    description: 'Modern JS patterns, error handling, and code organization.',
    seoDescription:
      'JavaScript best practices for modern web development. Code organization, error handling, async patterns, and performance optimization.'
  },
  performance: {
    title: 'Performance',
    description: 'Core Web Vitals, asset optimization, and rendering strategies.',
    seoDescription:
      'Web performance optimization rules covering Core Web Vitals, LCP, INP, CLS, asset optimization, caching, and rendering strategies.'
  },
  accessibility: {
    title: 'Accessibility',
    description: 'WCAG compliance, keyboard navigation, and screen reader support.',
    seoDescription:
      'Web accessibility (a11y) guidelines for WCAG compliance, keyboard navigation, screen reader support, ARIA, and inclusive design.'
  },
  seo: {
    title: 'SEO',
    description: 'Meta tags, structured data, and search engine optimization.',
    seoDescription:
      'SEO best practices for meta tags, structured data, sitemaps, robots.txt, and technical optimization to improve search rankings.'
  },
  images: {
    title: 'Images',
    description: 'Image optimization, formats, and responsive image strategies.',
    seoDescription:
      'Image optimization techniques including WebP, AVIF formats, lazy loading, responsive images, and compression strategies.'
  },
  security: {
    title: 'Security',
    description: 'Web security best practices and protection against vulnerabilities.',
    seoDescription:
      'Web security best practices including HTTPS, CSP, secure headers, authentication, and protection against common vulnerabilities.'
  },
  testing: {
    title: 'Testing',
    description: 'Testing strategies, tools, and quality assurance practices.',
    seoDescription:
      'Frontend testing best practices covering unit tests, integration tests, E2E testing, and quality assurance strategies.'
  },
  general: {
    title: 'General',
    description: 'General web development best practices.',
    seoDescription:
      'General web development best practices including favicons, error pages, and foundational setup requirements.'
  }
}

/**
 * Generate metadata for an individual rule page.
 *
 * @param rule - Rule metadata inputs.
 * @returns Metadata configured for a rule article page.
 */
export function generateRuleMetadata(rule: {
  title: string
  description: string
  slug: string
  primaryCategory: string
  priority: string
  difficulty?: string
}) {
  return generateSEOMetadata({
    title: rule.title,
    description: `${rule.description} Learn implementation, examples, and testing strategies.`,
    path: `${ROUTES.rules}/${rule.primaryCategory}/${rule.slug}`,
    type: 'article',
    keywords: [
      rule.primaryCategory,
      rule.priority,
      rule.difficulty || 'intermediate',
      'frontend rule'
    ]
  })
}

/**
 * Generate metadata for a rule category landing page.
 *
 * @param category - Category slug.
 * @param ruleCount - Number of rules in the category.
 * @returns Metadata configured for a category listing page.
 */
export function generateCategoryMetadata(category: string, ruleCount: number) {
  const config = categoryConfig[category] || {
    title: category,
    seoDescription: 'Web development best practices and guidelines.'
  }

  return generateSEOMetadata({
    title: `${config.title} Rules`,
    description: `${config.seoDescription} Explore ${ruleCount} rules and best practices.`,
    path: `${ROUTES.rules}/${category}`,
    keywords: [category, `${category} best practices`, `${category} checklist`]
  })
}

/**
 * Generate metadata for a curated checklist page.
 *
 * @param checklist - Checklist metadata inputs.
 * @returns Metadata configured for the checklist page.
 */
export function generateChecklistMetadata(checklist: {
  title: string
  description: string
  slug: string
  ruleCount: number
  difficulty?: string
}) {
  return generateSEOMetadata({
    title: checklist.title,
    description: `${checklist.description} ${checklist.ruleCount} curated rules to help you succeed.`,
    path: `${ROUTES.checklists}/${checklist.slug}`,
    keywords: [checklist.title.toLowerCase(), 'checklist', checklist.difficulty || 'intermediate']
  })
}

/**
 * Generate metadata for an individual guide page.
 *
 * @param guide - Guide metadata inputs.
 * @returns Metadata configured for the guide article page.
 */
export function generateGuideMetadata(guide: {
  title: string
  description: string
  slug: string
  category: string
  type: 'how-to' | 'insight'
  publishedAt: string
  updatedAt: string
  coverImage: string
  tags: string[]
  author: {
    name: string
    url?: string
  }
}) {
  return generateSEOMetadata({
    title: guide.title,
    description: guide.description,
    path: `${ROUTES.guides}/${guide.slug}`,
    type: 'article',
    image: guide.coverImage.startsWith('http')
      ? guide.coverImage
      : `${siteConfig.url}${guide.coverImage}`,
    publishedTime: guide.publishedAt,
    modifiedTime: guide.updatedAt,
    keywords: [guide.category, guide.type, ...guide.tags],
    authors: [{ name: guide.author.name, ...(guide.author.url ? { url: guide.author.url } : {}) }],
    creator: guide.author.name
  })
}
