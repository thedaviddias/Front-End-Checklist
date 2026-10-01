import { SITE_URL } from '@repo/config'

/** Shared description for the `slug` input of single-rule tools. */
export const RULE_SLUG_DESCRIPTION =
  "Rule slug: the kebab-case rule ID, e.g. 'alt-text' or 'doctype'. Get slugs from search_rules or review_code results."

export const STRING_SCHEMA = {
  type: 'string'
} as const

export const NUMBER_SCHEMA = {
  type: 'number'
} as const

export const BOOLEAN_SCHEMA = {
  type: 'boolean'
} as const

export const STRING_ARRAY_SCHEMA = {
  type: 'array',
  items: STRING_SCHEMA
} as const

export const CATEGORY_ARRAY_SCHEMA = {
  type: 'array',
  items: {
    type: 'string',
    enum: [
      'html',
      'css',
      'javascript',
      'performance',
      'accessibility',
      'seo',
      'security',
      'images',
      'testing',
      'privacy',
      'pwa',
      'i18n'
    ]
  }
} as const

export const PRIORITY_SCHEMA = {
  type: 'string',
  enum: ['critical', 'high', 'medium', 'low']
} as const

export const PRIORITY_ARRAY_SCHEMA = {
  type: 'array',
  items: PRIORITY_SCHEMA
} as const

export const RULE_PROMPTS_SCHEMA = {
  type: 'object',
  properties: {
    check: STRING_SCHEMA,
    fix: STRING_SCHEMA,
    explain: STRING_SCHEMA,
    codeReview: STRING_SCHEMA,
    aiContext: STRING_SCHEMA
  }
} as const

export const SUGGESTION_SCHEMA = {
  type: 'object',
  properties: {
    slug: STRING_SCHEMA,
    title: STRING_SCHEMA,
    similarity: NUMBER_SCHEMA
  }
} as const

export const ERROR_WITH_SUGGESTIONS_SCHEMA = {
  type: 'object',
  properties: {
    error: {
      type: ['null', 'string']
    },
    result: {
      type: ['null', 'object']
    },
    suggestions: {
      type: 'array',
      items: SUGGESTION_SCHEMA
    },
    message: STRING_SCHEMA
  }
} as const

/** Icon advertised for the server and each tool (SEP-973). */
export const MCP_SERVER_ICON = {
  src: `${SITE_URL}/favicon.svg`,
  mimeType: 'image/svg+xml',
  sizes: ['any']
}

export const READ_ONLY_TOOL_ANNOTATIONS = {
  readOnlyHint: true,
  destructiveHint: false,
  idempotentHint: true,
  openWorldHint: false
} as const

export const OPEN_WORLD_READ_ONLY_TOOL_ANNOTATIONS = {
  ...READ_ONLY_TOOL_ANNOTATIONS,
  openWorldHint: true
} as const
