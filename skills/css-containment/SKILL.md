---
name: css-containment
description: "Use when reviewing stylesheets, component styles, and responsive behavior related to Use CSS containment to limit repaint scope. Check the rendered layout across breakpoints and interaction states before proposing a fix."
metadata:
  category: css
  priority: medium
  difficulty: advanced
  estimatedTime: "20"
  source: frontendchecklist.io
  url: https://frontendchecklist.io/rules/css/css-containment
---

# Use CSS containment to limit repaint scope

By default, a CSS change anywhere on the page can potentially affect any other element's layout. CSS containment declares that certain elements are isolated — changes inside them don't affect the outside world. This lets browsers skip large portions of the rendering pipeline for unchanged content, which is especially valuable for pages with many independent components.

## Quick Reference

- contain: layout style paint tells the browser a component is visually self-contained
- content-visibility: auto skips rendering off-screen content entirely
- Containment limits how far layout recalculations need to propagate
- Use contain: strict for widgets with no overflow that shouldn't affect the page

## Check

Identify components in this CSS that are visually self-contained (no overflow, no interaction with elements outside) and could benefit from CSS containment.

## Fix

Add appropriate contain values to self-contained components. Add content-visibility: auto to repeated off-screen list items.

## Explain

Explain CSS containment values, how they limit rendering scope, and when content-visibility: auto provides the biggest benefit.

## Code Review

Review stylesheets, component styles, and responsive states related to Use CSS containment to limit repaint scope. Flag exact selectors, declarations, or breakpoints that violate the rule in the rendered UI.

---

For full implementation details, code examples, and framework-specific guidance,
see `references/rule.md`.

Rule page: https://frontendchecklist.io/rules/css/css-containment
