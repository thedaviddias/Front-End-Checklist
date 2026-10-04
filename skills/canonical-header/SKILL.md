---
name: canonical-header
description: "Use when auditing metadata, crawlability, structured data, or indexability related to Sync HTML canonical tags and Link headers. Verify the rendered HTML and HTTP response rather than relying only on source files."
metadata:
  category: seo
  priority: medium
  difficulty: intermediate
  estimatedTime: "10"
  source: frontendchecklist.io
  url: https://frontendchecklist.io/rules/seo/canonical-header
---

# Sync HTML canonical tags and Link headers

Conflicting canonical-url signals can lead search engines to ignore both declarations, potentially causing duplicate content issues and incorrect indexing.

## Quick Reference

- Ensure the `rel="canonical"` tag in your HTML matches the `Link` canonical-url header if both are used
- Avoid sending conflicting signals to search engines about the primary version of a page
- Maintain consistency across all methods of declaring your canonical URL

## Check

Compare the HTML canonical tag with the HTTP Link header to ensure they point to the exact same URL.

## Fix

Update either the HTML tag or the HTTP header so that they provide a consistent canonical URL signal.

## Explain

Explain the risks of sending conflicting technical SEO signals to search engine crawlers.

## Code Review

Review metadata generation, rendered HTML, structured data, and response headers related to Sync HTML canonical tags and Link headers. Flag exact routes or templates where search-facing output violates the rule, and describe how to verify the final page output.

---

For full implementation details, code examples, and framework-specific guidance,
see `references/rule.md`.

Rule page: https://frontendchecklist.io/rules/seo/canonical-header
