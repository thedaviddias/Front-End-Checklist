---
name: responsive-images
description: "Use when reviewing article images, cards, galleries, or any component rendered at multiple sizes across breakpoints. Check both the markup and the CSS layout because an incorrect `sizes` attribute can negate a perfectly good `srcset`."
metadata:
  category: images
  priority: high
  difficulty: intermediate
  estimatedTime: "20"
  source: frontendchecklist.io
  url: https://frontendchecklist.io/rules/images/responsive-images
---

# Implement responsive images with srcset

Serving a 2000px image to a 400px phone screen wastes bandwidth and slows loading—srcset lets the browser download only the size it needs.

## Quick Reference

- Use srcset to provide multiple image sizes
- Use sizes attribute to tell browser which size to download
- Browser selects optimal size based on viewport and DPR
- Can save 50-70% bandwidth on mobile devices

## Check

Verify that images use srcset and sizes attributes for responsive delivery.

## Fix

Implement responsive images with srcset for different screen sizes and resolutions.

## Explain

Explain how responsive images deliver optimized versions based on device capabilities.

## Code Review

Inspect image markup and component abstractions for `srcset`, `sizes`, and width/height handling. Flag pages that always ship desktop-sized assets to mobile, omit `sizes`, or generate variants that do not match the actual rendered layout.

---

For full implementation details, code examples, and framework-specific guidance,
see `references/rule.md`.

Rule page: https://frontendchecklist.io/rules/images/responsive-images
