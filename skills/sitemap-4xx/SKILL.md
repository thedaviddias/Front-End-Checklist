---
name: sitemap-4xx
description: "Use when applies to any site with a dynamically generated or manually maintained XML sitemap. Use when investigating crawl errors or after a site migration that removed pages."
metadata:
  category: seo
  priority: high
  difficulty: intermediate
  estimatedTime: "10"
  source: frontendchecklist.io
  url: https://frontendchecklist.io/rules/seo/sitemap-4xx
---

# 4XX Pages in Sitemap

Including 4XX URLs in a sitemap signals poor site maintenance to Google, wastes crawl budget on non-existent pages, and generates errors in Search Console that can mask real indexing issues.

## Quick Reference

- Sitemaps should only contain URLs that return HTTP 200 and are indexable
- 4XX URLs in a sitemap waste crawl budget and cause Search Console errors
- Remove 404 pages from the sitemap or set up proper 301 redirects before adding them
- Monitor the sitemap regularly — deleted content must be removed from sitemaps promptly

## Check

Fetch all URLs listed in the sitemap and record their HTTP status codes. Flag any URL returning 4XX (404 Not Found, 410 Gone, 403 Forbidden). Cross-reference against Google Search Console → Coverage for corroborating data.

## Fix

For each 4XX URL: if the content moved, set up a 301 redirect to the new URL and add the new URL to the sitemap. If the content is permanently gone, return 410 Gone and remove the URL from the sitemap. Regenerate and resubmit the sitemap.

## Explain

Explain why sitemaps must only contain live, indexable URLs, how 4XX URLs in sitemaps affect crawl budget allocation, and the difference between 404 and 410 status codes for deindexing.

## Code Review

Review metadata generation, rendered HTML, structured data, and response headers related to 4XX Pages in Sitemap. Flag exact routes or templates where search-facing output violates the rule, and describe how to verify the final page output.

---

For full implementation details, code examples, and framework-specific guidance,
see `references/rule.md`.

Rule page: https://frontendchecklist.io/rules/seo/sitemap-4xx
