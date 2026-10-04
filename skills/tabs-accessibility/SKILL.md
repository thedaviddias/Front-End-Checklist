---
name: tabs-accessibility
description: "Use when reviewing templates, rendered HTML, or shared components related to Make tabs keyboard navigable. Validate the final browser-facing markup, not just the source framework abstraction."
metadata:
  category: html
  priority: medium
  difficulty: intermediate
  estimatedTime: "25"
  source: frontendchecklist.io
  url: https://frontendchecklist.io/rules/html/tabs-accessibility
---

# Make tabs keyboard navigable

Incorrectly implemented tabs trap keyboard users or leave screen reader users unable to understand the relationship between tabs and their content.

## Quick Reference

- Use tablist, tab, and tabpanel roles
- Only one tab in the tab order at a time (roving tabindex)
- Arrow keys navigate between tabs, Tab moves to panel
- Connect tabs to panels with aria-controls/aria-labelledby

## Check

Verify tabs use tablist/tab/tabpanel roles, aria-selected state, and arrow key navigation between tabs.

## Fix

Implement tabs with role='tablist', role='tab', role='tabpanel', aria-selected, and proper keyboard interaction patterns.

## Explain

Explain the ARIA tabs design pattern and how proper implementation ensures keyboard and screen reader accessibility.

## Code Review

Review templates, server-rendered HTML, and shared components that output markup related to Make tabs keyboard navigable. Flag exact elements, attributes, and routes where the rendered HTML violates the rule.

---

For full implementation details, code examples, and framework-specific guidance,
see `references/rule.md`.

Rule page: https://frontendchecklist.io/rules/html/tabs-accessibility
