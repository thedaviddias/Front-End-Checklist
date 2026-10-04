---
name: naming-conventions
description: "Use when reviewing stylesheets, component styles, and responsive behavior related to Use consistent CSS naming conventions. Check the rendered layout across breakpoints and interaction states before proposing a fix."
metadata:
  category: css
  priority: medium
  difficulty: beginner
  estimatedTime: "15"
  source: frontendchecklist.io
  url: https://frontendchecklist.io/rules/css/naming-conventions
---

# Use consistent CSS naming conventions

Without a naming convention, class names become a guessing game — does .active mean the nav item is active, the button is pressed, or a form field has focus? With BEM or a similar methodology, .button--active is unambiguous. This reduces the time spent searching for existing styles and prevents accidental style conflicts.

## Quick Reference

- BEM (Block__Element--Modifier) is the most widely adopted naming convention
- Consistent naming lets you understand a class's purpose without reading its styles
- Namespace utility classes and JS hooks separately from component styles
- Use kebab-case for class names (not camelCase or snake_case)

## Check

Audit the class names in this CSS file. Are they consistently named? Do they follow a clear convention? Are there any ambiguous names that could conflict?

## Fix

Rename classes to follow BEM methodology: Block, Block__Element, Block--Modifier pattern.

## Explain

Explain BEM naming convention, why naming conventions matter, and how to apply BEM to a real component.

## Code Review

Review stylesheets, component styles, and responsive states related to Use consistent CSS naming conventions. Flag exact selectors, declarations, or breakpoints that violate the rule in the rendered UI.

---

For full implementation details, code examples, and framework-specific guidance,
see `references/rule.md`.

Rule page: https://frontendchecklist.io/rules/css/naming-conventions
