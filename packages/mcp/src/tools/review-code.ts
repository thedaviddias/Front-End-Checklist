import type { Category, Priority, Rule } from '@repo/types'
import { parse as parseHtml } from 'node-html-parser'
import {
  NUMBER_SCHEMA,
  PRIORITY_SCHEMA,
  READ_ONLY_TOOL_ANNOTATIONS,
  STRING_ARRAY_SCHEMA,
  STRING_SCHEMA
} from './metadata'

export interface ReviewCodeInput {
  code: string
  focus?: Category[]
  minPriority?: Priority
}

export interface ReviewIssue {
  rule: string
  title: string
  priority: Priority
  issue: string
  fixPrompt?: string
}

export interface ReviewCodeResult {
  summary: {
    totalChecks: number
    issuesFound: number
    criticalIssues: number
    highIssues: number
    categories: Category[]
  }
  issues: ReviewIssue[]
  suggestions: string[]
}

/**
 * Tool definition for review_code
 */
export const reviewCodeDefinition = {
  name: 'review_code',
  title: 'Review Frontend Code',
  description: `Runs a non-exhaustive static heuristic review of pasted HTML, CSS, or JavaScript against many Front-End Checklist rules at once and returns prioritized issues with fix guidance. Use it as the first step when the user shares frontend code and wants it reviewed, audited, or debugged. No issues means nothing provable was found, not that the code is clean, so follow its suggestions with search_rules or get_rule. For a live page use audit_url instead; to test code against one named rule use check_rule.`,
  annotations: READ_ONLY_TOOL_ANNOTATIONS,
  inputSchema: {
    type: 'object' as const,
    properties: {
      code: {
        type: 'string',
        description: 'The HTML, CSS, or JavaScript source to review (a snippet or a whole file).'
      },
      focus: {
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
            'images'
          ]
        },
        description: 'Only check these categories (default: auto-detected from the code).'
      },
      minPriority: {
        type: 'string',
        enum: ['critical', 'high', 'medium', 'low'],
        description: 'Lowest priority to report (default: medium).'
      }
    },
    required: ['code']
  },
  outputSchema: {
    type: 'object' as const,
    properties: {
      summary: {
        type: 'object',
        properties: {
          totalChecks: NUMBER_SCHEMA,
          issuesFound: NUMBER_SCHEMA,
          criticalIssues: NUMBER_SCHEMA,
          highIssues: NUMBER_SCHEMA,
          categories: STRING_ARRAY_SCHEMA
        }
      },
      issues: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            rule: STRING_SCHEMA,
            title: STRING_SCHEMA,
            priority: PRIORITY_SCHEMA,
            issue: STRING_SCHEMA,
            fixPrompt: STRING_SCHEMA
          }
        }
      },
      suggestions: STRING_ARRAY_SCHEMA
    }
  }
}

/**
 * Priority order for sorting
 */
const PRIORITY_ORDER: Record<Priority, number> = {
  critical: 0,
  high: 1,
  medium: 2,
  low: 3
}

/**
 * Format a parsed form control for user-facing issue text without echoing raw attribute input.
 *
 * @param tagName - Parsed form control tag name.
 * @param inputType - Raw input type attribute.
 * @returns Safe form control summary for diagnostics.
 */
function formatFormControlForIssue(tagName: string, inputType: string): string {
  const normalizedTag = tagName.toLowerCase()
  const tag =
    normalizedTag === 'select' || normalizedTag === 'textarea' || normalizedTag === 'input'
      ? normalizedTag
      : 'input'
  const safeType = inputType
    .toLowerCase()
    .replace(/[^a-z0-9_-]/g, '')
    .slice(0, 40)

  return safeType ? `<${tag} type="${safeType}">` : `<${tag}>`
}

/**
 * Thresholds for heuristic checks.
 * Named constants prevent magic numbers and document the reasoning behind each threshold.
 */
const INLINE_STYLE_THRESHOLD = 3 // >3 inline styles suggests systemic misuse rather than one-off overrides
const DIV_SOUP_THRESHOLD = 5 // >5 divs without any semantic elements is a clear structural smell
const HEX_COLOR_THRESHOLD = 5 // >5 hardcoded hex values suggests missing design-token/CSS-variable discipline
const LAZY_LOAD_THRESHOLD = 3 // >3 images lacking loading= likely means lazy loading was forgotten entirely
const RESPONSIVE_IMAGE_THRESHOLD = 2 // >2 images without srcset/sizes is enough to flag a responsive gap
const REQUIRE_USAGE_THRESHOLD = 2 // >2 require() calls signals a CommonJS-style module system
const FIXED_WIDTH_THRESHOLD = 2 // >2 hard pixel widths blocks fluid/responsive layout
const FLOAT_LAYOUT_THRESHOLD = 2 // >2 floats with clears signals float-based layout (legacy pattern)
const CSS_NAMING_THRESHOLD = 3 // >3 camelCase class names suggests inconsistent naming conventions
const MEDIA_QUERY_THRESHOLD = 3 // >3 @media queries before suggesting @container for component-scoped CSS
const PX_FONT_SIZE_THRESHOLD = 2 // >2 px font-sizes suggests systemic use of px instead of rem
const IMPORTANT_THRESHOLD = 3 // >3 !important declarations suggests specificity problems
const PX_SPACING_THRESHOLD = 3 // >3 px spacing values suggests missing relative units
const CONSOLE_CALL_THRESHOLD = 2 // >2 console calls suggests debug code left in production

const OVERLAY_WIDGET_PATTERNS = [
  /\bpopover\b/i,
  /\bdropdown\b/i,
  /\bmenu\b/i,
  /\blistbox\b/i,
  /\bcombobox\b/i,
  /\bdialog\b/i,
  /\bmodal\b/i,
  /\btooltip\b/i,
  /\baccordion\b/i,
  /\btabs?\b/i,
  /\bdisclosure\b/i
]

const NOTIFICATION_PATTERNS = [
  /\bnotifications?\b/i,
  /\btoast\b/i,
  /\bsnackbar\b/i,
  /\balert\b/i,
  /\bstatus\b/i,
  /\baria-live\b/i,
  /\blive region\b/i
]

const RESPONSIVE_CONTAINMENT_PATTERNS = [
  /\bviewport\b/i,
  /\bmobile\b/i,
  /\bnarrow\b/i,
  /\boverflow\b/i,
  /\bhorizontal scroll\b/i,
  /\bcontainer\b/i,
  /\bresponsive\b/i
]

function hasHtmlLikeMarkup(code: string): boolean {
  return /<[a-z][\w:-]*(\s|>)/i.test(code)
}

function hasHeadTag(code: string): boolean {
  return /<head\b/i.test(code)
}

function isFullHtmlDocument(code: string): boolean {
  return /<(?:!doctype|html\b|head\b|body\b)/i.test(code)
}

function isLikelyComponentSource(code: string): boolean {
  return (
    /\b(?:import|export)\b/.test(code) ||
    /\b(?:className|htmlFor|onClick|onChange|use client|use server)\s*=/.test(code) ||
    /<[A-Z][\w.]*/.test(code)
  )
}

function isLikelyFrameworkDocumentShell(code: string): boolean {
  const lowerCode = code.toLowerCase()
  return (
    isLikelyComponentSource(code) &&
    lowerCode.includes('<html') &&
    lowerCode.includes('<body') &&
    /\bexport\s+const\s+(metadata|viewport)\b/.test(code)
  )
}

function isLikelyMetadataDrivenSource(code: string): boolean {
  return (
    /\bexport\s+const\s+metadata\b/.test(code) ||
    /\bexport\s+const\s+viewport\b/.test(code) ||
    /\bexport\s+async\s+function\s+generateMetadata\b/.test(code) ||
    /\bfunction\s+generateMetadata\b/.test(code) ||
    /\bimport\s+type\s+\{\s*Metadata(?:\s*,\s*Viewport)?\s*\}\s+from\s+['"]next['"]/.test(code) ||
    /\bpageMetadata\b/.test(code) ||
    /\bgenerate[A-Z]\w*Metadata\b/.test(code)
  )
}

function isLikelyAsyncReactComponentSource(code: string): boolean {
  const hasAsyncComponentSignature =
    /\b(?:export\s+default\s+)?async function\s+[A-Z]\w*\s*\(/.test(code)
  if (!hasAsyncComponentSignature) return false

  return /return\s*(?:\(\s*)?</s.test(code) || /\b(?:redirect|notFound)\s*\(/.test(code)
}

/**
 * Check whether source text contains any topic pattern.
 *
 * @param code - Source snippet provided to review_code.
 * @param patterns - Regular expressions for a guidance topic.
 * @returns Whether any pattern matched the snippet.
 */
function matchesAnyPattern(code: string, patterns: RegExp[]): boolean {
  return patterns.some(pattern => pattern.test(code))
}

/**
 * Format rule slugs as a concrete get_rule next step for agents.
 *
 * @param ruleSlugs - Rule slugs that should be retrieved for manual guidance.
 * @returns User-facing guidance string with exact get_rule calls.
 */
function formatRuleRetrieval(ruleSlugs: readonly string[]): string {
  return ruleSlugs.map(slug => `get_rule("${slug}")`).join(', ')
}

/**
 * Build review suggestions without turning uncertain manual checks into findings.
 *
 * @param code - Source snippet provided to review_code.
 * @param categoriesToCheck - Categories selected by focus or auto-detection.
 * @param issues - Static issues found by review_code.
 * @returns Suggested follow-up tool calls and review areas.
 */
function buildReviewSuggestions(
  code: string,
  categoriesToCheck: Category[],
  issues: ReviewIssue[]
): string[] {
  const suggestions: string[] = []

  if (categoriesToCheck.includes('html') && !issues.some(i => i.rule.includes('semantic'))) {
    suggestions.push(
      'Consider using search_rules with query "semantic" for more HTML structure best practices'
    )
  }
  if (categoriesToCheck.includes('accessibility')) {
    suggestions.push(
      'Run search_rules with categories=["accessibility"] for comprehensive a11y guidance'
    )
  }
  if (categoriesToCheck.includes('performance')) {
    suggestions.push('Check search_rules with categories=["performance"] for optimization tips')
  }

  if (issues.length > 0) {
    return suggestions
  }

  suggestions.push(
    'No provable static issues were found. This is a conservative heuristic result, not a clean bill of health; use search_rules or get_rule for relevant checklist guidance before concluding clean.'
  )

  if (matchesAnyPattern(code, OVERLAY_WIDGET_PATTERNS)) {
    suggestions.push(
      `For overlay/widget behavior, retrieve manual interaction rules: ${formatRuleRetrieval([
        'keyboard-navigation',
        'focus-management',
        'focus-styles',
        'focus-not-obscured',
        'touch-targets'
      ])}`
    )
  }

  if (matchesAnyPattern(code, NOTIFICATION_PATTERNS)) {
    suggestions.push(
      `For notification behavior, retrieve live-announcement rules: ${formatRuleRetrieval([
        'accessible-notifications',
        'aria-live-regions'
      ])}`
    )
  }

  if (matchesAnyPattern(code, RESPONSIVE_CONTAINMENT_PATTERNS)) {
    suggestions.push(
      `For narrow viewport and containment behavior, retrieve responsive layout rules: ${formatRuleRetrieval(
        ['horizontal-scroll', 'zoom-reflow', 'responsive-units', 'container-queries']
      )}`
    )
  }

  return suggestions
}

function shouldSuppressIssueForSourceContext(code: string, ruleSlug: string): boolean {
  const fullDocument = isFullHtmlDocument(code)
  const componentSource = isLikelyComponentSource(code)
  const frameworkDocumentShell = isLikelyFrameworkDocumentShell(code)
  const metadataDrivenSource = isLikelyMetadataDrivenSource(code)

  if (componentSource && !fullDocument) {
    if (ruleSlug === 'heading-hierarchy' || ruleSlug === 'heading-order') {
      return true
    }
  }

  if (metadataDrivenSource) {
    const headManagedRules = new Set([
      'canonical-url',
      'canonical-chain',
      'canonical-header',
      'charset',
      'content-security-policy',
      'csp-header',
      'favicon',
      'meta-description',
      'open-graph',
      'resource-hints',
      'schema-noindex-conflict',
      'structured-data',
      'viewport',
      'viewport-zoom'
    ])

    if (headManagedRules.has(ruleSlug)) {
      return true
    }

    if (ruleSlug === 'error-handling') {
      return true
    }
  }

  if (isLikelyAsyncReactComponentSource(code)) {
    if (ruleSlug === 'error-handling') {
      return true
    }
  }

  if (frameworkDocumentShell) {
    if (ruleSlug === 'doctype' || ruleSlug === 'charset' || ruleSlug === 'heading-hierarchy') {
      return true
    }
  }

  return false
}

/**
 * Detect code type and relevant categories from code content
 */
function detectCategories(code: string): Category[] {
  const categories: Set<Category> = new Set()
  const lowerCode = code.toLowerCase()

  // HTML detection
  if (
    lowerCode.includes('<!doctype') ||
    lowerCode.includes('<html') ||
    hasHeadTag(code) ||
    lowerCode.includes('<body') ||
    lowerCode.includes('<meta') ||
    lowerCode.includes('<div') ||
    lowerCode.includes('<img') ||
    lowerCode.includes('<a ') ||
    lowerCode.includes('<form')
  ) {
    categories.add('html')
    categories.add('accessibility') // HTML always has accessibility implications
    categories.add('seo') // HTML structure affects SEO
  }

  // CSS detection
  if (
    lowerCode.includes('{') &&
    (lowerCode.includes('color:') ||
      lowerCode.includes('margin:') ||
      lowerCode.includes('padding:') ||
      lowerCode.includes('display:') ||
      lowerCode.includes('font-') ||
      lowerCode.includes('@media'))
  ) {
    categories.add('css')
    categories.add('performance') // CSS affects performance
  }

  // JavaScript detection — require actual code-structure patterns to avoid false positives
  // from CSS comments, HTML attribute values, or plain English text containing these words
  const JS_STRUCTURE =
    /(\bconst\s+\w+\s*=|\blet\s+\w+\s*=|\bvar\s+\w+\s*=|\bfunction[\s(]|\)\s*=>|document\.|window\.|addEventListener\(|\brequire\s*\()/
  if (JS_STRUCTURE.test(code)) {
    categories.add('javascript')
    categories.add('performance')
    categories.add('security') // JS has security implications
  }

  // Image detection
  if (
    lowerCode.includes('<img') ||
    lowerCode.includes('background-image') ||
    lowerCode.includes('<picture')
  ) {
    categories.add('images')
  }

  // Default to HTML if nothing detected
  if (categories.size === 0) {
    categories.add('html')
  }

  return Array.from(categories)
}

/**
 * Check code against a specific rule pattern
 */
interface CheckResult {
  hasIssue: boolean
  issue?: string
}

function checkRule(code: string, rule: Rule): CheckResult {
  const slug = rule.slug.toLowerCase()
  const lowerCode = code.toLowerCase()

  // Alt text check
  if (slug.includes('alt') || slug.includes('alternative-text')) {
    const imgMatches = code.match(/<img[^>]*>/gi) || []
    for (const img of imgMatches) {
      if (!img.includes('alt=') && !img.includes('alt =')) {
        return { hasIssue: true, issue: 'Found <img> element without alt attribute' }
      }
    }
  }

  // Doctype check
  if (slug.includes('doctype')) {
    if (lowerCode.includes('<html') && !lowerCode.includes('<!doctype html>')) {
      return { hasIssue: true, issue: 'Missing <!DOCTYPE html> declaration' }
    }
  }

  // Semantic HTML checks
  if (slug.includes('semantic') || slug.includes('html5-semantic')) {
    if (isLikelyComponentSource(code) && !isFullHtmlDocument(code)) {
      return { hasIssue: false }
    }

    // main-require: a full page (has <body>) must have a <main> landmark
    if (lowerCode.includes('<body') && !lowerCode.includes('<main')) {
      return {
        hasIssue: true,
        issue: 'No <main> landmark element found — add <main> to define the primary content region'
      }
    }
    const divCount = (lowerCode.match(/<div/g) || []).length
    const semanticTags = ['<header', '<nav', '<main', '<section', '<article', '<aside', '<footer']
    const semanticCount = semanticTags.reduce(
      (count, tag) => count + (lowerCode.match(new RegExp(tag, 'g')) || []).length,
      0
    )
    if (divCount > DIV_SOUP_THRESHOLD && semanticCount === 0) {
      return { hasIssue: true, issue: 'Heavy use of <div> without semantic HTML5 elements' }
    }
  }

  // Viewport meta check
  if (slug.includes('viewport')) {
    if (hasHeadTag(code) && !lowerCode.includes('viewport')) {
      return { hasIssue: true, issue: 'Missing viewport meta tag for responsive design' }
    }
  }

  // Language attribute check
  if (slug.includes('lang') && slug.includes('attribute')) {
    if (lowerCode.includes('<html') && !lowerCode.match(/<html[^>]*lang\s*=/i)) {
      return { hasIssue: true, issue: 'Missing lang attribute on <html> element' }
    }
  }

  // HTTPS check
  if (slug.includes('https') || slug.includes('secure-connection')) {
    if (lowerCode.match(/http:\/\/(?!localhost)/)) {
      return { hasIssue: true, issue: 'Found non-HTTPS URLs (potential security issue)' }
    }
  }

  // Meta description check
  if (slug.includes('meta-description')) {
    if (
      hasHeadTag(code) &&
      !lowerCode.includes('name="description"') &&
      !lowerCode.includes("name='description'")
    ) {
      return { hasIssue: true, issue: 'Missing meta description tag' }
    }
  }

  // Title tag check
  if (slug === 'title-tag' || slug === 'page-title') {
    if (hasHeadTag(code) && !lowerCode.includes('<title')) {
      return { hasIssue: true, issue: 'Missing <title> tag' }
    }
  }

  // Charset check
  if (slug.includes('charset') || slug.includes('encoding')) {
    if (hasHeadTag(code) && !lowerCode.includes('charset=')) {
      return { hasIssue: true, issue: 'Missing charset declaration (recommend UTF-8)' }
    }
  }

  // Form label check
  if (slug.includes('form-label') || slug.includes('input-label')) {
    // Structural parsing is more accurate for HTML and JSX fragments, especially label htmlFor usage.
    if (hasHtmlLikeMarkup(code)) {
      return { hasIssue: false }
    }

    const inputs = code.match(/<input[^>]*type=["'](text|email|password|tel|number)[^>]*>/gi) || []
    const labels = (lowerCode.match(/<label/g) || []).length
    if (inputs.length > 0 && labels === 0) {
      return { hasIssue: true, issue: 'Form inputs found without associated <label> elements' }
    }
  }

  // Button type check
  if (slug.includes('button-type')) {
    const buttons = code.match(/<button[^>]*>/gi) || []
    for (const btn of buttons) {
      if (!btn.includes('type=')) {
        return { hasIssue: true, issue: 'Found <button> without explicit type attribute' }
      }
    }
  }

  // Inline styles check
  if (slug.includes('inline-style') || slug.includes('avoid-inline')) {
    const inlineStyles = (code.match(/style\s*=\s*["'][^"']+["']/gi) || []).length
    if (inlineStyles > INLINE_STYLE_THRESHOLD) {
      return {
        hasIssue: true,
        issue: `Found ${inlineStyles} inline styles (consider using CSS classes)`
      }
    }
  }

  // Inline script check — <script> blocks without a src= attribute are embedded scripts
  if (slug.includes('javascript-inline') || slug.includes('inline-script')) {
    const inlineScripts = (code.match(/<script(?![^>]*src\s*=)[^>]*>/gi) || []).filter(tag => {
      return !/type\s*=\s*["'][^"']*(?:json|text\/template|text\/html|text\/x-template)[^"']*["']/i.test(
        tag
      )
    }).length
    if (inlineScripts > 0) {
      return {
        hasIssue: true,
        issue: `Found ${inlineScripts} inline <script> block(s) — prefer external script files`
      }
    }
  }

  // Heading hierarchy check
  if (slug.includes('heading-hierarchy') || slug.includes('heading-order')) {
    const fullDocument = isFullHtmlDocument(code)
    const componentSource = isLikelyComponentSource(code)
    const h1Count = (lowerCode.match(/<h1/g) || []).length

    // JSX/TSX component source does not reflect the final rendered heading tree.
    if (componentSource && !fullDocument) {
      return { hasIssue: false }
    }

    if (h1Count > 1) {
      return {
        hasIssue: true,
        issue: 'Multiple <h1> elements found (should have only one per page)'
      }
    }
    // h1-require: a full page (has <body>) must have exactly one <h1>
    if (lowerCode.includes('<body') && h1Count === 0) {
      return {
        hasIssue: true,
        issue: 'Page has no <h1> element — every page needs exactly one main heading'
      }
    }
    if (fullDocument && h1Count === 0 && lowerCode.includes('<h2')) {
      return { hasIssue: true, issue: 'Found <h2> without <h1> (heading hierarchy issue)' }
    }
  }

  // Skip link check
  if (slug.includes('skip-link') || slug.includes('skip-navigation')) {
    if (isLikelyComponentSource(code) && !isFullHtmlDocument(code)) {
      return { hasIssue: false }
    }

    if (lowerCode.includes('<nav') && !lowerCode.includes('skip')) {
      return { hasIssue: true, issue: 'Navigation found without skip link for accessibility' }
    }
  }

  // ARIA check
  if (slug.includes('aria-label') && !slug.includes('misuse')) {
    const interactiveNoLabel = code.match(/<(button|a)[^>]*>[^<]*<\/(button|a)>/gi) || []
    for (const el of interactiveNoLabel) {
      if (el.match(/<(button|a)[^>]*>\s*<\//)) {
        return {
          hasIssue: true,
          issue: 'Found interactive element with no text content (needs aria-label)'
        }
      }
    }
  }

  // Color contrast (basic check for common issues)
  if (slug.includes('color-contrast')) {
    if (lowerCode.includes('color: #fff') && lowerCode.includes('background: #fff')) {
      return { hasIssue: true, issue: 'Potential color contrast issue (white on white detected)' }
    }
    if (lowerCode.includes('color: white') && lowerCode.includes('background: white')) {
      return { hasIssue: true, issue: 'Potential color contrast issue (white on white detected)' }
    }
  }

  // Focus styles check
  if (slug.includes('focus-styles') || slug.includes('focus-style') || slug === 'focus-styles') {
    if (
      lowerCode.includes('outline: none') ||
      lowerCode.includes('outline:none') ||
      lowerCode.includes('outline: 0')
    ) {
      if (!lowerCode.includes(':focus')) {
        return {
          hasIssue: true,
          issue: 'Outline removed without custom focus styles (accessibility issue)'
        }
      }
    }
  }

  // ===== NEW PATTERN CHECKS =====

  // Responsive images check
  if (slug.includes('responsive-image') || slug === 'srcset') {
    const imgMatches = code.match(/<img[^>]*>/gi) || []
    const largeImages = imgMatches.filter(img => !img.includes('srcset') && !img.includes('sizes'))
    if (largeImages.length > RESPONSIVE_IMAGE_THRESHOLD) {
      return {
        hasIssue: true,
        issue: `Found ${largeImages.length} images without srcset/sizes (not responsive)`
      }
    }
  }

  // Lazy loading check
  if (slug.includes('lazy-loading') || slug.includes('lazy-load')) {
    const imgMatches = code.match(/<img[^>]*>/gi) || []
    const noLazyLoad = imgMatches.filter(img => !img.includes('loading='))
    if (noLazyLoad.length > LAZY_LOAD_THRESHOLD) {
      return {
        hasIssue: true,
        issue: `Found ${noLazyLoad.length} images without loading attribute (consider lazy loading)`
      }
    }
  }

  // Width and height on images check
  if (slug.includes('dimensions') || slug.includes('width-and-height')) {
    const imgMatches = code.match(/<img[^>]*>/gi) || []
    for (const img of imgMatches) {
      if (!img.includes('width') || !img.includes('height')) {
        return {
          hasIssue: true,
          issue: 'Found <img> without explicit width/height (causes layout shift)'
        }
      }
    }
  }

  // Noopener check for external links
  if (slug.includes('new-tab') || slug.includes('new-tab') || slug.includes('external-link')) {
    const externalLinks = code.match(/<a[^>]*target\s*=\s*["']_blank["'][^>]*>/gi) || []
    for (const link of externalLinks) {
      if (!link.includes('new-tab') && !link.includes('noreferrer')) {
        return {
          hasIssue: true,
          issue: 'Found target="_blank" link without rel="noopener" (security risk)'
        }
      }
    }
  }

  // Canonical link check
  if (slug.includes('canonical-url')) {
    if (
      hasHeadTag(code) &&
      !lowerCode.includes('rel="canonical"') &&
      !lowerCode.includes("rel='canonical'")
    ) {
      return { hasIssue: true, issue: 'Missing canonical link tag' }
    }
  }

  // Structured data / JSON-LD check
  if (slug.includes('structured-data') || slug.includes('json-ld') || slug.includes('schema')) {
    if (hasHeadTag(code) && !lowerCode.includes('application/ld+json')) {
      return { hasIssue: true, issue: 'No structured data (JSON-LD) found' }
    }
  }

  // Noscript fallback check — only fire for inline JavaScript, not external or non-JS scripts
  if (slug.includes('noscript')) {
    // Inline JS scripts: no src= attribute, no non-JS type (exclude JSON-LD, module preloads, etc.)
    const inlineJsScripts = (
      code.match(/<script(?![^>]*\bsrc\s*=)[^>]*>([\s\S]*?)<\/script>/gi) || []
    ).filter(s => {
      const tag = s.match(/<script([^>]*)>/i)?.[1] ?? ''
      // Skip scripts with a non-JS type attribute
      if (
        /type\s*=\s*["'][^"']*(?:json|text\/template|text\/html|text\/x-template)[^"']*["']/i.test(
          tag
        )
      )
        return false
      const content = s
        .replace(/<script[^>]*>/i, '')
        .replace(/<\/script>/i, '')
        .trim()
      return content.length > 0
    })
    if (inlineJsScripts.length > 0 && !lowerCode.includes('<noscript')) {
      return {
        hasIssue: true,
        issue:
          'Inline JavaScript used without <noscript> fallback content for users with JS disabled'
      }
    }
  }

  // Favicon check
  if (slug.includes('favicon')) {
    if (hasHeadTag(code) && !lowerCode.includes('icon') && !lowerCode.includes('shortcut')) {
      return { hasIssue: true, issue: 'Missing favicon link' }
    }
  }

  // Direction attribute check (RTL support)
  if (slug.includes('direction-attribute') || slug.includes('dir-attribute')) {
    if (
      lowerCode.includes('<html') &&
      lowerCode.includes('lang="ar"') &&
      !lowerCode.includes('dir=')
    ) {
      return { hasIssue: true, issue: 'Arabic language set but missing dir="rtl" attribute' }
    }
    if (
      lowerCode.includes('<html') &&
      lowerCode.includes('lang="he"') &&
      !lowerCode.includes('dir=')
    ) {
      return { hasIssue: true, issue: 'Hebrew language set but missing dir="rtl" attribute' }
    }
  }

  // Autoplay media check
  if (slug.includes('autoplay')) {
    if (lowerCode.includes('autoplay') && !lowerCode.includes('muted')) {
      return {
        hasIssue: true,
        issue: 'Found autoplay media without muted attribute (accessibility issue)'
      }
    }
  }

  // Autofocus avoidance check
  if (slug.includes('autofocus')) {
    if (lowerCode.includes('autofocus')) {
      return {
        hasIssue: true,
        issue: 'Found autofocus attribute (can be disorienting for screen reader users)'
      }
    }
  }

  // Decorative elements check
  if (slug.includes('decorative-element') || slug.includes('presentation')) {
    const decorativePatterns = code.match(/<img[^>]*alt\s*=\s*["']\s*["'][^>]*>/gi) || []
    for (const img of decorativePatterns) {
      if (!img.includes('role="presentation"') && !img.includes('aria-hidden')) {
        return {
          hasIssue: true,
          issue:
            'Decorative image (empty alt) should have role="presentation" or aria-hidden="true"'
        }
      }
    }
  }

  // Unique IDs check — extract just the ID values (not the full attribute string) for accurate dedup
  if (slug.includes('unique-id')) {
    const ids = [...code.matchAll(/id\s*=\s*["']([^"']+)["']/gi)].map(m => m[1].toLowerCase())
    const seen = new Set<string>()
    const dupes = new Set<string>()
    for (const id of ids) {
      if (seen.has(id)) dupes.add(id)
      else seen.add(id)
    }
    if (dupes.size > 0) {
      return {
        hasIssue: true,
        issue: `Duplicate ID values found: ${[...dupes].slice(0, 3).join(', ')}`
      }
    }
  }

  // Form method check — <form> without explicit method attribute defaults to GET, which may be unintentional
  if (slug.includes('form-validation') || slug.includes('form-method')) {
    if (code.match(/<form[^>]*onSubmit\s*=/i) && !code.match(/<form[^>]*action\s*=/i)) {
      return { hasIssue: false }
    }

    if (lowerCode.includes('<form') && !code.match(/<form[^>]*method\s*=/i)) {
      return {
        hasIssue: true,
        issue: 'Form element missing method attribute — add method="get" or method="post"'
      }
    }
  }

  // Open Graph tags check
  if (slug.includes('open-graph') || slug.includes('og-tags') || slug.includes('social-meta')) {
    if (
      hasHeadTag(code) &&
      !lowerCode.includes('og:title') &&
      !lowerCode.includes('og:description')
    ) {
      return { hasIssue: true, issue: 'Missing Open Graph meta tags (og:title, og:description)' }
    }
  }

  // Twitter Card check
  if (slug.includes('twitter-card')) {
    if (hasHeadTag(code) && !lowerCode.includes('twitter:card')) {
      return { hasIssue: true, issue: 'Missing Twitter Card meta tags' }
    }
  }

  // Critical CSS check
  if (slug.includes('css-critical') || slug.includes('critical-css')) {
    if (
      hasHeadTag(code) &&
      lowerCode.includes('rel="stylesheet"') &&
      !lowerCode.includes('<style')
    ) {
      return {
        hasIssue: true,
        issue: 'External CSS without inline critical styles (may block rendering)'
      }
    }
  }

  // Meta robots check
  if (slug.includes('robots-meta') || slug.includes('meta-robots')) {
    if (
      hasHeadTag(code) &&
      !lowerCode.includes('name="robots"') &&
      !lowerCode.includes("name='robots'")
    ) {
      return { hasIssue: true, issue: 'Missing meta robots tag (consider adding for SEO control)' }
    }
  }

  // Resource hints check
  if (slug.includes('resource-hint') || slug.includes('preload') || slug.includes('preconnect')) {
    if (
      hasHeadTag(code) &&
      !lowerCode.includes('rel="preload"') &&
      !lowerCode.includes('rel="preconnect"') &&
      !lowerCode.includes('rel="prefetch"')
    ) {
      return {
        hasIssue: true,
        issue: 'No resource hints found (consider preload/preconnect for critical assets)'
      }
    }
  }

  // Third-party scripts check
  if (slug.includes('third-party-script') || slug.includes('external-script')) {
    const externalScripts =
      code.match(/<script[^>]*src\s*=\s*["']https?:\/\/[^"']+["'][^>]*>/gi) || []
    const noAsync = externalScripts.filter(s => !s.includes('async') && !s.includes('defer'))
    if (noAsync.length > 0) {
      return {
        hasIssue: true,
        issue: `Found ${noAsync.length} third-party scripts without async/defer (blocks rendering)`
      }
    }
  }

  // Table accessibility check
  if (slug.includes('accessible-table') || slug.includes('table-accessibility')) {
    if (
      lowerCode.includes('<table') &&
      !lowerCode.includes('<th') &&
      !lowerCode.includes('scope=')
    ) {
      return {
        hasIssue: true,
        issue: 'Table found without header cells (<th>) or scope attributes'
      }
    }
  }

  // Semantic lists check
  if (slug.includes('semantic-list')) {
    const listPatterns =
      lowerCode.match(/<div[^>]*>(\s*<div[^>]*>[^<]*<\/div>\s*){3,}<\/div>/g) || []
    if (listPatterns.length > 0) {
      return {
        hasIssue: true,
        issue: 'Found div structure that could be a semantic list (<ul>, <ol>, <dl>)'
      }
    }
  }

  // Audio descriptions check
  if (slug.includes('audio-description') || slug.includes('video-accessibility')) {
    if (lowerCode.includes('<video') && !lowerCode.includes('<track')) {
      return { hasIssue: true, issue: 'Video element without <track> for captions/descriptions' }
    }
  }

  // Print stylesheet check
  if (slug.includes('css-print') || slug.includes('print-stylesheet')) {
    if (
      hasHeadTag(code) &&
      lowerCode.includes('stylesheet') &&
      !lowerCode.includes('media="print"') &&
      !lowerCode.includes('@media print')
    ) {
      return { hasIssue: true, issue: 'No print stylesheet detected' }
    }
  }

  // Error handling check (JavaScript)
  if (slug.includes('error-handling')) {
    if (
      lowerCode.includes('async') &&
      lowerCode.includes('await') &&
      !lowerCode.includes('try') &&
      !lowerCode.includes('catch')
    ) {
      return { hasIssue: true, issue: 'Found async/await without try-catch error handling' }
    }
  }

  // Event listener cleanup check
  if (
    slug.includes('memory-leaks') ||
    slug.includes('event-listener-cleanup') ||
    slug.includes('listener-cleanup')
  ) {
    const hasListener = lowerCode.includes('addeventlistener')
    const hasCleanup =
      lowerCode.includes('removeeventlistener') ||
      lowerCode.includes('once: true') ||
      lowerCode.includes('once:true') ||
      lowerCode.includes('signal') || // AbortController signal option
      lowerCode.includes('abortcontroller')
    if (hasListener && !hasCleanup) {
      return {
        hasIssue: true,
        issue:
          'Found addEventListener without cleanup (removeEventListener, once, or AbortController)'
      }
    }
  }

  // Image optimization / modern formats check
  if (slug.includes('image-format') || slug.includes('webp') || slug.includes('avif')) {
    const imgSources = code.match(/<source[^>]*type\s*=\s*["'][^"']*["'][^>]*>/gi) || []
    const hasModernFormat = imgSources.some(s => s.includes('webp') || s.includes('avif'))
    if (lowerCode.includes('<picture') && !hasModernFormat) {
      return {
        hasIssue: true,
        issue: 'Picture element without modern image format sources (WebP/AVIF)'
      }
    }
  }

  // Minification check (CSS)
  if (slug.includes('css-minification') || slug.includes('minify-css')) {
    const styleBlocks = code.match(/<style[^>]*>[\s\S]*?<\/style>/gi) || []
    for (const block of styleBlocks) {
      if (block.includes('\n  ') && block.length > 500) {
        return {
          hasIssue: true,
          issue: 'Found unminified CSS in production (consider minification)'
        }
      }
    }
  }

  // JavaScript minification check
  if (slug.includes('js-minification') || slug.includes('minify-javascript')) {
    const scriptBlocks = code.match(/<script[^>]*>[\s\S]*?<\/script>/gi) || []
    for (const block of scriptBlocks) {
      if (!block.includes('src=') && block.includes('\n  ') && block.length > 500) {
        return {
          hasIssue: true,
          issue: 'Found unminified inline JavaScript (consider minification)'
        }
      }
    }
  }

  // SRI integrity check — external scripts/styles should have integrity attribute
  if (slug.includes('sri-integrity') || slug.includes('subresource-integrity')) {
    const externalScripts =
      code.match(/<script[^>]*src\s*=\s*["']https?:\/\/[^"']+["'][^>]*>/gi) || []
    const externalStyles =
      code.match(/<link[^>]*href\s*=\s*["']https?:\/\/[^"']+["'][^>]*>/gi) || []
    const noIntegrity = [
      ...externalScripts.filter(s => !s.includes('integrity=')),
      ...externalStyles.filter(s => s.includes('stylesheet') && !s.includes('integrity='))
    ]
    if (noIntegrity.length > 0) {
      return {
        hasIssue: true,
        issue: `Found ${noIntegrity.length} external resource(s) without SRI integrity attribute`
      }
    }
  }

  // CSP meta tag check
  if (slug.includes('csp-header') || slug.includes('content-security-policy')) {
    if (
      hasHeadTag(code) &&
      !lowerCode.includes('content-security-policy') &&
      !lowerCode.includes('http-equiv="content-security-policy"') &&
      !lowerCode.includes("http-equiv='content-security-policy'")
    ) {
      return {
        hasIssue: true,
        issue: 'Missing Content-Security-Policy meta tag or header reference'
      }
    }
  }

  // Keyboard navigation — positive tabindex disrupts natural tab order
  if (slug.includes('keyboard-navigation') || slug.includes('focus-order') || slug === 'tabindex') {
    const positiveTabindex = code.match(/tabindex\s*=\s*["']?[1-9]\d*["']?/gi) || []
    if (positiveTabindex.length > 0) {
      return {
        hasIssue: true,
        issue: `Found ${positiveTabindex.length} element(s) with positive tabindex (disrupts natural tab order)`
      }
    }
  }

  // CSS custom properties / variables — hardcoded hex colors instead of variables
  if (slug.includes('css-variables') || slug.includes('custom-properties')) {
    const hexColors = (code.match(/#[0-9a-f]{3,6}(?!\w)/gi) || []).length
    const cssVarUsage = (code.match(/var\s*\(--/g) || []).length
    if (hexColors > HEX_COLOR_THRESHOLD && cssVarUsage === 0) {
      return {
        hasIssue: true,
        issue: `Found ${hexColors} hardcoded hex colors without CSS custom properties (var(--)`
      }
    }
  }

  // Responsive design — fixed pixel widths block responsive layouts
  if (slug.includes('responsive-design') || slug.includes('responsive-layout')) {
    const fixedWidths = code.match(/width\s*:\s*\d{3,4}px/gi) || []
    if (fixedWidths.length > FIXED_WIDTH_THRESHOLD) {
      return {
        hasIssue: true,
        issue: `Found ${fixedWidths.length} fixed pixel widths (consider max-width, %, or clamp() for responsive design)`
      }
    }
  }

  // Float-based layout — legacy pattern, replaced by flexbox/grid
  if (
    slug.includes('flexbox-grid') ||
    slug.includes('layout-grid') ||
    slug.includes('float-layout')
  ) {
    const floatUsage = (code.match(/float\s*:\s*(left|right)/gi) || []).length
    const clearUsage = (code.match(/clear\s*:\s*(both|left|right)/gi) || []).length
    if (
      floatUsage > FLOAT_LAYOUT_THRESHOLD &&
      clearUsage > 0 &&
      !lowerCode.includes('display: flex') &&
      !lowerCode.includes('display:flex') &&
      !lowerCode.includes('display: grid')
    ) {
      return {
        hasIssue: true,
        issue:
          'Found float-based layout without flexbox/grid (consider modernising to display: flex or grid)'
      }
    }
  }

  // ES module imports — require() usage in modern code
  if (slug.includes('module-imports') || slug.includes('es-modules')) {
    const requireUsage = (code.match(/\brequire\s*\(/g) || []).length
    const importUsage = (code.match(/\bimport\b/g) || []).length
    if (requireUsage > REQUIRE_USAGE_THRESHOLD && importUsage === 0) {
      return {
        hasIssue: true,
        issue: `Found ${requireUsage} require() calls without ES module imports (consider migrating to import/export)`
      }
    }
  }

  // Container queries — modern responsive alternative to media queries
  if (slug.includes('container-queries') || slug.includes('container-query')) {
    const mediaQueries = (code.match(/@media\s/gi) || []).length
    const containerQueries = (code.match(/@container\s/gi) || []).length
    if (
      mediaQueries > MEDIA_QUERY_THRESHOLD &&
      containerQueries === 0 &&
      lowerCode.includes('component')
    ) {
      return {
        hasIssue: true,
        issue:
          'Found component-scoped CSS with media queries but no @container queries (consider container queries for component-level responsiveness)'
      }
    }
  }

  // CSS naming conventions — camelCase class names instead of kebab-case
  if (slug.includes('naming-conventions') || slug.includes('css-naming')) {
    const camelCaseClasses = code.match(/\.[a-z][a-zA-Z]*[A-Z][a-zA-Z]*/g) || []
    if (camelCaseClasses.length > CSS_NAMING_THRESHOLD) {
      return {
        hasIssue: true,
        issue: `Found ${camelCaseClasses.length} camelCase CSS class names (prefer kebab-case: .my-class)`
      }
    }
  }

  // Async patterns — callback nesting (callback hell) vs async/await
  if (slug.includes('async-patterns') || slug.includes('callback-hell')) {
    const callbackNesting =
      code.match(
        /\bfunction\s*\([^)]*\)\s*\{[\s\S]*?\bfunction\s*\([^)]*\)\s*\{[\s\S]*?\bfunction\s*\([^)]*\)\s*\{/g
      ) || []
    if (callbackNesting.length > 0) {
      return {
        hasIssue: true,
        issue:
          'Found deeply nested callbacks (callback hell) — consider async/await or Promise chains'
      }
    }
  }

  // ===== JAVASCRIPT HEURISTICS =====

  // avoid-eval
  if (slug.includes('avoid-eval')) {
    if (code.match(/\beval\s*\(/)) {
      return {
        hasIssue: true,
        issue: 'Found use of eval — executes arbitrary code and is a serious XSS risk'
      }
    }
  }

  // console-cleanup
  if (slug.includes('console-cleanup') || slug.includes('console-log')) {
    const consoleCalls = (code.match(/console\.(log|warn|error|debug|info)\s*\(/gi) || []).length
    if (consoleCalls > CONSOLE_CALL_THRESHOLD) {
      return {
        hasIssue: true,
        issue: `Found ${consoleCalls} console statement(s) — remove debug calls before production deployment`
      }
    }
  }

  // const-let — var is function-scoped and hoisted, leading to subtle bugs
  if (slug.includes('const-let') || slug === 'var-usage') {
    const varUsage = (code.match(/\bvar\s+/g) || []).length
    if (varUsage > 0) {
      return {
        hasIssue: true,
        issue: `Found ${varUsage} var declaration(s) — use const (preferred) or let instead`
      }
    }
  }

  // type-coercion — loose equality causes unexpected type coercions
  if (slug.includes('type-coercion')) {
    const looseEquality = (code.match(/(?<![=!<>])={2}(?!=)/g) || []).length
    if (looseEquality > 0) {
      return {
        hasIssue: true,
        issue: `Found ${looseEquality} loose equality comparison(s) (==) — use strict equality (===) to avoid type coercion bugs`
      }
    }
  }

  // error-handling — .then() without .catch() causes silent failures
  if (
    slug.includes('error-handling') ||
    slug.includes('promise-error-handling') ||
    slug.includes('unhandled-promise')
  ) {
    const thenCalls = (code.match(/\.then\s*\(/g) || []).length
    const catchCalls = (code.match(/\.catch\s*\(/g) || []).length
    if (thenCalls > 0 && catchCalls === 0 && !lowerCode.includes('try')) {
      return {
        hasIssue: true,
        issue: `Found ${thenCalls} .then() chain(s) without .catch() — unhandled rejections can crash the app`
      }
    }
  }

  // json-safety — JSON.parse throws on invalid input, must be wrapped in try-catch
  if (slug.includes('json-safety')) {
    const jsonParseCalls = (code.match(/JSON\.parse\s*\(/g) || []).length
    if (jsonParseCalls > 0 && !lowerCode.includes('try') && !lowerCode.includes('catch')) {
      return {
        hasIssue: true,
        issue: `Found ${jsonParseCalls} JSON.parse() call(s) without try-catch — malformed JSON will throw an uncaught error`
      }
    }
  }

  // ===== ACCESSIBILITY HEURISTICS =====

  // button-name — buttons need accessible names (text content or aria-label)
  if (slug.includes('button-name') || slug === 'button-accessible-name') {
    const buttonMatches = code.match(/<button\b[^>]*>[\s\S]*?<\/button>/gi) || []
    const unnamedButtons = buttonMatches.filter(button => {
      if (
        button.includes('aria-label') ||
        button.includes('aria-labelledby') ||
        button.includes('title=')
      ) {
        return false
      }

      const textWithoutDecorativeSvg = button
        .replace(/<svg\b[\s\S]*?<\/svg>/gi, '')
        .replace(/<[^>]+>/g, '')
        .trim()

      return textWithoutDecorativeSvg.length === 0
    })

    if (unnamedButtons.length > 0) {
      return {
        hasIssue: true,
        issue: `Found ${unnamedButtons.length} <button> element(s) with no accessible name — add text content or aria-label`
      }
    }
  }

  // empty-heading — headings with no content confuse screen readers
  if (slug.includes('empty-heading')) {
    const emptyHeadings = code.match(/<h[1-6][^>]*>\s*<\/h[1-6]>/gi) || []
    if (emptyHeadings.length > 0) {
      return {
        hasIssue: true,
        issue: `Found ${emptyHeadings.length} empty heading element(s) — headings must contain descriptive text`
      }
    }
  }

  // empty-links — links with no content are inaccessible
  if (slug.includes('empty-link') || slug === 'empty-links') {
    const emptyLinks = code.match(/<a[^>]*>\s*<\/a>/gi) || []
    const noLabel = emptyLinks.filter(
      link => !link.includes('aria-label') && !link.includes('aria-labelledby')
    )
    if (noLabel.length > 0) {
      return {
        hasIssue: true,
        issue: `Found ${noLabel.length} empty link(s) with no accessible name — add text or aria-label`
      }
    }
  }

  // frame-title — iframes need title attribute for screen readers
  if (slug.includes('frame-title') || slug.includes('iframe-title')) {
    const iframes = code.match(/<iframe[^>]*>/gi) || []
    const noTitle = iframes.filter(iframe => !iframe.includes('title='))
    if (noTitle.length > 0) {
      return {
        hasIssue: true,
        issue: `Found ${noTitle.length} <iframe> element(s) without title attribute (required for screen readers)`
      }
    }
  }

  // link-text — generic anchor text is meaningless out of context
  if (slug.includes('link-text') || slug.includes('anchor-text')) {
    const genericLinks =
      code.match(/<a[^>]*>\s*(click here|here|read more|more info|this|link|details)\s*<\/a>/gi) ||
      []
    if (genericLinks.length > 0) {
      return {
        hasIssue: true,
        issue: `Found ${genericLinks.length} link(s) with generic text — use descriptive link text that makes sense out of context`
      }
    }
  }

  // select-name — <select> needs an associated label
  if (slug.includes('select-name') || slug.includes('select-label')) {
    const selects = (code.match(/<select[^>]*>/gi) || []).length
    const labels = (lowerCode.match(/<label/g) || []).length
    if (selects > 0 && labels === 0) {
      return {
        hasIssue: true,
        issue: `Found ${selects} <select> element(s) without associated <label>`
      }
    }
  }

  // video-captions — videos require caption tracks
  if (slug.includes('video-caption') || slug.includes('captions')) {
    const videos = (code.match(/<video[^>]*>/gi) || []).length
    const captionTracks = (lowerCode.match(/<track[^>]*kind\s*=\s*["']captions["']/g) || []).length
    if (videos > 0 && captionTracks === 0) {
      return {
        hasIssue: true,
        issue: `Found ${videos} <video> element(s) without caption tracks — add <track kind="captions">`
      }
    }
  }

  // ===== HTML STRUCTURAL HEURISTICS =====

  // defer-async — scripts in <head> without async/defer block page rendering
  if (slug.includes('defer-async') || slug.includes('script-defer')) {
    const srcScripts = code.match(/<script[^>]*src\s*=[^>]*>/gi) || []
    const blocking = srcScripts.filter(s => !s.includes('async') && !s.includes('defer'))
    if (blocking.length > 0 && hasHeadTag(code)) {
      return {
        hasIssue: true,
        issue: `Found ${blocking.length} script(s) in <head> without async or defer (blocks parsing)`
      }
    }
  }

  // web-app-manifest — required for PWA installability
  if (slug.includes('web-app-manifest') || slug.includes('pwa-manifest')) {
    if (
      hasHeadTag(code) &&
      !lowerCode.includes('rel="manifest"') &&
      !lowerCode.includes("rel='manifest'")
    ) {
      return {
        hasIssue: true,
        issue:
          'Missing web app manifest link — add <link rel="manifest" href="/manifest.json"> for PWA support'
      }
    }
  }

  // input-types — <input> without type defaults to text, may not trigger correct mobile keyboard
  if (slug.includes('input-types') || slug.includes('input-type')) {
    const inputs = code.match(/<input[^>]*>/gi) || []
    const noType = inputs.filter(input => !input.includes('type=') && !input.includes('hidden'))
    if (noType.length > 0) {
      return {
        hasIssue: true,
        issue: `Found ${noType.length} <input> element(s) without explicit type attribute — specify type for correct mobile keyboard`
      }
    }
  }

  // viewport-zoom — user-scalable=no is an accessibility violation
  if (slug.includes('viewport-zoom') || slug.includes('user-scalable')) {
    if (lowerCode.includes('user-scalable=no') || lowerCode.includes('user-scalable=0')) {
      return {
        hasIssue: true,
        issue: 'Viewport has user-scalable=no — prevents users from zooming, violates WCAG 1.4.4'
      }
    }
  }

  // ===== CSS HEURISTICS =====

  // font-size in px — px font sizes don't respect user browser zoom preferences
  if (slug.includes('font-size') || slug.includes('font-px')) {
    const pxFontSizes = (code.match(/font-size\s*:\s*\d+px/gi) || []).length
    if (pxFontSizes > PX_FONT_SIZE_THRESHOLD) {
      return {
        hasIssue: true,
        issue: `Found ${pxFontSizes} font-size in px — use rem or em so text scales with user browser settings`
      }
    }
  }

  // specificity-management — excessive !important indicates specificity problems
  if (slug.includes('specificity-management') || slug.includes('important-usage')) {
    const importantCount = (code.match(/!important/gi) || []).length
    if (importantCount > IMPORTANT_THRESHOLD) {
      return {
        hasIssue: true,
        issue: `Found ${importantCount} !important declarations — excessive use indicates specificity problems in CSS architecture`
      }
    }
  }

  // responsive-units — absolute px for spacing/typography blocks user preferences
  if (slug.includes('responsive-units') || slug.includes('relative-units')) {
    const pxSpacing = (code.match(/(?:margin|padding|gap|line-height)\s*:\s*\d+px/gi) || []).length
    if (pxSpacing > PX_SPACING_THRESHOLD) {
      return {
        hasIssue: true,
        issue: `Found ${pxSpacing} spacing/layout value(s) in px — consider rem, em, or % for better scaling`
      }
    }
  }

  // webfont-format — woff2 is the most efficient format (30-50% smaller than woff)
  if (slug.includes('webfont-format') || slug.includes('font-format') || slug.includes('woff')) {
    const fontFaces = code.match(/@font-face\s*\{[^}]+\}/gi) || []
    if (fontFaces.length > 0 && !fontFaces.some(f => f.includes('woff2'))) {
      return {
        hasIssue: true,
        issue:
          'Found @font-face declarations without woff2 format — woff2 is 30-50% smaller than woff/ttf'
      }
    }
  }

  // reset-css — CSS without any reset leads to cross-browser inconsistencies
  if (slug.includes('reset-css') || slug.includes('css-reset')) {
    const hasSignificantCSS = (code.match(/\{[^}]+\}/g) || []).length > 5
    const hasUniversalSelector = /\*[\s{,]/.test(lowerCode)
    const hasReset =
      lowerCode.includes('normalize') ||
      lowerCode.includes('reset.css') ||
      (lowerCode.includes('box-sizing') && lowerCode.includes('border-box') && hasUniversalSelector)
    if (hasSignificantCSS && !hasReset && lowerCode.includes('body')) {
      return {
        hasIssue: true,
        issue:
          'No CSS reset or normalize detected — consider adding a reset for cross-browser consistency'
      }
    }
  }

  // ===== SECURITY HEURISTICS =====

  // leaked-secrets — API keys and credentials must never appear in code
  if (slug.includes('leaked-secrets') || slug.includes('exposed-secrets')) {
    const secretPatterns = [
      /api[_-]?key\s*[:=]\s*["'][a-z0-9_-]{16,}["']/i,
      /api[_-]?secret\s*[:=]\s*["'][a-z0-9_-]{16,}["']/i,
      /access[_-]?token\s*[:=]\s*["'][a-z0-9_-]{16,}["']/i,
      new RegExp(`sk_${'live'}_[a-z0-9]{20,}`, 'i'),
      /AIza[0-9A-Za-z_-]{35}/,
      /(?:password|passwd|pwd)\s*[:=]\s*["'][^"']{6,}["']/i
    ]
    for (const pattern of secretPatterns) {
      if (pattern.test(code)) {
        return {
          hasIssue: true,
          issue:
            'Potential secret or credential detected in source code — never commit API keys or passwords'
        }
      }
    }
  }

  // form-https — form submissions over HTTP expose user data
  if (slug.includes('form-https') || slug.includes('form-secure')) {
    const httpFormActions = (
      code.match(/<form[^>]*action\s*=\s*["']http:\/\/[^"']*["'][^>]*>/gi) || []
    ).length
    if (httpFormActions > 0) {
      return {
        hasIssue: true,
        issue: `Found ${httpFormActions} form(s) with HTTP action URL — use HTTPS for all form submissions`
      }
    }
  }

  // password-field-security — password fields should declare autocomplete intent
  if (slug.includes('password-field') || slug.includes('password-security')) {
    const passwordFields = code.match(/<input[^>]*type\s*=\s*["']password["'][^>]*>/gi) || []
    const noAutocomplete = passwordFields.filter(f => !f.includes('autocomplete='))
    if (noAutocomplete.length > 0) {
      return {
        hasIssue: true,
        issue: `Found ${noAutocomplete.length} password field(s) without autocomplete attribute — add autocomplete="current-password" or "new-password"`
      }
    }
  }

  // mixed-content — HTTP resources on HTTPS pages are blocked by browsers
  if (slug.includes('mixed-content')) {
    if (
      lowerCode.includes('https') &&
      code.match(/(?:src|href|action)\s*=\s*["']http:\/\/(?!localhost)[^"']+["']/gi)
    ) {
      return {
        hasIssue: true,
        issue: 'Mixed content detected — HTTPS page loading HTTP resources (browsers block this)'
      }
    }
  }

  // ===== PERFORMANCE HEURISTICS =====

  // font-loading — web fonts without font-display cause invisible text (FOIT)
  // Only fire when fonts are actually *loaded* (stylesheet or @font-face), not just preconnected
  if (slug.includes('font-loading') || slug.includes('font-display')) {
    const hasFontStylesheet =
      lowerCode.includes('@font-face') ||
      // fonts.googleapis.com as a stylesheet link (not just preconnect/dns-prefetch)
      /fonts\.googleapis\.com[^"']*['"][^>]*rel\s*=\s*["']stylesheet/.test(lowerCode) ||
      /rel\s*=\s*["']stylesheet[^"']*["'][^>]*fonts\.googleapis\.com/.test(lowerCode) ||
      (lowerCode.includes('fonts.bunny.net') && lowerCode.includes('stylesheet'))
    if (hasFontStylesheet && !lowerCode.includes('font-display')) {
      return {
        hasIssue: true,
        issue:
          'Web fonts loaded without font-display — add font-display: swap to prevent invisible text while fonts load (FOIT)'
      }
    }
  }

  // render-blocking — scripts in <head> without async/defer delay first paint
  if (slug.includes('render-blocking') || slug.includes('blocking-resource')) {
    const srcScripts = code.match(/<script[^>]*src\s*=[^>]*>/gi) || []
    const blocking = srcScripts.filter(
      s => !s.includes('async') && !s.includes('defer') && !s.includes('type="module"')
    )
    if (blocking.length > 0 && hasHeadTag(code)) {
      return {
        hasIssue: true,
        issue: `Found ${blocking.length} potentially render-blocking script(s) in <head> — add defer or async`
      }
    }
  }

  // ===== FIFTH PASS HEURISTICS =====

  // image-compression — large inline base64 images bloat HTML/CSS and bypass CDN caching
  if (slug.includes('image-compression') || slug.includes('compress-image')) {
    const base64Images = (code.match(/data:image\/[a-z]+;base64,[a-z0-9+/=]{500,}/gi) || []).length
    if (base64Images > 0) {
      return {
        hasIssue: true,
        issue: `Found ${base64Images} large inline base64 image(s) — prefer external optimized image files to reduce page weight`
      }
    }
  }

  // reduced-motion — CSS animations without prefers-reduced-motion cause problems for users with vestibular disorders
  if (slug.includes('reduced-motion') || slug.includes('prefers-reduced-motion')) {
    const hasAnimations =
      lowerCode.includes('@keyframes') ||
      lowerCode.includes('animation:') ||
      (lowerCode.includes('animation-name') && lowerCode.includes('animation-duration'))
    if (hasAnimations && !lowerCode.includes('prefers-reduced-motion')) {
      return {
        hasIssue: true,
        issue:
          'CSS animations found without @media (prefers-reduced-motion) — wrap animations in a motion preference query'
      }
    }
  }

  // use-strict — "use strict" catches silent errors; ES modules are implicitly strict
  if (slug.includes('use-strict')) {
    const hasJsCode = code.match(/\bfunction[\s(]/) || code.match(/\)\s*=>/)
    const isStrict =
      lowerCode.includes("'use strict'") ||
      lowerCode.includes('"use strict"') ||
      lowerCode.includes('type="module"') ||
      lowerCode.includes("type='module'")
    if (hasJsCode && !isStrict) {
      return {
        hasIssue: true,
        issue:
          'JavaScript without "use strict" — add "use strict" or use ES modules (type="module") to catch silent errors'
      }
    }
  }

  // debounce-throttle — scroll/resize/mousemove listeners without rate limiting cause jank
  if (
    slug.includes('debounce-throttle') ||
    slug.includes('debounce') ||
    slug.includes('throttle')
  ) {
    const frequentEvents = (
      code.match(
        /addEventListener\s*\(\s*["'](scroll|resize|mousemove|touchmove|pointermove)["']/gi
      ) || []
    ).length
    const hasRateLimiting =
      lowerCode.includes('debounce') ||
      lowerCode.includes('throttle') ||
      lowerCode.includes('requestanimationframe') ||
      lowerCode.includes('settimeout')
    if (frequentEvents > 0 && !hasRateLimiting) {
      return {
        hasIssue: true,
        issue: `Found ${frequentEvents} high-frequency event listener(s) without debounce/throttle — rate-limit scroll/resize handlers to avoid jank`
      }
    }
  }

  // memory-leaks — setInterval without clearInterval leaks memory when the component unmounts
  if (slug.includes('memory-leaks') || slug.includes('memory-leak')) {
    const intervals = (code.match(/\bsetInterval\s*\(/g) || []).length
    const clears = (code.match(/\bclearInterval\s*\(/g) || []).length
    if (intervals > 0 && clears === 0) {
      return {
        hasIssue: true,
        issue: `Found ${intervals} setInterval() without clearInterval() — always clear intervals to prevent memory leaks`
      }
    }
  }

  // js-redirects — client-side redirects add round-trip latency and hurt SEO
  if (slug.includes('js-redirects') || slug.includes('js-redirect')) {
    const redirects = (
      code.match(/window\.location\s*(?:\.href\s*=|\.replace\s*\(|\.assign\s*\()/gi) || []
    ).length
    if (redirects > 0) {
      return {
        hasIssue: true,
        issue: `Found ${redirects} JavaScript redirect(s) — prefer server-side 301/302 redirects for performance and SEO`
      }
    }
  }

  // gtm-present — GTM without async blocks the main thread during tag loading
  if (slug.includes('gtm-present') || slug.includes('google-tag-manager')) {
    const gtmScripts = code.match(/googletagmanager\.com[^>]*>/gi) || []
    if (gtmScripts.length > 0 && !gtmScripts.some(s => s.includes('async'))) {
      return {
        hasIssue: true,
        issue:
          'Google Tag Manager script found without async — GTM must load asynchronously to avoid blocking rendering'
      }
    }
  }

  // referrer-policy — without a policy, full URLs leak to third parties via Referer header
  if (slug.includes('referrer-policy')) {
    if (
      hasHeadTag(code) &&
      !lowerCode.includes('referrer') &&
      !lowerCode.includes('referrerpolicy')
    ) {
      return {
        hasIssue: true,
        issue:
          'Missing Referrer-Policy — add <meta name="referrer" content="strict-origin-when-cross-origin"> to control referrer leakage'
      }
    }
  }

  // meta-in-body — <meta> tags after </head> are ignored by browsers and parsers
  if (slug.includes('meta-in-body')) {
    const headClose = code.indexOf('</head>')
    if (headClose > -1) {
      const afterHead = code.substring(headClose)
      if (/<meta[^>]*>/i.test(afterHead)) {
        return {
          hasIssue: true,
          issue:
            'Found <meta> tag(s) after </head> — meta tags must be inside <head> to be processed correctly'
        }
      }
    }
  }

  // ===== SIXTH PASS: new heuristics =====

  // h1 / landmark-one-main / landmark-regions — slug aliases for existing checks
  if (slug === 'h1') {
    const h1Count = (lowerCode.match(/<h1/g) || []).length
    if (lowerCode.includes('<body') && h1Count === 0) {
      return {
        hasIssue: true,
        issue: 'Page has no <h1> element — every page needs exactly one main heading'
      }
    }
    if (h1Count > 1) {
      return {
        hasIssue: true,
        issue: `Found ${h1Count} <h1> elements — a page should have exactly one <h1>`
      }
    }
  }

  if (slug === 'landmark-one-main' || slug === 'landmark-regions') {
    if (lowerCode.includes('<body') && !lowerCode.includes('<main')) {
      return {
        hasIssue: true,
        issue:
          'No <main> landmark element found — add <main> to identify the primary content region'
      }
    }
  }

  // title-unique / title-unique — multiple <title> tags
  if (slug.includes('title-unique') || slug.includes('title-unique')) {
    const titleCount = (lowerCode.match(/<title[^>]*>/g) || []).length
    if (titleCount > 1) {
      return {
        hasIssue: true,
        issue: `Found ${titleCount} <title> elements — a page must have exactly one <title>`
      }
    }
  }

  // duplicate-description — multiple meta name="description" tags
  if (slug.includes('duplicate-description')) {
    const descCount = (lowerCode.match(/<meta[^>]*name\s*=\s*["']description["'][^>]*>/gi) || [])
      .length
    if (descCount > 1) {
      return {
        hasIssue: true,
        issue: `Found ${descCount} meta description tags — a page must have exactly one meta description`
      }
    }
  }

  // figure-figcaption — <figure> without <figcaption> loses context for screen reader users
  if (slug.includes('figure-figcaption') || slug.includes('figcaption')) {
    if (lowerCode.includes('<figure') && !lowerCode.includes('<figcaption')) {
      return {
        hasIssue: true,
        issue:
          '<figure> element found without <figcaption> — add a caption to provide context for all users'
      }
    }
  }

  // aria-hidden-body — aria-hidden="true" on <body> hides entire page from screen readers
  if (slug.includes('aria-hidden-body')) {
    if (/<body[^>]*aria-hidden\s*=\s*["']true["'][^>]*>/i.test(code)) {
      return {
        hasIssue: true,
        issue: 'Found aria-hidden="true" on <body> — this hides the entire page from screen readers'
      }
    }
  }

  // aria-roles — verify role attributes use valid ARIA role values
  if (slug.includes('aria-roles')) {
    const VALID_ROLES = new Set([
      'alert',
      'alertdialog',
      'application',
      'article',
      'banner',
      'button',
      'cell',
      'checkbox',
      'columnheader',
      'combobox',
      'complementary',
      'contentinfo',
      'definition',
      'dialog',
      'directory',
      'document',
      'feed',
      'figure',
      'form',
      'grid',
      'gridcell',
      'group',
      'heading',
      'img',
      'link',
      'list',
      'listbox',
      'listitem',
      'log',
      'main',
      'marquee',
      'math',
      'menu',
      'menubar',
      'menuitem',
      'menuitemcheckbox',
      'menuitemradio',
      'navigation',
      'none',
      'note',
      'option',
      'presentation',
      'progressbar',
      'radio',
      'radiogroup',
      'region',
      'row',
      'rowgroup',
      'rowheader',
      'scrollbar',
      'search',
      'searchbox',
      'separator',
      'slider',
      'spinbutton',
      'status',
      'switch',
      'tab',
      'table',
      'tablist',
      'tabpanel',
      'term',
      'textbox',
      'timer',
      'toolbar',
      'tooltip',
      'tree',
      'treegrid',
      'treeitem'
    ])
    const roleAttrs = [...code.matchAll(/\brole\s*=\s*["']([^"']+)["']/gi)].map(m =>
      m[1].toLowerCase().trim()
    )
    const invalidRoles = roleAttrs.filter(r => !VALID_ROLES.has(r))
    if (invalidRoles.length > 0) {
      return {
        hasIssue: true,
        issue: `Invalid ARIA role value(s): ${invalidRoles.slice(0, 3).join(', ')} — use valid WAI-ARIA roles`
      }
    }
  }

  // aria-labels — elements with role=img must have an accessible name
  if (slug.includes('aria-labels')) {
    const roleImgElements = code.match(/<[^>]*role\s*=\s*["']img["'][^>]*>/gi) || []
    const unlabelled = roleImgElements.filter(
      el => !el.includes('aria-label') && !el.includes('aria-labelledby') && !el.includes('title')
    )
    if (unlabelled.length > 0) {
      return {
        hasIssue: true,
        issue: `Found ${unlabelled.length} element(s) with role="img" missing an accessible name (aria-label or aria-labelledby)`
      }
    }
  }

  // modal-accessibility — dialog elements must have aria-modal and accessible name
  if (slug.includes('modal-accessibility')) {
    const dialogs = code.match(/<(?:dialog|[^>]*role\s*=\s*["']dialog["'])[^>]*>/gi) || []
    const badDialogs = dialogs.filter(
      d => !d.includes('aria-labelledby') && !d.includes('aria-label')
    )
    if (badDialogs.length > 0) {
      return {
        hasIssue: true,
        issue: `Found ${badDialogs.length} dialog/modal element(s) without an accessible name — add aria-labelledby or aria-label`
      }
    }
  }

  // animation-performance — animating expensive CSS properties (box-shadow, filter, clip-path)
  if (slug.includes('animation-performance')) {
    const EXPENSIVE = [
      'box-shadow',
      'filter',
      'clip-path',
      'border-radius',
      'background-color',
      'background'
    ]
    const hasExpensiveAnimation = EXPENSIVE.some(
      prop =>
        new RegExp(`@keyframes[\\s\\S]*?${prop}\\s*:`, 'i').test(code) ||
        (lowerCode.includes(`animation`) &&
          lowerCode.includes(prop) &&
          !lowerCode.includes('transform') &&
          !lowerCode.includes('opacity'))
    )
    if (hasExpensiveAnimation && !lowerCode.includes('will-change')) {
      return {
        hasIssue: true,
        issue:
          'Animating expensive CSS properties (box-shadow/filter/clip-path) — prefer animating transform and opacity for GPU-composited animations'
      }
    }
  }

  // css-containment — layout-heavy components benefit from CSS contain
  if (slug.includes('css-containment')) {
    const hasComponentPatterns =
      (lowerCode.match(/\.(card|widget|panel|modal|sidebar|grid-item|tile)[^{]*\{/g) || [])
        .length >= 2
    if (
      hasComponentPatterns &&
      !lowerCode.includes('contain:') &&
      !lowerCode.includes('contain :')
    ) {
      return {
        hasIssue: true,
        issue:
          'Component patterns found without CSS containment — add contain: layout style to isolate reflow of cards/widgets'
      }
    }
  }

  // css-non-blocking — <link rel="stylesheet"> without media or async loading pattern blocks first paint
  if (slug.includes('css-non-blocking')) {
    const cssLinks = code.match(/<link[^>]*rel\s*=\s*["']stylesheet["'][^>]*>/gi) || []
    const blocking = cssLinks.filter(
      l => !l.includes('media=') && !l.includes('onload=') && !l.includes('preload')
    )
    // Only flag if there are multiple CSS files (one stylesheet is acceptable)
    if (blocking.length > 1 && hasHeadTag(code)) {
      return {
        hasIssue: true,
        issue: `Found ${blocking.length} render-blocking stylesheet(s) — load non-critical CSS with media or async patterns`
      }
    }
  }

  // hreflang — pages with multiple language hints but no alternate hreflang links
  if (slug.includes('hreflang')) {
    const hasHtmlLang = /<html[^>]*\blang\s*=/i.test(code)
    const hasAlternate = lowerCode.includes('hreflang') || lowerCode.includes('alternate')
    const hasMultiLangLinks =
      (
        code.match(
          /href\s*=\s*["'][^"']*\/(?:en|fr|de|es|pt|ja|zh|ar|ko|it|nl|ru|pl|sv)[/\-_]["']/gi
        ) || []
      ).length >= 2
    if (hasHtmlLang && hasMultiLangLinks && !hasAlternate) {
      return {
        hasIssue: true,
        issue:
          'Multi-language link patterns found without hreflang attributes — add <link rel="alternate" hreflang="..."> for each language'
      }
    }
  }

  // picture-element — large imgs without <picture> for art direction or format negotiation
  if (slug.includes('picture-element')) {
    const imgCount = (
      lowerCode.match(
        /<img(?![^>]*loading="lazy")[^>]*\bwidth\s*=\s*["']?[5-9]\d{2,}|[1-9]\d{3,}["']?/gi
      ) || []
    ).length
    const pictureCount = (lowerCode.match(/<picture/g) || []).length
    if (imgCount > 0 && pictureCount === 0 && lowerCode.includes('<html')) {
      return {
        hasIssue: true,
        issue:
          'Large images served without <picture> element — use <picture> with multiple sources for format negotiation and art direction'
      }
    }
  }

  // redirect-chains — multiple consecutive JS redirects or meta refresh
  if (slug.includes('redirect-chains')) {
    const metaRefreshCount = (
      lowerCode.match(/<meta[^>]*http-equiv\s*=\s*["']refresh["'][^>]*>/gi) || []
    ).length
    if (metaRefreshCount > 0) {
      return {
        hasIssue: true,
        issue:
          'Found meta refresh redirect — use server-side 301/302 redirects instead to avoid redirect chains and improve SEO'
      }
    }
  }

  // robots-meta-conflict — noindex + follow is a known conflict pattern
  if (slug.includes('robots-meta-conflict') || slug.includes('schema-noindex-conflict')) {
    const robotsMeta =
      code.match(
        /<meta[^>]*name\s*=\s*["']robots["'][^>]*content\s*=\s*["']([^"']*)["'][^>]*>/gi
      ) || []
    for (const tag of robotsMeta) {
      if (tag.includes('noindex') && tag.includes('follow')) {
        return {
          hasIssue: true,
          issue:
            'Meta robots has "noindex, follow" — verify this is intentional; noindex prevents indexing while follow allows link crawling'
        }
      }
    }
  }

  // touch-targets — interactive elements with very small fixed pixel sizes
  if (slug.includes('touch-targets')) {
    const SMALL_TARGET =
      /(?:button|a|input|select|\.btn|\.link|\.icon-btn)[^{]*\{[^}]*(?:width|height)\s*:\s*([1-3]\d|[1-9])\s*px/gi
    const smallTargets = (code.match(SMALL_TARGET) || []).length
    if (smallTargets > 0) {
      return {
        hasIssue: true,
        issue: `Found ${smallTargets} interactive element(s) with touch targets smaller than 44px — minimum recommended size is 44×44px`
      }
    }
  }

  // trailing-slash — internal links mixing trailing-slash and non-trailing-slash URLs
  if (slug.includes('trailing-slash')) {
    const internalLinks = code.match(/href\s*=\s*["']\/[^"'?#]*["']/gi) || []
    const withSlash = internalLinks.filter(l => l.match(/\/["']/)).length
    const withoutSlash = internalLinks.filter(l => !l.match(/\/["']/) && l.match(/[^/]["']/)).length
    if (internalLinks.length >= 4 && withSlash > 0 && withoutSlash > 0) {
      return {
        hasIssue: true,
        issue:
          'Inconsistent trailing slashes on internal links — standardize to always use or always omit trailing slash'
      }
    }
  }

  // avif-format / webp-format — img without modern format source
  if (slug.includes('avif-format') || slug.includes('webp-format')) {
    const formatType = slug.includes('avif') ? 'avif' : 'webp'
    if (lowerCode.includes('<picture') && !lowerCode.includes(formatType)) {
      return {
        hasIssue: true,
        issue: `<picture> element found without ${formatType.toUpperCase()} source — add a <source type="image/${formatType}"> for better compression`
      }
    }
  }

  // subresource-integrity — external scripts/stylesheets should have integrity= attribute
  // Excludes preconnect/dns-prefetch hints which don't load resources
  if (slug.includes('subresource-integrity') || slug === 'sri-integrity') {
    const externalResources = (code.match(/<(?:script|link)[^>]*https?:\/\/[^>]*>/gi) || []).filter(
      tag => {
        const lTag = tag.toLowerCase()
        // Exclude hint-only links (preconnect, dns-prefetch, canonical-url, alternate, etc.)
        if (
          lTag.includes('rel=') &&
          !lTag.includes('stylesheet') &&
          !lTag.includes('preload') &&
          !lTag.includes('modulepreload')
        ) {
          // It's a <link> with no resource-loading rel — skip it
          if (!lTag.includes('<script')) return false
        }
        return true
      }
    )
    const missingIntegrity = externalResources.filter(s => !s.includes('integrity='))
    if (missingIntegrity.length > 0) {
      return {
        hasIssue: true,
        issue: `Found ${missingIntegrity.length} external resource(s) without integrity= attribute — add SRI hashes to prevent supply chain attacks`
      }
    }
  }

  // canonical-url / canonical-chain / canonical-header — canonical link checks
  if (
    slug.includes('canonical-url') ||
    slug.includes('canonical-chain') ||
    slug.includes('canonical-header')
  ) {
    if (
      hasHeadTag(code) &&
      !lowerCode.includes('rel="canonical"') &&
      !lowerCode.includes("rel='canonical'")
    ) {
      return {
        hasIssue: true,
        issue:
          'Missing canonical link — add <link rel="canonical" href="..."> to prevent duplicate content issues'
      }
    }
  }

  // dark-mode-css / dark-mode-support — pages with color values but no dark mode query
  if (
    slug.includes('dark-mode-css') ||
    slug.includes('dark-mode-support') ||
    slug.includes('dark-mode')
  ) {
    const colorCount = (code.match(/#[0-9a-f]{3,6}\b|rgb\s*\(|hsl\s*\(/gi) || []).length
    const hasDarkMode =
      lowerCode.includes('prefers-color-scheme') ||
      lowerCode.includes('data-theme') ||
      lowerCode.includes('[data-dark')
    if (colorCount > 3 && !hasDarkMode) {
      return {
        hasIssue: true,
        issue:
          'CSS with color values but no dark mode support — add @media (prefers-color-scheme: dark) for accessibility'
      }
    }
  }

  return { hasIssue: false }
}

/**
 * Structural HTML checks using node-html-parser AST.
 * Only runs on full HTML documents (detected by presence of `<html` or `<body`).
 * Returns a map of rule slug → issue message for any structural violations found.
 */
function checkStructural(code: string): Map<string, string> {
  const issues = new Map<string, string>()
  const fullDocument = isFullHtmlDocument(code)
  const componentSource = isLikelyComponentSource(code)

  // Only parse markup-bearing snippets to avoid overhead on pure CSS/JS.
  if (!hasHtmlLikeMarkup(code)) {
    return issues
  }

  const root = parseHtml(code, {
    comment: false,
    blockTextElements: { script: false, style: false }
  })

  // ── form-labels: every <input>/<select>/<textarea> must have a matching <label for="id">
  const labelledBy = new Set<string>()
  for (const label of root.querySelectorAll('label')) {
    const forVal =
      label.getAttribute('for') ?? label.getAttribute('htmlFor') ?? label.getAttribute('htmlfor')
    if (forVal) labelledBy.add(forVal.toLowerCase())
  }

  function isWrappedByLabel(node: typeof root): boolean {
    let current = node.parentNode
    while (current && 'rawTagName' in current) {
      if (current.rawTagName?.toLowerCase() === 'label') return true
      current = current.parentNode
    }
    return false
  }

  const unlabelled: string[] = []
  const controls = root.querySelectorAll(
    'input:not([type="hidden"]):not([type="submit"]):not([type="button"]):not([type="reset"]):not([type="image"]), select, textarea'
  )
  const hasFormTag = root.querySelector('form') !== null
  const labelCount = root.querySelectorAll('label').length
  const isLikelyFormControlPrimitive =
    componentSource && controls.length === 1 && labelCount === 0 && !hasFormTag

  for (const input of controls) {
    const id = input.getAttribute('id')
    const ariaLabel = input.getAttribute('aria-label')
    const ariaLabelledby = input.getAttribute('aria-labelledby')
    const wrappedByLabel = isWrappedByLabel(input)
    if (
      !ariaLabel &&
      !ariaLabelledby &&
      !wrappedByLabel &&
      (!id || !labelledBy.has(id.toLowerCase()))
    ) {
      unlabelled.push(formatFormControlForIssue(input.rawTagName, input.getAttribute('type') ?? ''))
    }
  }
  if (unlabelled.length > 0 && !isLikelyFormControlPrimitive) {
    issues.set(
      'form-labels',
      `${unlabelled.length} form control(s) missing associated <label>: ${unlabelled.slice(0, 3).join(', ')}`
    )
    issues.set('form-label', issues.get('form-labels')!)
    issues.set('input-label', issues.get('form-labels')!)
  }

  // ── heading-order: headings must not skip levels (e.g. h1 → h3 without h2)
  if (!componentSource || fullDocument) {
    const headings = root.querySelectorAll('h1,h2,h3,h4,h5,h6')
    const headingLevels = headings.map(h => parseInt(h.rawTagName[1], 10))
    const hasH1 = headingLevels.includes(1)

    if (fullDocument || hasH1) {
      for (let i = 1; i < headingLevels.length; i++) {
        const prev = headingLevels[i - 1]
        const curr = headingLevels[i]
        if (curr > prev + 1) {
          issues.set(
            'heading-order',
            `Heading level skipped: h${prev} followed by h${curr} — headings must not skip levels`
          )
          issues.set('heading-hierarchy', issues.get('heading-order')!)
          break
        }
      }
    }
  }

  // ── title-placement: <title> must be inside <head>, not <body>
  const bodyEl = root.querySelector('body')
  if (bodyEl) {
    const titleInBody = bodyEl.querySelector('title')
    if (titleInBody) {
      issues.set(
        'title-tag',
        '<title> element found inside <body> — it must be inside <head> to be recognized by browsers and search engines'
      )
    }
  }

  // ── alt distinction: images with explicitly empty alt="" vs missing alt (different semantics)
  // Missing alt is a real issue; empty alt is correct for decorative images
  const imgsWithoutAlt = root.querySelectorAll('img:not([alt])').filter(img => {
    // Exclude images inside <picture> that are purely fallback
    const parent = img.parentNode
    return parent?.rawTagName?.toLowerCase() !== 'picture'
  })
  if (imgsWithoutAlt.length > 0) {
    const srcs = imgsWithoutAlt
      .slice(0, 3)
      .map(img => img.getAttribute('src') ?? '(no src)')
      .join(', ')
    issues.set(
      'alt-tags',
      `${imgsWithoutAlt.length} <img> element(s) missing alt attribute: ${srcs}`
    )
    issues.set('alt-text', issues.get('alt-tags')!)
  }

  // ── list-structure/listitem: <li> must be direct child of <ul> or <ol>
  for (const li of root.querySelectorAll('li')) {
    const parent = li.parentNode
    const parentTag = parent?.rawTagName?.toLowerCase()
    if (parentTag && parentTag !== 'ul' && parentTag !== 'ol' && parentTag !== 'menu') {
      issues.set(
        'listitem',
        '<li> element found outside <ul>, <ol>, or <menu> — list items must be direct children of a list container'
      )
      break
    }
  }

  // ── list-structure: <ul>/<ol> direct children should be <li> (not bare text or other elements)
  for (const list of root.querySelectorAll('ul, ol')) {
    const badChildren = list.childNodes.filter(n => {
      if (n.nodeType === 3 /* TEXT_NODE */) return (n.rawText ?? '').trim().length > 0
      const tag = (n as typeof list).rawTagName?.toLowerCase()
      return tag && tag !== 'li' && tag !== 'script' && tag !== 'template'
    })
    if (badChildren.length > 0) {
      issues.set(
        'list-structure',
        'List element contains direct children that are not <li> — only <li> elements should be direct children of <ul>/<ol>'
      )
      break
    }
  }

  // ── form-field-multiple-labels: each input should have at most one visible label
  const inputLabelCount = new Map<string, number>()
  for (const label of root.querySelectorAll('label[for]')) {
    const forVal = (label.getAttribute('for') ?? '').toLowerCase()
    inputLabelCount.set(forVal, (inputLabelCount.get(forVal) ?? 0) + 1)
  }
  const multiLabelled = [...inputLabelCount.entries()].filter(([, count]) => count > 1)
  if (multiLabelled.length > 0) {
    const ids = multiLabelled
      .map(([id]) => id)
      .slice(0, 3)
      .join(', ')
    issues.set(
      'form-field-multiple-labels',
      `Form control(s) have multiple labels: ${ids} — each control should have exactly one label`
    )
  }

  // ── duplicate IDs: same id value used on multiple elements
  const idCounts = new Map<string, number>()
  for (const el of root.querySelectorAll('[id]')) {
    const id = (el.getAttribute('id') ?? '').toLowerCase()
    if (!id || id.includes('{') || id.includes('}')) continue
    idCounts.set(id, (idCounts.get(id) ?? 0) + 1)
  }
  const dupeIds = [...idCounts.entries()].filter(([, count]) => count > 1).map(([id]) => id)
  if (dupeIds.length > 0) {
    issues.set('unique-id', `Duplicate ID values found: ${dupeIds.slice(0, 3).join(', ')}`)
  }

  return issues
}

/**
 * Execute review_code tool
 */
export function executeReviewCode(input: ReviewCodeInput, rules: Rule[]): ReviewCodeResult {
  const { code, focus, minPriority = 'medium' } = input

  // Determine which categories to check
  const categoriesToCheck = focus && focus.length > 0 ? focus : detectCategories(code)

  // Filter rules by category and minimum priority
  const minPriorityValue = PRIORITY_ORDER[minPriority]
  const relevantRules = rules.filter(rule => {
    // Check category match
    const categoryMatch = rule.categories.some(cat => categoriesToCheck.includes(cat))
    // Check priority
    const priorityMatch = PRIORITY_ORDER[rule.priority] <= minPriorityValue
    return categoryMatch && priorityMatch
  })

  const issues: ReviewIssue[] = []

  // Run structural AST checks once (only for HTML documents, fast no-op for CSS/JS)
  const structuralIssues = checkStructural(code)

  // Check each relevant rule — regex heuristics first, then structural override if available
  for (const rule of relevantRules) {
    // Prefer the more accurate AST-based result when available
    const structuralIssue = structuralIssues.get(rule.slug)
    if (structuralIssue !== undefined) {
      if (shouldSuppressIssueForSourceContext(code, rule.slug)) {
        continue
      }

      issues.push({
        rule: rule.slug,
        title: rule.title,
        priority: rule.priority,
        issue: structuralIssue,
        fixPrompt: rule.prompts?.fix
      })
      continue
    }

    const result = checkRule(code, rule)
    if (result.hasIssue && result.issue) {
      if (shouldSuppressIssueForSourceContext(code, rule.slug)) {
        continue
      }

      issues.push({
        rule: rule.slug,
        title: rule.title,
        priority: rule.priority,
        issue: result.issue,
        fixPrompt: rule.prompts?.fix
      })
    }
  }

  // Sort issues by priority
  issues.sort((a, b) => PRIORITY_ORDER[a.priority] - PRIORITY_ORDER[b.priority])

  const suggestions = buildReviewSuggestions(code, categoriesToCheck, issues)

  return {
    summary: {
      totalChecks: relevantRules.length,
      issuesFound: issues.length,
      criticalIssues: issues.filter(i => i.priority === 'critical').length,
      highIssues: issues.filter(i => i.priority === 'high').length,
      categories: categoriesToCheck
    },
    issues,
    suggestions
  }
}
