---
name: reset-css
description: "Use when reviewing stylesheets, component styles, and responsive behavior related to Use a CSS reset or normalize stylesheet. Check the rendered layout across breakpoints and interaction states before proposing a fix."
metadata:
  category: css
  priority: medium
  difficulty: beginner
  estimatedTime: "10"
  source: frontendchecklist.io
  url: https://frontendchecklist.io/rules/css/reset-css
---

# Use a CSS reset or normalize stylesheet

CSS resets eliminate browser default inconsistencies—ensuring your designs look identical across Chrome, Firefox, Safari, and Edge.

## Quick Reference

- Choose normalize.css for preservation or modern reset for clean slate
- Install with pnpm: `pnpm add normalize.css`
- Import before your custom styles
- Check if your CSS framework includes a built-in reset

## Check

Verify that a CSS reset or normalization is implemented to ensure consistent styling across different browsers and devices.

## Fix

Implement a modern CSS reset like normalize.css, CSS remedy, or a custom reset to eliminate browser default styling inconsistencies.

## Explain

Explain how CSS resets eliminate browser default styles to provide a consistent foundation for custom styling across all browsers.

## Code Review

Review stylesheets, component styles, and responsive states related to Use a CSS reset or normalize stylesheet. Flag exact selectors, declarations, or breakpoints that violate the rule in the rendered UI.

---

For full implementation details, code examples, and framework-specific guidance,
see `references/rule.md`.

Rule page: https://frontendchecklist.io/rules/css/reset-css
