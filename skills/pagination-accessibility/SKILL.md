---
name: pagination-accessibility
description: "Use when reviewing templates, rendered HTML, or shared components related to Make pagination accessible. Validate the final browser-facing markup, not just the source framework abstraction."
metadata:
  category: html
  priority: medium
  difficulty: beginner
  estimatedTime: "20"
  source: frontendchecklist.io
  url: https://frontendchecklist.io/rules/html/pagination-accessibility
---

# Make pagination accessible

Without proper markup, screen reader users cannot understand which page they're on or navigate efficiently through paginated content.

## Quick Reference

- Use nav element with aria-label='Pagination'
- Mark current page with aria-current='page'
- Provide clear labels for previous/next buttons
- Announce page changes to screen readers

## Check

Verify pagination uses nav element with aria-label, indicates current page with aria-current, and is keyboard navigable.

## Fix

Implement pagination with nav role='navigation', aria-label, aria-current='page' for active page, and focusable controls.

## Explain

Explain how accessible pagination helps screen reader users understand their position and navigate through paged content.

## Code Review

Review templates, server-rendered HTML, and shared components that output markup related to Make pagination accessible. Flag exact elements, attributes, and routes where the rendered HTML violates the rule.

---

For full implementation details, code examples, and framework-specific guidance,
see `references/rule.md`.

Rule page: https://frontendchecklist.io/rules/html/pagination-accessibility
