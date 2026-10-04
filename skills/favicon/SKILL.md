---
name: favicon
description: "Use when checking whether a site has a correctly configured favicon, auditing `<link rel='icon'>` tags in the `<head>`, or setting up favicon infrastructure for a new project."
metadata:
  category: seo
  priority: medium
  difficulty: intermediate
  estimatedTime: "10"
  source: frontendchecklist.io
  url: https://frontendchecklist.io/rules/seo/favicon
---

# Add a favicon to every page

Google displays favicons next to search results on mobile devices, making your brand immediately recognisable in the SERP. A missing or inaccessible favicon prevents Google from showing it, reducing visual brand presence in search.

## Quick Reference

- Provide a `<link rel="icon">` pointing to a favicon file; Google uses it to identify your site in search results
- Serve the favicon via HTTPS, ensure it is publicly accessible (not blocked by robots.txt), and at least 48×48px for Google's use
- Include both an ICO fallback and SVG/PNG versions for broad browser and device compatibility

## Check

In the page `<head>`, look for `<link rel="icon">` or `<link rel="shortcut icon">` elements. Verify: (1) The href points to an accessible URL (returns 200, not blocked by robots.txt). (2) The file is at least 48×48px (for Google Search use). (3) A PNG or SVG version is provided alongside the ICO fallback. (4) The favicon is accessible over HTTPS.

## Fix

1. Create favicon files:
   - `favicon.ico` (16×16 and 32×32, ICO format) — legacy browser fallback
   - `favicon.svg` (scalable, modern browsers)
   - `apple-touch-icon.png` (180×180 PNG) — iOS home screen
2. Place them in the root or `/public` directory.
3. Add to `<head>`:
   ```html
   <link rel="icon" href="/favicon.ico" sizes="any">
   <link rel="icon" href="/favicon.svg" type="image/svg+xml">
   <link rel="apple-touch-icon" href="/apple-touch-icon.png">
   ```
4. Verify the favicon URL returns a 200 response (not 404).
5. Check that /robots.txt does not block the favicon path.
6. Test Google's display using the URL Inspection tool in Search Console.


## Explain

Favicons appear next to your site's name in browser tabs, bookmarks, and Google Search mobile results. Google explicitly states it uses the favicon from `<link rel='icon'>` for display in search results. A missing, blocked, or too-small favicon means Google cannot show your brand icon, reducing search result click-through rate.

## Code Review

Check the `<head>` for `<link rel='icon'>` and `<link rel='apple-touch-icon'>`. Verify the `href` values are valid relative or absolute paths. Confirm the favicon files exist and return HTTP 200. Flag if only `favicon.ico` at site root is used without an explicit `<link>` element (relying on browser default discovery is less reliable).

---

For full implementation details, code examples, and framework-specific guidance,
see `references/rule.md`.

Rule page: https://frontendchecklist.io/rules/seo/favicon
