---
name: service-area
description: "Use when applies to service businesses (plumbers, lawyers, consultants) serving multiple regions. Use when planning local SEO strategy for businesses without brick-and-mortar locations in every city."
metadata:
  category: seo
  priority: medium
  difficulty: intermediate
  estimatedTime: "10"
  source: frontendchecklist.io
  url: https://frontendchecklist.io/rules/seo/service-area
---

# Service Area Pages

Service-area pages allow businesses to rank for geo-modified queries ('plumber in Austin') in areas where they have no physical storefront — but thin, templated location pages are penalised by Google as doorway pages.

## Quick Reference

- Create individual pages for each city/region served, with unique, locally relevant content
- Use `LocalBusiness` schema with `areaServed` to declare service coverage without physical locations
- Avoid creating identical pages per location that differ only in the city name (doorway pages)
- Include local signals: nearby landmarks, local case studies, region-specific FAQs

## Check

Identify if the site serves multiple geographic areas. If so, check for dedicated pages per service area. Verify each page has unique content beyond just swapping city names. Check for `LocalBusiness` schema with `areaServed` property. Flag pages that appear to be thin templated clones.

## Fix

For each service area, create a page with: unique title targeting `[Service] in [City]`, locally specific content (references to local context, testimonials from local clients, area-specific FAQs). Add `LocalBusiness` schema with `areaServed` listing covered regions. Ensure each page has at least 300 words of unique content.

## Explain

Explain the difference between a legitimate service-area page and a spam doorway page, how Google's Helpful Content guidance applies to location pages, and how LocalBusiness schema communicates service areas to search engines.

## Code Review

Review metadata generation, rendered HTML, structured data, and response headers related to Service Area Pages. Flag exact routes or templates where search-facing output violates the rule, and describe how to verify the final page output.

---

For full implementation details, code examples, and framework-specific guidance,
see `references/rule.md`.

Rule page: https://frontendchecklist.io/rules/seo/service-area
