import { render, screen } from '@testing-library/react'
import Link from 'next/link'
import type { ReactNode } from 'react'

jest.mock('content-collections', () => ({
  __esModule: true,
  allRules: [
    {
      id: 'en-flashing-content',
      title: 'Prevent seizure-triggering flashing content',
      slug: 'flashing-content',
      language: 'en',
      primaryCategory: 'accessibility',
      categories: ['accessibility', 'css'],
      description: 'Avoid dangerous flashing effects.',
      priority: 'critical',
      difficulty: 'beginner',
      estimatedTime: 15,
      filePath: 'packages/content/rules/en/accessibility/flashing-content.mdx',
      mdx: { compiledSource: 'compiled' },
      prompts: undefined,
      relatedRules: [{ slug: 'reduced-motion', reason: 'Commonly reviewed together.' }],
      resources: [
        {
          name: 'axe DevTools',
          url: 'https://www.deque.com/axe/devtools/',
          type: 'tool'
        }
      ],
      sources: [
        {
          id: 'wcag-overview',
          title: 'W3C WAI: WCAG Overview',
          url: 'https://www.w3.org/WAI/standards-guidelines/wcag/',
          type: 'wcag',
          role: 'standard',
          authority: 'primary'
        }
      ],
      sourceSummary: {
        sourceCount: 1,
        primarySourceCount: 1,
        sourceRoleCount: 1
      },
      tools: []
    },
    {
      id: 'en-reduced-motion',
      title: 'Respect reduced motion preferences',
      slug: 'reduced-motion',
      language: 'en',
      primaryCategory: 'accessibility',
      categories: ['accessibility', 'css'],
      description: 'Respect user motion preferences.',
      priority: 'high',
      difficulty: 'beginner',
      estimatedTime: 15,
      filePath: 'packages/content/rules/en/accessibility/reduced-motion.mdx',
      mdx: { compiledSource: 'compiled' },
      prompts: undefined,
      relatedRules: [],
      resources: [],
      sources: [],
      sourceSummary: {
        sourceCount: 0,
        primarySourceCount: 0,
        sourceRoleCount: 0
      },
      tools: []
    }
  ]
}))

jest.mock('@content-collections/mdx/react', () => ({
  MDXContent: () => <div data-testid="mdx-content">Rule body without metadata prose.</div>
}))

jest.mock('next/navigation', () => ({
  notFound: jest.fn()
}))

jest.mock('@/lib/rule-content', () => ({
  getRuleRawContent: jest.fn().mockResolvedValue('Rule body without metadata prose.')
}))

jest.mock('@/lib/seo', () => ({
  siteConfig: { url: 'https://frontendchecklist.io' },
  generateRuleMetadata: jest.fn(),
  generateRuleSchema: jest.fn(() => ({})),
  JsonLd: () => null
}))

jest.mock('@/components/rules/detail/ai-prompts', () => ({
  AIPrompts: () => null
}))

jest.mock('@/components/checklists/actions/checklist-action-bar', () => ({
  ChecklistActionBar: () => null
}))

jest.mock('@/components/rules/detail/rule-feedback-card', () => ({
  RuleFeedbackCard: () => <div data-testid="rule-feedback-card" />
}))

jest.mock('../related-rules-section', () => ({
  RelatedRulesSection: ({ relatedRules }: { relatedRules: Array<{ title: string }> }) => (
    <section>
      <h2>Related rules</h2>
      <ul>
        {relatedRules.map(rule => (
          <li key={rule.title}>{rule.title}</li>
        ))}
      </ul>
    </section>
  )
}))

jest.mock('../rule-page-sections', () => ({
  RulePageHeader: ({ rule }: { rule: { title: string; description: string } }) => (
    <header>
      <h1>{rule.title}</h1>
      <p>{rule.description}</p>
    </header>
  ),
  RuleAnchorNav: () => null,
  RuleResourcesSection: ({
    sources,
    resources
  }: {
    sources?: Array<{ title: string }>
    resources?: Array<{ name: string }>
  }) => (
    <section>
      <h2>Sources</h2>
      <h2>Further Reading</h2>
      {sources?.map(source => (
        <Link key={source.title} href="/mock-resource">
          {source.title}
        </Link>
      ))}
      {resources?.map(resource => (
        <span key={resource.name}>{resource.name}</span>
      ))}
    </section>
  ),
  RuleSidebar: () => null
}))

jest.mock('@repo/design-system/custom/navigation/breadcrumb', () => ({
  Breadcrumb: ({ children }: { children: ReactNode }) => <nav>{children}</nav>,
  BreadcrumbList: ({ children }: { children: ReactNode }) => <ol>{children}</ol>,
  BreadcrumbItem: ({ children }: { children: ReactNode }) => <li>{children}</li>,
  BreadcrumbLink: ({ children }: { children: ReactNode }) => <span>{children}</span>,
  BreadcrumbPage: ({ children }: { children: ReactNode }) => <span>{children}</span>,
  BreadcrumbSeparator: () => <span>/</span>,
  BreadcrumbJsonLd: () => null
}))

const RulePage = require('../page').default as typeof import('../page').default

describe('RulePage', () => {
  it('keeps related rules in the dedicated section and does not inject old metadata prose', async () => {
    const view = await RulePage({
      params: Promise.resolve({
        lang: 'en',
        category: 'accessibility',
        slug: 'flashing-content'
      })
    })

    render(view)

    expect(screen.getByRole('heading', { name: 'Related rules' })).toBeInTheDocument()
    expect(screen.getByText('Respect reduced motion preferences')).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Sources' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Further Reading' })).toBeInTheDocument()
    expect(
      screen.getByText('WCAG 2.1 SC 2.3.1: Three Flashes or Below Threshold')
    ).toBeInTheDocument()
    expect(screen.getByText('axe DevTools')).toBeInTheDocument()
    expect(screen.queryByText(/See also/i)).not.toBeInTheDocument()
    expect(screen.queryByText(/Reference:/i)).not.toBeInTheDocument()
  })
})
