---
name: button-name
description: "Use when reviewing rendered HTML, interactive components, or design-system patterns related to Provide accessible names for buttons. Check native semantics first, then inspect keyboard behavior, focus flow, accessible names, and screen-reader output where relevant."
metadata:
  category: accessibility
  priority: critical
  difficulty: beginner
  estimatedTime: "5"
  source: frontendchecklist.io
  url: https://frontendchecklist.io/rules/accessibility/button-name
---

# Provide accessible names for buttons

Buttons without accessible names are announced as 'button' by screen readers, leaving users unable to determine what action will be triggered.

## Quick Reference

- Ensure every <button> has a discernible, descriptive label
- Use inner text, aria-label, or aria-labelledby for identification
- Use buttons for actions and state changes, not page navigation
- Avoid empty buttons or those containing only non-text icons

## Check

Scan for buttons that lack descriptive text or accessible labels.

## Fix

Add an accessible name to the button using text content, an aria-label, or an aria-labelledby reference. If the element navigates to another URL, replace the button with a link instead of keeping button semantics.

## Explain

Explain why accessible names are critical for screen reader users to identify and interact with buttons, and why buttons should trigger actions while links should handle navigation.

## Code Review

Review the rendered markup and interactive states that affect Provide accessible names for buttons. Flag exact elements, roles, labels, focus behavior, or keyboard interactions that violate the rule, and note how to verify the fix with browser accessibility tooling or assistive tech.

---

For full implementation details, code examples, and framework-specific guidance,
see `references/rule.md`.

Rule page: https://frontendchecklist.io/rules/accessibility/button-name
