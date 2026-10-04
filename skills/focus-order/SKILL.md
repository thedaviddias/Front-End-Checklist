---
name: focus-order
description: "Use when reviewing rendered HTML, interactive components, or design-system patterns related to Ensure logical focus order. Check native semantics first, then inspect keyboard behavior, focus flow, accessible names, and screen-reader output where relevant."
metadata:
  category: accessibility
  priority: high
  difficulty: intermediate
  estimatedTime: "20"
  source: frontendchecklist.io
  url: https://frontendchecklist.io/rules/accessibility/focus-order
---

# Ensure logical focus order

When focus jumps unexpectedly, keyboard users get disoriented and can't find content—mismatched visual and focus order makes navigation impossible.

## Quick Reference

- Tab order should match visual reading order (left-to-right, top-to-bottom)
- DOM order determines tab order—arrange HTML to match visual layout
- Never use positive tabindex values (1, 2, 3)—they break natural flow
- Use CSS for visual positioning, not DOM reordering

## Check

Tab through the page and verify focus moves in a logical sequence matching visual layout. Check that modals trap focus appropriately, and focus returns to triggering elements when dialogs close.

## Fix

Order DOM elements to match visual layout. Avoid positive tabindex values which override natural order. Use tabindex='0' for custom interactive elements and tabindex='-1' for programmatic focus management.

## Explain

Explain how keyboard users rely on predictable tab order to navigate efficiently, and why mismatched visual and focus order creates confusion and reduces usability for assistive technology users.

## Code Review

Review the rendered markup and interactive states that affect Ensure logical focus order. Flag exact elements, roles, labels, focus behavior, or keyboard interactions that violate the rule, and note how to verify the fix with browser accessibility tooling or assistive tech.

---

For full implementation details, code examples, and framework-specific guidance,
see `references/rule.md`.

Rule page: https://frontendchecklist.io/rules/accessibility/focus-order
