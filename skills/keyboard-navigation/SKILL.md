---
name: keyboard-navigation
description: "Use when reviewing rendered HTML, interactive components, or design-system patterns related to Enable keyboard navigation for all elements. Check native semantics first, then inspect keyboard behavior, focus flow, accessible names, and screen-reader output where relevant."
metadata:
  category: accessibility
  priority: critical
  difficulty: intermediate
  estimatedTime: "30"
  source: frontendchecklist.io
  url: https://frontendchecklist.io/rules/accessibility/keyboard-navigation
---

# Enable keyboard navigation for all elements

15% of users rely on keyboard navigation—broken focus order or keyboard traps make your site completely unusable for them.

## Quick Reference

- All interactive elements must be reachable via Tab key
- Focus order should follow visual reading order (left-to-right, top-to-bottom)
- Never use positive tabindex values—they break natural flow
- Hidden content must be removed from tab sequence with tabindex='-1'
- Keyboard traps are only acceptable inside active modals with a working Escape path

## Check

Test that all interactive elements are keyboard accessible, focus order matches visual/reading order, hidden content is not focusable, and no keyboard traps exist except in modals with proper escape handling.

## Fix

Ensure tab order follows DOM order matching visual layout. Use tabindex='-1' to remove hidden elements from focus. Avoid positive tabindex values. Ensure off-screen or display:none content cannot receive focus.

## Explain

Explain how logical focus order helps keyboard users navigate efficiently, why hidden elements must be removed from the tab sequence to avoid confusion, and how focus management affects users of screen readers and switch devices.

## Code Review

Review the rendered markup and interactive states that affect Enable keyboard navigation for all elements. Flag exact elements, roles, labels, focus behavior, or keyboard interactions that violate the rule, and note how to verify the fix with browser accessibility tooling or assistive tech.

---

For full implementation details, code examples, and framework-specific guidance,
see `references/rule.md`.

Rule page: https://frontendchecklist.io/rules/accessibility/keyboard-navigation
