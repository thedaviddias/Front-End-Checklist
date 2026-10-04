---
name: image-redundant-alt
description: "Use when reviewing rendered HTML, interactive components, or design-system patterns related to Avoid redundant image alternative text. Check native semantics first, then inspect keyboard behavior, focus flow, accessible names, and screen-reader output where relevant."
metadata:
  category: accessibility
  priority: low
  difficulty: beginner
  estimatedTime: "5"
  source: frontendchecklist.io
  url: https://frontendchecklist.io/rules/accessibility/image-redundant-alt
---

# Avoid redundant image alternative text

Redundant alt text increases the verbosity for screen reader users without adding value, leading to a poorer user experience and slower navigation.

## Quick Reference

- Do not repeat 'image of' or 'picture of' in alt text
- Avoid alt text that exactly matches adjacent text
- Keep alt text concise and focused on the image's meaning

## Check

Scan image alt attributes for redundant phrases like 'image of', 'photo of', or text that duplicates surrounding content.

## Fix

Remove redundant phrases from the alt attribute and ensure the text provides unique, descriptive information.

## Explain

Explain why screen readers already announce 'graphic' or 'image', making phrases like 'image of' unnecessary and repetitive.

## Code Review

Review the rendered markup and interactive states that affect Avoid redundant image alternative text. Flag exact elements, roles, labels, focus behavior, or keyboard interactions that violate the rule, and note how to verify the fix with browser accessibility tooling or assistive tech.

---

For full implementation details, code examples, and framework-specific guidance,
see `references/rule.md`.

Rule page: https://frontendchecklist.io/rules/accessibility/image-redundant-alt
