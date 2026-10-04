---
name: aria-meter-name
description: "Use when reviewing rendered HTML, interactive components, or design-system patterns related to Provide accessible names for meter elements. Check native semantics first, then inspect keyboard behavior, focus flow, accessible names, and screen-reader output where relevant."
metadata:
  category: accessibility
  priority: medium
  difficulty: intermediate
  estimatedTime: "10"
  source: frontendchecklist.io
  url: https://frontendchecklist.io/rules/accessibility/aria-meter-name
---

# Provide accessible names for meter elements

A meter represents a scalar measurement; without a label, a user might hear a value (e.g., '50%') but have no idea if it refers to battery life, storage space, or a password strength.

## Quick Reference

- The `&lt;meter&gt;` element or `role="meter"` must have an accessible label
- Use `aria-label` or `aria-labelledby` to provide context
- Helps users understand what measurement is being displayed

## Check

Check for `&lt;meter&gt;` elements or elements with `role="meter"` that lack an accessible name.

## Fix

Add an `aria-label` or `aria-labelledby` to the meter element to describe the measurement.

## Explain

Explain why measurements need context through accessible names for screen reader users.

## Code Review

Review the rendered markup and interactive states that affect Provide accessible names for meter elements. Flag exact elements, roles, labels, focus behavior, or keyboard interactions that violate the rule, and note how to verify the fix with browser accessibility tooling or assistive tech.

---

For full implementation details, code examples, and framework-specific guidance,
see `references/rule.md`.

Rule page: https://frontendchecklist.io/rules/accessibility/aria-meter-name
