---
name: invalid-links
description: "Use when auditing a page's link elements for crawlability, reviewing JavaScript-heavy SPAs where navigation may not use `<a href>` tags, or checking that dynamically generated links have valid href values."
metadata:
  category: seo
  priority: medium
  difficulty: intermediate
  estimatedTime: "10"
  source: frontendchecklist.io
  url: https://frontendchecklist.io/rules/seo/invalid-links
---

# Fix invalid links

Google can only follow links declared as valid `<a href>` elements with crawlable URL values. Invalid links — empty hrefs, JavaScript voids, or non-URL content — prevent PageRank from flowing to linked pages and stop Googlebot from discovering those destinations.

## Quick Reference

- Invalid `<a>` tags (empty href, JavaScript voids, non-URL values) are not crawlable — Googlebot cannot follow them
- Links must use crawlable `<a href='...'>` elements with valid absolute or relative URLs to pass PageRank and be followed
- JavaScript-only navigation (onClick handlers without `href`) is invisible to search engine crawlers

## Check

Parse all `<a>` elements on the page. Flag links where `href`: (1) is empty (`href=''` or `href='#'` with no meaningful target). (2) starts with `javascript:` (e.g., `href='javascript:void(0)'`). (3) starts with `mailto:` or `tel:` — these are valid but not crawlable for page discovery. (4) contains only a fragment identifier that references an anchor not present on the page. (5) is absent entirely (`<a>` without any href attribute). Report the count per type.

## Fix

1. For links using `href='javascript:void(0)'` or `href='#'` as navigation triggers:
   - Add a real URL as the href value
   - Use JavaScript to enhance the navigation, not replace it
   - Before: `<a href="javascript:void(0)" onclick="openModal()">View Details</a>`
   - After: `<a href="/products/details" onclick="openModal(event)">View Details</a>`
2. For `<a>` elements without href (used as button-like elements):
   - If they trigger navigation: add href
   - If they trigger actions only: change to `<button>` elements
3. For empty `href=''`: either add the correct URL or remove the `<a>` wrapper
4. For `href='#'` anchors: use meaningful fragment IDs that reference actual page sections (`href='#features'` where `id='features'` exists)


## Explain

Google's documentation states that crawlable links must be `<a>` tags with an `href` attribute containing a valid URL. Links with `javascript:` hrefs, empty hrefs, or no href attribute are not followed by crawlers. This means pages only reachable through invalid links are not discovered by Googlebot, and any intended PageRank flow is blocked.

## Code Review

Query all `<a>` elements in the rendered DOM. For each, extract the `href` attribute. Flag: absent href, empty string, `'#'` only, values starting with `javascript:`, values starting with `void`. Separately flag `<div>`, `<span>`, or `<button>` elements with `onclick` navigation handlers that lack a corresponding `<a href>` — these are not crawlable.

---

For full implementation details, code examples, and framework-specific guidance,
see `references/rule.md`.

Rule page: https://frontendchecklist.io/rules/seo/invalid-links
