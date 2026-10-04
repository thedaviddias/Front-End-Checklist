---
name: container-queries
description: "Use when reviewing stylesheets, component styles, and responsive behavior related to Use container queries for component-level responsiveness. Check the rendered layout across breakpoints and interaction states before proposing a fix."
metadata:
  category: css
  priority: medium
  difficulty: intermediate
  estimatedTime: "20"
  source: frontendchecklist.io
  url: https://frontendchecklist.io/rules/css/container-queries
---

# Use container queries for component-level responsiveness

Media queries respond to viewport width, which makes components context-dependent — a card designed for a 3-column grid might break when placed in a 2-column grid or a sidebar. Container queries solve this: a card can layout itself based on how much space its container gives it, making the component genuinely reusable in any layout context.

## Quick Reference

- Container queries respond to the parent container's size, not the viewport
- Set container-type: inline-size on the parent to enable container queries
- Use @container rule to write styles that activate at container breakpoints
- Container queries make components reusable in sidebars, grids, and full-width areas

## Check

Look for components in this CSS that have media query breakpoints — consider whether container queries would make them more reusable in different layout contexts.

## Fix

Convert this component from media query-based to container query-based responsiveness using container-type and @container.

## Explain

Explain how container queries differ from media queries, why they enable better component reuse, and how to set up the container/query relationship.

## Code Review

Review stylesheets, component styles, and responsive states related to Use container queries for component-level responsiveness. Flag exact selectors, declarations, or breakpoints that violate the rule in the rendered UI.

---

For full implementation details, code examples, and framework-specific guidance,
see `references/rule.md`.

Rule page: https://frontendchecklist.io/rules/css/container-queries
