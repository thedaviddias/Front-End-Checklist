---
name: sitemap-domain
description: "Use when applies to sites that have recently migrated from HTTP to HTTPS, changed domain name, or have www/non-www redirect configurations. Use when sitemap submission reports low coverage."
metadata:
  category: seo
  priority: medium
  difficulty: beginner
  estimatedTime: "10"
  source: frontendchecklist.io
  url: https://frontendchecklist.io/rules/seo/sitemap-domain
---

# Keep sitemap URLs on the correct domain

Google ignores sitemap entries from domains it cannot verify as yours — cross-domain URLs are simply skipped, meaning those pages lose the crawl-discovery benefit of the sitemap.

## Quick Reference

- Every `<loc>` URL must use the same domain and protocol (`https://www.example.com`) as the sitemap file itself
- Cross-domain URLs in a sitemap are ignored by Google
- Mixing `http://` and `https://` URLs in one sitemap creates conflicting signals
- Mixing `www` and non-`www` variants indicates a canonicalization issue to fix first

## Check

Parse all `<loc>` values in the sitemap and extract the protocol and hostname. Flag any URL whose protocol or hostname differs from the sitemap's own URL. Common mismatches: http vs https, www vs non-www, old domain vs new domain.

## Fix

Update all `<loc>` URLs to use the canonical-url protocol and hostname. If the site is on `https://www.example.com`, every sitemap URL must start with `https://www.example.com/`. Regenerate and resubmit the sitemap.

## Explain

Explain why Google restricts sitemap URLs to the same domain, how cross-domain URLs are silently dropped, and how domain mismatches in a sitemap reveal underlying canonicalization problems.

## Code Review

Review metadata generation, rendered HTML, structured data, and response headers related to Keep sitemap URLs on the correct domain. Flag exact routes or templates where search-facing output violates the rule, and describe how to verify the final page output.

---

For full implementation details, code examples, and framework-specific guidance,
see `references/rule.md`.

Rule page: https://frontendchecklist.io/rules/seo/sitemap-domain
