---
name: aria-allowed-attr
description: "Use when reviewing rendered HTML, interactive components, or design-system patterns related to Use only allowed ARIA attributes for each role. Check native semantics first, then inspect keyboard behavior, focus flow, accessible names, and screen-reader output where relevant."
metadata:
  category: accessibility
  priority: medium
  difficulty: intermediate
  estimatedTime: "10"
  source: frontendchecklist.io
  url: https://frontendchecklist.io/rules/accessibility/aria-allowed-attr
---

# Use only allowed ARIA attributes for each role

Invalid ARIA attributes are ignored by screen readers or may cause them to misinterpret the element's purpose, leading to a broken experience for users with disabilities.

## Quick Reference

- Each ARIA role only supports a specific set of ARIA attributes
- Using unsupported attributes can confuse assistive technologies
- Ensures the accessibility tree remains valid and meaningful

## Check

Verify that all ARIA attributes used on elements are valid for their assigned WAI-ARIA roles.

## Fix

Remove or correct ARIA attributes that are not supported by the element's current ARIA role.

## Explain

Explain why using only role-supported ARIA attributes is necessary for proper screen reader communication.

## Code Review

Review the rendered markup and interactive states that affect Use only allowed ARIA attributes for each role. Flag exact elements, roles, labels, focus behavior, or keyboard interactions that violate the rule, and note how to verify the fix with browser accessibility tooling or assistive tech.

---

For full implementation details, code examples, and framework-specific guidance,
see `references/rule.md`.

Rule page: https://frontendchecklist.io/rules/accessibility/aria-allowed-attr
