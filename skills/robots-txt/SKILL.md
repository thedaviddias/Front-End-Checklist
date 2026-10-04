---
name: robots-txt
description: "Use when applies to any public website. Use when auditing technical SEO foundations or diagnosing crawl coverage gaps."
metadata:
  category: seo
  priority: high
  difficulty: beginner
  estimatedTime: "10"
  source: frontendchecklist.io
  url: https://frontendchecklist.io/rules/seo/robots-txt
---

# Publish a robots.txt file

robots.txt is the first file crawlers fetch; misconfigured directives can silently block search engines from crawling your entire site, killing organic visibility.

## Quick Reference

- Serve a valid `robots.txt` at `/robots.txt` on the production domain, returning HTTP 200
- Include a `Sitemap:` directive pointing to your XML sitemap
- Never disallow crawling of CSS/JS assets that render your pages
- Avoid blocking all crawlers with `Disallow: /` on a live site

## Check

Fetch `/robots.txt` on the live domain and verify it returns HTTP 200, uses correct `User-agent` / `Disallow` / `Allow` syntax, and includes a `Sitemap:` directive pointing to the XML sitemap. Check for accidental `Disallow: /` directives.

## Fix

Create or update `robots.txt` at the web root with valid directives. Add a live `Sitemap:` line for the production sitemap URL. Remove any `Disallow: /` rules that block the whole site or resources needed for rendering.

## Explain

Explain how robots.txt controls crawler access, why an accidental `Disallow: /` can delist a site, and why CSS/JS must remain accessible for rendering-based indexing.

## Code Review

Review metadata generation, rendered HTML, structured data, and response headers related to Publish a robots.txt file. Flag exact routes or templates where search-facing output violates the rule, and describe how to verify the final page output.

---

For full implementation details, code examples, and framework-specific guidance,
see `references/rule.md`.

Rule page: https://frontendchecklist.io/rules/seo/robots-txt
