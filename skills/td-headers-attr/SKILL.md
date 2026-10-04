---
name: td-headers-attr
description: "Use when reviewing rendered HTML, interactive components, or design-system patterns related to Link table cells to headers using IDs. Check native semantics first, then inspect keyboard behavior, focus flow, accessible names, and screen-reader output where relevant."
metadata:
  category: accessibility
  priority: medium
  difficulty: intermediate
  estimatedTime: "10"
  source: frontendchecklist.io
  url: https://frontendchecklist.io/rules/accessibility/td-headers-attr
---

# Link table cells to headers using IDs

In complex tables with multi-level headers, explicit header-to-cell linking ensures screen readers accurately announce the relationship between data and its context.

## Quick Reference

- Use the `headers` attribute for complex tables where `scope` isn't enough
- Ensure the `headers` attribute references valid `id` values of `<th>` elements
- Separate multiple header IDs with spaces

## Check

Verify that `td` headers attributes reference valid and existing `th` IDs.

## Fix

Correct the `headers` attribute to reference the appropriate `th` IDs.

## Explain

Explain when to use the `headers` attribute instead of `scope` for complex table structures.

## Code Review

Review the rendered markup and interactive states that affect Link table cells to headers using IDs. Flag exact elements, roles, labels, focus behavior, or keyboard interactions that violate the rule, and note how to verify the fix with browser accessibility tooling or assistive tech.

---

For full implementation details, code examples, and framework-specific guidance,
see `references/rule.md`.

Rule page: https://frontendchecklist.io/rules/accessibility/td-headers-attr
