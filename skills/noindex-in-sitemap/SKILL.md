---
name: noindex-in-sitemap
description: "Use when auditing an XML sitemap or diagnosing indexing issues. Applies to any site where noindex meta tags or X-Robots-Tag headers may be applied to URLs also listed in the sitemap."
metadata:
  category: seo
  priority: high
  difficulty: intermediate
  estimatedTime: "15"
  source: frontendchecklist.io
  url: https://frontendchecklist.io/rules/seo/noindex-in-sitemap
---

# Noindex in Sitemap

Listing noindexed pages in your sitemap sends contradictory signals to Googlebot—it wastes crawl budget and may confuse Google into ignoring the noindex directive or spending crawl time on pages you don't want indexed.

## Quick Reference

- Never include noindexed pages in your XML sitemap
- The sitemap and noindex directive send contradictory signals to crawlers
- Sitemaps should only list canonical-url, indexable, 200-status URLs
- Remove noindexed URLs from sitemap or remove the noindex directive—pick one

## Check

Fetch the XML sitemap(s) and check each listed URL. For each URL, retrieve the page and check for <meta name='robots' content='noindex'> in the <head> or an X-Robots-Tag: noindex HTTP header. Report any URLs present in the sitemap that also carry a noindex directive.

## Fix

For each URL that has a noindex directive AND appears in the sitemap: decide whether the page should be indexed. If yes — remove the noindex directive. If no — remove the URL from the sitemap. Never leave both in place.

## Explain

The XML sitemap is a recommendation to search engines: 'please crawl and index these pages'. A noindex directive is an instruction: 'do not index this page'. Including noindexed pages in the sitemap creates a contradiction—Google will resolve it by following noindex, but the URL still gets crawled, wasting crawl budget.

## Code Review

Fetch each URL in the XML sitemap. For each URL, check the HTTP response for X-Robots-Tag: noindex header, and check the rendered <head> for <meta name='robots' content='noindex'>. Report any URL that appears in the sitemap AND carries a noindex directive. Also check for sitemap entries returning non-200 status codes.

---

For full implementation details, code examples, and framework-specific guidance,
see `references/rule.md`.

Rule page: https://frontendchecklist.io/rules/seo/noindex-in-sitemap
