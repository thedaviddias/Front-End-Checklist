---
name: author-info
description: "Use when auditing metadata, crawlability, structured data, or indexability related to Implement comprehensive author markup. Verify the rendered HTML and HTTP response rather than relying only on source files."
metadata:
  category: seo
  priority: medium
  difficulty: intermediate
  estimatedTime: "15"
  source: frontendchecklist.io
  url: https://frontendchecklist.io/rules/seo/author-info
---

# Implement comprehensive author markup

Structured author information helps search engines uniquely identify authors across the web, building an authority profile that can benefit your site's rankings.

## Quick Reference

- Use JSON-LD to provide detailed metadata about the author (Person or Organization)
- Include properties like `name`, `url`, `sameAs`, and `jobTitle`
- Connect author markup to the main `Article` or `WebPage` schema

## Check

Verify that the page includes structured data identifying the author with relevant metadata.

## Fix

Add a `Person` or `Organization` schema to your JSON-LD block and link it to the `author` property of your content.

## Explain

Explain how 'sameAs' properties in schema help search engines connect an author to their other authoritative profiles.

## Code Review

Review metadata generation, rendered HTML, structured data, and response headers related to Implement comprehensive author markup. Flag exact routes or templates where search-facing output violates the rule, and describe how to verify the final page output.

---

For full implementation details, code examples, and framework-specific guidance,
see `references/rule.md`.

Rule page: https://frontendchecklist.io/rules/seo/author-info
