---
name: schema-noindex-conflict
description: "Use when applies to any site that uses structured data for rich results. Use when investigating why valid schema markup does not produce rich results in Google Search."
metadata:
  category: seo
  priority: high
  difficulty: intermediate
  estimatedTime: "10"
  source: frontendchecklist.io
  url: https://frontendchecklist.io/rules/seo/schema-noindex-conflict
---

# Schema + Noindex Conflict

Investing in rich result schema on pages that are blocked from indexing wastes development effort — Google explicitly states it does not process structured data on noindexed pages.

## Quick Reference

- Rich result schema (Review, Product, FAQ, etc.) has no effect on pages Google cannot index
- A page with `noindex` will not earn rich results even if it has valid structured data
- Pages blocked in robots.txt are never fetched, so their schema is never processed
- Audit all pages with schema markup to confirm they are crawlable and indexable

## Check

For every page containing a `<script type='application/ld+json'>` block with a rich result schema type, check: (1) Is the page blocked by robots.txt? (2) Does `<meta name='robots'>` contain `noindex`? (3) Does the canonical tag point to a different URL? Flag any conflicts.

## Fix

For pages where rich results are desired: remove the `noindex` directive, unblock the URL in robots.txt, and ensure the canonical tag is self-referencing. If the page must remain noindexed, remove the schema markup — it serves no purpose.

## Explain

Explain why Google does not process structured data on pages it cannot index, how to identify schema+noindex conflicts in a large site, and how to prioritize which pages need indexing to unlock rich results.

## Code Review

Review metadata generation, rendered HTML, structured data, and response headers related to Schema + Noindex Conflict. Flag exact routes or templates where search-facing output violates the rule, and describe how to verify the final page output.

---

For full implementation details, code examples, and framework-specific guidance,
see `references/rule.md`.

Rule page: https://frontendchecklist.io/rules/seo/schema-noindex-conflict
