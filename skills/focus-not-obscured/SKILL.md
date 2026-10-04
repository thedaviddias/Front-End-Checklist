---
name: focus-not-obscured
description: "Use when reviewing sticky navigation, consent banners, chat widgets, skip links, or any fixed-position UI. Validate the actual tab order and viewport behavior at realistic zoom levels."
metadata:
  category: accessibility
  priority: high
  difficulty: intermediate
  estimatedTime: "20"
  source: frontendchecklist.io
  url: https://frontendchecklist.io/rules/accessibility/focus-not-obscured
---

# Keep focused elements unobscured

A visible focus ring is not enough if the focused element sits behind a sticky header or footer. Keyboard users need to see the actual focused control and the focus indicator at the same time in order to continue the task.

## Quick Reference

- Sticky UI must not cover the focused control while keyboard users tab through the page
- Use `scroll-padding` or equivalent spacing when fixed headers or footers are present
- Test with cookie banners, chat widgets, and consent bars open
- Re-test at zoomed and mobile layouts where overlap problems usually appear

## Check

Audit keyboard focus with all sticky UI active. Check headers, footers, cookie banners, promo bars, and chat launchers for cases where the focused element scrolls underneath them.

## Fix

Add layout spacing such as scroll-padding, reduce overlay height, or change focus/scroll behavior so the focused element remains visible when tabbing.

## Explain

Explain WCAG Focus Not Obscured, why fixed-position UI commonly breaks it, and how scroll-padding and overlay layout choices prevent the issue.

## Code Review

Review sticky layout, focus styles, overlays, and keyboard navigation related to Keep focused elements unobscured. Flag exact selectors, breakpoints, or UI states where focused controls can be covered.

---

For full implementation details, code examples, and framework-specific guidance,
see `references/rule.md`.

Rule page: https://frontendchecklist.io/rules/accessibility/focus-not-obscured
