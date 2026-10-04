---
name: aria-valid-attr-value
description: "Use when reviewing rendered HTML, interactive components, or design-system patterns related to Use valid values for ARIA attributes. Check native semantics first, then inspect keyboard behavior, focus flow, accessible names, and screen-reader output where relevant."
metadata:
  category: accessibility
  priority: medium
  difficulty: intermediate
  estimatedTime: "10"
  source: frontendchecklist.io
  url: https://frontendchecklist.io/rules/accessibility/aria-valid-attr-value
---

# Use valid values for ARIA attributes

Invalid attribute values cause ARIA properties to be ignored or misinterpreted by assistive technologies, leading to a broken or confusing user experience.

## Quick Reference

- Ensure ARIA attribute values (like `aria-expanded="true"`) are valid
- Avoid using "yes/no" where "true/false" is required
- Check that IDs referenced in `aria-labelledby` or `aria-owns` actually exist

## Check

Validate that all ARIA attribute values conform to the allowed types (boolean, integer, ID list, etc.).

## Fix

Correct any invalid ARIA attribute values to match the expected format defined in the ARIA specification.

## Explain

Explain why precise attribute values are necessary for browsers to correctly communicate element states to assistive technology.

## Code Review

Review the rendered markup and interactive states that affect Use valid values for ARIA attributes. Flag exact elements, roles, labels, focus behavior, or keyboard interactions that violate the rule, and note how to verify the fix with browser accessibility tooling or assistive tech.

---

For full implementation details, code examples, and framework-specific guidance,
see `references/rule.md`.

Rule page: https://frontendchecklist.io/rules/accessibility/aria-valid-attr-value
