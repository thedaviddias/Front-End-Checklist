---
name: aria-deprecated-role
description: "Use when reviewing rendered HTML, interactive components, or design-system patterns related to Avoid using deprecated ARIA roles. Check native semantics first, then inspect keyboard behavior, focus flow, accessible names, and screen-reader output where relevant."
metadata:
  category: accessibility
  priority: medium
  difficulty: intermediate
  estimatedTime: "10"
  source: frontendchecklist.io
  url: https://frontendchecklist.io/rules/accessibility/aria-deprecated-role
---

# Avoid using deprecated ARIA roles

Using deprecated roles can lead to inconsistent behavior across different browsers and screen readers as they transition to newer standards.

## Quick Reference

- Deprecated ARIA roles should be replaced with modern equivalents
- Browsers may drop support for deprecated roles in future versions
- Ensures long-term compatibility with assistive technologies

## Check

Search the codebase for deprecated ARIA roles like `directory` or abstract roles that shouldn't be used in HTML.

## Fix

Update deprecated ARIA roles to their modern recommended equivalents or use native HTML elements.

## Explain

Explain the risks of using deprecated ARIA roles and the benefits of moving to modern ARIA standards.

## Code Review

Review the rendered markup and interactive states that affect Avoid using deprecated ARIA roles. Flag exact elements, roles, labels, focus behavior, or keyboard interactions that violate the rule, and note how to verify the fix with browser accessibility tooling or assistive tech.

---

For full implementation details, code examples, and framework-specific guidance,
see `references/rule.md`.

Rule page: https://frontendchecklist.io/rules/accessibility/aria-deprecated-role
