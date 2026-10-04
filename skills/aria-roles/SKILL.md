---
name: aria-roles
description: "Use when reviewing rendered HTML, interactive components, or design-system patterns related to Use valid ARIA role values. Check native semantics first, then inspect keyboard behavior, focus flow, accessible names, and screen-reader output where relevant."
metadata:
  category: accessibility
  priority: medium
  difficulty: intermediate
  estimatedTime: "10"
  source: frontendchecklist.io
  url: https://frontendchecklist.io/rules/accessibility/aria-roles
---

# Use valid ARIA role values

Invalid or misspelled ARIA roles are ignored by browsers and assistive technologies, rendering the intended accessibility features useless and potentially confusing users.

## Quick Reference

- Use only standard ARIA roles defined in the W3C specification
- Avoid typos or non-existent roles (e.g., use `checkbox`, not `check-box`)
- Ensure roles are applied to appropriate HTML elements
- Prefer native HTML controls over custom ARIA widgets whenever possible

## Check

Search for any role attributes that use non-standard or misspelled ARIA role values.

## Fix

Replace invalid ARIA roles with the correct, standard values from the WAI-ARIA specification. When a native `<button>`, `<input>`, `<select>`, or other semantic element can replace the custom widget, prefer that change over adding more ARIA.

## Explain

Explain why using standardized ARIA roles is critical for ensuring that assistive technologies can interpret and announce elements correctly, and why native HTML controls are usually more reliable than recreating them with ARIA.

## Code Review

Review the rendered markup and interactive states that affect Use valid ARIA role values. Flag exact elements, roles, labels, focus behavior, or keyboard interactions that violate the rule, and note how to verify the fix with browser accessibility tooling or assistive tech.

---

For full implementation details, code examples, and framework-specific guidance,
see `references/rule.md`.

Rule page: https://frontendchecklist.io/rules/accessibility/aria-roles
