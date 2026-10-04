---
name: aria-valid-attr
description: "Use when reviewing rendered HTML, interactive components, or design-system patterns related to Ensure ARIA attributes are valid. Check native semantics first, then inspect keyboard behavior, focus flow, accessible names, and screen-reader output where relevant."
metadata:
  category: accessibility
  priority: high
  difficulty: beginner
  estimatedTime: "5"
  source: frontendchecklist.io
  url: https://frontendchecklist.io/rules/accessibility/aria-valid-attr
---

# Ensure ARIA attributes are valid

Invalid ARIA attributes are ignored by browsers and screen readers, potentially leaving users with disabilities unable to navigate or understand the interface.

## Quick Reference

- Use only valid, standard-defined ARIA attributes
- Avoid misspelled or non-existent aria-* properties
- Ensure screen readers correctly interpret element roles and states

## Check

Identify any invalid or misspelled ARIA attributes on HTML elements.

## Fix

Replace invalid ARIA attributes with their correct names as defined in the WAI-ARIA specification.

## Explain

Explain how valid ARIA attributes enable assistive technologies to communicate element state and behavior to users.

## Code Review

Review the rendered markup and interactive states that affect Ensure ARIA attributes are valid. Flag exact elements, roles, labels, focus behavior, or keyboard interactions that violate the rule, and note how to verify the fix with browser accessibility tooling or assistive tech.

---

For full implementation details, code examples, and framework-specific guidance,
see `references/rule.md`.

Rule page: https://frontendchecklist.io/rules/accessibility/aria-valid-attr
