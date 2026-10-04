---
name: accessible-tables
description: "Use when reviewing rendered HTML, interactive components, or design-system patterns related to Use semantic table markup for screen readers. Check native semantics first, then inspect keyboard behavior, focus flow, accessible names, and screen-reader output where relevant."
metadata:
  category: accessibility
  priority: medium
  difficulty: intermediate
  estimatedTime: "20"
  source: frontendchecklist.io
  url: https://frontendchecklist.io/rules/accessibility/accessible-tables
---

# Use semantic table markup for screen readers

Screen readers read table data cell-by-cell—without proper headers, users hear meaningless numbers without context. 'Row 3, Column 2: $99' vs just '$99'.

## Quick Reference

- Use <th> elements for headers with scope='col' or scope='row'
- Add <caption> to describe the table's purpose
- Never use tables for layout—use CSS Grid or Flexbox instead
- Use id/headers for complex tables with merged cells
- For simple tables with a clear adjacent section heading, missing `scope` is often a stronger finding than missing `<caption>`
- Prefer one strong table-semantics finding over multiple weaker enhancements on the same simple table

## Check

Verify tables use proper th elements with scope, caption or aria-labelledby, and semantic table structure.

## Fix

Add proper table headers with scope attributes, captions for context, and ensure tables are not used for layout.

## Explain

Explain how proper table markup helps screen reader users understand data relationships and navigate table content.

## Code Review

Review the rendered markup and interactive states that affect Use semantic table markup for screen readers. Flag exact elements, roles, labels, focus behavior, or keyboard interactions that violate the rule, and note how to verify the fix with browser accessibility tooling or assistive tech.

---

For full implementation details, code examples, and framework-specific guidance,
see `references/rule.md`.

Rule page: https://frontendchecklist.io/rules/accessibility/accessible-tables
