---
name: aria-required-attr
description: "Use when reviewing rendered HTML, interactive components, or design-system patterns related to Include required ARIA attributes for roles. Check native semantics first, then inspect keyboard behavior, focus flow, accessible names, and screen-reader output where relevant."
metadata:
  category: accessibility
  priority: medium
  difficulty: intermediate
  estimatedTime: "10"
  source: frontendchecklist.io
  url: https://frontendchecklist.io/rules/accessibility/aria-required-attr
---

# Include required ARIA attributes for roles

Certain ARIA roles are incomplete without their required attributes, preventing assistive technologies from correctly communicating the element's state or value.

## Quick Reference

- Identify roles that require specific state or property attributes
- Ensure attributes like `aria-valuenow` for sliders are present
- Validate that all required ARIA attributes are correctly implemented

## Check

Verify that all ARIA roles have their mandatory attributes as defined by the WAI-ARIA specification.

## Fix

Add the missing required ARIA attributes to elements with specific roles (e.g., aria-valuenow for role="slider").

## Explain

Explain how required ARIA attributes provide critical state information that screen readers need to function correctly.

## Code Review

Review the rendered markup and interactive states that affect Include required ARIA attributes for roles. Flag exact elements, roles, labels, focus behavior, or keyboard interactions that violate the rule, and note how to verify the fix with browser accessibility tooling or assistive tech.

---

For full implementation details, code examples, and framework-specific guidance,
see `references/rule.md`.

Rule page: https://frontendchecklist.io/rules/accessibility/aria-required-attr
