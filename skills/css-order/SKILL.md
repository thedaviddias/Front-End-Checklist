---
name: css-order
description: "Use when reviewing stylesheets, component styles, and responsive behavior related to Order CSS files correctly. Check the rendered layout across breakpoints and interaction states before proposing a fix."
metadata:
  category: css
  priority: medium
  difficulty: beginner
  estimatedTime: "10"
  source: frontendchecklist.io
  url: https://frontendchecklist.io/rules/css/css-order
---

# Order CSS files correctly

Incorrect CSS/JS order causes render-blocking delays and FOUC—users see unstyled content while waiting for styles to load.

## Quick Reference

- Load all CSS files before JavaScript in the document head
- Use async/defer for non-critical JavaScript
- Inline critical CSS for faster first paint
- Prevents FOUC (Flash of Unstyled Content)

## Check

Verify that all CSS files are loaded before JavaScript files in the document head to prevent render-blocking and ensure proper styling precedence.

## Fix

Reorganize head section to load all CSS files before JavaScript files, except for asynchronous scripts that don't block rendering.

## Explain

Explain why CSS should load before JavaScript to prevent FOUC (Flash of Unstyled Content) and ensure optimal rendering performance.

## Code Review

Review stylesheets, component styles, and responsive states related to Order CSS files correctly. Flag exact selectors, declarations, or breakpoints that violate the rule in the rendered UI.

---

For full implementation details, code examples, and framework-specific guidance,
see `references/rule.md`.

Rule page: https://frontendchecklist.io/rules/css/css-order
