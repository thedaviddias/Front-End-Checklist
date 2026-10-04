---
name: th-has-data-cells
description: "Use when reviewing rendered HTML, interactive components, or design-system patterns related to Ensure table headers associate with data cells. Check native semantics first, then inspect keyboard behavior, focus flow, accessible names, and screen-reader output where relevant."
metadata:
  category: accessibility
  priority: medium
  difficulty: intermediate
  estimatedTime: "10"
  source: frontendchecklist.io
  url: https://frontendchecklist.io/rules/accessibility/th-has-data-cells
---

# Ensure table headers associate with data cells

Orphaned headers without data cells can confuse users of assistive technology and indicate a broken table structure.

## Quick Reference

- Every `<th>` must be associated with one or more `<td>` cells
- Avoid empty headers that don't describe any data
- Remove unnecessary headers to reduce screen reader noise

## Check

Verify that all `<th>` elements are correctly associated with data cells.

## Fix

Remove empty headers or ensure they are correctly mapped to data cells.

## Explain

Explain why every header must have associated data to maintain an accessible table structure.

## Code Review

Review the rendered markup and interactive states that affect Ensure table headers associate with data cells. Flag exact elements, roles, labels, focus behavior, or keyboard interactions that violate the rule, and note how to verify the fix with browser accessibility tooling or assistive tech.

---

For full implementation details, code examples, and framework-specific guidance,
see `references/rule.md`.

Rule page: https://frontendchecklist.io/rules/accessibility/th-has-data-cells
