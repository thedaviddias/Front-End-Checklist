---
name: duplicate-id-aria
description: "Use when reviewing rendered HTML, interactive components, or design-system patterns related to Use unique IDs for ARIA references. Check native semantics first, then inspect keyboard behavior, focus flow, accessible names, and screen-reader output where relevant."
metadata:
  category: accessibility
  priority: high
  difficulty: intermediate
  estimatedTime: "10"
  source: frontendchecklist.io
  url: https://frontendchecklist.io/rules/accessibility/duplicate-id-aria
---

# Use unique IDs for ARIA references

When ARIA attributes point to duplicate IDs, assistive technologies may read the wrong label or description, providing misleading information to the user.

## Quick Reference

- Ensure IDs referenced by ARIA attributes (e.g., aria-labelledby) are unique
- Avoid duplicate IDs that lead to ambiguous accessibility relationships
- Verify that ARIA controls correctly target their intended elements

## Check

Identify elements where an ARIA attribute references an id that appears multiple times in the DOM.

## Fix

Ensure all elements referenced by ARIA attributes have unique IDs and update the references accordingly.

## Explain

Explain how unique IDs are essential for establishing reliable relationships between ARIA attributes and their targets.

## Code Review

Review the rendered markup and interactive states that affect Use unique IDs for ARIA references. Flag exact elements, roles, labels, focus behavior, or keyboard interactions that violate the rule, and note how to verify the fix with browser accessibility tooling or assistive tech.

---

For full implementation details, code examples, and framework-specific guidance,
see `references/rule.md`.

Rule page: https://frontendchecklist.io/rules/accessibility/duplicate-id-aria
