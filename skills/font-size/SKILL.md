---
name: font-size
description: "Use when applies to all CSS `font-size` declarations, particularly those using `px` units for body text, UI labels, and navigation. Use when auditing mobile responsiveness and accessibility compliance. Check for `font-size` in media queries targeting small screens."
metadata:
  category: css
  priority: medium
  difficulty: intermediate
  estimatedTime: "10"
  source: frontendchecklist.io
  url: https://frontendchecklist.io/rules/css/font-size
---

# Use readable font sizes on mobile

Approximately 1 in 3 adults over 65 increases their browser's default font size. Low-vision users who cannot use screen magnifiers rely on browser font size settings as their primary accessibility tool. If font sizes are set in `px` only, browser font size preferences are ignored entirely. Text smaller than 16px on mobile forces all users to zoom in, breaking the page layout and triggering horizontal scroll. iOS Safari's auto-inflation of sub-12px text causes unintended layout shifts.

## Quick Reference

- Body text should be at least 16px (1rem) on mobile — smaller sizes force users to zoom
- Avoid `font-size` values below 12px; iOS Safari ignores values below 12px and auto-inflates them
- Use `rem` or `em` units instead of `px` so text scales with the user's browser font size preference
- Never set `font-size: 100%` on `<html>` using an override that blocks user scaling — respect the browser default (16px)
- WCAG 2.1 SC 1.4.4 (Resize Text, Level AA): text must be resizable up to 200% without loss of content or functionality

## Check

Find all CSS `font-size` declarations. Flag: (1) body text or paragraph text set below 16px (or 1rem); (2) any font-size below 12px; (3) font-sizes set in `px` on `<html>` or `<body>` that override the browser default; (4) font-sizes that do not scale proportionally when the browser zoom is set to 200% (test in Chrome DevTools by setting font-size in browser settings or using zoom). Check that text remains readable and layout does not break at 200% zoom.

## Fix

(1) Convert pixel font sizes to `rem` units: divide the pixel value by 16 (the browser default) — e.g., `14px` becomes `0.875rem`. (2) Set body text to at least `1rem` (16px equivalent) on mobile. (3) Replace `html { font-size: 10px }` (a common reset trick) with `html { font-size: 62.5% }` or avoid font-size resets entirely — instead use `rem` values calculated from the actual 16px base. (4) If small text is intentional (captions, footnotes), ensure it is at least `0.75rem` (12px) and use `font-size: 0.75rem` so it scales with user preferences.

## Explain

WCAG 2.1 SC 1.4.4 (Resize Text) requires that text can be resized up to 200% without loss of content or functionality, except for captions and images of text. Using `px` units for font sizes makes text immune to browser font size settings (though not to browser zoom). Using `rem` or `em` units allows text to scale with the root font size, which the user can adjust in browser settings — this is the preferred approach. iOS Safari also has a built-in heuristic that inflates text smaller than 12px when the page is displayed in mobile view, which can cause layout inconsistencies.

## Code Review

Review stylesheets, component styles, and responsive states related to Use readable font sizes on mobile. Flag exact selectors, declarations, or breakpoints that violate the rule in the rendered UI.

---

For full implementation details, code examples, and framework-specific guidance,
see `references/rule.md`.

Rule page: https://frontendchecklist.io/rules/css/font-size
