---
name: tabindex
description: "Use when reviewing rendered HTML, interactive components, or design-system patterns related to Use appropriate tabindex values. Check native semantics first, then inspect keyboard behavior, focus flow, accessible names, and screen-reader output where relevant."
metadata:
  category: accessibility
  priority: medium
  difficulty: intermediate
  estimatedTime: "10"
  source: frontendchecklist.io
  url: https://frontendchecklist.io/rules/accessibility/tabindex
---

# Use appropriate tabindex values

Incorrect tabindex values can create a confusing navigation experience, making it difficult for keyboard users to predict where focus will move next.

## Quick Reference

- Stick to `tabindex="0"` for custom interactive elements
- Use `tabindex="-1"` for elements that should only be focusable via script
- Avoid positive values (1, 2, 3...) which break natural tab order

## Check

Check for any positive tabindex values and ensure custom interactive elements are focusable.

## Fix

Remove positive tabindex values and use `tabindex="0"` or `-1` appropriately.

## Explain

Explain why positive tabindex values are problematic for keyboard navigation and user experience.

## Code Review

Review the rendered markup and interactive states that affect Use appropriate tabindex values. Flag exact elements, roles, labels, focus behavior, or keyboard interactions that violate the rule, and note how to verify the fix with browser accessibility tooling or assistive tech.

---

For full implementation details, code examples, and framework-specific guidance,
see `references/rule.md`.

Rule page: https://frontendchecklist.io/rules/accessibility/tabindex
