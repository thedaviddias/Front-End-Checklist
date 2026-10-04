---
name: anchor-text
description: "Use when auditing metadata, crawlability, structured data, or indexability related to Use descriptive anchor text. Verify the rendered HTML and HTTP response rather than relying only on source files."
metadata:
  category: seo
  priority: medium
  difficulty: beginner
  estimatedTime: "5"
  source: frontendchecklist.io
  url: https://frontendchecklist.io/rules/seo/anchor-text
---

# Use descriptive anchor text

Descriptive anchor text helps search engines understand the context of the linked page and significantly improves accessibility for users using screen readers.

## Quick Reference

- Use descriptive text for links instead of generic phrases like 'click here' or 'read more'
- Ensure the anchor text provides clear context about the linked page's content
- Avoid over-optimizing with excessive keyword stuffing in your internal links

## Check

Verify that all links in the content use descriptive anchor text that accurately describes the target page.

## Fix

Replace generic link text like 'click here' with descriptive phrases that include relevant keywords for the destination page.

## Explain

Explain how descriptive anchor text improves both SEO crawlability and web accessibility for disabled users.

## Code Review

Review metadata generation, rendered HTML, structured data, and response headers related to Use descriptive anchor text. Flag exact routes or templates where search-facing output violates the rule, and describe how to verify the final page output.

---

For full implementation details, code examples, and framework-specific guidance,
see `references/rule.md`.

Rule page: https://frontendchecklist.io/rules/seo/anchor-text
