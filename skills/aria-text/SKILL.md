---
name: aria-text
description: "Use when reviewing rendered HTML, interactive components, or design-system patterns related to Avoid focusable descendants in role='text' elements. Check native semantics first, then inspect keyboard behavior, focus flow, accessible names, and screen-reader output where relevant."
metadata:
  category: accessibility
  priority: medium
  difficulty: intermediate
  estimatedTime: "10"
  source: frontendchecklist.io
  url: https://frontendchecklist.io/rules/accessibility/aria-text
---

# Avoid focusable descendants in role="text" elements

Using `role="text"` on a container forces screen readers to treat everything inside as a single string of text, which effectively hides any interactive elements from users who rely on assistive technology.

## Quick Reference

- Elements with `role="text"` should not contain interactive children (links, buttons)
- Ensure `role="text"` only contains static text content
- Prevent accessibility "black holes" where interactive items are hidden from screen readers

## Check

Identify elements with role="text" and verify they do not contain any focusable elements like buttons, links, or inputs.

## Fix

Remove role="text" from containers that have interactive children or move the interactive elements outside.

## Explain

Explain how role="text" overrides the semantics of descendant elements, making interactive components inaccessible to screen reader users.

## Code Review

Review the rendered markup and interactive states that affect Avoid focusable descendants in role="text" elements. Flag exact elements, roles, labels, focus behavior, or keyboard interactions that violate the rule, and note how to verify the fix with browser accessibility tooling or assistive tech.

---

For full implementation details, code examples, and framework-specific guidance,
see `references/rule.md`.

Rule page: https://frontendchecklist.io/rules/accessibility/aria-text
