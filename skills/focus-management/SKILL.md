---
name: focus-management
description: "Use when reviewing rendered HTML, interactive components, or design-system patterns related to Manage focus during dynamic interactions. Check native semantics first, then inspect keyboard behavior, focus flow, accessible names, and screen-reader output where relevant."
metadata:
  category: accessibility
  priority: high
  difficulty: intermediate
  estimatedTime: "25"
  source: frontendchecklist.io
  url: https://frontendchecklist.io/rules/accessibility/focus-management
---

# Manage focus during dynamic interactions

Poor focus management leaves keyboard users stranded—they can't find new content, get trapped in closed modals, or lose their place entirely after interactions.

## Quick Reference

- Move focus to modal when opened, return to trigger when closed
- Focus new content after SPA navigation or dynamic updates
- Use tabindex='-1' to make non-interactive elements focusable
- Never lose focus to an unexpected location

## Check

Verify that focus is properly managed when opening/closing modals, navigating between views, or updating content dynamically.

## Fix

Implement proper focus management using tabindex, focus(), and focus trapping for modal dialogs.

## Explain

Explain how proper focus management ensures keyboard and screen reader users can navigate dynamic interfaces effectively.

## Code Review

Review the rendered markup and interactive states that affect Manage focus during dynamic interactions. Flag exact elements, roles, labels, focus behavior, or keyboard interactions that violate the rule, and note how to verify the fix with browser accessibility tooling or assistive tech.

---

For full implementation details, code examples, and framework-specific guidance,
see `references/rule.md`.

Rule page: https://frontendchecklist.io/rules/accessibility/focus-management
