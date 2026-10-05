# Scripts

Scripts are grouped by purpose. Run from repo root with `pnpm <script>` unless noted.

## Folder structure

| Folder | Purpose |
|--------|---------|
| `lib/` | Shared utilities for rule parsing and structure (used by generate, rule-structure, validate). Do not run directly. |
| `validation/` | Pre-commit checks (run by lefthook on staged files). |
| `generate/` | Generate artifacts from rule MDX (skills, hints, support notes, verification split). |
| `guide-structure/` | Validate typed guide section order and guide-template rules. |
| `rule-structure/` | Validate, fix, normalize, score, and review inline-link opportunities in rule MDX. |
| `validate/` | Validate sources (URLs) and package dependency consistency. |
| `audit/` | MCP audit tools. |

Root: `setup-qmd.sh` — QMD setup/embed (run via `pnpm qmd:setup` / `pnpm qmd:embed`).

MCP plugin upload archive: `pnpm exec node scripts/generate/package-mcp-plugin.mjs`.
It creates an allowlisted ZIP in ignored `.artifacts/mcp-publication/` and prints its SHA-256.
See [the publishing runbook](../docs/publishing/mcp-platforms.md) for directory requirements and release blockers.

---

## Core (CI / lefthook)

These run in CI or on commit; keep them.

| Command | What it does | Used by |
|---------|----------------|--------|
| `pnpm validate:rule-structure` | Validates rule section order and final `## Verification` heading. | CI, lefthook (on rule MDX changes) |
| `pnpm validate:guide-structure` | Validates guide section order by type (`how-to` or `insight`). | CI, guide authoring |
| `pnpm validate:guides` | Enforces guide publish-readiness checks (cover image, links, reading level, metadata). | CI, guide authoring |
| `pnpm score:rules` | Scores rules (≥50 to pass); fails commit if changed rules are below threshold. | Lefthook (on rule MDX changes) |
| `pnpm generate:skills` | Regenerates `skills/` from rule MDX. | Lefthook (on rule MDX changes) |
| `pnpm generate:readme` | Regenerates the README checklist and generated catalog from rule MDX. | Lefthook (on rule MDX changes) |
| `pnpm validate:evidence` | Validates source quality metadata on rules. | CI, rule authoring |

---

## Rule authoring

For writing or editing rules in `packages/content/rules/en/`.

| Command | What it does |
|---------|----------------|
| `pnpm validate:rule-structure` | Check structure; use `--report` for category drift. |
| `pnpm report:v2-gaps` | Same as `validate:rule-structure --report` (conditional V2 gaps). |
| `pnpm score:rules` | Score rules; `--failing`, `--json`, `--min 60`, or pass file paths. |
| `pnpm fix:rule-structure` | Auto-fix section order/headings (`--write`). |
| `pnpm normalize:rule-structure` | Normalize verification heading and trailing sections (`--write`). |
| `pnpm expand:related-rules` | Expand `relatedRules` frontmatter (`--write`). |
| `pnpm backfill:inline-links` | Backfill sparse rule bodies with light-touch inline links (`--category`, `--write`). |
| `pnpm report:rule-links` | Review inline-link density, warnings, and candidate internal/external links (`--category`, `--json`). |
| `pnpm inject:rule-links` | Deprecated alias for `pnpm report:rule-links`; read-only and no longer edits files. |

See [AGENTS.md](../AGENTS.md) and [docs/rule-structure.md](../docs/rule-structure.md) for full workflows.

---

## Guide authoring

For writing or editing guides in `packages/content/guides/en/`.

| Command | What it does |
|---------|----------------|
| `pnpm validate:guide-structure` | Check required section order for `how-to` and `insight` guides. |
| `pnpm validate:guides` | Enforce publish-readiness: required frontmatter, cover image, links, minimum depth, and readability. |
| `pnpm test:guide-structure` | Run guide structure and guide validation tests. |

See [docs/guides-authoring.md](../docs/guides-authoring.md) and [docs/guide-template.mdx](../docs/guide-template.mdx).

---

## Generate (from rules)

Regenerate derived content. Run after changing rules or when updating hints/support data.

| Command | What it does |
|---------|----------------|
| `pnpm generate:skills` | Regenerate `skills/` (SKILL.md + references) from rule MDX. |
| `pnpm generate:readme` | Regenerate the root README checklist and the generated catalog copy. |
| `pnpm generate:exceptions-hints` | Dry-run suggestions for missing `## Exceptions` sections. |
| `pnpm generate:support-notes` | Dry-run support-note suggestions from browser data. |
| `pnpm generate:verification-split` | Dry-run `## Verification` automated/manual split suggestions. |
| `pnpm backfill:sources` | Normalize source ids, roles, and authorities on rule MDX. |
| `pnpm backfill:evidence` | Alias for `pnpm backfill:sources` while the old command name is still referenced. |

---

## Validate

| Command | What it does |
|---------|----------------|
| `pnpm validate:sources` | Validate external URLs in rule frontmatter (sources, resources). |
| `pnpm validate:evidence` | Validate source metadata: minimum sources, source roles, primary sources, and category-specific source quality. |
| `pnpm validate:packages` | Check package dependency consistency across the monorepo. |

---

## Audit

| Command | What it does |
|---------|----------------|
| `pnpm mcp:audit` | MCP quality pipeline (unit tests + optional security scan). See [docs/mcp-quality.md](../docs/mcp-quality.md). |
| `pnpm mcp:audit:security` | Run `mcp-security-auditor` on `packages/mcp/src`. |
| `pnpm mcp:efficiency` | Gate real-corpus MCP token sizes and local latency; optional `-- --out /absolute/path/report.json`. See [budgets](../docs/mcp-efficiency.md). |
| `pnpm mcp:evaluate` | Run deterministic MCP quality evals for retrieval, review accuracy, tool contracts, and improvement impact. |
| `pnpm mcp:impact -- --init <dir>` | Create matched development workspaces for the 32-task independent HTML benchmark; `--split held-out` selects the reserved cases. |
| `pnpm mcp:impact -- --score <dir>` | Print JSON with independent checks, regressions, matched-run evidence, verified uplift and cost; see [protocol](../docs/mcp-impact-benchmark.md). |
| `pnpm mcp:impact -- --self-test` | Verify the impact benchmark scorer with built-in fixed fixtures. |
| `pnpm skills:audit` | Score generated skills against agent-skill patterns and report high-value missing rule candidates. |

---

## Validation (pre-commit)

Lefthook runs these automatically; you can run individual checkers manually if needed.

| Script | Purpose |
|--------|---------|
| `scripts/validation/check-as-casts.js` | TypeScript `as` cast validation. |
| `scripts/validation/check-barrel-files.js` | Barrel file (re-export) rules. |
| `scripts/validation/check-console-logs.js` | Disallow stray console.log in app code. |
| `scripts/validation/check-directory-structure.js` | Enforce directory layout. |
| `scripts/validation/check-file-complexity.js` | File complexity limits. |
| `scripts/validation/check-jsdoc.js` | JSDoc rules. |
| `scripts/validation/check-relative-imports.ts` | Enforce path aliases in `apps/web` (no deep relative imports). |

---

## Tests

| Command | What it does |
|---------|----------------|
| `pnpm test:rule-structure` | Run rule-structure lib and scoring tests. |
