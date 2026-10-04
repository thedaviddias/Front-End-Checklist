---
name: table-duplicate-name
description: "Use when reviewing rendered HTML, interactive components, or design-system patterns related to Ensure tables have unique accessible names. Check native semantics first, then inspect keyboard behavior, focus flow, accessible names, and screen-reader output where relevant."
metadata:
  category: accessibility
  priority: medium
  difficulty: intermediate
  estimatedTime: "10"
  source: frontendchecklist.io
  url: https://frontendchecklist.io/rules/accessibility/table-duplicate-name
---

# Ensure tables have unique accessible names

When multiple tables are present, unique names allow users of assistive technology to quickly identify and navigate to the data they need.

## Quick Reference

- Each data table must have a unique `<caption>` or `aria-label`
- Helps screen reader users distinguish between multiple tables
- Avoid repetitive or generic names like 'Table 1'

## Check

Verify that every table has a unique accessible name via caption or ARIA attributes.

## Fix

Add a unique `<caption>` or `aria-label` to the table.

## Explain

Explain why unique table names are necessary for users who rely on screen readers to navigate complex data.

## Code Review

Review the rendered markup and interactive states that affect Ensure tables have unique accessible names. Flag exact elements, roles, labels, focus behavior, or keyboard interactions that violate the rule, and note how to verify the fix with browser accessibility tooling or assistive tech.

---

For full implementation details, code examples, and framework-specific guidance,
see `references/rule.md`.

Rule page: https://frontendchecklist.io/rules/accessibility/table-duplicate-name
