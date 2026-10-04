---
name: sitemap-valid
description: "Use when applies to any site with a manually or programmatically generated XML sitemap. Use when debugging sitemap submission errors in Google Search Console."
metadata:
  category: seo
  priority: high
  difficulty: beginner
  estimatedTime: "10"
  source: frontendchecklist.io
  url: https://frontendchecklist.io/rules/seo/sitemap-valid
---

# Keep XML sitemaps valid

An invalid or malformed sitemap is silently ignored by search engines, leaving newly published or orphaned pages undiscovered by crawlers.

## Quick Reference

- The root element must be `<urlset>` with the correct `xmlns` namespace
- Each `<url>` must contain exactly one `<loc>` element with a fully qualified, percent-encoded URL
- Maximum 50,000 URLs and 50 MB per sitemap file; use a sitemap index for larger sites
- Encode XML special characters: `&` → `&amp;`, `<` → `&lt;`, `>` → `&gt;`, `"` → `&quot;`, `'` → `&apos;`

## Check

Fetch the sitemap and validate it against the sitemaps.org schema. Check that the `xmlns` attribute is `http://www.sitemaps.org/schemas/sitemap/0.9`, all `<loc>` values are absolute URLs, no file exceeds 50,000 URLs or 50 MB, and special characters are properly XML-encoded.

## Fix

Re-generate the sitemap using a validated sitemap library. Encode all special characters in URLs (`&` → `&amp;`). Split oversized sitemaps into multiple files and reference them from a sitemap index. Resubmit to Google Search Console.

## Explain

Explain the sitemaps.org XML schema requirements, what causes validation errors in Google Search Console, and how encoding errors in `<loc>` URLs prevent crawlers from fetching those pages.

## Code Review

Review metadata generation, rendered HTML, structured data, and response headers related to Keep XML sitemaps valid. Flag exact routes or templates where search-facing output violates the rule, and describe how to verify the final page output.

---

For full implementation details, code examples, and framework-specific guidance,
see `references/rule.md`.

Rule page: https://frontendchecklist.io/rules/seo/sitemap-valid
