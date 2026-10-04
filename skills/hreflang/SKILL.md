---
name: hreflang
description: "Use when auditing metadata, crawlability, structured data, or indexability related to Add hreflang tags for multilingual sites. Verify the rendered HTML and HTTP response rather than relying only on source files."
metadata:
  category: i18n
  priority: medium
  difficulty: intermediate
  estimatedTime: "20"
  source: frontendchecklist.io
  url: https://frontendchecklist.io/rules/i18n/hreflang
---

# Add hreflang tags for multilingual sites

Without hreflang, users searching in French might see your English page—proper implementation ensures the right language version appears in search results for each region.

## Quick Reference

- hreflang tells search engines which language version to show users
- Always include x-default for fallback/language selector pages
- Must be reciprocal—all pages must link to all variations
- Use ISO 639-1 language codes and ISO 3166-1 Alpha-2 regions

## Check

Check if this multilingual website properly implements hreflang tags for language and regional targeting.

## Fix

Add appropriate hreflang tags to indicate language and regional variations of this page.

## Explain

Explain how hreflang tags help search engines serve the correct language version to users in different regions.

## Code Review

Review metadata generation, rendered HTML, structured data, and response headers related to Add hreflang tags for multilingual sites. Flag exact routes or templates where search-facing output violates the rule, and describe how to verify the final page output.

---

For full implementation details, code examples, and framework-specific guidance,
see `references/rule.md`.

Rule page: https://frontendchecklist.io/rules/i18n/hreflang
