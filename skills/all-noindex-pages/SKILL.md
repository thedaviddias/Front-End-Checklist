---
name: all-noindex-pages
description: "Use when auditing metadata, crawlability, structured data, or indexability related to Audit all noindex pages. Verify the rendered HTML and HTTP response rather than relying only on source files."
metadata:
  category: seo
  priority: medium
  difficulty: intermediate
  estimatedTime: "10"
  source: frontendchecklist.io
  url: https://frontendchecklist.io/rules/seo/all-noindex-pages
---

# Audit all noindex pages

An incorrect `noindex` tag can completely remove important pages from search results, while proper usage helps manage crawl budget and prevents duplicate content issues.

## Quick Reference

- Identify all pages using the `noindex` directive in meta tags or headers
- Verify that critical pages (products, articles) aren't accidentally blocked
- Ensure `noindex` is correctly applied to thin content, admin, or utility pages

## Check

Verify that the `noindex` directive is only applied to pages that should not appear in search results.

## Fix

Remove `&lt;meta name="robots" content="noindex"&gt;` from pages that should be indexed and ranking.

## Explain

Explain the difference between `noindex` and `disallow` in robots.txt and when to use each for optimal SEO.

## Code Review

Review metadata generation, rendered HTML, structured data, and response headers related to Audit all noindex pages. Flag exact routes or templates where search-facing output violates the rule, and describe how to verify the final page output.

---

For full implementation details, code examples, and framework-specific guidance,
see `references/rule.md`.

Rule page: https://frontendchecklist.io/rules/seo/all-noindex-pages
