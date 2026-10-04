---
name: aria-progressbar-name
description: "Use when reviewing rendered HTML, interactive components, or design-system patterns related to Provide accessible names for progress bars. Check native semantics first, then inspect keyboard behavior, focus flow, accessible names, and screen-reader output where relevant."
metadata:
  category: accessibility
  priority: medium
  difficulty: intermediate
  estimatedTime: "10"
  source: frontendchecklist.io
  url: https://frontendchecklist.io/rules/accessibility/aria-progressbar-name
---

# Provide accessible names for progress bars

Without an accessible name, screen reader users will only hear that a progress bar exists but won't know what task or process it represents.

## Quick Reference

- Use `aria-label` or `aria-labelledby` to name progress bars
- Ensure the name describes what the progress indicates
- Avoid redundant text like "progress" in the label
- Provide `aria-valuenow`, `aria-valuemin`, and `aria-valuemax` when the value is known
- Visual progress meters should use real progress semantics rather than decorative divs when they communicate status

## Check

Check if all progress bar elements (role="progressbar") have an accessible name via aria-label or aria-labelledby.

## Fix

Add an aria-label or aria-labelledby attribute to the progress bar to describe what it is measuring.

## Explain

Explain why progress bars need accessible names for screen reader users to understand the context of the loading state.

## Code Review

Review the rendered markup and interactive states that affect Provide accessible names for progress bars. Flag exact elements, roles, labels, focus behavior, or keyboard interactions that violate the rule, and note how to verify the fix with browser accessibility tooling or assistive tech.

---

For full implementation details, code examples, and framework-specific guidance,
see `references/rule.md`.

Rule page: https://frontendchecklist.io/rules/accessibility/aria-progressbar-name
