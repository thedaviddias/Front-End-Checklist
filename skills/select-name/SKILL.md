---
name: select-name
description: "Use when reviewing rendered HTML, interactive components, or design-system patterns related to Provide accessible names for select elements. Check native semantics first, then inspect keyboard behavior, focus flow, accessible names, and screen-reader output where relevant."
metadata:
  category: accessibility
  priority: medium
  difficulty: intermediate
  estimatedTime: "10"
  source: frontendchecklist.io
  url: https://frontendchecklist.io/rules/accessibility/select-name
---

# Provide accessible names for select elements

Without an accessible name, screen reader users will not know what information the dropdown is asking for, making forms impossible to complete.

## Quick Reference

- Use the `<label>` element with a matching `for` attribute for every `<select>`
- Alternatively, use `aria-label` or `aria-labelledby` if a visible label is not possible
- Avoid using the first option as a replacement for a proper label

## Check

Check that every `<select>` element in your forms has a valid accessible name or linked label.

## Fix

Add a `<label>` element with a `for` attribute that matches the `id` of the `<select>` tag.

## Explain

Explain how accessible names for select elements provide the necessary context for users of assistive technologies.

## Code Review

Review the rendered markup and interactive states that affect Provide accessible names for select elements. Flag exact elements, roles, labels, focus behavior, or keyboard interactions that violate the rule, and note how to verify the fix with browser accessibility tooling or assistive tech.

---

For full implementation details, code examples, and framework-specific guidance,
see `references/rule.md`.

Rule page: https://frontendchecklist.io/rules/accessibility/select-name
