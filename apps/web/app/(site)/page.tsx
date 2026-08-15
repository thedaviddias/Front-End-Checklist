import { formatTechTerm } from '@repo/utils'
import { allChecklists, allRules } from 'content-collections'
import { ChecklistActionBar } from '@/components/checklists/actions/checklist-action-bar'
import { buildChecklistActionBarProps } from '@/components/checklists/actions/checklist-action-bar-props'
import type { CategoryIconName } from '@/components/homepage/category-card'
import type { ChecklistPreviewData } from '@/components/homepage/checklists-preview'
import { HomePageContent } from '@/components/homepage/home-page-content'
import { getCachedGitHubStars } from '@/lib/cache'
import { getMentions } from '@/lib/mentions'
import { cachePublicContent } from '@/lib/public-content-cache'
import { pageMetadata } from '@/lib/seo'
import { QueryProvider } from '@/providers/query-provider'
import { SITE_LANGUAGE } from './layout'

export const metadata = pageMetadata.home

type ChecklistDifficulty = ChecklistPreviewData['difficulty']
type CategoryRuleMap = Record<string, string[]>

const categoryConfig: Record<
  string,
  {
    iconName: CategoryIconName
    priority: 'critical' | 'high' | 'medium' | 'low'
    description: string
  }
> = {
  html: {
    iconName: 'fileCode',
    priority: 'critical',
    description: 'Semantic markup and document structure'
  },
  css: {
    iconName: 'paintbrush',
    priority: 'high',
    description: 'Styling, responsive design, and optimization'
  },
  javascript: {
    iconName: 'code',
    priority: 'high',
    description: 'Modern patterns and code organization'
  },
  performance: {
    iconName: 'zap',
    priority: 'critical',
    description: 'Core Web Vitals and rendering strategies'
  },
  accessibility: {
    iconName: 'eye',
    priority: 'critical',
    description: 'WCAG compliance and inclusive design'
  },
  seo: {
    iconName: 'search',
    priority: 'medium',
    description: 'Meta tags and search optimization'
  },
  images: {
    iconName: 'image',
    priority: 'high',
    description: 'Optimization and responsive images'
  },
  security: {
    iconName: 'shield',
    priority: 'critical',
    description: 'Security best practices'
  },
  privacy: {
    iconName: 'shield',
    priority: 'high',
    description: 'Consent, tracking, and user data rights'
  },
  i18n: {
    iconName: 'globe',
    priority: 'medium',
    description: 'Localization, language, and translation workflows'
  },
  testing: {
    iconName: 'testTube',
    priority: 'medium',
    description: 'Testing strategies and QA'
  }
}

const defaultCategoryConfig: {
  iconName: CategoryIconName
  priority: 'medium'
  description: string
} = {
  iconName: 'fileCode',
  priority: 'medium',
  description: 'Web development best practices'
}

const mentions = getMentions()

/**
 * Normalize checklist difficulty values into supported preview values.
 *
 * @param value - Checklist difficulty from content.
 * @returns Supported difficulty label.
 */
function normalizeChecklistDifficulty(value: string | undefined): ChecklistDifficulty {
  if (value === 'beginner' || value === 'intermediate' || value === 'advanced') {
    return value
  }

  return 'intermediate'
}

export default async function Page() {
  'use cache'
  cachePublicContent()

  const lang = SITE_LANGUAGE
  const githubStars = await getCachedGitHubStars()

  const rules = allRules.filter(rule => rule.language === lang)

  const checklistsRaw = allChecklists.filter(checklist => checklist.language === lang)
  const checklistsForPreview: ChecklistPreviewData[] = checklistsRaw
    .filter(checklist => checklist.featured)
    .sort((a, b) => (a.order ?? 99) - (b.order ?? 99))
    .map(checklist => ({
      slug: checklist.slug,
      title: checklist.title,
      description: checklist.description,
      icon: checklist.icon,
      rules: checklist.rules,
      estimatedTime: checklist.estimatedTime,
      difficulty: normalizeChecklistDifficulty(checklist.difficulty)
    }))

  const categoryRules: CategoryRuleMap = {}
  for (const rule of rules) {
    const category = rule.primaryCategory
    if (!categoryRules[category]) {
      categoryRules[category] = []
    }
    categoryRules[category].push(rule.id)
  }

  const categories = Object.entries(categoryRules)
    .map(([slug, ruleIds]) => ({
      slug,
      title: formatTechTerm(slug),
      ruleIds,
      ...(categoryConfig[slug] || defaultCategoryConfig)
    }))
    .sort((a, b) => a.title.localeCompare(b.title))

  return (
    <QueryProvider>
      <HomePageContent
        categories={categories}
        githubStars={githubStars}
        checklistsForPreview={checklistsForPreview}
        mentions={mentions}
      />

      <ChecklistActionBar
        {...buildChecklistActionBarProps({
          allRules: rules.map(rule => ({
            id: rule.id,
            primaryCategory: rule.primaryCategory
          }))
        })}
      />
    </QueryProvider>
  )
}
