---
name: weak-internal-links
description: "Use when applies to any site with more than 20 pages. Use when auditing site architecture, investigating why certain pages underperform in search, or after a site migration."
metadata:
  category: seo
  priority: medium
  difficulty: intermediate
  estimatedTime: "10"
  source: frontendchecklist.io
  url: https://frontendchecklist.io/rules/seo/weak-internal-links
---

# Weak Internal Links

Internal links are how search engines discover pages and how PageRank flows through a site — pages with few internal links are effectively demoted in the crawl priority queue.

## Quick Reference

- Pages with only 1 internal dofollow link are difficult for search engines to discover and poorly valued
- Internal links pass PageRank — more quality internal links to a page signal its importance
- Orphan pages (0 internal links) may not be crawled at all unless they are in the sitemap
- Important pages (money pages, cornerstone content) should have at least 3–5 internal links from relevant pages

## Check

Crawl the site and build an internal link graph. Identify pages that: (1) receive 0 dofollow internal links (orphan pages), or (2) receive only 1 dofollow internal link. Cross-reference with performance data from Google Search Console to identify underperforming important pages.

## Fix

For pages with weak internal linking: identify 3–5 topically relevant pages on the site and add contextual internal links from those pages to the underlinked page. Use descriptive, keyword-relevant anchor text. Prioritize linking from high-authority pages (homepage, cornerstone content).

## Explain

Explain how internal links distribute PageRank across a site, why orphan and weakly-linked pages are harder to discover and rank, and how to build a deliberate internal linking strategy based on content hierarchy.

## Code Review

Review metadata generation, rendered HTML, structured data, and response headers related to Weak Internal Links. Flag exact routes or templates where search-facing output violates the rule, and describe how to verify the final page output.

---

For full implementation details, code examples, and framework-specific guidance,
see `references/rule.md`.

Rule page: https://frontendchecklist.io/rules/seo/weak-internal-links
