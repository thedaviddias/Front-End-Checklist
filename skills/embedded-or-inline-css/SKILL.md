---
name: embedded-or-inline-css
description: "Use when reviewing stylesheets, component styles, and responsive behavior related to Avoid embedded and inline CSS. Check the rendered layout across breakpoints and interaction states before proposing a fix."
metadata:
  category: css
  priority: high
  difficulty: beginner
  estimatedTime: "15"
  source: frontendchecklist.io
  url: https://frontendchecklist.io/rules/css/embedded-or-inline-css
---

# Avoid embedded and inline CSS

Inline CSS cannot be cached separately, increases HTML payload, breaks separation of concerns, and is harder to maintain in large codebases.

## Quick Reference

- Move inline styles to external CSS files or CSS-in-JS
- Exception: critical CSS should be inlined for performance
- Exception: dynamic values (CSS custom properties) can be inline
- Inline CSS breaks caching and increases HTML size

## Check

Verify that inline CSS and embedded styles are avoided except for valid use cases like critical CSS, dynamic styles, or performance optimization.

## Fix

Move inline and embedded CSS to external stylesheets, keeping only critical above-the-fold CSS inline for performance optimization.

## Explain

Explain why external CSS is preferred for maintainability, caching, and separation of concerns, with exceptions for critical CSS and dynamic styles.

## Code Review

Review stylesheets, component styles, and responsive states related to Avoid embedded and inline CSS. Flag exact selectors, declarations, or breakpoints that violate the rule in the rendered UI.

---

For full implementation details, code examples, and framework-specific guidance,
see `references/rule.md`.

Rule page: https://frontendchecklist.io/rules/css/embedded-or-inline-css
