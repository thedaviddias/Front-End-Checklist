import { defineCollection, defineConfig } from '@content-collections/core'
import { compileMDX } from '@content-collections/mdx'
import rehypePrettyCode from 'rehype-pretty-code'
import rehypeSlug from 'rehype-slug'
import remarkGfm from 'remark-gfm'
import { z } from 'zod'
import {
  enrichResources,
  generateSearchKeywords,
  normalizePriority,
  normalizeTools
} from './content-collections-helpers'
import {
  buildSourceSummary,
  categoryValues,
  inferSourceAuthority,
  inferSourceRole,
  RULE_SOURCE_AUTHORITIES,
  RULE_SOURCE_ROLES,
  rehypePrettyCodeOptions,
  slugifyMetadataId,
  subcategoryValues
} from './content-collections-rule-utils'

// Enhanced schema supporting both legacy and new formats with multilanguage
const ruleSchema = z.object({
  // Explicit content property (required by content-collections)
  content: z.string(),

  // Core identification
  id: z.string().optional(),
  title: z.string(),
  slug: z.string().optional(),
  description: z.string().optional(),

  // Backward compatibility: support both 'categories' and legacy 'checklists'
  categories: z.array(z.string()).optional(),
  checklists: z.array(z.string()).optional(), // Legacy support
  tags: z.array(z.string()).optional(),

  // Subcategory for more granular organization within a category
  subcategory: z.enum(subcategoryValues).optional(),

  // Enhanced metadata
  difficulty: z.enum(['beginner', 'intermediate', 'advanced', 'expert']).optional(),
  estimatedTime: z.number().optional(), // minutes
  prerequisites: z.array(z.string()).optional(),

  // Priority (support both legacy numbers and new words)
  priority: z.union([
    z.enum(['1', '2', '3']), // Legacy support
    z.enum(['critical', 'high', 'medium', 'low']) // New format
  ]),

  // Impact assessment
  impact: z
    .object({
      performance: z.enum(['critical', 'high', 'medium', 'low', 'none']).optional(),
      accessibility: z.enum(['critical', 'high', 'medium', 'low', 'none']).optional(),
      seo: z.enum(['critical', 'high', 'medium', 'low', 'none']).optional(),
      maintenance: z.enum(['critical', 'high', 'medium', 'low', 'none']).optional()
    })
    .optional(),

  // Framework support
  frameworks: z
    .record(z.string(), z.enum(['native', 'plugin', 'manual', 'unsupported']))
    .optional(),
  // Tools - supports both legacy strings and new objects with URLs
  tools: z
    .array(
      z.union([
        z.string(), // backward compatibility
        z.object({
          name: z.string(),
          url: z.string().url()
        })
      ])
    )
    .optional(),

  // npm packages relevant to this rule — names only; metadata fetched at build time.
  // Only packages with >10k weekly downloads and updated in the last 18 months are kept.
  npmPackages: z.array(z.string()).optional(),

  // Resources - extended resource types (articles, books, videos, etc.)
  // name is optional - will be auto-fetched from URL metadata at build time
  resources: z
    .array(
      z.object({
        name: z.string().optional(), // Optional - auto-fetched from URL if not provided
        url: z.string().url(),
        type: z.string(),
        author: z.string().optional(),
        description: z.string().optional()
      })
    )
    .optional(),

  // Authoritative sources — spec citations that verify the rule's accuracy.
  // Different from `resources` (learning materials shown to users).
  // These are internal citations: MDN, W3C, WCAG, OWASP, web.dev, etc.
  sources: z
    .array(
      z.object({
        id: z.string().optional(),
        title: z.string(),
        url: z.string().url(),
        type: z.string(),
        role: z.enum(RULE_SOURCE_ROLES).optional(),
        authority: z.enum(RULE_SOURCE_AUTHORITIES).optional()
      })
    )
    .optional(),
  // Standards compliance
  standards: z
    .object({
      wcag: z.string().optional(),
      coreweb: z.array(z.string()).optional(),
      browsers: z.array(z.string()).optional()
    })
    .optional(),

  // Content flags
  hasCodeExamples: z.boolean().optional(),
  hasLiveDemo: z.boolean().optional(),
  hasVideo: z.boolean().optional(),
  hasFrameworkExamples: z.boolean().optional(),

  // Metadata
  version: z.string().optional(),
  lastUpdated: z.string().optional(),
  author: z.string().optional(),
  reviewedBy: z.array(z.string()).optional(),

  // Learning paths
  learningPath: z.record(z.string(), z.number().nullable()).optional(),

  // Rule prompts
  prompts: z
    .object({
      check: z.string(),
      fix: z.string(),
      explain: z.string(),
      codeReview: z.string().optional()
    })
    .optional(),

  // Rule application context (not shown in UI)
  aiContext: z.string().optional(),

  // TL;DR quick summary bullets
  tldr: z.array(z.string()).optional(),

  // Why this rule matters - single line for quick understanding
  whyItMatters: z.string().optional(),

  // Related rules for cross-referencing
  relatedRules: z
    .array(
      z.object({
        slug: z.string(),
        reason: z.string().optional()
      })
    )
    .optional(),

  // Automation support
  automation: z
    .object({
      lintRules: z.array(z.string()).optional(),
      ciChecks: z.array(z.string()).optional(),
      aiIntegrations: z.array(z.string()).optional()
    })
    .optional(),

  // Legacy fields for backward compatibility
  type: z.literal('Rule').optional()
})

const rules = defineCollection({
  name: 'rules',
  directory: '../../packages/content/rules',
  include: '**/*.mdx',
  schema: ruleSchema,

  transform: async (document, context) => {
    const mdx = await compileMDX(context, document, {
      remarkPlugins: [remarkGfm],
      rehypePlugins: [rehypeSlug, [rehypePrettyCode, rehypePrettyCodeOptions]]
    })

    // Extract language and slug from file path
    const normalizedPath = document._meta.path.replace(/\\/g, '/')
    const pathParts = normalizedPath.split('/')
    const language = pathParts.length > 2 ? pathParts[0] : 'en' // Default to English
    const category = pathParts.length > 2 ? pathParts[1] : pathParts[0]
    const slug =
      document.slug ||
      normalizedPath
        .replace(/\.mdx$/, '')
        .split('/')
        .pop() ||
      ''

    // Omit content from output to reduce generated file size; load on-demand via getRuleRawContent(filePath)
    const { content: _content, _meta, ...documentRest } = document
    const normalizedSources = (document.sources || []).map((source, index) => ({
      ...source,
      id: source.id || slugifyMetadataId(source.title, `source-${index + 1}`),
      role: source.role || inferSourceRole(source, index),
      authority: source.authority === 'primary' ? 'primary' : inferSourceAuthority(source)
    }))

    // Normalize the data for consistent API
    const normalizedRule = {
      ...documentRest,
      mdx,

      // Language and identification
      language,
      slug,
      id: document.id || `${language}-${slug}`,

      // Normalize categories (handle legacy 'checklists')
      categories: document.categories || document.checklists || [category],

      // Subcategory for granular organization
      subcategory: document.subcategory || null,

      // Normalize priority
      priority: normalizePriority(document.priority),

      // Set defaults for new fields
      difficulty: document.difficulty || 'intermediate',
      estimatedTime: document.estimatedTime || 15,

      // TL;DR and whyItMatters
      tldr: document.tldr || [],
      whyItMatters: document.whyItMatters || null,

      // Normalize tools to always have name and url
      tools: document.tools ? normalizeTools(document.tools) : undefined,

      // Resources (articles, books, videos, etc.) - enriched with fetched metadata
      resources: await enrichResources(document.resources || []),
      sources: normalizedSources,
      sourceSummary: buildSourceSummary({
        sources: normalizedSources
      }),

      // Generate URLs with language support
      url: `/${language}/rules/${slug}`,

      // Extract primary category for routing
      primaryCategory: (document.categories || document.checklists || [category])[0]
        .toLowerCase()
        .replace(/\s+/g, '-'),

      // Generate search keywords
      searchKeywords: generateSearchKeywords(document, language),

      // File path for Copy Markdown / Open in GitHub features (content loaded via getRuleRawContent)
      filePath: document._meta.filePath
    }

    return normalizedRule
  }
})

// Curated Checklists schema
const checklistSchema = z.object({
  // Explicit content property (required by content-collections)
  content: z.string(),

  // Core identification
  title: z.string(),
  slug: z.string().optional(),
  description: z.string(),

  // Display
  icon: z.string().optional(), // Lucide icon name

  // Rules included in this checklist (references by category/slug)
  rules: z.array(z.string()),

  // Metadata
  estimatedTime: z.string().optional(), // e.g., "30 minutes"
  difficulty: z.enum(['beginner', 'intermediate', 'advanced']).optional(),

  // Organization
  order: z.number().optional(), // Display order
  featured: z.boolean().optional() // Show on homepage
})

const checklists = defineCollection({
  name: 'checklists',
  directory: '../../packages/content/checklists',
  include: '**/*.mdx',
  schema: checklistSchema,

  transform: async (document, context) => {
    const mdx = await compileMDX(context, document, {
      remarkPlugins: [remarkGfm],
      rehypePlugins: [rehypeSlug, [rehypePrettyCode, rehypePrettyCodeOptions]]
    })

    // Extract language from file path
    const normalizedPath = document._meta.path.replace(/\\/g, '/')
    const pathParts = normalizedPath.split('/')
    const language = pathParts.length > 1 ? pathParts[0] : 'en'
    const slug =
      document.slug ||
      normalizedPath
        .replace(/\.mdx$/, '')
        .split('/')
        .pop() ||
      ''

    return {
      ...document,
      mdx,
      language,
      slug,
      id: `${language}-${slug}`,
      url: `/${language}/checklists/${slug}`,
      // Default values
      icon: document.icon || 'list-checks',
      difficulty: document.difficulty || 'intermediate',
      order: document.order || 999,
      featured: document.featured || false
    }
  }
})

const guideTypeValues = ['how-to', 'insight'] as const

const guideSchema = z.object({
  content: z.string(),
  title: z.string(),
  description: z.string(),
  slug: z.string(),
  type: z.enum(guideTypeValues),
  category: z.enum(categoryValues),
  tags: z.array(z.string()).min(1),
  publishedAt: z.string(),
  updatedAt: z.string(),
  coverImage: z.string(),
  featured: z.boolean(),
  author: z
    .object({
      name: z.string(),
      role: z.string().optional(),
      bio: z.string().optional(),
      url: z.string().url().optional(),
      xUrl: z.string().url().optional()
    })
    .optional(),
  relatedRules: z.array(z.string()).min(1),
  relatedChecklists: z.array(z.string()).min(1),
  relatedGuides: z.array(z.string()).min(1)
})

const defaultGuideAuthor = {
  name: 'David Dias',
  role: 'Creator of Front-End Checklist',
  bio: 'David writes practical guidance for teams shipping frontend work with higher standards.',
  url: 'https://thedaviddias.com',
  xUrl: 'https://x.com/thedaviddias'
}

const guides = defineCollection({
  name: 'guides',
  directory: '../../packages/content/guides',
  include: '**/*.mdx',
  schema: guideSchema,

  transform: async (document, context) => {
    const mdx = await compileMDX(context, document, {
      remarkPlugins: [remarkGfm],
      rehypePlugins: [rehypeSlug, [rehypePrettyCode, rehypePrettyCodeOptions]]
    })

    const normalizedPath = document._meta.path.replace(/\\/g, '/')
    const pathParts = normalizedPath.split('/')
    const language = pathParts.length > 1 ? pathParts[0] : 'en'

    return {
      ...document,
      mdx,
      language,
      id: `${language}-${document.slug}`,
      url: `/guides/${document.slug}`,
      author: {
        ...defaultGuideAuthor,
        ...(document.author || {})
      },
      searchKeywords: [
        document.title,
        document.description,
        document.category,
        document.type,
        ...document.tags
      ],
      filePath: document._meta.filePath
    }
  }
})

// @ts-expect-error content-collections' current types reject compiled MDX transform output,
// even though this configuration is valid at runtime and used by the app successfully.
export default defineConfig({
  content: [rules, checklists, guides]
})
