---
name: robots-meta
description: "Use when applies to all HTML pages. Use when auditing pages that have disappeared from search results or when checking staging vs. production meta tag parity."
metadata:
  category: seo
  priority: high
  difficulty: beginner
  estimatedTime: "10"
  source: frontendchecklist.io
  url: https://frontendchecklist.io/rules/seo/robots-meta
---

# Set robots meta directives correctly

An accidental `noindex` on a key landing page silently removes it from search results; audit every page's robots directive to avoid invisible ranking losses.

## Quick Reference

- Place `<meta name="robots" content="...">` in `<head>` to control indexing per-page
- Use `noindex` only on pages that should not appear in search results
- Avoid `noindex, nofollow` on pages you want crawled for PageRank flow
- Crawler-specific tags (`googlebot`, `bingbot`) override the generic `robots` tag for that crawler

## Check

Inspect `<head>` for `<meta name="robots" content="...">`. Verify the content value is intentional (e.g., production pages should not have `noindex`). Check for conflicting `googlebot`-specific tags.

## Fix

Remove or update the `noindex` directive from pages that should appear in search results. For pages that must be blocked, confirm `noindex` is intentional. Remove duplicate or conflicting robots meta tags.

## Explain

Explain the difference between robots.txt and meta robots, when each should be used, and why `noindex` combined with `follow` still allows link equity to flow.

## Code Review

Review metadata generation, rendered HTML, structured data, and response headers related to Set robots meta directives correctly. Flag exact routes or templates where search-facing output violates the rule, and describe how to verify the final page output.

---

For full implementation details, code examples, and framework-specific guidance,
see `references/rule.md`.

Rule page: https://frontendchecklist.io/rules/seo/robots-meta
