---
name: pagination
description: "Use when auditing paginated content (blog archives, product category pages, search results). Applies to any site with lists or grids of content split across multiple pages."
metadata:
  category: seo
  priority: medium
  difficulty: intermediate
  estimatedTime: "15"
  source: frontendchecklist.io
  url: https://frontendchecklist.io/rules/seo/pagination
---

# Use canonicals on paginated pages

Incorrect pagination canonicalization can prevent pages 2, 3, etc. from being indexed, removing valuable content from search results and breaking user journeys from search queries that match content on later pages.

## Quick Reference

- Each paginated page (/page/2, /page/3) should self-canonicalize to its own URL
- Do NOT canonicalize all paginated pages to page 1 — this is a common mistake
- Google dropped support for rel=prev/next in 2019 — don't rely on it
- Use consistent URL patterns for pagination (?page=2 or /page/2, never both)
- Infinite scroll and load-more UIs still need crawlable paginated URLs or links

## Check

Find paginated page sequences (URLs with ?page=, /page/, /p/, or numbered suffixes). For each page, check the canonical tag. Verify that each page self-canonicalizes (page 2 canonical-url = page 2 URL). Flag any paginated page that incorrectly points canonical-url to page 1. If the UI uses infinite scroll or "load more", verify equivalent crawlable pagination links exist.

## Fix

Update canonical tags so each paginated page self-references. For /category?page=2, set <link rel='canonical' href='https://example.com/category?page=2' />. Remove any canonical pointing paginated pages to the first page unless those pages genuinely have duplicate content. Add crawlable paginated URLs or fallback links for infinite-scroll interfaces.

## Explain

Pagination canonical tags tell Google which URL is the preferred version of each page. Setting all paginated pages to canonical-url to page 1 tells Google that pages 2, 3, etc. are duplicates of page 1 — so Google stops indexing them. Content that only appears on page 3 (for example) then becomes unreachable from search.

## Code Review

Identify paginated URL patterns (URLs with page=, /page/, /p/ parameters). For each paginated page beyond page 1, check the canonical tag. Flag any page 2+ that has a canonical pointing to page 1 (the base URL). Verify that page 1 has a self-referencing canonical. Check that pagination URL format is consistent (no mixing of ?page= and /page/). For JS-driven infinite scroll, verify there is still a crawlable path to page 2+ via real links or paginated URLs.

---

For full implementation details, code examples, and framework-specific guidance,
see `references/rule.md`.

Rule page: https://frontendchecklist.io/rules/seo/pagination
