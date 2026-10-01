---
name: frontendchecklist
description: Review frontend code and live pages against the Front-End Checklist (380+ rules for accessibility, performance, SEO, security, HTML, CSS, JavaScript, images, i18n, privacy, testing) using the `frontendchecklist` CLI. Use when writing, reviewing, or shipping HTML/CSS/JS/JSX/TSX/Vue/Svelte/Astro code, before a commit or PR, or when asked to audit a public URL.
---

# Front-End Checklist CLI

`frontendchecklist` checks frontend code against the Front-End Checklist rules. It works offline,
prints JSON when its output is piped (which is how you will usually call it), and uses exit codes
you can branch on.

Run it with `npx -y @frontendchecklist/cli <command>` if `frontendchecklist` is not installed.

## When to use it

- After writing or editing frontend files: `frontendchecklist review <paths>`.
- Before committing: `git diff --cached | frontendchecklist review -`.
- When the user asks to audit a deployed page: `frontendchecklist audit https://...`.
- When you need the authoritative guidance for a topic: `frontendchecklist search <topic>`, then
  `frontendchecklist rule <slug>`.
- For a structured pass (launch, accessibility, SEO, performance): `frontendchecklist checklists`,
  then `frontendchecklist checklist <slug>`.

## Commands

| Command | Purpose |
| --- | --- |
| `review <paths...\|->` | Static review of files, directories (walked; vendor dirs skipped), or stdin |
| `audit <https-url>` | Fetch a public page and review its HTML |
| `search [query] [--focus a,b] [-n 10]` | Find rules by keyword, technology, or category |
| `rule <slug>` | Why a rule matters, how to check it, how to fix it |
| `checklists` / `checklist <slug>` | Curated checklists and their rules |
| `categories` | Categories with rule counts |
| `schema` | Full command reference as JSON |

Useful flags: `--focus accessibility,seo`, `--min-priority high`, `--fail-on high`.

## Reading results

- `review` and `audit` return `{ findings: [{ target, rule, title, priority, issue, fix? }], failing }`.
- Exit code `0`: fine. `1`: findings at or above `--fail-on`. `2`: bad input or runtime error, with
  `{ "error": "..." }` on stdout.
- Findings are conservative static heuristics. "No findings" means nothing provable was found, not
  that the code is clean: follow up with `search`/`rule` for areas the heuristics cannot see
  (rendered contrast, focus order, real performance).

## Workflow

1. `frontendchecklist review <changed files> --min-priority medium`
2. For each finding, run `frontendchecklist rule <rule>` and apply its fix guidance.
3. Re-run the review until no critical/high findings remain (`--fail-on high` exits 0).
4. Mention any remaining medium/low findings to the user instead of silently ignoring them.
