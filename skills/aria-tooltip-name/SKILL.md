---
name: aria-tooltip-name
description: "Use when reviewing rendered HTML, interactive components, or design-system patterns related to Provide accessible names for tooltips. Check native semantics first, then inspect keyboard behavior, focus flow, accessible names, and screen-reader output where relevant."
metadata:
  category: accessibility
  priority: medium
  difficulty: intermediate
  estimatedTime: "10"
  source: frontendchecklist.io
  url: https://frontendchecklist.io/rules/accessibility/aria-tooltip-name
---

# Provide accessible names for tooltips

Tooltips often contain essential information; if they aren't properly named or associated with an element, that information remains hidden from screen reader users.

## Quick Reference

- Tooltips must have an accessible name or be referenced by `aria-describedby`
- Ensure the tooltip content is actually accessible to assistive technology
- Verify that tooltips are correctly associated with their trigger elements

## Check

Verify that all elements with role="tooltip" have an accessible name or are linked to a trigger element via aria-describedby.

## Fix

Assign an accessible name to the tooltip or ensure it is correctly referenced by the element it describes.

## Explain

Explain how to correctly associate tooltips with triggers so that screen readers announce the extra information.

## Code Review

Review the rendered markup and interactive states that affect Provide accessible names for tooltips. Flag exact elements, roles, labels, focus behavior, or keyboard interactions that violate the rule, and note how to verify the fix with browser accessibility tooling or assistive tech.

---

For full implementation details, code examples, and framework-specific guidance,
see `references/rule.md`.

Rule page: https://frontendchecklist.io/rules/accessibility/aria-tooltip-name
