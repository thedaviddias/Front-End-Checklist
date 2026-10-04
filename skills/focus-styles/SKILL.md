---
name: focus-styles
description: "Use when reviewing stylesheets, component styles, and responsive behavior related to Provide visible custom focus indicators. Check the rendered layout across breakpoints and interaction states before proposing a fix."
metadata:
  category: css
  priority: high
  difficulty: beginner
  estimatedTime: "15"
  source: frontendchecklist.io
  url: https://frontendchecklist.io/rules/css/focus-styles
---

# Provide visible custom focus indicators

Users who navigate by keyboard (people with motor disabilities, power users, people in assistive technology contexts) rely entirely on focus indicators to know where they are on the page. Removing outlines without replacement makes an entire site unusable for keyboard users. WCAG 2.4.7 requires a visible focus indicator, and WCAG 2.4.13 defines a stronger size-and-contrast target for custom indicators.

## Quick Reference

- Never use outline: none or outline: 0 without a visible :focus-visible replacement
- Use :focus-visible instead of :focus to show indicators only during keyboard navigation
- Focus indicators must have 3:1 contrast ratio against adjacent colors (WCAG 2.2)
- Provide at least 2px solid outline with an offset for a high-quality focus ring
- If a focus ring is drawn with pseudo-elements, verify it is anchored to the correct positioned element and not clipped by `overflow: hidden`
- If the component uses a stretched-link pattern, verify the visible focus ring follows the actual interactive element rather than a parent wrapper by accident

## Check

Find all instances of outline: none, outline: 0, or :focus { outline: none } in this CSS. Check if they provide an alternative visible focus indicator. If the replacement uses pseudo-elements, also verify the ring cannot be clipped or misplaced by overflow or missing positioning context.

## Fix

Replace outline: none on :focus with :focus-visible styles that provide a clearly visible custom focus ring with appropriate contrast.

## Explain

Explain the difference between :focus and :focus-visible, why focus styles matter for accessibility, and how to design an accessible focus ring.

## Code Review

Review stylesheets, component styles, and responsive states related to Provide visible custom focus indicators. Flag exact selectors, declarations, or breakpoints that violate the rule in the rendered UI.

---

For full implementation details, code examples, and framework-specific guidance,
see `references/rule.md`.

Rule page: https://frontendchecklist.io/rules/css/focus-styles
