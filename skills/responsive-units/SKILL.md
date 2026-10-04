---
name: responsive-units
description: "Use when reviewing stylesheets, component styles, and responsive behavior related to Use relative units for responsive layouts. Check the rendered layout across breakpoints and interaction states before proposing a fix."
metadata:
  category: css
  priority: high
  difficulty: beginner
  estimatedTime: "20"
  source: frontendchecklist.io
  url: https://frontendchecklist.io/rules/css/responsive-units
---

# Use relative units for responsive layouts

Fixed pixel values override user browser preferences, making your site inaccessible to users who increase their default font size (a common accommodation for low vision). Relative units also reduce the number of breakpoints needed — elements naturally adapt to available space rather than requiring explicit overrides at every viewport width.

## Quick Reference

- Use rem for font sizes — it respects user browser font size preferences
- Use % or flex/grid for widths — they adapt to the parent container
- Use em for component-relative spacing (padding, border-radius)
- Use clamp() for fluid typography that scales smoothly between breakpoints

## Check

Find all px-based font-size, width, and padding values in this CSS file that should use relative units instead.

## Fix

Convert fixed px font sizes to rem equivalents and replace fixed widths with percentage or relative alternatives.

## Explain

Explain the difference between rem, em, %, vw, and vh, and when to use each one.

## Code Review

Review stylesheets, component styles, and responsive states related to Use relative units for responsive layouts. Flag exact selectors, declarations, or breakpoints that violate the rule in the rendered UI.

---

For full implementation details, code examples, and framework-specific guidance,
see `references/rule.md`.

Rule page: https://frontendchecklist.io/rules/css/responsive-units
