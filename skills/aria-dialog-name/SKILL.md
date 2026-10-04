---
name: aria-dialog-name
description: "Use when reviewing rendered HTML, interactive components, or design-system patterns related to Ensure dialogs have an accessible name. Check native semantics first, then inspect keyboard behavior, focus flow, accessible names, and screen-reader output where relevant."
metadata:
  category: accessibility
  priority: medium
  difficulty: intermediate
  estimatedTime: "10"
  source: frontendchecklist.io
  url: https://frontendchecklist.io/rules/accessibility/aria-dialog-name
---

# Ensure dialogs have an accessible name

When a dialog opens, screen readers should announce its purpose immediately so users know why their focus has shifted and what information is required.

## Quick Reference

- All dialog and alertdialog elements must have a descriptive label
- Use `aria-labelledby` to point to a title or `aria-label` for a direct string
- Helps users understand the context and purpose of the modal

## Check

Verify that every element with `role="dialog"` or `role="alertdialog"` has an accessible name.

## Fix

Provide an accessible name for the dialog using `aria-labelledby` (pointing to the header) or `aria-label`.

## Explain

Explain why naming dialogs is crucial for orienting screen reader users when modals appear.

## Code Review

Review the rendered markup and interactive states that affect Ensure dialogs have an accessible name. Flag exact elements, roles, labels, focus behavior, or keyboard interactions that violate the rule, and note how to verify the fix with browser accessibility tooling or assistive tech.

---

For full implementation details, code examples, and framework-specific guidance,
see `references/rule.md`.

Rule page: https://frontendchecklist.io/rules/accessibility/aria-dialog-name
