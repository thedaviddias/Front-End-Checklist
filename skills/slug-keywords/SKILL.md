---
name: slug-keywords
description: "Use when applies to blog posts, product pages, and any content page with editable URL slugs. Use when building a URL strategy for a new site or auditing existing URLs for keyword inclusion."
metadata:
  category: seo
  priority: medium
  difficulty: beginner
  estimatedTime: "10"
  source: frontendchecklist.io
  url: https://frontendchecklist.io/rules/seo/slug-keywords
---

# Include keywords in URL slugs

Descriptive URL slugs help users and search engines understand page content before visiting — a URL like `/buy-running-shoes-women` communicates topic intent that `/products/4832` does not.

## Quick Reference

- URL slugs should contain the primary keyword of the page in lowercase, hyphen-separated words
- Avoid numeric IDs (`/page?id=12345`), random strings, or meaningless paths (`/p/a/`)  in public URLs
- Keep slugs concise: 3–5 meaningful words is typical; avoid keyword stuffing
- Google uses URL words as a weak ranking signal and users use them to assess page relevance before clicking

## Check

Crawl the site and examine URL paths. Flag URLs that contain: numeric IDs only, random strings, session tokens, dates without a descriptive slug, or overly generic words (`/page`, `/item`, `/post`). Verify slugs are lowercase and hyphen-separated.

## Fix

Rewrite slugs to include the page's primary keyword in natural language. Use lowercase letters and hyphens as word separators. Set up 301 redirects from old URLs to new slugs. Update internal links, sitemaps, and canonical tags.

## Explain

Explain how keyword-rich URL slugs improve click-through rates in search results, serve as a weak relevance signal for search engines, and make URLs easier to share and understand.

## Code Review

Review metadata generation, rendered HTML, structured data, and response headers related to Include keywords in URL slugs. Flag exact routes or templates where search-facing output violates the rule, and describe how to verify the final page output.

---

For full implementation details, code examples, and framework-specific guidance,
see `references/rule.md`.

Rule page: https://frontendchecklist.io/rules/seo/slug-keywords
