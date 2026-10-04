---
name: aria-command-name
description: "Use when reviewing rendered HTML, interactive components, or design-system patterns related to Provide accessible names for ARIA command elements. Check native semantics first, then inspect keyboard behavior, focus flow, accessible names, and screen-reader output where relevant."
metadata:
  category: accessibility
  priority: medium
  difficulty: intermediate
  estimatedTime: "10"
  source: frontendchecklist.io
  url: https://frontendchecklist.io/rules/accessibility/aria-command-name
---

# Provide accessible names for ARIA command elements

Without an accessible name, screen reader users will only hear the role (e.g., 'button') without knowing what it does, making the interface impossible to navigate.

## Quick Reference

- Elements with command roles (button, link, menuitem) must have a label
- Accessible names can be provided via text content, `aria-label`, or `aria-labelledby`
- Ensures users know the purpose of the interactive element

## Check

Identify elements with command roles (like button or link) that lack a clear accessible name.

## Fix

Add an accessible name using inner text, `aria-label`, or `aria-labelledby` to all command elements.

## Explain

Explain how accessible names for command elements enable screen reader users to understand interactive controls.

## Code Review

Review the rendered markup and interactive states that affect Provide accessible names for ARIA command elements. Flag exact elements, roles, labels, focus behavior, or keyboard interactions that violate the rule, and note how to verify the fix with browser accessibility tooling or assistive tech.

---

For full implementation details, code examples, and framework-specific guidance,
see `references/rule.md`.

Rule page: https://frontendchecklist.io/rules/accessibility/aria-command-name
