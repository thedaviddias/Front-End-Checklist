---
name: list-structure
description: "Use when reviewing rendered HTML, interactive components, or design-system patterns related to Use correct list structure. Check native semantics first, then inspect keyboard behavior, focus flow, accessible names, and screen-reader output where relevant."
metadata:
  category: accessibility
  priority: medium
  difficulty: intermediate
  estimatedTime: "10"
  source: frontendchecklist.io
  url: https://frontendchecklist.io/rules/accessibility/list-structure
---

# Use correct list structure

Screen readers rely on a specific parent-child relationship for lists to correctly announce the number of items and the user's current position within the list.

## Quick Reference

- Unordered (`<ul>`) and ordered (`<ol>`) lists must only contain `<li>` elements
- Do not put other elements like `<div>` or `<p>` directly inside a list
- Ensure nested lists are also properly contained within an `<li>` element

## Check

Check the structure of all lists to ensure only `<li>` elements are direct children of `<ul>` or `<ol>`.

## Fix

Remove or move any non-`li` elements from within `<ul>` and `<ol>` tags.

## Explain

Explain why assistive technology needs a consistent list structure to provide accurate navigation information.

## Code Review

Review the rendered markup and interactive states that affect Use correct list structure. Flag exact elements, roles, labels, focus behavior, or keyboard interactions that violate the rule, and note how to verify the fix with browser accessibility tooling or assistive tech.

---

For full implementation details, code examples, and framework-specific guidance,
see `references/rule.md`.

Rule page: https://frontendchecklist.io/rules/accessibility/list-structure
