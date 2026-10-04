---
name: lowercase
description: "Use when auditing URL structure or configuring a new site's routing. Applies to any server or framework that allows case-insensitive file systems (Linux servers are case-sensitive by default)."
metadata:
  category: seo
  priority: medium
  difficulty: beginner
  estimatedTime: "10"
  source: frontendchecklist.io
  url: https://frontendchecklist.io/rules/seo/lowercase
---

# Use lowercase URLs

Mixed-case URLs can create duplicate content—search engines may index both /Product and /product as separate pages, splitting link equity and diluting rankings.

## Quick Reference

- URLs should be entirely lowercase to prevent duplicate content issues
- Most web servers treat /Page and /page as different URLs, creating duplicates
- Redirect uppercase and mixed-case URLs to their lowercase equivalents with 301
- Apply lowercasing in your server config or framework router, not ad hoc

## Check

Scan the site's internal links and server-side routes for URLs containing uppercase letters. Check HTTP response codes for uppercase variants of key URLs to confirm whether they redirect (301) to lowercase.

## Fix

Configure your server or framework to normalize all incoming URLs to lowercase before routing. Add 301 redirects from any existing uppercase URLs to their lowercase equivalents. Update internal links and sitemaps to use only lowercase URLs.

## Explain

URL case matters for SEO because case-sensitive servers treat /Page and /page as different resources, creating duplicate content. Even on case-insensitive servers, inconsistency confuses crawlers and splits PageRank across URL variants.

## Code Review

Scan the site's route definitions, server configuration, and internal links for uppercase letters in URL paths. Test key URLs in uppercase and mixed case — verify they return 301 to the lowercase version, not 200. Check the sitemap for any uppercase <loc> entries. Verify framework router is configured to normalize URL case.

---

For full implementation details, code examples, and framework-specific guidance,
see `references/rule.md`.

Rule page: https://frontendchecklist.io/rules/seo/lowercase
