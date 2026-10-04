---
name: meta-in-body
description: "Use when auditing HTML document structure. Applies to any page where meta tags (noindex, canonical-url, description, viewport, OG tags) may have been injected into the body by CMS plugins, widgets, or JavaScript rendering."
metadata:
  category: seo
  priority: high
  difficulty: beginner
  estimatedTime: "5"
  source: frontendchecklist.io
  url: https://frontendchecklist.io/rules/seo/meta-in-body
---

# Meta Tags in Body

Meta tags placed in the document body are ignored by search engines and most browsers—directives like noindex or canonical-url are silently ineffective, causing pages to be indexed or de-indexed unexpectedly.

## Quick Reference

- All <meta> tags must appear inside <head>, never inside <body>
- Browsers may ignore or move misplaced meta tags, making them ineffective
- Crawlers like Googlebot only process meta tags found in <head>
- Validate with HTML validator or inspect parsed DOM to confirm placement

## Check

Parse the HTML and check whether any <meta> elements appear outside <head>—i.e., inside <body> or after the </head> closing tag. Flag each misplaced tag by name/property.

## Fix

Move all <meta> tags into the <head> section before </head>. If they are injected by a script after the DOM is built, refactor the injection to target document.head instead of document.body.

## Explain

Meta tags are document-level metadata and must live in <head>. When placed in <body>, they fall outside the metadata model of the document—search engines and browsers do not honour them, so directives like noindex or canonical-url will have no effect.

## Code Review

Parse the rendered HTML and check the DOM structure. Find all <meta> elements. For each one, traverse up the parent chain — if any ancestor is <body> or if the element appears after </head> in the source, flag it. Pay special attention to: meta name='robots', meta name='description', meta property='og:*', and link rel='canonical' placed in body.

---

For full implementation details, code examples, and framework-specific guidance,
see `references/rule.md`.

Rule page: https://frontendchecklist.io/rules/seo/meta-in-body
