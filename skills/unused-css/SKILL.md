---
name: unused-css
description: "Use when reviewing stylesheets, component styles, and responsive behavior related to Remove unused CSS rules. Check the rendered layout across breakpoints and interaction states before proposing a fix."
metadata:
  category: css
  priority: high
  difficulty: intermediate
  estimatedTime: "25"
  source: frontendchecklist.io
  url: https://frontendchecklist.io/rules/css/unused-css
---

# Remove unused CSS rules

Most projects use only 10-25% of their CSS—removing the rest can cut bundle sizes by 75%+ and dramatically improve load times.

## Quick Reference

- Use PurgeCSS or UnCSS to remove unused selectors
- Integrate into build pipeline (Webpack, Vite, PostCSS)
- Safelist dynamic classes and framework-specific patterns
- Typical reduction: 50-90% for CSS framework users

## Check

Use tools like PurgeCSS, UnCSS, or Chrome DevTools Coverage to identify and remove unused CSS to reduce bundle size and improve performance.

## Fix

Implement automated unused CSS removal in your build process and regularly audit CSS files to eliminate dead code and unused selectors.

## Explain

Explain how unused CSS bloats bundle sizes, slows page loading, and how modern tools can safely remove unused styles without breaking functionality.

## Code Review

Review stylesheets, component styles, and responsive states related to Remove unused CSS rules. Flag exact selectors, declarations, or breakpoints that violate the rule in the rendered UI.

---

For full implementation details, code examples, and framework-specific guidance,
see `references/rule.md`.

Rule page: https://frontendchecklist.io/rules/css/unused-css
