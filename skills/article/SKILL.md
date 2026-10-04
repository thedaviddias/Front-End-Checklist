---
name: article
description: "Use when auditing metadata, crawlability, structured data, or indexability related to Implement valid Article structured data. Verify the rendered HTML and HTTP response rather than relying only on source files."
metadata:
  category: seo
  priority: high
  difficulty: intermediate
  estimatedTime: "15"
  source: frontendchecklist.io
  url: https://frontendchecklist.io/rules/seo/article
---

# Implement valid Article structured data

Structured data helps your content appear as rich results (like Top Stories or rich snippets), significantly increasing click-through rates and visibility in search results.

## Quick Reference

- Use Schema.org `Article`, `NewsArticle`, or `BlogPosting` types for content
- Include required properties like `headline`, `image`, `datePublished`, and `author`
- Format the data using JSON-LD for the best compatibility with search engines

## Check

Verify that the page contains valid Article structured data with all required properties.

## Fix

Add a JSON-LD script block containing the `Article` schema with correct metadata for the current page.

## Explain

Explain how Article schema affects visibility in Google Discover, News, and standard search results.

## Code Review

Review metadata generation, rendered HTML, structured data, and response headers related to Implement valid Article structured data. Flag exact routes or templates where search-facing output violates the rule, and describe how to verify the final page output.

---

For full implementation details, code examples, and framework-specific guidance,
see `references/rule.md`.

Rule page: https://frontendchecklist.io/rules/seo/article
