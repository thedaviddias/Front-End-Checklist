---
name: flexbox-patterns
description: "Use when reviewing stylesheets, component styles, and responsive behavior related to Apply Flexbox best practices. Check the rendered layout across breakpoints and interaction states before proposing a fix."
metadata:
  category: css
  priority: medium
  difficulty: intermediate
  estimatedTime: "20"
  source: frontendchecklist.io
  url: https://frontendchecklist.io/rules/css/flexbox-patterns
---

# Apply Flexbox best practices

Flexbox is one of the most used CSS features, but its unintuitive default values (flex-shrink:1, min-width:auto) cause layout bugs that are hard to diagnose. Understanding the flex shorthand and the min-width:0 fix prevents the most common Flexbox breakage scenarios.

## Quick Reference

- Flexbox is for one-dimensional layouts (a row OR a column)
- Use flex: 1 1 0 (shorthand: flex:1) for equal-width items that fill space
- Add min-width: 0 to flex children when text overflow truncation doesn't work
- Use gap instead of margin for spacing between flex items

## Check

Review this CSS for common Flexbox mistakes: missing min-width:0 on text-containing flex children, using margin instead of gap for spacing, and improper flex shorthand usage.

## Fix

Fix the Flexbox layout issues: add min-width:0 where needed, replace inter-item margins with gap, and correct flex shorthand values.

## Explain

Explain how flex-grow, flex-shrink, and flex-basis work, what the flex shorthand means, and why min-width:0 fixes text overflow in flex layouts.

## Code Review

Review stylesheets, component styles, and responsive states related to Apply Flexbox best practices. Flag exact selectors, declarations, or breakpoints that violate the rule in the rendered UI.

---

For full implementation details, code examples, and framework-specific guidance,
see `references/rule.md`.

Rule page: https://frontendchecklist.io/rules/css/flexbox-patterns
