---
name: cascade-layers
description: "Use when reviewing a CSS architecture for specificity issues, setting up a design system, or migrating a large codebase from utility-first to a layered architecture."
metadata:
  category: css
  priority: low
  difficulty: intermediate
  estimatedTime: "30"
  source: frontendchecklist.io
  url: https://frontendchecklist.io/rules/css/cascade-layers
---

# Use @layer to manage CSS cascade order explicitly

Specificity conflicts are one of the most common causes of CSS bugs in large codebases. Developers resort to !important, deeply nested selectors, or inline styles to win specificity wars, creating an unmaintainable arms race. Cascade layers move the source of truth for cascade order from selector specificity to explicit layer ordering, making the system predictable and easy to reason about.

## Quick Reference

- Declare your layer stack at the top of your main CSS file to fix order regardless of import sequence
- Styles in later layers win over styles in earlier layers, regardless of selector specificity
- Put third-party/reset styles in early layers so your own styles always override them
- Unlayered styles (no @layer) have the highest priority — migrate gradually

## Check

Check whether the CSS uses cascade layers to manage specificity, and whether the layer order is explicitly declared.

## Fix

Introduce @layer declarations for reset, base, components, and utilities, and migrate existing styles into appropriate layers.

## Explain

Explain how CSS Cascade Layers work, how layer order determines cascade priority, and why this is preferable to specificity-based overrides.

## Code Review

Review the CSS for !important declarations, excessively specific selectors (more than two class selectors), and inline styles used to override component styles — all are signals that the cascade is not under control.

---

For full implementation details, code examples, and framework-specific guidance,
see `references/rule.md`.

Rule page: https://frontendchecklist.io/rules/css/cascade-layers
