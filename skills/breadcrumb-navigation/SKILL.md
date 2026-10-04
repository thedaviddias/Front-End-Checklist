---
name: breadcrumb-navigation
description: "Use when reviewing templates, rendered HTML, or shared components related to Implement accessible breadcrumb navigation. Validate the final browser-facing markup, not just the source framework abstraction."
metadata:
  category: html
  priority: medium
  difficulty: beginner
  estimatedTime: "15"
  source: frontendchecklist.io
  url: https://frontendchecklist.io/rules/html/breadcrumb-navigation
---

# Implement accessible breadcrumb navigation

Proper breadcrumb markup helps screen reader users understand site hierarchy and their current location, while also improving SEO through structured data.

## Quick Reference

- Use nav element with aria-label='Breadcrumb'
- Use ordered list (ol) for semantic structure
- Mark current page with aria-current='page'
- Keep any structured data aligned with the visible breadcrumb trail

## Check

Verify breadcrumbs use nav element with aria-label, ordered list markup, and aria-current for the current page.

## Fix

Implement breadcrumbs using semantic nav, ol/li structure, and proper ARIA attributes including aria-current='page'.

## Explain

Explain how properly marked up breadcrumbs improve navigation, SEO, and screen reader accessibility.

## Code Review

Review templates, server-rendered HTML, and shared components that output markup related to Implement accessible breadcrumb navigation. Flag exact elements, attributes, and routes where the rendered HTML violates the rule.

---

For full implementation details, code examples, and framework-specific guidance,
see `references/rule.md`.

Rule page: https://frontendchecklist.io/rules/html/breadcrumb-navigation
