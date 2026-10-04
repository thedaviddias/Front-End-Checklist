---
name: dark-mode-css
description: "Use when reviewing stylesheets, component styles, and responsive behavior related to Support dark mode with prefers-color-scheme. Check the rendered layout across breakpoints and interaction states before proposing a fix."
metadata:
  category: css
  priority: medium
  difficulty: intermediate
  estimatedTime: "25"
  source: frontendchecklist.io
  url: https://frontendchecklist.io/rules/css/dark-mode-css
---

# Support dark mode with prefers-color-scheme

More than half of users prefer dark mode for reduced eye strain, especially in low-light environments. Users with photosensitivity rely on it. Implementing dark mode via prefers-color-scheme respects the user's OS preference without them needing to find a toggle, and CSS custom properties make it a clean, maintainable addition rather than a disruptive refactor.

## Quick Reference

- Use @media (prefers-color-scheme: dark) to apply dark mode styles
- Define light/dark colors as CSS custom properties on :root for easy switching
- Support a manual toggle by storing preference in localStorage and setting a data-theme attribute
- Ensure dark mode colors maintain WCAG contrast ratios

## Check

Check if this CSS supports dark mode. Look for prefers-color-scheme usage or a data-theme attribute pattern. Identify any hard-coded colors that would look wrong in dark mode.

## Fix

Implement dark mode by extracting colors to CSS custom properties and redefining them inside a prefers-color-scheme: dark media query.

## Explain

Explain how to implement dark mode with CSS custom properties, the prefers-color-scheme media query, and a JavaScript toggle for user preference.

## Code Review

Review stylesheets, component styles, and responsive states related to Support dark mode with prefers-color-scheme. Flag exact selectors, declarations, or breakpoints that violate the rule in the rendered UI.

---

For full implementation details, code examples, and framework-specific guidance,
see `references/rule.md`.

Rule page: https://frontendchecklist.io/rules/css/dark-mode-css
