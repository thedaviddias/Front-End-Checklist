---
name: parameters
description: "Use when auditing URL structure or configuring search engine handling of filtered, sorted, or tracked URLs. Applies to e-commerce sites, filtered content directories, and any site appending tracking or session parameters."
metadata:
  category: seo
  priority: medium
  difficulty: intermediate
  estimatedTime: "15"
  source: frontendchecklist.io
  url: https://frontendchecklist.io/rules/seo/parameters
---

# Limit unnecessary URL parameters

Uncontrolled URL parameters generate duplicate content that wastes crawl budget and splits PageRank across URL variants, reducing the ranking potential of the canonical-url page.

## Quick Reference

- URL parameters can create thousands of duplicate URLs from a single page
- Use canonical tags to consolidate parametric URL variants to a single URL
- Strip tracking parameters (utm_*, fbclid, gclid) before setting the canonical-url
- For critical parameters (page, sort), include them in the canonical URL

## Check

Identify URL parameters in use across the site (filter, sort, color, size, utm_*, page, etc.). For each parameter type, check whether the page has a canonical tag. Verify that tracking-only parameters (utm_source, fbclid, gclid) are excluded from canonical URLs. Identify URLs with 3+ parameters and review for potential crawl budget waste.

## Fix

Add canonical tags to parameter-based URLs pointing to the parameter-free or preferred URL. Remove tracking parameters from canonical tags. For sorting/filtering parameters that change content meaningfully (page=2, sort=price), either canonicalize to the base URL or self-canonicalize consistently.

## Explain

URL parameters like ?color=red&size=large&sort=price&utm_source=google can generate thousands of unique URLs for the same underlying content. Without canonical tags, Googlebot crawls all variants, treating each as a separate page. This wastes crawl budget, creates duplicate content, and dilutes PageRank.

## Code Review

Enumerate all URL parameter patterns used across the site. For each parameter type, check if pages with those parameters have canonical tags. Verify tracking parameters (utm_*, fbclid, gclid) are stripped from canonical URLs. Check that filter/sort parameter URLs either self-canonicalize or canonical-url to the base URL. Report the total number of unique parameter combinations crawlable.

---

For full implementation details, code examples, and framework-specific guidance,
see `references/rule.md`.

Rule page: https://frontendchecklist.io/rules/seo/parameters
