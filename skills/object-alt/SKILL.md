---
name: object-alt
description: "Use when reviewing rendered HTML, interactive components, or design-system patterns related to Provide alternative text for objects. Check native semantics first, then inspect keyboard behavior, focus flow, accessible names, and screen-reader output where relevant."
metadata:
  category: accessibility
  priority: medium
  difficulty: intermediate
  estimatedTime: "10"
  source: frontendchecklist.io
  url: https://frontendchecklist.io/rules/accessibility/object-alt
---

# Provide alternative text for objects

If an object fails to load or the user's browser doesn't support the format, alternative text ensures that the information is still accessible.

## Quick Reference

- Include descriptive alternative text inside every `<object>` element
- The fallback content should serve as a functional equivalent
- Use simple text or other semantic elements as alternative content

## Check

Check all `<object>` elements in the HTML to ensure they contain descriptive fallback content.

## Fix

Add alternative text or a semantic fallback inside the `<object>` tags.

## Explain

Explain how fallback content in `<object>` tags helps users who cannot load or view the primary object content.

## Code Review

Review the rendered markup and interactive states that affect Provide alternative text for objects. Flag exact elements, roles, labels, focus behavior, or keyboard interactions that violate the rule, and note how to verify the fix with browser accessibility tooling or assistive tech.

---

For full implementation details, code examples, and framework-specific guidance,
see `references/rule.md`.

Rule page: https://frontendchecklist.io/rules/accessibility/object-alt
