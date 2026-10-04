---
name: title-unique
description: "Use when applies to all HTML pages. Use when auditing a site crawl report or investigating why multiple pages compete for the same keyword in search results."
metadata:
  category: seo
  priority: high
  difficulty: beginner
  estimatedTime: "10"
  source: frontendchecklist.io
  url: https://frontendchecklist.io/rules/seo/title-unique
---

# Keep page titles unique

Duplicate titles prevent Google from determining which page is the authoritative result for a given query, splitting ranking signals and reducing total organic visibility.

## Quick Reference

- Every page must have a `<title>` tag with content unique across the entire site
- Duplicate titles cause search engines to arbitrarily choose which page to show for a query
- Use page-specific keywords in the title: `[Page Topic] | [Brand]` pattern
- Google rewrites titles that are too generic, too long (>60 chars), or keyword-stuffed

## Check

Crawl all pages and extract `<title>` tag content. Group pages by identical title text and flag duplicates. Also flag pages with no title, empty titles, or titles matching the CMS default (e.g., 'Home', 'Page', 'Untitled').

## Fix

Give each page a descriptive, unique title incorporating the page's primary keyword: `[Specific Topic] – [Site Name]`. For blog posts: use the post title. For products: use product name + key differentiator. For category pages: use the category name + context.

## Explain

Explain how duplicate titles affect crawl budget, indexing prioritization, and keyword ranking; and why Google rewrites titles it considers misleading or non-descriptive.

## Code Review

Review metadata generation, rendered HTML, structured data, and response headers related to Keep page titles unique. Flag exact routes or templates where search-facing output violates the rule, and describe how to verify the final page output.

---

For full implementation details, code examples, and framework-specific guidance,
see `references/rule.md`.

Rule page: https://frontendchecklist.io/rules/seo/title-unique
