---
name: duplicate-id-active
description: "Use when reviewing rendered HTML, interactive components, or design-system patterns related to Use unique IDs for active elements. Check native semantics first, then inspect keyboard behavior, focus flow, accessible names, and screen-reader output where relevant."
metadata:
  category: accessibility
  priority: high
  difficulty: intermediate
  estimatedTime: "10"
  source: frontendchecklist.io
  url: https://frontendchecklist.io/rules/accessibility/duplicate-id-active
---

# Use unique IDs for active elements

Duplicate IDs on active elements can cause browsers and assistive technologies to skip items, misdirect focus, or fail to trigger the correct action.

## Quick Reference

- Ensure all focusable elements (links, buttons, inputs) have unique id values
- Avoid duplicate IDs that can break keyboard navigation and focus management
- Prevent screen reader confusion when navigating interactive controls

## Check

Search for duplicate id attributes on focusable or active HTML elements.

## Fix

Assign a unique id to each active element to ensure correct focus handling and accessibility.

## Explain

Explain how unique IDs on active elements prevent navigation errors for keyboard and screen reader users.

## Code Review

Review the rendered markup and interactive states that affect Use unique IDs for active elements. Flag exact elements, roles, labels, focus behavior, or keyboard interactions that violate the rule, and note how to verify the fix with browser accessibility tooling or assistive tech.

---

For full implementation details, code examples, and framework-specific guidance,
see `references/rule.md`.

Rule page: https://frontendchecklist.io/rules/accessibility/duplicate-id-active
