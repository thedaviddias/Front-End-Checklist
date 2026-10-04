/**
 * Generates agent skills from rule MDX frontmatter.
 *
 * Each rule becomes a skills/{category}/{slug}/ directory with:
 *   SKILL.md          — name, description, prompts as instructions
 *   references/rule.md — full MDX body converted to plain markdown
 *
 * Usage:
 *   pnpm generate:skills              # all rules
 *   pnpm generate:skills path/to/rule.mdx ...  # specific files (used by lefthook)
 *
 * Skills are installable via:
 *   npx skills add frontendchecklist/skills
 *   npx skills add frontendchecklist/skills --skill {slug}
 */

import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'

const RULES_DIR = path.join(process.cwd(), 'packages/content/rules/en')
const OUTPUT_DIR = path.join(process.cwd(), 'skills')
const PLUGIN_SKILLS_DIR = path.join(process.cwd(), 'plugins/front-end-checklist/skills')
const SITE_URL = 'https://frontendchecklist.io'

interface RuleFrontmatter {
  title: string
  slug?: string
  description?: string
  aiContext?: string
  categories?: string[]
  priority?: 'critical' | 'high' | 'medium' | 'low'
  difficulty?: 'beginner' | 'intermediate' | 'advanced' | 'expert'
  estimatedTime?: number
  whyItMatters?: string
  tldr?: string[]
  prompts?: {
    check?: string
    fix?: string
    explain?: string
    codeReview?: string
  }
}

interface GlobalRuleStat {
  category: string
  total: number
  critical: number
  high: number
}

interface RuleHighlight {
  title: string
  slug: string
  tldr: string[]
}

interface SafePattern {
  title: string
  example: string
  guidance: string
}

/**
 * Strip MDX-specific syntax from content, leaving plain markdown.
 * Preserves code blocks, headings, lists, tables, and inline formatting.
 */
function stripMdxToMarkdown(content: string): string {
  return (
    content
      // Remove import/export statements
      .replace(/^(import|export)\s+.*$/gm, '')
      // Remove JSX self-closing tags: <Component prop="val" />
      .replace(/<[A-Z][a-zA-Z]*[^>]*\/>/g, '')
      // Unwrap JSX block components: keep inner content, remove tags
      .replace(/<([A-Z][a-zA-Z]*)[^>]*>([\s\S]*?)<\/\1>/g, '$2')
      // Remove any remaining JSX open/close tags
      .replace(/<[A-Z][a-zA-Z]*[^/]*>/g, '')
      .replace(/<\/[A-Z][a-zA-Z]*>/g, '')
      // Clean up excessive blank lines
      .replace(/\n{3,}/g, '\n\n')
      .trim()
  )
}

/**
 * Build the SKILL.md content for a rule.
 */
function buildSkillMd(slug: string, category: string, fm: RuleFrontmatter): string {
  // skill-check requires description to start with "Use when" for agent intent matching
  const rawDescription =
    fm.aiContext || fm.description || `checking ${fm.title} in frontend projects.`

  let description = rawDescription.trimStart().toLowerCase().startsWith('use when')
    ? rawDescription
    : `Use when ${rawDescription.charAt(0).toLowerCase()}${rawDescription.slice(1)}`

  // skill-check recommends minimum 50 chars for descriptions
  if (description.length < 50) {
    description = `${description.replace(/\.$/, '')} — ${fm.title} (${category}).`
  }

  const url = `${SITE_URL}/rules/${category}/${slug}`

  const lines: string[] = [
    '---',
    `name: ${slug}`,
    `description: "${description.replace(/"/g, "'")}"`,
    'metadata:',
    `  category: ${category}`,
    `  priority: ${fm.priority || 'medium'}`,
    `  difficulty: ${fm.difficulty || 'intermediate'}`,
    `  estimatedTime: "${fm.estimatedTime || 15}"`,
    '  source: frontendchecklist.io',
    `  url: ${url}`,
    '---',
    '',
    `# ${fm.title}`,
    ''
  ]

  if (fm.whyItMatters) {
    lines.push(fm.whyItMatters, '')
  }

  if (fm.tldr && fm.tldr.length > 0) {
    lines.push('## Quick Reference', '')
    for (const item of fm.tldr) {
      lines.push(`- ${item}`)
    }
    lines.push('')
  }

  if (fm.prompts?.check) {
    lines.push('## Check', '', fm.prompts.check, '')
  }

  if (fm.prompts?.fix) {
    lines.push('## Fix', '', fm.prompts.fix, '')
  }

  if (fm.prompts?.explain) {
    lines.push('## Explain', '', fm.prompts.explain, '')
  }

  if (fm.prompts?.codeReview) {
    lines.push('## Code Review', '', fm.prompts.codeReview, '')
  }

  lines.push(
    '---',
    '',
    'For full implementation details, code examples, and framework-specific guidance,',
    'see `references/rule.md`.',
    '',
    `Rule page: ${url}`,
    '' // trailing newline required by skill-check
  )

  return lines.join('\n')
}

/**
 * Build the references/rule.md content — the full rule body as plain markdown.
 */
function buildReferencesMd(fm: RuleFrontmatter, body: string): string {
  const meta = [
    `**Priority:** ${fm.priority || 'medium'}`,
    `**Difficulty:** ${fm.difficulty || 'intermediate'}`,
    `**Time:** ${fm.estimatedTime || 15} min`
  ].join(' · ')

  const header = [
    `# ${fm.title}`,
    '',
    fm.description ? `> ${fm.description}` : '',
    '',
    meta,
    '',
    '---',
    ''
  ]
    .filter(l => l !== undefined)
    .join('\n')

  return header + stripMdxToMarkdown(body)
}

function loadRuleHighlight(category: string, slug: string): RuleHighlight | null {
  const filePath = path.join(RULES_DIR, category, `${slug}.mdx`)
  if (!existsSync(filePath)) return null

  const raw = readFileSync(filePath, 'utf-8').replace(/\0/g, '')
  try {
    const { data } = matter(raw)
    const fm = data as RuleFrontmatter
    return {
      title: fm.title,
      slug,
      tldr: Array.isArray(fm.tldr) ? fm.tldr.slice(0, 5) : []
    }
  } catch {
    return null
  }
}

function loadGlobalRuleHighlights(): RuleHighlight[] {
  return [
    loadRuleHighlight('images', 'dimensions'),
    loadRuleHighlight('accessibility', 'decorative-elements'),
    loadRuleHighlight('css', 'animation-performance'),
    loadRuleHighlight('accessibility', 'reduced-motion'),
    loadRuleHighlight('accessibility', 'accessible-tables'),
    loadRuleHighlight('accessibility', 'table-headers'),
    loadRuleHighlight('javascript', 'dom-performance'),
    loadRuleHighlight('html', 'form-validation'),
    loadRuleHighlight('security', 'password-field-security'),
    loadRuleHighlight('css', 'focus-styles')
  ].filter((value): value is RuleHighlight => value !== null)
}

function loadSafePatterns(): SafePattern[] {
  return [
    {
      title: 'Decorative Divider',
      example: '<img src="/divider.svg" alt="" aria-hidden="true">',
      guidance:
        'Treat this as a safe decorative pattern by default. Do not flag alt text or missing dimensions unless the snippet also shows a real layout-shift risk.'
    },
    {
      title: 'Client-Handled React Form',
      example:
        '<form onSubmit={event => event.preventDefault()}><label htmlFor="q">Search</label><input id="q" type="search" /></form>',
      guidance:
        'Do not require `method` or `action` when client-side submit handling is explicit and the form controls are otherwise accessible.'
    },
    {
      title: 'Next Metadata API',
      example:
        "export async function generateMetadata() { return { title: 'Docs', description: 'Reference' } }",
      guidance:
        'Do not infer missing canonical-url, meta description, or Open Graph tags just because literal `<head>` markup is absent from the component file.'
    },
    {
      title: 'Preview Card Images',
      example:
        '<img src={resource.image} alt="" className="object-cover" /><img src={favicon} alt="" width={20} height={20} />',
      guidance:
        'In link-preview or resource-card UIs, decorative preview/favicons can legitimately use empty alt when adjacent text already provides the destination name. Do not invent responsive-image or layout-shift defects for tiny favicon assets without stronger evidence.'
    },
    {
      title: 'Aspect-Ratio Media Wrapper',
      example:
        '<div className="aspect-2/1 overflow-hidden"><img className="object-cover w-full h-full" ... /></div>',
      guidance:
        'When a wrapper already reserves media space with a stable aspect ratio, do not automatically raise a missing dimensions finding for the child preview image.'
    },
    {
      title: 'Pseudo-Element Focus Ring',
      example: 'focus-visible:outline-none focus-visible:after:ring-2 after:absolute after:inset-0',
      guidance:
        'If focus styling depends on a pseudo-element, verify the ring is anchored to the correct positioned element. A removed native outline is only safe when the replacement ring is clearly reliable.'
    },
    {
      title: 'Per-Frame React Counter Animation',
      example: 'requestAnimationFrame(animate); setCount(Math.floor(eased * target))',
      guidance:
        'Repeated requestAnimationFrame state updates across multiple components are a concrete performance concern when shown directly in the code.'
    },
    {
      title: 'Simple Data Table Headers',
      example: '<thead><tr><th>Priority</th><th>Rule</th><th>Title</th></tr></thead>',
      guidance:
        'For simple data tables, prefer conservative column-header findings before speculating about row headers or outer-layout landmarks.'
    },
    {
      title: 'Adjacent Heading + Table',
      example: '<h2>Issues</h2><table><thead>...</thead><tbody>...</tbody></table>',
      guidance:
        'A nearby visible section heading may already provide table context. Prefer scope/header association findings before requiring a caption unless the table purpose is ambiguous.'
    }
  ]
}

function collectGlobalRuleStats(): GlobalRuleStat[] {
  const categories = readdirSync(RULES_DIR, { withFileTypes: true })
    .filter(d => d.isDirectory())
    .map(d => d.name)
    .sort()

  return categories.map(category => {
    const categoryDir = path.join(RULES_DIR, category)
    const files = readdirSync(categoryDir).filter(f => f.endsWith('.mdx'))

    let critical = 0
    let high = 0

    for (const file of files) {
      const raw = readFileSync(path.join(categoryDir, file), 'utf-8').replace(/\0/g, '')

      try {
        const { data } = matter(raw)
        const fm = data as RuleFrontmatter
        if (fm.priority === 'critical') critical++
        if (fm.priority === 'high') high++
      } catch {
        // Ignore broken files here — processRuleFile handles parse warnings separately.
      }
    }

    return {
      category,
      total: files.length,
      critical,
      high
    }
  })
}

function buildGlobalSkillMd(stats: GlobalRuleStat[]): string {
  const totalRules = stats.reduce((sum, stat) => sum + stat.total, 0)
  const highlights = loadGlobalRuleHighlights()
  const safePatterns = loadSafePatterns()
  const categorySummary = stats
    .map(stat => {
      const tags = []
      if (stat.critical > 0) tags.push(`${stat.critical} critical`)
      if (stat.high > 0) tags.push(`${stat.high} high`)
      const suffix = tags.length > 0 ? ` (${tags.join(', ')})` : ''
      return `- ${stat.category}: ${stat.total} rules${suffix}`
    })
    .join('\n')

  const ruleDerivedBlocks = highlights.flatMap(highlight => [
    `### ${highlight.title}`,
    ...highlight.tldr.map(item => `- ${item}`),
    ''
  ])
  const safePatternBlocks = safePatterns.flatMap(pattern => [
    `### ${pattern.title}`,
    `- Safe example: \`${pattern.example}\``,
    `- ${pattern.guidance}`,
    ''
  ])

  return [
    '---',
    'name: frontend-checklist-global',
    'description: "Use when auditing or improving any frontend codebase against the full Front-End Checklist rule corpus through one entry point."',
    'metadata:',
    '  category: global',
    '  priority: high',
    '  difficulty: intermediate',
    `  estimatedTime: "30"`,
    '  source: frontendchecklist.io',
    `  url: ${SITE_URL}/mcp`,
    '---',
    '',
    '# Front-End Checklist Global Audit',
    '',
    `This skill connects one entry point to all ${totalRules} Front-End Checklist rules.`,
    'Use MCP retrieval instead of trying to recall rules from memory.',
    '',
    '## Workflow',
    '',
    '1. Start with `review_code` for pasted code, file contents, or focused code review.',
    '2. Use `audit_url` for a public page when you need rendered HTML audited quickly.',
    '3. Narrow or expand scope with `search_rules`, `list_categories`, `get_workflow`, or `get_quick_reference`.',
    '4. For each issue, use `get_rule`, `fix_rule`, or `explain_rule` to give exact remediation.',
    '5. If a checklist is a better fit than ad hoc search, use `get_checklist_rules`.',
    '',
    '## Audit Stance',
    '',
    '- Be conservative. Prefer fewer, stronger findings over speculative breadth.',
    '- Only report an issue when the code or markup shown supports it directly.',
    '- In small component or route audits, prefer the strongest 1-2 supported findings over listing every possible enhancement.',
    '- Do not infer business intent from a snippet alone. Example: do not assume a field is required unless the code or surrounding copy makes that explicit.',
    '- Do not treat `alt=""` as an issue by default; empty alt can be correct for decorative images.',
    '- When an image is explicitly decorative, prefer zero findings unless the snippet shows a concrete problem rather than a hypothetical optimization.',
    '- If you see an isolated decorative image like `<img ... alt="" aria-hidden="true">`, treat it as a zero-issue pattern unless the snippet also shows real evidence of layout instability.',
    '- Do not raise low-confidence preference tweaks as findings when the snippet is otherwise sound. Prefer silence over weak nitpicks.',
    '- Do not treat `autocomplete="off"` as a defect by itself unless the snippet shows a stronger user-harm or security reason to flag it.',
    '- In link-preview cards, decorative preview images and favicons may be safe when nearby visible text already names the destination.',
    '- Do not treat React or JSX fragments as full HTML documents unless the snippet includes real document context like `<html>`, `<head>`, or `<body>`.',
    '- When reviewing Next.js or metadata-driven page files, consider `metadata`, `viewport`, and `generateMetadata` APIs before claiming head-tag omissions.',
    '',
    '## Coverage Checklist',
    '',
    '- Forms: check labels, accessible button names, explicit button types, `autocomplete` hints, password-field autocomplete, and validation semantics that are explicit in the code.',
    '- Images: check `width`/`height`, `loading`, `srcset`/`sizes`, and whether image semantics are clearly meaningful or decorative. Do not assume tiny SVG logos or clearly decorative assets must be lazy-loaded, and do not demand explicit dimensions for tiny ornamental dividers unless the snippet shows a real layout-shift risk. If an image is both decorative and hidden from assistive tech, bias strongly toward no finding.',
    '- Metadata: check title placement, canonical-url behavior, meta descriptions, Open Graph coverage, and structured data only when the file is responsible for metadata.',
    '- Motion: check expensive animated properties, prefer transform/opacity, and require `prefers-reduced-motion` handling for persistent motion.',
    '- Motion: when counters or visual widgets animate every frame, assess both reduced-motion support and whether the animation strategy adds unnecessary main-thread work.',
    '- Security: check `target="_blank"` links for `noopener noreferrer`, insecure form actions, password input best practices, and blocking third-party scripts.',
    '- Structure: check duplicate ids, list semantics, and table headers conservatively. For simple tables, column-header associations are stronger findings than speculative row-header or outer-layout landmark issues.',
    '- Structure: when a visible heading already introduces a simple table, treat missing captions as a lower-confidence improvement than missing header associations.',
    '',
    '## Rule-Derived Highlights',
    '',
    ...ruleDerivedBlocks,
    '## Known Safe Patterns',
    '',
    ...safePatternBlocks,
    '## Conflict Resolution',
    '',
    '- If decorative-image guidance and dimensions guidance conflict, decorative guidance wins unless the snippet shows visible layout instability.',
    '- Example zero-issue pattern: `<img src="/divider.svg" alt="" aria-hidden="true">` in an isolated component should not be flagged for alt text or dimensions unless the snippet also shows real layout-shift evidence.',
    '- If a form is clearly handled client-side with `onSubmit`, do not require traditional server-post `method` or `action` attributes.',
    '- If a file uses Next.js metadata APIs, do not infer missing head tags from the absence of literal `<meta>` or canonical-url markup.',
    '',
    '## Coverage',
    '',
    categorySummary,
    '',
    '## Evaluation Standard',
    '',
    '- Prefer findings tied to exact files, routes, selectors, or code snippets.',
    '- Prioritize critical and high issues first.',
    '- Explain uncertainty instead of overstating when the snippet does not show enough context.',
    '- Avoid generic advice when the MCP tools can retrieve a rule or fix prompt.',
    '- When no issue is found automatically, use `search_rules` to broaden review coverage before concluding clean.',
    '',
    '---',
    '',
    'See `references/categories.md` for category coverage and tool routing.',
    '',
    `MCP docs: ${SITE_URL}/mcp`,
    ''
  ].join('\n')
}

function buildGlobalReferencesMd(stats: GlobalRuleStat[]): string {
  const totalRules = stats.reduce((sum, stat) => sum + stat.total, 0)
  const highlights = loadGlobalRuleHighlights()
  const safePatterns = loadSafePatterns()
  const lines: string[] = [
    '# Front-End Checklist Global Skill Reference',
    '',
    `This aggregate skill routes to the Front-End Checklist MCP tools across ${totalRules} rules.`,
    '',
    '## Tool Routing',
    '',
    '| Goal | Preferred tool |',
    '| --- | --- |',
    '| Review pasted code or a single file | `review_code` |',
    '| Audit a public page | `audit_url` |',
    '| Find relevant rules by topic | `search_rules` |',
    '| Browse available categories | `list_categories` |',
    '| Get the full content for one rule | `get_rule` |',
    '| Get remediation guidance | `fix_rule` |',
    '| Explain impact to the user | `explain_rule` |',
    '| Pull a curated checklist at once | `get_checklist_rules` |',
    '| Start from a workflow or quick checklist | `get_workflow`, `get_quick_reference` |',
    '',
    '## Frontend Review Guardrails',
    '',
    '- Do not infer missing metadata from a component fragment that is not responsible for document head output.',
    '- Do not infer required fields, password policies, or decorative-image intent unless the code makes the intent explicit.',
    '- Favor exact evidence from the snippet over broad style advice.',
    '- When the snippet is a partial component, focus on what the component itself controls.',
    '',
    '## Rule-Derived Highlights',
    ''
  ]

  for (const highlight of highlights) {
    lines.push(`- **${highlight.title}**`)
    for (const item of highlight.tldr) {
      lines.push(`  ${item}`)
    }
  }

  lines.push('', '## Known Safe Patterns', '')

  for (const pattern of safePatterns) {
    lines.push(`- **${pattern.title}**`)
    lines.push(`  Safe example: \`${pattern.example}\``)
    lines.push(`  ${pattern.guidance}`)
  }

  lines.push('', '## Category Coverage', '')

  for (const stat of stats) {
    const summary = [
      `${stat.total} rules`,
      stat.critical > 0 ? `${stat.critical} critical` : null,
      stat.high > 0 ? `${stat.high} high` : null
    ]
      .filter(Boolean)
      .join(' · ')

    lines.push(`- **${stat.category}**: ${summary}`)
  }

  lines.push(
    '',
    `Rules browser: ${SITE_URL}/rules`,
    `Full reference: ${SITE_URL}/llms-full.txt`,
    ''
  )

  return lines.join('\n')
}

function writeGlobalSkill() {
  const stats = collectGlobalRuleStats()
  const skillMd = buildGlobalSkillMd(stats)
  const categoriesMd = buildGlobalReferencesMd(stats)

  // The Claude Code / Codex plugin ships its own copy: installed plugins are
  // copied into a cache, so a symlink back to skills/ would break.
  for (const outputDir of [OUTPUT_DIR, PLUGIN_SKILLS_DIR]) {
    const skillDir = path.join(outputDir, 'frontend-checklist-global')
    const referencesDir = path.join(skillDir, 'references')

    mkdirSync(referencesDir, { recursive: true })
    writeFileSync(path.join(skillDir, 'SKILL.md'), skillMd)
    writeFileSync(path.join(referencesDir, 'categories.md'), categoriesMd)
  }
}

/**
 * Build the set of slugs that appear more than once across all rule files.
 * Used to detect collisions that require a category prefix.
 */
function findDuplicateSlugs(): Set<string> {
  const seen = new Map<string, number>()
  const categories = readdirSync(RULES_DIR, { withFileTypes: true })
    .filter(d => d.isDirectory())
    .map(d => d.name)

  for (const category of categories) {
    const categoryDir = path.join(RULES_DIR, category)
    for (const file of readdirSync(categoryDir).filter(f => f.endsWith('.mdx'))) {
      const slug = path.basename(file, '.mdx')
      seen.set(slug, (seen.get(slug) ?? 0) + 1)
    }
  }

  return new Set([...seen.entries()].filter(([, n]) => n > 1).map(([s]) => s))
}

/**
 * Process a single rule MDX file and write its skill output.
 * Returns the skill name used, or null if the file could not be parsed.
 */
function processRuleFile(
  filePath: string,
  category: string,
  duplicateSlugs: Set<string>
): string | null {
  let raw = readFileSync(filePath, 'utf-8')

  // Strip null bytes that some editors introduce — they break YAML parsers
  raw = raw.replace(/\0/g, '')

  let parsed: ReturnType<typeof matter>
  try {
    parsed = matter(raw)
  } catch (err) {
    console.warn(`⚠ Skipped ${filePath}: frontmatter parse error — ${(err as Error).message}`)
    return null
  }

  const { data, content: body } = parsed
  const fm = data as RuleFrontmatter

  const fileName = path.basename(filePath, '.mdx')
  const baseSlug = fm.slug || fileName

  // Prefix with category when two rules share the same slug across categories
  const skillName = duplicateSlugs.has(baseSlug) ? `${category}-${baseSlug}` : baseSlug

  // Flat structure: skills/{skillName}/ — required for skill-check name_matches_directory rule
  const skillDir = path.join(OUTPUT_DIR, skillName)
  const referencesDir = path.join(skillDir, 'references')

  mkdirSync(referencesDir, { recursive: true })
  writeFileSync(path.join(skillDir, 'SKILL.md'), buildSkillMd(skillName, category, fm))
  writeFileSync(path.join(referencesDir, 'rule.md'), buildReferencesMd(fm, body))

  return skillName
}

/**
 * Resolve the category from a file path.
 * Expects paths like: packages/content/rules/en/{category}/{slug}.mdx
 */
function categoryFromPath(filePath: string): string {
  const parts = filePath.replace(/\\/g, '/').split('/')
  // The category is the directory immediately before the filename
  return parts[parts.length - 2]
}

async function main() {
  // Lefthook passes staged MDX files as arguments
  const args = process.argv.slice(2).filter(a => a.endsWith('.mdx') && existsSync(a))

  const duplicateSlugs = findDuplicateSlugs()
  if (duplicateSlugs.size > 0) {
    console.log(`ℹ Collision slugs (prefixed with category): ${[...duplicateSlugs].join(', ')}`)
  }

  if (args.length > 0) {
    // Incremental mode: only regenerate skills for changed rules
    let count = 0
    for (const filePath of args) {
      const absPath = path.resolve(filePath)
      const category = categoryFromPath(absPath)
      const skillName = processRuleFile(absPath, category, duplicateSlugs)
      if (skillName) {
        console.log(`✓ ${category}/${skillName}`)
        count++
      }
    }
    writeGlobalSkill()
    console.log(`\nUpdated ${count} skill${count === 1 ? '' : 's'} in skills/`)
  } else {
    // Full mode: regenerate all rules
    mkdirSync(OUTPUT_DIR, { recursive: true })

    let count = 0
    let skipped = 0
    const categories = readdirSync(RULES_DIR, { withFileTypes: true })
      .filter(d => d.isDirectory())
      .map(d => d.name)

    for (const category of categories) {
      const categoryDir = path.join(RULES_DIR, category)
      const files = readdirSync(categoryDir).filter(f => f.endsWith('.mdx'))

      for (const file of files) {
        const skillName = processRuleFile(path.join(categoryDir, file), category, duplicateSlugs)
        if (skillName) {
          console.log(`✓ ${category}/${skillName}`)
          count++
        } else {
          skipped++
        }
      }
    }

    writeGlobalSkill()

    console.log(
      `\nGenerated ${count} skills → skills/${skipped > 0 ? ` (${skipped} skipped)` : ''}`
    )
  }
}

main().catch(err => {
  console.error(err)
  process.exit(1)
})
