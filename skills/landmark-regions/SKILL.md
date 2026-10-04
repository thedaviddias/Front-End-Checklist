---
name: landmark-regions
description: "Use when reviewing rendered HTML, interactive components, or design-system patterns related to Use landmark regions correctly. Check native semantics first, then inspect keyboard behavior, focus flow, accessible names, and screen-reader output where relevant."
metadata:
  category: accessibility
  priority: medium
  difficulty: intermediate
  estimatedTime: "10"
  source: frontendchecklist.io
  url: https://frontendchecklist.io/rules/accessibility/landmark-regions
---

# Use landmark regions correctly

Landmark regions allow screen reader users to quickly identify and jump to major sections of a page, significantly improving navigation efficiency.

## Quick Reference

- Use HTML5 landmark elements like `<header>`, `<nav>`, `<main>`, and `<footer>`
- Ensure each landmark appears only once where appropriate (e.g., one `<main>`)
- Provide labels for multiple landmarks of the same type using `aria-label`

## Check

Verify that the page uses appropriate HTML5 landmark elements and that they are correctly structured.

## Fix

Replace generic `<div>` containers with semantic landmark elements like `<header>`, `<nav>`, `<main>`, and `<footer>`.

## Explain

Explain how landmark regions assist assistive technology users in navigating complex page layouts.

## Code Review

Review the rendered markup and interactive states that affect Use landmark regions correctly. Flag exact elements, roles, labels, focus behavior, or keyboard interactions that violate the rule, and note how to verify the fix with browser accessibility tooling or assistive tech.

---

For full implementation details, code examples, and framework-specific guidance,
see `references/rule.md`.

Rule page: https://frontendchecklist.io/rules/accessibility/landmark-regions
