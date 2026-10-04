---
name: landmark-one-main
description: "Use when reviewing rendered HTML, interactive components, or design-system patterns related to Use exactly one main landmark. Check native semantics first, then inspect keyboard behavior, focus flow, accessible names, and screen-reader output where relevant."
metadata:
  category: accessibility
  priority: medium
  difficulty: beginner
  estimatedTime: "5"
  source: frontendchecklist.io
  url: https://frontendchecklist.io/rules/accessibility/landmark-one-main
---

# Use exactly one main landmark

A single main landmark allows keyboard and screen reader users to jump directly to the primary content of the page, bypassing repetitive navigation.

## Quick Reference

- Ensure each page has exactly one `<main>` element
- Avoid multiple elements with `role='main'`
- Provides a clear starting point for the page's primary content

## Check

Count the number of <main> elements or elements with role='main' on the page to ensure there is exactly one.

## Fix

Combine multiple main content areas into a single <main> element or remove the 'role=main' attribute from extra containers.

## Explain

Explain how the main landmark acts as a primary navigation target for assistive technologies, and why multiple main areas cause confusion.

## Code Review

Review the rendered markup and interactive states that affect Use exactly one main landmark. Flag exact elements, roles, labels, focus behavior, or keyboard interactions that violate the rule, and note how to verify the fix with browser accessibility tooling or assistive tech.

---

For full implementation details, code examples, and framework-specific guidance,
see `references/rule.md`.

Rule page: https://frontendchecklist.io/rules/accessibility/landmark-one-main
