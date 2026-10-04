---
name: breadcrumb
description: "Use when auditing metadata, crawlability, structured data, or indexability related to Implement valid BreadcrumbList schema. Verify the rendered HTML and HTTP response rather than relying only on source files."
metadata:
  category: seo
  priority: medium
  difficulty: intermediate
  estimatedTime: "10"
  source: frontendchecklist.io
  url: https://frontendchecklist.io/rules/seo/breadcrumb
---

# Implement valid BreadcrumbList schema

Breadcrumbs help search engines understand your site's structure and often appear in search results, improving navigation and click-through rates.

## Quick Reference

- Add `BreadcrumbList` structured data only when the page has a visible, meaningful breadcrumb trail
- Ensure the breadcrumb path matches the visible trail and the site's logical hierarchy
- Use JSON-LD to mark up each item in the breadcrumb trail correctly

## Check

Verify that the page contains valid `BreadcrumbList` structured data matching the visible breadcrumbs.

## Fix

Implement a JSON-LD script that defines each level of the page's hierarchy using `ListItem` properties.

## Explain

Explain how breadcrumb schema replaces URLs in search results with a more readable navigation path.

## Code Review

Review metadata generation, rendered HTML, structured data, and response headers related to Implement valid BreadcrumbList schema. Flag exact routes or templates where search-facing output violates the rule, and describe how to verify the final page output.

---

For full implementation details, code examples, and framework-specific guidance,
see `references/rule.md`.

Rule page: https://frontendchecklist.io/rules/seo/breadcrumb
