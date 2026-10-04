---
name: table-headers
description: "Use when reviewing rendered HTML, interactive components, or design-system patterns related to Define proper table headers. Check native semantics first, then inspect keyboard behavior, focus flow, accessible names, and screen-reader output where relevant."
metadata:
  category: accessibility
  priority: medium
  difficulty: intermediate
  estimatedTime: "10"
  source: frontendchecklist.io
  url: https://frontendchecklist.io/rules/accessibility/table-headers
---

# Define proper table headers

Properly defined headers allow screen readers to announce the context for each data cell, making complex tables understandable.

## Quick Reference

- Use `<th>` for all table headers, not `<td>`
- Apply `scope="col"` or `scope="row"` to clarify header relationship
- Ensure every data cell is associated with at least one header
- In simple tables, prefer fixing header associations before escalating to caption-level recommendations
- Missing `scope="col"` on a straightforward header row is often the clearest first fix

## Check

Check that all data tables use `<th>` elements for headers with appropriate scope attributes.

## Fix

Convert header cells to `<th>` and add the correct `scope` attribute.

## Explain

Explain how `<th>` and `scope` help assistive technologies communicate the structure of data tables.

## Code Review

Review the rendered markup and interactive states that affect Define proper table headers. Flag exact elements, roles, labels, focus behavior, or keyboard interactions that violate the rule, and note how to verify the fix with browser accessibility tooling or assistive tech.

---

For full implementation details, code examples, and framework-specific guidance,
see `references/rule.md`.

Rule page: https://frontendchecklist.io/rules/accessibility/table-headers
