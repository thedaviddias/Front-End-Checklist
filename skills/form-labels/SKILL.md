---
name: form-labels
description: "Use when reviewing rendered HTML, interactive components, or design-system patterns related to Associate labels with form controls. Check native semantics first, then inspect keyboard behavior, focus flow, accessible names, and screen-reader output where relevant."
metadata:
  category: accessibility
  priority: critical
  difficulty: beginner
  estimatedTime: "5"
  source: frontendchecklist.io
  url: https://frontendchecklist.io/rules/accessibility/form-labels
---

# Associate labels with form controls

Properly associated labels ensure that screen readers can identify the purpose of form inputs and increase the clickable area for users with motor impairments.

## Quick Reference

- Use `<label>` elements for all form inputs
- Connect labels using `for` and `id` attributes
- Placeholder text is not a label and must not be the only field name
- Use `<fieldset>` and `<legend>` when multiple controls share one question
- Ensure every input has a clear, accessible name

## Check

Verify that all form controls (input, select, textarea) have programmatically associated labels using the 'for' and 'id' attributes. Flag placeholder-only labels and grouped controls that lack a fieldset legend.

## Fix

Add a <label> element with a 'for' attribute that matches the 'id' of the corresponding input field. Replace placeholder-only labels with real label text and wrap related checkboxes or radio buttons in a `<fieldset>` with a `<legend>`.

## Explain

Explain why associated labels are critical for screen reader users and how they improve the hit area for touch and mouse users.

## Code Review

Review the rendered markup and interactive states that affect Associate labels with form controls. Flag exact elements, roles, labels, focus behavior, or keyboard interactions that violate the rule, and note how to verify the fix with browser accessibility tooling or assistive tech. Specifically check for placeholder-only labels and question groups that visually share a heading but lack a semantic `<fieldset>` and `<legend>`.

---

For full implementation details, code examples, and framework-specific guidance,
see `references/rule.md`.

Rule page: https://frontendchecklist.io/rules/accessibility/form-labels
