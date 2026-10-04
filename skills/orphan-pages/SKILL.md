---
name: orphan-pages
description: "Use when auditing site architecture or investigating why specific pages have low organic traffic despite good content. Applies to any site with more than ~20 pages."
metadata:
  category: seo
  priority: medium
  difficulty: intermediate
  estimatedTime: "20"
  source: frontendchecklist.io
  url: https://frontendchecklist.io/rules/seo/orphan-pages
---

# Add internal links to orphan pages

Orphan pages receive no PageRank from internal links and are rarely recrawled by Googlebot, which limits their ability to rank even when their content is excellent.

## Quick Reference

- Orphan pages have no internal links pointing to them from other site pages
- Googlebot may never discover or regularly recrawl pages with no internal links
- Add at least one contextually relevant internal link to every important page
- The sitemap alone is not sufficient — internal links are required for PageRank flow

## Check

Using a site crawl (Screaming Frog or similar), identify pages that appear in the sitemap or have been indexed but receive zero inbound internal links. List the URL, page title, and any existing content that could logically link to the orphan page.

## Fix

For each orphan page, identify 2–5 relevant existing pages that should link to it. Add contextual <a href='...'>anchor text</a> links in body content, related articles sections, or navigation. Ensure anchor text is descriptive and matches the target page's primary keyword.

## Explain

Search engines discover pages primarily by following links. A page with no internal links may be found via the sitemap but receives no PageRank from the site's link graph. Without PageRank, the page has limited ranking potential even if the content is excellent. Regular crawling also depends on internal links — orphan pages are recrawled less frequently.

## Code Review

Crawl the site and build an inbound link count for each URL. Cross-reference against the sitemap and indexed pages. Identify URLs with zero inbound internal links. For each orphan, report: URL, page title, word count, and potential linking pages (pages with semantically related content). Exclude intentional no-link pages (thank-you pages, admin pages).

---

For full implementation details, code examples, and framework-specific guidance,
see `references/rule.md`.

Rule page: https://frontendchecklist.io/rules/seo/orphan-pages
