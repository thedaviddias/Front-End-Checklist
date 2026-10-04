---
name: css-non-blocking
description: "Use when reviewing stylesheets, component styles, and responsive behavior related to Load CSS without blocking render. Check the rendered layout across breakpoints and interaction states before proposing a fix."
metadata:
  category: css
  priority: high
  difficulty: intermediate
  estimatedTime: "20"
  source: frontendchecklist.io
  url: https://frontendchecklist.io/rules/css/css-non-blocking
---

# Load CSS without blocking render

Render-blocking CSS delays First Contentful Paint—users see a blank screen while waiting for stylesheets to download and parse.

## Quick Reference

- Use `<link rel="preload" as="style">` with onload handler
- Inline critical CSS, defer non-critical styles
- Use media queries to split CSS by viewport/feature
- Modern: Next.js/Vite handle this automatically

## Check

Analyze this CSS loading implementation to ensure stylesheets are loaded without blocking the DOM parsing and rendering process.

## Fix

Implement non-blocking CSS loading using the preload technique with media attributes and loadCSS polyfill for better performance.

## Explain

Explain how non-blocking CSS loading improves page performance by preventing render-blocking resources from delaying the initial paint.

## Code Review

Review stylesheets, component styles, and responsive states related to Load CSS without blocking render. Flag exact selectors, declarations, or breakpoints that violate the rule in the rendered UI.

---

For full implementation details, code examples, and framework-specific guidance,
see `references/rule.md`.

Rule page: https://frontendchecklist.io/rules/css/css-non-blocking
