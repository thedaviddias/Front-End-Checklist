---
name: canonical-url
description: "Use when auditing metadata, crawlability, structured data, or indexability related to Set canonical URLs for all pages. Verify the rendered HTML and HTTP response rather than relying only on source files."
metadata:
  category: seo
  priority: high
  difficulty: beginner
  estimatedTime: "10"
  source: frontendchecklist.io
  url: https://frontendchecklist.io/rules/seo/canonical-url
---

# Set canonical URLs for all pages

Duplicate content from URL parameters, www vs non-www, or pagination dilutes ranking signals—canonical tags consolidate these signals to the preferred URL.

## Quick Reference

- Canonical URLs tell search engines which version of a page to index
- Prevents duplicate content penalties from URL variations
- Use absolute URLs including protocol and domain
- Self-referencing canonicals are a best practice

## Check

Verify that this page has a canonical URL tag and that it points to the correct preferred version.

## Fix

Add or correct the canonical URL tag in the head section to prevent duplicate content issues.

## Explain

Explain how canonical URLs help search engines understand the preferred version of duplicate or similar pages.

## Code Review

Review metadata generation, rendered HTML, structured data, and response headers related to Set canonical URLs for all pages. Flag exact routes or templates where search-facing output violates the rule, and describe how to verify the final page output.

---

For full implementation details, code examples, and framework-specific guidance,
see `references/rule.md`.

Rule page: https://frontendchecklist.io/rules/seo/canonical-url
