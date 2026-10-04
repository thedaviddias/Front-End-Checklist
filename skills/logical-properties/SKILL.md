---
name: logical-properties
description: "Use when reviewing stylesheets, component styles, and responsive behavior related to Use CSS logical properties for i18n and RTL support. Check the rendered layout across breakpoints and interaction states before proposing a fix."
metadata:
  category: css
  priority: medium
  difficulty: intermediate
  estimatedTime: "15"
  source: frontendchecklist.io
  url: https://frontendchecklist.io/rules/css/logical-properties
---

# Use CSS logical properties for i18n and RTL support

Physical CSS properties (margin-left, padding-right) are hardcoded to screen directions. In right-to-left languages (Arabic, Hebrew, Persian), what should be margin-left becomes margin-right. Without logical properties, supporting RTL requires maintaining duplicate stylesheets or complex overrides with [dir=rtl] selectors. Logical properties handle this automatically.

## Quick Reference

- Logical properties adapt to writing direction — margin-inline-start is left in LTR, right in RTL
- Replace left/right margin and padding with inline-start/inline-end equivalents
- Replace top/bottom with block-start/block-end equivalents
- Logical properties also work correctly for vertical writing modes

## Check

Find all uses of margin-left, margin-right, padding-left, padding-right, border-left, border-right, left, right (as positioning) that should be converted to logical equivalents.

## Fix

Convert physical direction properties to their CSS logical property equivalents for RTL and internationalization support.

## Explain

Explain CSS logical properties, the difference between physical and logical directions, and how they enable RTL language support.

## Code Review

Review stylesheets, component styles, and responsive states related to Use CSS logical properties for i18n and RTL support. Flag exact selectors, declarations, or breakpoints that violate the rule in the rendered UI.

---

For full implementation details, code examples, and framework-specific guidance,
see `references/rule.md`.

Rule page: https://frontendchecklist.io/rules/css/logical-properties
