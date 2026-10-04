---
name: css-grid
description: "Use when reviewing stylesheets, component styles, and responsive behavior related to Use CSS Grid for two-dimensional layouts. Check the rendered layout across breakpoints and interaction states before proposing a fix."
metadata:
  category: css
  priority: medium
  difficulty: intermediate
  estimatedTime: "25"
  source: frontendchecklist.io
  url: https://frontendchecklist.io/rules/css/css-grid
---

# Use CSS Grid for two-dimensional layouts

CSS Grid solves layout problems that previously required JavaScript or complex CSS hacks — aligning items across both axes simultaneously, creating named layout areas, and building responsive grids that adapt to content. Using Flexbox for two-dimensional layouts results in workarounds like fixed widths that break responsiveness.

## Quick Reference

- Use Grid for two-dimensional layouts (rows AND columns); use Flexbox for one-dimensional
- grid-template-areas provides a visual representation of the layout in your CSS
- minmax() and auto-fill/auto-fit create responsive grids without media queries
- Subgrid allows nested elements to align to the parent grid's tracks

## Check

Look for float-based or Flexbox layouts in this CSS that are trying to control both rows and columns — they may be better implemented with CSS Grid.

## Fix

Convert this two-dimensional layout to use CSS Grid with appropriate grid-template-columns, grid-template-rows, and grid-template-areas.

## Explain

Explain CSS Grid fundamentals: tracks, cells, areas, fr units, minmax, and auto-fill vs auto-fit.

## Code Review

Review stylesheets, component styles, and responsive states related to Use CSS Grid for two-dimensional layouts. Flag exact selectors, declarations, or breakpoints that violate the rule in the rendered UI.

---

For full implementation details, code examples, and framework-specific guidance,
see `references/rule.md`.

Rule page: https://frontendchecklist.io/rules/css/css-grid
