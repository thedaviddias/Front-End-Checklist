---
name: aria-hidden-focus
description: "Use when reviewing rendered HTML, interactive components, or design-system patterns related to Remove focusable elements from aria-hidden containers. Check native semantics first, then inspect keyboard behavior, focus flow, accessible names, and screen-reader output where relevant."
metadata:
  category: accessibility
  priority: medium
  difficulty: intermediate
  estimatedTime: "10"
  source: frontendchecklist.io
  url: https://frontendchecklist.io/rules/accessibility/aria-hidden-focus
---

# Remove focusable elements from aria-hidden containers

When a keyboard user tabs into an `aria-hidden` element, the screen reader remains silent, leaving the user with no idea where their focus is or what they can interact with.

## Quick Reference

- Elements with `aria-hidden="true"` must not contain focusable children
- Focusing on a hidden element creates a 'ghost' focus for screen reader users
- Use `tabindex="-1"` or `inert` to properly hide interactive elements

## Check

Scan `aria-hidden="true"` containers for focusable elements like links, buttons, or inputs.

## Fix

Add `tabindex="-1"` to focusable children inside `aria-hidden` containers or use the `inert` attribute.

## Explain

Explain why focusable elements inside aria-hidden containers cause confusion for keyboard and screen reader users.

## Code Review

Review the rendered markup and interactive states that affect Remove focusable elements from aria-hidden containers. Flag exact elements, roles, labels, focus behavior, or keyboard interactions that violate the rule, and note how to verify the fix with browser accessibility tooling or assistive tech.

---

For full implementation details, code examples, and framework-specific guidance,
see `references/rule.md`.

Rule page: https://frontendchecklist.io/rules/accessibility/aria-hidden-focus
