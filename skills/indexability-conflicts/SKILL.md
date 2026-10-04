---
name: indexability-conflicts
description: "Use when auditing a site for indexability issues, investigating why pages appear in Google's index that should be excluded (or vice versa), or reviewing robots.txt and meta robots configurations for consistency."
metadata:
  category: seo
  priority: medium
  difficulty: intermediate
  estimatedTime: "10"
  source: frontendchecklist.io
  url: https://frontendchecklist.io/rules/seo/indexability-conflicts
---

# Avoid conflicting indexability signals

Conflicting indexability directives create unpredictable crawling and indexing behaviour. The most dangerous combination is robots.txt blocking a page that also has a `noindex` tag — the `noindex` is never read, but the URL is still known to Google, leaving it in a limbo state that wastes crawl budget.

## Quick Reference

- robots.txt blocks crawling; `noindex` blocks indexing — they are different mechanisms and should not be applied together
- A page blocked in robots.txt cannot receive a `noindex` directive because crawlers never read the page
- Canonical tags pointing to a `noindex` page create an unresolvable conflict — canonicalise to an indexable URL instead

## Check

For each page, collect four signals: (1) Is the URL path blocked by robots.txt? (2) Does the page HTML contain `<meta name='robots' content='noindex'>`? (3) Does the HTTP response include an `X-Robots-Tag: noindex` header? (4) Does the page's `<link rel='canonical'>` point to a different URL? Flag: pages blocked in robots.txt that also have noindex directives, pages with canonical pointing to a noindex URL, and pages with conflicting index/noindex signals from meta and HTTP header.

## Fix

1. Identify all pages where robots.txt blocks crawling AND the page also has `noindex`:
   - If you want the page excluded from the index: remove the robots.txt rule; keep the `noindex` so crawlers can read it.
   - If you want to block all crawling: remove `noindex` (irrelevant if not crawled); keep the robots.txt block.
2. Identify canonical tags pointing to `noindex` pages:
   - The canonical-url destination must be an indexable page.
   - Change the canonical-url to point to an indexable URL, or remove `noindex` from the destination.
3. Identify pages with both `index` and `noindex` in meta robots (from different tags or sources):
   - Google uses the most restrictive directive; resolve to a single clear intent.
4. Verify after fixing using Google Search Console URL Inspection for each affected page.


## Explain

robots.txt is a crawl directive; `noindex` is an indexing directive. They operate at different stages of Google's pipeline. A page blocked in robots.txt is never fetched, so its `noindex` tag is never read — yet the URL is still known from sitemaps or links, keeping it in a crawl ambiguity state. Google's documentation explicitly warns against blocking pages in robots.txt that you also want to declare as `noindex`.

## Code Review

Programmatically fetch robots.txt and parse its Disallow rules. For each page URL, determine if it matches a Disallow pattern. If yes, fetch the page HTML and check for `<meta name='robots'>` tags — flag if noindex is present. Also check the `X-Robots-Tag` HTTP response header for conflicts with the meta tag. Report the specific conflict type for each flagged URL.

---

For full implementation details, code examples, and framework-specific guidance,
see `references/rule.md`.

Rule page: https://frontendchecklist.io/rules/seo/indexability-conflicts
