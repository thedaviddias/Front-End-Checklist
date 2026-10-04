---
name: website-search
description: "Use when applies to sites with internal site search functionality. Use when optimizing branded search result appearance or adding structured data for the first time."
metadata:
  category: seo
  priority: low
  difficulty: beginner
  estimatedTime: "10"
  source: frontendchecklist.io
  url: https://frontendchecklist.io/rules/seo/website-search
---

# WebSite Search Schema

The Sitelinks Searchbox lets users search your site directly from Google's search results page, reducing friction for brand-aware users and increasing the click-through quality from branded queries.

## Quick Reference

- Add `WebSite` schema with `SearchAction` to signal that your site has search functionality to Google
- This enables Google to show a Sitelinks Searchbox below your brand's search result for branded queries
- The Searchbox only appears at Google's discretion — the schema is a signal, not a guarantee
- The `query-input` property must follow the format `required name=search_term_string`

## Check

Check the homepage (or primary entry URL) for a `<script type='application/ld+json'>` block with `"@type": "WebSite"` and a `potentialAction` of type `SearchAction`. Verify `target` is a valid search URL template and `query-input` is correctly set.

## Fix

Add `WebSite` JSON-LD schema to the homepage `<head>`. Set `url` to the canonical-url homepage URL. Set `potentialAction` with `SearchAction`, `target` pointing to your search results URL with `{search_term_string}` placeholder, and `query-input` as `required name=search_term_string`.

## Explain

Explain how the WebSite SearchAction schema works, what the Sitelinks Searchbox is, why Google may choose not to show it even with valid schema, and how to construct the search URL template.

## Code Review

Review metadata generation, rendered HTML, structured data, and response headers related to WebSite Search Schema. Flag exact routes or templates where search-facing output violates the rule, and describe how to verify the final page output.

---

For full implementation details, code examples, and framework-specific guidance,
see `references/rule.md`.

Rule page: https://frontendchecklist.io/rules/seo/website-search
