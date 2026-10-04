---
name: modal-accessibility
description: "Use when reviewing rendered HTML, interactive components, or design-system patterns related to Make modal dialogs keyboard accessible. Check native semantics first, then inspect keyboard behavior, focus flow, accessible names, and screen-reader output where relevant."
metadata:
  category: accessibility
  priority: high
  difficulty: intermediate
  estimatedTime: "30"
  source: frontendchecklist.io
  url: https://frontendchecklist.io/rules/accessibility/modal-accessibility
---

# Make modal dialogs keyboard accessible

Without proper focus trapping and keyboard handling, modal dialogs are invisible traps for keyboard users—they can't navigate, can't escape, and can't complete tasks.

## Quick Reference

- Use role='dialog' and aria-modal='true' on the modal container
- Trap focus inside the modal—Tab should cycle within modal only
- Close on Escape key press and return focus to trigger element
- Add aria-labelledby pointing to the modal title

## Check

Verify modals have proper ARIA roles, focus trapping, keyboard dismissal (Escape), and return focus on close.

## Fix

Implement accessible modals using role='dialog', aria-modal='true', focus trapping, and proper keyboard handling.

## Explain

Explain the accessibility requirements for modal dialogs including focus management, ARIA attributes, and keyboard interaction.

## Code Review

Review the rendered markup and interactive states that affect Make modal dialogs keyboard accessible. Flag exact elements, roles, labels, focus behavior, or keyboard interactions that violate the rule, and note how to verify the fix with browser accessibility tooling or assistive tech.

---

For full implementation details, code examples, and framework-specific guidance,
see `references/rule.md`.

Rule page: https://frontendchecklist.io/rules/accessibility/modal-accessibility
