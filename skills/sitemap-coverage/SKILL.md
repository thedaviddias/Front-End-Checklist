---
name: sitemap-coverage
description: "Use when applies to content sites, e-commerce stores, and any site where timely indexing of new pages matters. Use when investigating why new pages take a long time to appear in search results."
metadata:
  category: seo
  priority: medium
  difficulty: intermediate
  estimatedTime: "10"
  source: frontendchecklist.io
  url: https://frontendchecklist.io/rules/seo/sitemap-coverage
---

# Include indexable pages in your sitemap

Pages absent from the sitemap rely entirely on crawl discovery via links, which can delay indexing of new content, especially on large sites or pages with few inbound links.

## Quick Reference

- Every canonical-url, indexable page should appear in the sitemap
- Pages with `noindex` or non-self canonical tags must NOT be included in the sitemap
- Paginated pages, filtered variants, and faceted URLs are usually excluded unless they have unique content
- Use Google Search Console Coverage report to find indexable pages not in the sitemap

## Check

Compare the list of all canonical-url, indexable URLs on the site against the URLs in the XML sitemap. Flag any page that returns HTTP 200, has no `noindex` directive, has a self-referencing canonical, but is absent from the sitemap.

## Fix

Add missing indexable pages to the sitemap. Remove pages that carry `noindex`, redirect, or non-self canonical tags from the sitemap. Automate sitemap generation so newly published content is included immediately.

## Explain

Explain how missing sitemap coverage slows crawl discovery, which types of pages should and should not be included, and how to use Google Search Console to identify gaps.

## Code Review

Review metadata generation, rendered HTML, structured data, and response headers related to Include indexable pages in your sitemap. Flag exact routes or templates where search-facing output violates the rule, and describe how to verify the final page output.

---

For full implementation details, code examples, and framework-specific guidance,
see `references/rule.md`.

Rule page: https://frontendchecklist.io/rules/seo/sitemap-coverage
