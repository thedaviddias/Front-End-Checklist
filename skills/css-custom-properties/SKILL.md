---
name: css-custom-properties
description: "Use when reviewing stylesheets, component styles, and responsive behavior related to Use CSS custom properties for design tokens. Check the rendered layout across breakpoints and interaction states before proposing a fix."
metadata:
  category: css
  priority: high
  difficulty: beginner
  estimatedTime: "20"
  source: frontendchecklist.io
  url: https://frontendchecklist.io/rules/css/css-custom-properties
---

# Use CSS custom properties for design tokens

Hard-coded color values and magic numbers scattered across CSS files make global changes (a rebrand, a dark mode, a spacing adjustment) require finding and updating dozens of individual lines. Custom properties centralize these values so one change propagates everywhere — and enable runtime theming that preprocessor variables cannot.

## Quick Reference

- Define reusable values as --variable-name on :root
- Custom properties cascade and inherit — they can be overridden at any scope
- Use var(--name, fallback) to provide fallback values
- Custom properties are runtime values — JavaScript can read and write them

## Check

Find hard-coded color values, spacing values, and font sizes in this CSS file that should be replaced with CSS custom properties.

## Fix

Extract repeated and meaningful values into CSS custom properties on :root and replace all usages with var() references.

## Explain

Explain CSS custom properties: how they differ from preprocessor variables, how cascade and inheritance work, and how to use them for theming.

## Code Review

Review stylesheets, component styles, and responsive states related to Use CSS custom properties for design tokens. Flag exact selectors, declarations, or breakpoints that violate the rule in the rendered UI.

---

For full implementation details, code examples, and framework-specific guidance,
see `references/rule.md`.

Rule page: https://frontendchecklist.io/rules/css/css-custom-properties
