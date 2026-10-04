---
name: horizontal-scroll
description: "Use when applies to all CSS layout rules. Check `width`, `min-width`, fixed pixel values on containers, `overflow`, `white-space`, and `word-break` properties. Use when auditing responsive design or WCAG 2.1 Level AA compliance. Test at 320px viewport width and at 400% browser zoom."
metadata:
  category: css
  priority: medium
  difficulty: intermediate
  estimatedTime: "10"
  source: frontendchecklist.io
  url: https://frontendchecklist.io/rules/css/horizontal-scroll
---

# Prevent horizontal scrolling

Low-vision users who cannot read at standard zoom levels increase browser zoom to 200–400%. At these zoom levels, a 1280px-wide page becomes effectively 320px wide. If elements overflow the viewport, users must scroll both vertically and horizontally to read content — this is exhausting and error-prone with a screen magnifier. WCAG 2.1 SC 1.4.10 (Reflow) specifically addresses this, requiring that all content is available without two-dimensional scrolling at 400% zoom.

## Quick Reference

- Pages must not produce horizontal scrollbars at viewport widths of 320px and above — WCAG 2.1 SC 1.4.10 (Reflow)
- WCAG 2.1 SC 1.4.10 requires content to reflow at 400% zoom (equivalent to 320px CSS width) without horizontal scroll
- Common causes: fixed-width elements wider than the viewport, `width: 100vw` not accounting for scrollbar width, long unbreakable strings, `white-space: nowrap`
- Use `max-width: 100%` on images and media, `overflow-wrap: break-word` on text containers, and fluid layout units

## Check

Test the page at a 320px CSS viewport width (equivalent to 400% browser zoom on a 1280px screen). Look for horizontal scrollbars or content overflowing outside the viewport. Specifically check: (1) elements with fixed `width` values in px that exceed the viewport; (2) `min-width` values that prevent shrinking; (3) images or media without `max-width: 100%`; (4) `white-space: nowrap` on text that causes overflow; (5) `width: 100vw` on elements (scrollbar width causes overflow); (6) long URLs or unbreakable strings in content areas.

## Fix

(1) Replace fixed `width: Npx` on layout containers with `max-width: Npx` plus `width: 100%`. (2) Add `max-width: 100%` and `height: auto` to all images and media. (3) Apply `overflow-wrap: break-word` (with fallback `word-wrap: break-word`) to text containers that may contain long strings. (4) Replace `width: 100vw` with `width: 100%` on full-width elements (avoid scrollbar overflow). (5) Use CSS Grid or Flexbox with `flex-wrap: wrap` for multi-column layouts. (6) For data tables, wrap in a scrollable container: `overflow-x: auto` on the table wrapper, not the page body.

## Explain

WCAG 2.1 SC 1.4.10 (Reflow, Level AA) requires that content does not require two-dimensional scrolling when displayed at a width of 320 CSS pixels or a height of 256 CSS pixels. This corresponds to 400% zoom on a 1280×1024 display. Exceptions are made for content that requires two-dimensional layout for usage (e.g., data tables, map interfaces, video). For all other content — body text, navigation, forms, images — horizontal scrolling is a barrier for screen magnification users who cannot see the full page width.

## Code Review

Review stylesheets, component styles, and responsive states related to Prevent horizontal scrolling. Flag exact selectors, declarations, or breakpoints that violate the rule in the rendered UI.

---

For full implementation details, code examples, and framework-specific guidance,
see `references/rule.md`.

Rule page: https://frontendchecklist.io/rules/css/horizontal-scroll
