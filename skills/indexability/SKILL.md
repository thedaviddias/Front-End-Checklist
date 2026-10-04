---
name: indexability
description: "Use when auditing a site for accidental noindex directives, investigating why important pages are not appearing in Google Search, or reviewing CMS settings that control indexing at the page or category level."
metadata:
  category: seo
  priority: medium
  difficulty: intermediate
  estimatedTime: "10"
  source: frontendchecklist.io
  url: https://frontendchecklist.io/rules/seo/indexability
---

# Make important pages indexable

A page blocked from indexing cannot appear in search results, regardless of its content quality or backlinks. Accidentally blocking key landing pages, product pages, or blog posts is one of the most impactful technical SEO errors — often silently losing significant organic traffic.

## Quick Reference

- Verify that pages you want ranked are not blocked by `noindex`, robots.txt, or `X-Robots-Tag` headers
- Test indexability with Google Search Console's URL Inspection tool — 'URL is on Google' confirms indexing
- Common accidental blocks: staging environments promoted to production, CMS default noindex settings, and overly broad robots.txt Disallow rules

## Check

For each important page (homepage, key landing pages, product pages, top blog posts): (1) Check `<meta name='robots' content='...'>` — does it contain `noindex`? (2) Check `X-Robots-Tag` HTTP response header — does it contain `noindex`? (3) Check robots.txt — is the URL's path blocked by a Disallow rule? (4) In Google Search Console, use URL Inspection to confirm the page is indexed. Flag any important page with any form of noindex or robots.txt block.

## Fix

1. For pages with `<meta name='robots' content='noindex'>`:
   - Remove the noindex tag entirely, or change to `content='index, follow'`.
   - In Next.js: remove the `robots: { index: false }` from the page's metadata.
2. For pages with `X-Robots-Tag: noindex` HTTP header:
   - Remove the header in your server config (Nginx, Apache, CDN rules).
   - In Vercel: check `vercel.json` headers configuration.
3. For pages blocked by robots.txt:
   - Remove or narrow the Disallow rule.
   - Test with Google's robots.txt tester in Search Console.
4. After removing blocks, request indexing in Google Search Console (URL Inspection → Request Indexing).
5. Monitor the Coverage report over the following weeks to confirm the page moves to "Indexed".


## Explain

A page that cannot be crawled or indexed cannot rank, no matter how good its content or how many links point to it. Google explicitly states that `noindex` and robots.txt blocks prevent pages from appearing in search results. Accidental indexing blocks are among the most common causes of sudden, unexplained drops in organic search traffic.

## Code Review

Parse every page's HTML for `<meta name='robots'>` or `<meta name='googlebot'>` tags containing `noindex`. Check HTTP response headers for `X-Robots-Tag` with `noindex`. Cross-reference with robots.txt Disallow patterns. Flag any route in the application where `noindex` is set unconditionally (rather than conditionally for draft/private content).

---

For full implementation details, code examples, and framework-specific guidance,
see `references/rule.md`.

Rule page: https://frontendchecklist.io/rules/seo/indexability
