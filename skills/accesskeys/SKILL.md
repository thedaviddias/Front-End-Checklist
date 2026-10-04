---
name: accesskeys
description: "Use when reviewing rendered HTML, interactive components, or design-system patterns related to Ensure accesskey values are unique. Check native semantics first, then inspect keyboard behavior, focus flow, accessible names, and screen-reader output where relevant."
metadata:
  category: accessibility
  priority: medium
  difficulty: intermediate
  estimatedTime: "10"
  source: frontendchecklist.io
  url: https://frontendchecklist.io/rules/accessibility/accesskeys
---

# Ensure accesskey values are unique

Duplicate access keys cause conflicts where only one element (usually the first) is reachable via the shortcut, making other elements inaccessible to keyboard users.

## Quick Reference

- Each `accesskey` attribute value must be unique on the page
- Duplicate access keys can lead to unpredictable browser behavior
- Helps keyboard users navigate reliably using defined shortcuts

## Check

Check for duplicate `accesskey` attributes across the document to ensure each shortcut is unique.

## Fix

Assign unique values to each `accesskey` attribute or remove redundant ones to prevent shortcut conflicts.

## Explain

Explain how duplicate access keys affect keyboard accessibility and browser shortcut handling.

## Code Review

Review the rendered markup and interactive states that affect Ensure accesskey values are unique. Flag exact elements, roles, labels, focus behavior, or keyboard interactions that violate the rule, and note how to verify the fix with browser accessibility tooling or assistive tech.

---

For full implementation details, code examples, and framework-specific guidance,
see `references/rule.md`.

Rule page: https://frontendchecklist.io/rules/accessibility/accesskeys
