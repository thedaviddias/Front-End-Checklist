---
name: json-ld-valid
description: "Use when generating or auditing any `<script type='application/ld+json'>` blocks, implementing structured data for articles, products, FAQs, breadcrumbs, or local businesses, or investigating why rich results are not appearing in Google Search Console."
metadata:
  category: seo
  priority: medium
  difficulty: intermediate
  estimatedTime: "10"
  source: frontendchecklist.io
  url: https://frontendchecklist.io/rules/seo/json-ld-valid
---

# Use valid JSON-LD structured data

Invalid JSON-LD is silently ignored by Google — there are no error messages in search results, only the absence of rich results. Invalid structured data means no eligibility for rich results (stars, FAQs, breadcrumbs, etc.) that increase click-through rates.

## Quick Reference

- JSON-LD must be valid JSON, reference `@context: 'https://schema.org'`, and include all required properties for the chosen `@type`
- Invalid JSON (unclosed brackets, missing commas) causes the entire block to be silently ignored by Google
- Validate with Google's Rich Results Test before deploying structured data changes

## Check

Find all `<script type='application/ld+json'>` elements on the page. For each: (1) Attempt to parse the content as JSON — flag syntax errors. (2) Verify `@context` is set to `'https://schema.org'`. (3) Verify `@type` is a valid schema.org type. (4) For the detected type, check required properties are present (e.g., Article requires `headline`, `author`, `datePublished`; Product requires `name`; FAQPage requires `mainEntity`). (5) Run through Google's Rich Results Test API if available.

## Fix

1. Parse the JSON-LD with `JSON.parse()` — fix any syntax errors (trailing commas, single quotes, missing brackets).
2. Ensure `@context` is exactly `"https://schema.org"` (not `"http://schema.org"` or omitted).
3. Verify the `@type` value against schema.org types.
4. Add required properties for the type:
   - Article: headline, author (with @type Person and name), datePublished
   - Product: name (and ideally offers, description)
   - FAQPage: mainEntity array with Question and acceptedAnswer
   - BreadcrumbList: itemListElement array with ListItem, position, name, item
5. Validate at https://search.google.com/test/rich-results
6. Validate JSON syntax at https://jsonlint.com


## Explain

Google uses JSON-LD structured data to generate rich results — enhanced search result formats that include stars, images, expandable Q&As, and other features. Invalid JSON-LD is ignored entirely: no rich results are generated, and no error is reported to you. Only by testing with the Rich Results Test can you discover validation failures. Correct, complete JSON-LD is a prerequisite for rich result eligibility.

## Code Review

Extract all `<script type='application/ld+json'>` element contents. Run `JSON.parse()` on each — catch and report parse errors. Validate that `@context` equals `'https://schema.org'`. Check `@type` against a whitelist of common valid types. For each type, validate required properties are present and non-empty. Report the first validation error found for each block.

---

For full implementation details, code examples, and framework-specific guidance,
see `references/rule.md`.

Rule page: https://frontendchecklist.io/rules/seo/json-ld-valid
