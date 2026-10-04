---
name: webp-format
description: "Use when reviewing image assets, markup, and CDN or build transforms related to Use WebP format with fallbacks. Check encoded size, rendered size, loading strategy, and above-the-fold impact together."
metadata:
  category: images
  priority: high
  difficulty: beginner
  estimatedTime: "15"
  source: frontendchecklist.io
  url: https://frontendchecklist.io/rules/images/webp-format
---

# Use WebP format with fallbacks

WebP is smaller than JPEG and PNG at similar quality—using it reduces page weight by 25-35% for images, improving load times on all devices.

## Quick Reference

- WebP provides 25-35% better compression than JPEG/PNG
- 97%+ browser support—nearly universal
- Use picture element for older browser fallbacks
- Supports transparency (like PNG) and animation (like GIF)

## Check

Check if images are served in modern formats like WebP with fallbacks for older browsers.

## Fix

Convert images to WebP format and implement proper fallback strategies.

## Explain

Explain how WebP provides 25-35% better compression than JPEG and PNG.

## Code Review

Review image assets, markup, and delivery configuration related to Use WebP format with fallbacks. Flag exact files or components where format choice, sizing, or loading behavior violates the rule, and describe how to confirm the fix in DevTools.

---

For full implementation details, code examples, and framework-specific guidance,
see `references/rule.md`.

Rule page: https://frontendchecklist.io/rules/images/webp-format
