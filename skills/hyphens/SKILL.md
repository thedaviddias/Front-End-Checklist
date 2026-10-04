---
name: hyphens
description: "Use when auditing URL structures for word separator format, generating slugs from titles, or planning a URL migration from underscores or spaces to hyphens with appropriate redirects."
metadata:
  category: seo
  priority: medium
  difficulty: intermediate
  estimatedTime: "10"
  source: frontendchecklist.io
  url: https://frontendchecklist.io/rules/seo/hyphens
---

# Use hyphens in URLs

Google's search systems interpret hyphens in URLs as word boundaries, enabling it to match the URL against individual keyword queries. Underscores join words into a single token, meaning `/seo_practices` is seen as one word 'seopractices' rather than two separate words 'seo' and 'practices'.

## Quick Reference

- Use hyphens (`-`) to separate words in URLs — Google treats hyphens as word separators, underscores as part of the word
- `/best-seo-practices` is better than `/best_seo_practices` or `/bestseopractices`
- Changing existing URLs from underscores to hyphens requires 301 redirects to preserve link equity

## Check

Inspect the URL path segment of each page. Flag any URL that contains: (1) Underscores (`_`) as word separators (e.g., `/best_practices`). (2) Spaces encoded as `%20` or `+` in path segments. (3) Mixed separators in the same URL (e.g., `/best-practices_guide`). Report the count of non-hyphenated URLs by category.

## Fix

1. Identify all pages with underscores or spaces in URL path segments.
2. Generate the hyphenated equivalent: replace `_` with `-`, spaces/`%20` with `-`.
3. Set up 301 permanent redirects from the old URLs to the new hyphenated URLs.
4. Update internal links throughout the site to point to the new URLs.
5. Submit the new URLs to Google Search Console for re-indexing.
6. Update your sitemap.xml to include only the new hyphenated URLs.
7. In your CMS or slug-generation function, enforce hyphens going forward:
   - Slug: title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')


## Explain

Google's John Mueller has confirmed that Google interprets hyphens as word separators in URLs, but treats underscores as word joiners. This means a URL with underscores matches fewer individual keyword queries. For example, `/web_design` would match 'web_design' as a single token, while `/web-design` matches both 'web design' and 'webdesign' queries.

## Code Review

Parse all URL paths used in the application's router or CMS slug fields. Flag any path segment containing `_` characters between words or any `%20` space encoding. Verify slug-generation utilities produce lowercase hyphenated output. Check redirect rules to confirm old underscore URLs are permanently (301) redirected to their hyphenated equivalents.

---

For full implementation details, code examples, and framework-specific guidance,
see `references/rule.md`.

Rule page: https://frontendchecklist.io/rules/seo/hyphens
