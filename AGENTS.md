# AGENTS.md — Front-End Checklist

Repository rules and conventions for contributors and automation tools.

## Project Overview

**Front-End Checklist** is an open-source monorepo providing 385 quality-gated frontend best practice rules with an MCP server for structured review workflows.

- **MCP Server**: `https://mcp.frontendchecklist.io` (11 tools)
- **Rules**: `packages/content/rules/en/<category>/<slug>.mdx`
- **Web App**: `apps/web/` (Next.js App Router)
- **MCP Package**: `packages/mcp/` (TypeScript)
- **Package Manager**: pnpm (workspaces + Turborepo)

## Work Tracking

Work in this repo is tracked in Paperclip project **FEC** (Front-End Checklist, id `c5edfe8f-731b-43e8-b805-c52999831084`). New tickets get the `DAV-` prefix.

## MCP Usage

When working on frontend implementation, review, debugging, or audit tasks, use the Front-End Checklist MCP server when available so recommendations stay grounded in the project rule corpus.

- Use `review_code` first for pasted or inspected HTML, CSS, JavaScript, TypeScript, React, or Next.js code.
- Use `search_rules` before making accessibility, performance, SEO, security, image, privacy, i18n, or testing recommendations.
- Use `get_rule`, `check_rule`, `fix_rule`, or `explain_rule` for rule-specific guidance and remediation.
- Use `get_workflow` or `get_checklist_rules` for broad launch, accessibility, SEO, security, performance, and testing audits.
- Use `audit_url` for public `https://` pages.

Some clients lazy-load installed MCP tools. If the tools are not initially visible, search for or explicitly request the Front-End Checklist MCP before proceeding with frontend work.

## Monorepo Structure

```
apps/
  web/                    # Next.js app (App Router)
packages/
  mcp/                    # MCP server implementation
  content/                # Rules MDX content + content-collections config
  auth/                   # Better-Auth + Prisma + Supabase
  design-system/          # Shared UI components
  types/                  # Shared TypeScript types
  data-layer/             # Data access layer
  schemas/                # Zod v4 schemas
```

## Rule MDX Frontmatter Spec

Rules live at `packages/content/rules/en/<category>/<slug>.mdx`.

### Required Fields

```yaml
---
title: "Human-readable rule title (string, use quotes)"
description: "One-sentence description of what to do"
categories: ['html']           # Array; first item = primaryCategory
priority: 'high'               # 'critical' | 'high' | 'medium' | 'low'
difficulty: 'beginner'         # 'beginner' | 'intermediate' | 'advanced' | 'expert'
estimatedTime: 15              # Minutes as integer
prompts:
  check: "Prompt for checking whether the implementation follows this rule"
  fix: "Prompt for fixing the issue"
  explain: "Prompt for explaining why this rule matters"
---
```

### Recommended Fields

These fields are not required by the parser, but they materially improve rule quality, MCP usefulness, and generated skills.

```yaml
subcategory: 'keyboard'        # Sub-grouping within category
tldr:                          # Array of bullet points (used in llms.txt)
  - "Key point one"
  - "Key point two"
whyItMatters: "Paragraph explaining the business/user impact"
sources:
  - title: "MDN or spec page title"
    url: "https://..."
    type: "mdn|spec|guide|wcag|google"
    id: "stable-source-id"
    role: "standard|reference|implementation|compatibility|regulation|search|research"
    authority: "primary|secondary"
resources:
  - name: "Supplementary tool or article"
    url: "https://..."
    type: "tool|article|reference"
relatedRules:
  - slug: other-rule-slug
    reason: "Why these rules relate"
tools:
  - name: "Tool Name"
    url: "https://..."         # or null
tags: ['wcag', 'performance']
prompts:
  codeReview: "Recommended prompt for systematic code review context"
aiContext: "Additional context for automated review about when this rule applies"
```

Authoring placement rules:

- Put authoritative citations in `sources`, not in body prose like `Reference: ...`
- `sources` are proof metadata, not generic further reading. Every rule needs at least 2 sources, 2 source roles, and 1 `authority: primary`.
- `resources` are for further reading or tools only. Do not map evidence claims to `resources`.
- The system may infer or normalize `id`, `role`, and `authority` for sources at build time; authors should focus on strong, relevant sources rather than maintaining claim-by-claim proof objects.
- Put cross-rule navigation in `relatedRules`, not in body prose like `See also ...`
- Keep intro paragraphs focused on the rule itself; metadata should render from frontmatter-driven UI

Inline link contract:

- Natural inline links inside body prose are allowed when they support a specific claim, comparison, or implementation recommendation.
- Prefer light-touch density: usually `2-5` inline links per rule, with `0-1` in the intro and `1-3` across the main guidance sections.
- Prefer external links over internal ones; internal rule links should usually stay at `0-1`, with `2` only for unusually interconnected rules.
- Keep standalone metadata lines out of the body. Do not add paragraphs that start with `See also ...` or `Reference: ...`.
- Keep evergreen proof in `sources`, and use newer inline external articles only when they add practical or recent context that the primary sources do not cover alone.
- When a named tool is mentioned in prose for the first meaningful time (for example `Screaming Frog` or `Google Search Console`), link that first mention if the tool materially helps the reader and already exists in `resources` or `tools`.
- Approved secondary inline links should stay curated. Prefer strong platforms such as `CSS-Tricks`, `Smashing Magazine`, `Nielsen Norman Group`, `WebAIM`, `Screaming Frog`, `Sitebulb`, `Moz`, or `Yoast` when they add practical implementation context.
- Use descriptive anchor text tied to the sentence claim, not generic labels like “read more”.

`impact`, `standards`, and `automation` are intentionally not part of the active rule-writing contract right now. The current corpus and tooling do not consume them consistently enough to justify treating them as standard authoring fields.

## Canonical Rule Shape

New and refreshed rules should follow this structure unless there is a strong reason not to:

1. Short intro paragraph explaining the rule in plain language
2. `## Code Example` or `## Code Examples`
3. `## Why It Matters`
4. Optional implementation or guidance sections
5. `## Verification`

Canonical ordering rules:

- `## Code Example` or `## Code Examples` must appear before `## Why It Matters`
- `## Why It Matters` must appear before `## Verification`
- `## Verification` must be the final H2 in the rule body
- Optional H2 sections belong between `## Why It Matters` and `## Verification`

Preferred optional H2 taxonomy:

- `## Best Practices`
- `## Common Mistakes`
- `## Framework Examples`
- `## Tools & Validation`
- `## Thresholds`
- `## Exceptions`
- `## Browser Support`
- `## Support Notes`
- `## Standards`
- `## Implementation Notes`

The validator reports headings outside this preferred taxonomy so section sprawl stays visible over time.

Rule Contract V2 adds three conditional concepts:

- `## Exceptions` for nuanced rules, false positives, or valid caveats
- `### Automated Checks` and `### Manual Checks` inside `## Verification` when both matter
- a short visible standards/support note for compatibility-sensitive or compliance-sensitive rules

Apply these conditionally, not universally.

Browser support guidance should be derived from the repo browser policy in `.browserslistrc` plus package-backed compatibility data, not from memory.

Use explicit thresholds whenever the rule is measurable:

- Web Vitals and performance metrics (`LCP <= 2.5s`, `CLS <= 0.1`, bundle or image size budgets)
- Accessibility measurements (contrast ratios, target sizes, zoom or reflow thresholds)
- SEO and crawling states (indexability, status codes, canonical-url behavior)
- Security headers and transport requirements

Prefer “how to verify” guidance over generic advice. A strong rule should tell an engineer exactly how to confirm the rule passes.

### Common Mistakes to Avoid

- **Unquoted colons in YAML**: Always quote strings containing `:` — e.g. `title: "Use rel: new-tab"` not `title: Use rel: noopener`
- **Stub prompts**: Prompts must be actionable. Bad: `"Check this rule"`. Good: `"Find all <img> elements missing an alt attribute in this HTML"`
- **Missing sources**: Add at least one authoritative reference (`MDN`, `W3C/WCAG`, specs, `web.dev`, or product docs) before considering a rule complete
- **No verification path**: Include a final `## Verification` section so the fix is testable
- **Verification not last**: Do not place additional H2 sections after `## Verification`
- **Missing caveats**: Add `## Exceptions` when the rule has important false positives or valid exceptions
- **Missing support note**: Add `## Browser Support`, `## Support Notes`, or a visible standards note when compatibility or compliance changes implementation decisions
- **Wrong priority**: `critical` = site-breaking / security / legal. `high` = significantly degrades UX. `medium` = best practice. `low` = nice-to-have
- **Missing required fields**: All 7 required fields must be present; builds fail otherwise
- **Emoji in titles**: Titles should be plain text (no emoji)

## Category Taxonomy

Valid values for the `categories` array:

| Slug | Description |
|------|-------------|
| `html` | Document structure, semantics, forms |
| `css` | Layout, typography, animation, responsive |
| `javascript` | Client-side scripting, async, security |
| `performance` | Loading speed, rendering, Core Web Vitals |
| `accessibility` | WCAG, ARIA, keyboard, screen readers |
| `seo` | Meta tags, structured data, crawlability |
| `security` | HTTPS, CSP, XSS prevention, headers |
| `images` | Optimization, formats, responsive images |
| `testing` | Unit, integration, e2e, a11y testing |
| `privacy` | Consent, data minimisation, data rights |
| `i18n` | Localization, pluralization, bidi, locale formatting |
| `general` | Cross-cutting best practices |

## Quality Scoring Rubric

Rules are scored automatically via `pnpm score:rules` (100-point base score plus up to 12 conditional points, minimum 50 to pass the current quality gate).

| Dimension | Points | What to Check |
|-----------|--------|---------------|
| Prompts (`check`/`fix`/`explain`) | 24 | All 3 prompts are specific and non-generic |
| TLDR bullets | 4 | 3+ actionable bullets |
| Why it matters | 4 | Explains user, business, or operational impact |
| AI context | 6 | Captures where and when the rule applies in automated reviews |
| Related rules | 6 | Links adjacent rules with clear reasons |
| Sources | 10 | Includes authoritative references |
| Resources / tools | 6 | Includes useful supporting docs or tools |
| Code review prompt | 6 | Provides a systematic review strategy |
| Code examples | 10 | Includes realistic examples, not just prose |
| Body depth | 10 | Provides substantive implementation detail |
| Verification section | 8 | Includes `Verification`, `Testing`, `Audit Checklist`, or equivalent |
| Thresholds / pass-fail criteria | 6 | Uses explicit numbers or conditions where the rule is measurable |
| Exceptions (conditional) | 4 | Adds an `Exceptions` section when the rule is nuanced or false-positive-prone |
| Verification split (conditional) | 4 | Splits verification into automated and manual checks when both apply |
| Standards/support visibility (conditional) | 4 | Adds a visible threshold, standards note, or support note when required by the rule type |

Rules scoring < 50 are excluded from MCP tool responses and the web UI.

## Adding or Updating a Rule

1. Create `packages/content/rules/en/<category>/<slug>.mdx`
2. Fill all required frontmatter fields
3. Add recommended metadata: `sources`, `resources`, `aiContext`, `relatedRules`, and `prompts.codeReview` where applicable
4. Write the rule using the canonical-url structure (intro, examples, why it matters, verification, category-specific guidance)
5. Run `pnpm score:rules` — must score ≥ 50 for now; target 60+ for new work
6. Run `pnpm validate:rule-structure` — validates rule section order and final `Verification` heading
7. Run `pnpm report:rule-links` — reviews inline-link density and suggests safe internal/external candidates
8. Run `pnpm validate:sources` — validates external URLs
9. Run `pnpm generate:skills` — regenerates skills index

## Scripts Reference

```bash
pnpm score:rules          # Score all rules; flags < 50 quality gate failures
pnpm validate:rule-structure  # Validate rule heading structure and report drift
pnpm report:v2-gaps       # Report conditional V2 gaps by category and migration batch
pnpm report:rule-links    # Review inline-link density and candidate internal/external links
pnpm generate:exceptions-hints  # Dry-run suggestions for missing Exceptions sections
pnpm generate:support-notes  # Dry-run support-note suggestions from browser data
pnpm generate:verification-split  # Dry-run Verification split suggestions
pnpm validate:sources     # Validate external URLs in rule frontmatter
pnpm validate:packages    # Check package dependency consistency
pnpm generate:skills      # Regenerate skills/ directory from rules
pnpm build                # Full monorepo build (via Turborepo)
pnpm typecheck            # TypeScript check across all packages
pnpm lint                 # Biome lint
pnpm lint:fix             # Biome lint with auto-fix
```

## MCP Tool Development

New MCP tools go in `packages/mcp/src/tools/<tool-name>.ts` and must be:

1. Exported from `packages/mcp/src/tools/index.ts`
2. Added to `BASE_TOOL_DEFINITIONS` in `packages/mcp/src/server.ts`
3. Added as a `case` in the `handleToolsCall` switch in `server.ts`

Tool definition shape:
```typescript
export const myToolDefinition = {
  name: 'my_tool',
  description: '...',  // Critical for tool discoverability — be specific
  inputSchema: {
    type: 'object' as const,
    properties: { ... },
    required: ['fieldName'],
  },
}
```

## Workspace Architecture Notes

- **Auth**: Better-Auth + Prisma + Supabase Postgres in `packages/auth/`
- **Validation**: Zod v4 — use `.issues` not `.errors` on `ZodError`
- **Forms**: `@tanstack/react-form` with manual Zod validation on submit
- **Email**: Resend SDK v6, sending domain `mail.frontendchecklist.io`
- **Rate limiting**: `@upstash/ratelimit` + `@upstash/redis` in `apps/web/lib/rate-limit.ts`
- **Query**: TanStack Query v5 with `getQueryClient()` factory (not singleton)
- **Dev server**: `portless run next dev`

## Learned User Preferences

- Put shared concerns (e.g. fonts, typography) in the design system and import from there; apps wire implementation (e.g. next/font) using config from the design system.
- Do not use `suppressHydrationWarning`; fix server/client mismatch (e.g. defer client-only state until after mount).
- Reuse existing components instead of creating page-specific variants (e.g. shared `FAQAccordion` for any FAQ section, `.code-block`/`.code-inline` for all code display, ChecklistActionBar instead of new progress bars). When adding a feature to one page type, add it to all relevant page types (e.g. ShareButton on category, rule detail, and all-rules pages).
- Rule row: click on rule title toggles completion; expand/collapse only via the plus/minus icon. Expanded content shows description first, then tags and action buttons on one row aligned with the description.
- Prefer Tailwind utility classes in components over custom CSS classes in globals.css.
- Use a scalable overrides map for special-case labels (e.g. subcategory aria → ARIA) instead of hardcoded conditionals.
- Do not use `git commit --no-verify`; fix ALL pre-commit violations (JSDoc, as-casts, barrel files, complexity, relative imports) rather than deferring or working around them. Write JSDoc at the same time as the code, not as a batch fix later.
- **Card-style links**: Use the stretched-link pattern: the `<a>`/`<Link>` wraps **only the title text** inside a heading and uses `after:absolute after:inset-0 after:content-[""]` so its `::after` pseudo-element expands to fill the card container (`position: relative`). Secondary interactive elements need `relative z-10`. See `docs/card-links.md`.
- Centralize all icons in `@repo/design-system`: brand icons in `brand-icons.tsx`, Lucide re-exported from `icons.ts`. Use official brand icons (`@icons-pack/react-simple-icons`) for branded services, not Lucide approximations. Consumers never import directly from `lucide-react`.
- Never use Tailwind opacity modifiers (`/50`, `/60`, `/70`) on semantic theme text colors like `text-foreground-muted` — it crushes contrast in light mode. Use the appropriate token (`text-foreground-muted`, `text-foreground-subtle`) at full opacity instead.
- Always refer to the social platform as "X", never "Twitter". Schema fields use `xUrl` (not `twitterUrl`), UI labels say "X", and URLs point to `x.com`.
- About page link belongs in the footer only, not in the main navbar.

## Learned Workspace Facts

- Fluid typography tokens use `clamp()` in `@theme inline` for `text-base` and above; `text-xs` and `text-sm` stay fixed for compact UI controls (buttons, badges, inputs, tooltips).
- next/font: apply each font’s `.className` to the document element (not `.variable`); Next.js requires literal option objects, so the app must inline font options while the design system can document them.
- Do not apply client-side bot protection (e.g. Vercel BotID) to programmatic API endpoints like MCP; use it only for browser-originated form and mutation endpoints.
- Next.js reads next.config.js at startup; restart the dev server after changing it (e.g. images.remotePatterns). `withContentCollections` returns a Promise (async config) so it must be the outermost wrapper — `export default withContentCollections(withBotId(nextConfig))`. `withBotId` does not handle async configs and will silently drop all properties including `images`.
- Tailwind preflight resets `list-style` on `ul`/`ol`; `.prose` styles must explicitly set `list-style-type: disc` (ul), `decimal` (ol), and nested variants (`circle`, `lower-alpha`).
- CSS custom properties use OKLCH color format. Light mode tokens need visible contrast on all screens: `--border` at least oklch(0.885), `--foreground-subtle` at oklch(0.64), shadows at 0.06+ opacity. Use `color-mix(in oklch, var(--token) N%, transparent)` for theme-aware transparent colors instead of hardcoded `rgba()`.
- Pre-commit hooks (lefthook) enforce: biome check, JSDoc, no-as-casts, no-barrel-files, file-complexity (300 lines React / 500 lines other), no-deep-relative-imports, no-console-logs, test coverage.
- Button default variant uses `bg-accent text-accent-foreground hover:bg-accent-hover` (project's accent tokens), not shadcn's `bg-primary`; keep project-specific semantic tokens in component variants even when shadcn aliases exist.
- Scripts are organized in subfolders: `scripts/{validation,generate,rule-structure,validate,audit}/`; `scripts/README.md` documents each script and subfolder.
- Biome's `useSortedClasses` only sorts class **order**; it cannot rename deprecated classes. Use `@tailwindcss/upgrade` (installed in `apps/web`) to canonicalize class names project-wide.
- Monorepo uses pnpm catalogs (`catalog:` in `pnpm-workspace.yaml`) for centralized dependency versions; shared deps appearing in 2+ packages use `catalog:` instead of hardcoded version strings.
- Brand icons (ChatGPT, Claude, X, LinkedIn, Reddit, Cursor, VSCode) live in `packages/design-system/src/brand-icons.tsx` and are re-exported from the design-system barrel.

<!-- BEGIN:turborepo-agent-rules -->

# This is NOT the Turborepo you know

Turborepo configuration, task behavior, and CLI commands can vary between installed versions and may differ from your training data. Resolve the `turbo` package from this file's directory or relevant workspace; in monorepos, it may not be visible from the repository root. For example, run `node -p "require.resolve('turbo/package.json')"` from a workspace that depends on `turbo`.

Read `docs/README.md` inside that installed package first, then read the relevant pages from its `docs/` directory before changing Turborepo configuration or commands. Heed deprecation notices. These bundled docs match the installed package version and are available without network access.

This block is written and re-added by `turbo` before repository-scoped commands when an AI agent is detected. In the Turborepo source repository, its template is defined in `crates/turborepo-cli/src/cli/agent_guidance.rs`. Removing the managed block while updates are enabled means a later qualifying invocation will add it again. Set `"agentGuidance": false` in the root `turbo.json` or `turbo.jsonc` to opt out; this does not remove an existing block. Keep the block committed with your work to avoid an uncommitted change on the next agent invocation.
<!-- END:turborepo-agent-rules -->
