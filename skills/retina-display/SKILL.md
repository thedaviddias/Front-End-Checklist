---
name: retina-display
description: "Use when reviewing image assets, markup, and CDN or build transforms related to Support high-DPI retina displays. Check encoded size, rendered size, loading strategy, and above-the-fold impact together."
metadata:
  category: images
  priority: medium
  difficulty: intermediate
  estimatedTime: "15"
  source: frontendchecklist.io
  url: https://frontendchecklist.io/rules/images/retina-display
---

# Support high-DPI retina displays

Standard images look blurry on retina displays (2x, 3x pixel density)—high-resolution assets ensure sharp visuals on modern devices.

## Quick Reference

- Provide 2x and 3x images for high-DPI displays
- Use srcset with x descriptors for fixed-size images
- Use srcset with w descriptors for responsive images
- CSS background-image: use image-set() or media queries

## Check

Check if high-resolution images are provided for retina displays (2x, 3x).

## Fix

Add retina-ready images using srcset or CSS image-set for high-DPI displays.

## Explain

Explain how retina images ensure sharp visuals on high-density displays.

## Code Review

Review image assets, markup, and delivery configuration related to Support high-DPI retina displays. Flag exact files or components where format choice, sizing, or loading behavior violates the rule, and describe how to confirm the fix in DevTools.

---

For full implementation details, code examples, and framework-specific guidance,
see `references/rule.md`.

Rule page: https://frontendchecklist.io/rules/images/retina-display
