---
name: structured-data
description: "Use when auditing metadata, crawlability, structured data, or indexability related to Add structured data markup. Verify the rendered HTML and HTTP response rather than relying only on source files."
metadata:
  category: seo
  priority: high
  difficulty: intermediate
  estimatedTime: "25"
  source: frontendchecklist.io
  url: https://frontendchecklist.io/rules/seo/structured-data
---

# Add structured data markup

Structured data enables rich snippets with stars, prices, images, and FAQ dropdowns in search results—significantly increasing click-through rates.

## Quick Reference

- Structured data enables rich snippets in search results
- Use JSON-LD format (Google recommended)
- Common types: Article, Product, FAQ, HowTo, LocalBusiness
- Validate with Google Rich Results Test

## Check

Analyze if this webpage implements structured data using Schema.org vocabulary. Check for JSON-LD, Microdata, or RDFa markup.

## Fix

Add appropriate Schema.org structured data to this webpage based on its content type (Article, Product, LocalBusiness, etc.).

## Explain

Explain how structured data helps search engines understand page content and enables rich snippets in search results.

## Code Review

Review metadata generation, rendered HTML, structured data, and response headers related to Add structured data markup. Flag exact routes or templates where search-facing output violates the rule, and describe how to verify the final page output.

---

For full implementation details, code examples, and framework-specific guidance,
see `references/rule.md`.

Rule page: https://frontendchecklist.io/rules/seo/structured-data
