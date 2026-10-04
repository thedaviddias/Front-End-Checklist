---
name: length
description: "Use when generating URL slugs from article titles, auditing URL structures for unnecessary depth or length, or reviewing URL patterns in a CMS or router configuration."
metadata:
  category: seo
  priority: medium
  difficulty: intermediate
  estimatedTime: "10"
  source: frontendchecklist.io
  url: https://frontendchecklist.io/rules/seo/length
---

# Keep URLs concise

While Google has no strict URL length limit beyond technical constraints, long URLs with deep nesting, excessive parameters, or redundant words are harder for users to read, copy, and share. Google's John Mueller has confirmed that shorter, cleaner URLs are easier to understand and may perform slightly better in search.

## Quick Reference

- Keep URL paths under 100 characters; Google recommends short, descriptive URLs without unnecessary parameters
- Remove stop words (`the`, `a`, `of`, `in`) from slugs — `/guide-css-grid` is better than `/a-guide-to-css-grid`
- Deeply nested paths (`/blog/2024/03/category/subcategory/post-title`) are harder to share and signal distance from the root

## Check

For each page URL, extract the path component (excluding domain and query string). Flag: (1) Path length over 100 characters. (2) More than 4 path segments (e.g., `/a/b/c/d/e` has 5 segments). (3) Common stop words in slugs (`the`, `a`, `an`, `of`, `in`, `at`, `to`, `for`, `with`). (4) Dates in URL paths for evergreen content (e.g., `/blog/2024/03/css-guide`). (5) Session IDs, tracking parameters, or other dynamic values in paths.

## Fix

1. Shorten slugs by removing stop words:
   - `/how-to-optimise-your-websites-core-web-vitals` → `/optimise-core-web-vitals`
   - `/a-comprehensive-guide-to-css-grid-layout` → `/css-grid-guide`
2. Flatten URL structure where category hierarchy is not essential:
   - `/blog/2024/march/technology/css-grid` → `/blog/css-grid`
3. Remove dates from evergreen content URLs (with 301 redirects from old URLs).
4. Remove session IDs and tracking parameters from URLs used as canonical-url URLs.
5. Implement changes with 301 redirects from old to new URLs to preserve link equity.
6. Update sitemaps and internal links after URL changes.


## Explain

Google recommends keeping URLs 'simple, descriptive, and readable'. Long URLs are more prone to being truncated in search snippets, harder to share, and more confusing to users. Deep URL structures (many subdirectories) do not directly harm rankings, but they can increase crawl distance from the root, reducing crawl frequency for deep pages on large sites.

## Code Review

Parse the pathname of each URL. Count path segments (split by `/`). Measure character length of the path. Flag slugs containing common stop words. Report the longest 10 URLs by character count and deepest 10 by segment count. Check whether URL generation utilities strip stop words and limit segment depth.

---

For full implementation details, code examples, and framework-specific guidance,
see `references/rule.md`.

Rule page: https://frontendchecklist.io/rules/seo/length
