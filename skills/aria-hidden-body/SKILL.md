---
name: aria-hidden-body
description: "Use when reviewing rendered HTML, interactive components, or design-system patterns related to Do not use aria-hidden on the document body. Check native semantics first, then inspect keyboard behavior, focus flow, accessible names, and screen-reader output where relevant."
metadata:
  category: accessibility
  priority: critical
  difficulty: intermediate
  estimatedTime: "10"
  source: frontendchecklist.io
  url: https://frontendchecklist.io/rules/accessibility/aria-hidden-body
---

# Do not use aria-hidden on the document body

Setting `aria-hidden="true"` on the body effectively silences the entire application for screen reader users, rendering the site completely unusable.

## Quick Reference

- The `<body>` element should never have `aria-hidden="true"`
- Hiding the body makes the entire page invisible to assistive technologies
- Often happens accidentally when managing modal states

## Check

Check if the `<body>` element has `aria-hidden="true"` applied at any point in the lifecycle.

## Fix

Remove `aria-hidden="true"` from the `<body>` and use it only on specific background containers when modals are open.

## Explain

Explain the catastrophic impact of hiding the body element from assistive technologies.

## Code Review

Review the rendered markup and interactive states that affect Do not use aria-hidden on the document body. Flag exact elements, roles, labels, focus behavior, or keyboard interactions that violate the rule, and note how to verify the fix with browser accessibility tooling or assistive tech.

---

For full implementation details, code examples, and framework-specific guidance,
see `references/rule.md`.

Rule page: https://frontendchecklist.io/rules/accessibility/aria-hidden-body
