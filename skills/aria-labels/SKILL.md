---
name: aria-labels
description: "Use when reviewing rendered HTML, interactive components, or design-system patterns related to Provide accessible names for all interactive elements. Check native semantics first, then inspect keyboard behavior, focus flow, accessible names, and screen-reader output where relevant."
metadata:
  category: accessibility
  priority: high
  difficulty: intermediate
  estimatedTime: "10"
  source: frontendchecklist.io
  url: https://frontendchecklist.io/rules/accessibility/aria-labels
---

# Provide accessible names for all interactive elements

Interactive elements are the core of web navigation; without names, they become 'mystery meat' that users cannot confidently interact with.

## Quick Reference

- Buttons, links, and other controls must have a discernable name
- Names should be concise and describe the action or destination
- Avoid generic names like 'Click Here' or 'More'

## Check

Audit all interactive elements (buttons, links, widgets) for missing or unhelpful accessible names.

## Fix

Add descriptive text content or `aria-label` attributes to all interactive elements.

## Explain

Explain how clear labels on interactive elements improve accessibility and general usability.

## Code Review

Review the rendered markup and interactive states that affect Provide accessible names for all interactive elements. Flag exact elements, roles, labels, focus behavior, or keyboard interactions that violate the rule, and note how to verify the fix with browser accessibility tooling or assistive tech.

---

For full implementation details, code examples, and framework-specific guidance,
see `references/rule.md`.

Rule page: https://frontendchecklist.io/rules/accessibility/aria-labels
