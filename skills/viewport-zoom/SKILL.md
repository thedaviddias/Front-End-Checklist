---
name: viewport-zoom
description: "Use when applies to any `<meta name='viewport'>` element in HTML documents. Check the `content` attribute for `user-scalable=no`, `user-scalable=0`, `maximum-scale=1`, or `maximum-scale` values less than 2. This is a common mistake in mobile-first templates and CSS frameworks."
metadata:
  category: accessibility
  priority: high
  difficulty: beginner
  estimatedTime: "5"
  source: frontendchecklist.io
  url: https://frontendchecklist.io/rules/accessibility/viewport-zoom
---

# Do not disable pinch zoom

Pinch-to-zoom is an essential accessibility feature for low-vision users who cannot read text at the page's default size. When zoom is disabled, these users cannot enlarge text or images, making the page completely inaccessible without external magnification software. Low-vision users who rely on browser zoom are entirely blocked. Additionally, all users benefit from being able to zoom in on small text, fine-print, or complex images. Disabling zoom is one of the most harmful and easily preventable accessibility failures.

## Quick Reference

- Never use `user-scalable=no` or `user-scalable=0` in the viewport meta tag
- Never set `maximum-scale=1` (or any value below 5) in the viewport meta tag
- Both prevent pinch-to-zoom, violating WCAG 2.1 SC 1.4.4 (Resize Text, Level AA)
- The correct viewport meta tag is: `<meta name='viewport' content='width=device-width, initial-scale=1'>`
- Note: iOS 10+ ignores `user-scalable=no` in Safari, but other browsers and older iOS do not

## Check

Find the `<meta name='viewport'>` element in the HTML `<head>`. Check its `content` attribute for: (1) `user-scalable=no` — disables all zoom; (2) `user-scalable=0` — same effect; (3) `maximum-scale=1` or `maximum-scale=1.0` — limits zoom to the initial scale; (4) any `maximum-scale` value below 2 — significantly limits zoom range. Flag any of these. Also check CSS for `touch-action: none` or `user-zoom: fixed` (CSS Device Adaptation, rarely used) that may limit zoom.

## Fix

Remove `user-scalable=no` and `maximum-scale=1` from the viewport meta tag. The correct viewport meta tag for a responsive site is: `<meta name='viewport' content='width=device-width, initial-scale=1'>`. If `maximum-scale` was set for a specific reason (e.g., to prevent unintended zoom on input focus on iOS), the correct fix is to set form input `font-size: 1rem` (16px) instead — iOS Safari only auto-zooms on input focus when font-size is below 16px.

## Explain

WCAG 2.1 SC 1.4.4 (Resize Text, Level AA) requires that text can be resized up to 200% without loss of content or functionality, except for captions and images of text. On mobile devices, pinch-to-zoom and the browser's built-in text size settings are the primary mechanisms for resizing text. Setting `user-scalable=no` or `maximum-scale=1` in the viewport meta tag disables pinch-to-zoom entirely (or limits it to 1x), preventing low-vision users from enlarging content. This is a direct violation of SC 1.4.4. While iOS 10+ Safari ignores these settings, Android browsers, Chrome for iOS, and older iOS versions do not — so the setting must be removed regardless.

## Code Review

Review stylesheets, component styles, and responsive states related to Do not disable pinch zoom. Flag exact selectors, declarations, or breakpoints that violate the rule in the rendered UI.

---

For full implementation details, code examples, and framework-specific guidance,
see `references/rule.md`.

Rule page: https://frontendchecklist.io/rules/accessibility/viewport-zoom
