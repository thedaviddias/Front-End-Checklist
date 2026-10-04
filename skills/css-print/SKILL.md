---
name: css-print
description: "Use when reviewing stylesheets, component styles, and responsive behavior related to Include a print stylesheet. Check the rendered layout across breakpoints and interaction states before proposing a fix."
metadata:
  category: css
  priority: medium
  difficulty: intermediate
  estimatedTime: "30"
  source: frontendchecklist.io
  url: https://frontendchecklist.io/rules/css/css-print
---

# Include a print stylesheet

Print stylesheets ensure content is readable when printed—removing digital clutter and optimizing for paper saves ink and improves accessibility.

## Quick Reference

- Use @media print for print-specific styles
- Hide navigation, ads, and interactive elements with .no-print
- Use serif fonts at 12pt and optimize page breaks
- Show full URLs for external links in printed output

## Check

Verify that a print stylesheet is provided and properly optimized for printed pages with appropriate typography, layout, and hidden elements.

## Fix

Create a print stylesheet that removes unnecessary elements, optimizes typography for print, and ensures content is readable when printed.

## Explain

Explain how print stylesheets improve user experience for printed pages by optimizing layout, removing digital-only elements, and ensuring readability.

## Code Review

Review stylesheets, component styles, and responsive states related to Include a print stylesheet. Flag exact selectors, declarations, or breakpoints that violate the rule in the rendered UI.

---

For full implementation details, code examples, and framework-specific guidance,
see `references/rule.md`.

Rule page: https://frontendchecklist.io/rules/css/css-print
