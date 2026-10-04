---
name: trailing-slash
description: "Use when applies to all static and dynamic websites. Use when auditing a site for duplicate content, setting up a new site, or after migrating platforms that changed URL conventions."
metadata:
  category: seo
  priority: medium
  difficulty: beginner
  estimatedTime: "10"
  source: frontendchecklist.io
  url: https://frontendchecklist.io/rules/seo/trailing-slash
---

# Use trailing slashes consistently

Inconsistent trailing slashes create duplicate content — Google sees `/page` and `/page/` as two separate URLs competing for the same ranking, splitting PageRank between them.

## Quick Reference

- Pick one convention — trailing slash or no trailing slash — and enforce it site-wide with 301 redirects
- Both `/page/` and `/page` must not return HTTP 200; one must redirect to the other
- Set `rel="canonical"` to the preferred version on all pages
- Ensure all internal links, sitemaps, and canonical tags use the same convention

## Check

For a sample of URLs, test both the trailing-slash and non-trailing-slash versions. Both should NOT return HTTP 200 — one must 301-redirect to the other. Check that internal links, sitemap `<loc>` values, and canonical tags all use the same convention consistently.

## Fix

Choose a canonical URL convention. Add server or framework redirect rules so the non-preferred variant permanently redirects (301) to the preferred one. Update all internal links, canonical tags, and sitemap entries to use the preferred format.

## Explain

Explain why `/page` and `/page/` are treated as distinct URLs by default, how this creates duplicate content, and how 301 redirects and canonical tags resolve the ambiguity.

## Code Review

Review metadata generation, rendered HTML, structured data, and response headers related to Use trailing slashes consistently. Flag exact routes or templates where search-facing output violates the rule, and describe how to verify the final page output.

---

For full implementation details, code examples, and framework-specific guidance,
see `references/rule.md`.

Rule page: https://frontendchecklist.io/rules/seo/trailing-slash
