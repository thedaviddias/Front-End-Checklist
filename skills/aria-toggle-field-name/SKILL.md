---
name: aria-toggle-field-name
description: "Use when reviewing rendered HTML, interactive components, or design-system patterns related to Provide accessible names for toggle fields. Check native semantics first, then inspect keyboard behavior, focus flow, accessible names, and screen-reader output where relevant."
metadata:
  category: accessibility
  priority: medium
  difficulty: intermediate
  estimatedTime: "10"
  source: frontendchecklist.io
  url: https://frontendchecklist.io/rules/accessibility/aria-toggle-field-name
---

# Provide accessible names for toggle fields

Toggle fields like checkboxes and switches are unusable for screen reader users if they don't have a label, as the user won't know what they are turning on or off.

## Quick Reference

- Use `aria-label`, `aria-labelledby`, or `<label>` for checkboxes and radios
- Ensure the label clearly describes the state or action of the toggle
- Avoid empty or non-descriptive labels for switches

## Check

Check all toggle fields (checkboxes, radio buttons, switches) for a valid accessible name.

## Fix

Add an accessible name to the toggle field using a label element, aria-label, or aria-labelledby.

## Explain

Explain why all interactive toggle controls must have descriptive names for users to understand their purpose.

## Code Review

Review the rendered markup and interactive states that affect Provide accessible names for toggle fields. Flag exact elements, roles, labels, focus behavior, or keyboard interactions that violate the rule, and note how to verify the fix with browser accessibility tooling or assistive tech.

---

For full implementation details, code examples, and framework-specific guidance,
see `references/rule.md`.

Rule page: https://frontendchecklist.io/rules/accessibility/aria-toggle-field-name
