---
name: responsive-size
description: "Use when reviewing image assets, markup, and CDN or build transforms related to Serve images at the correct display size. Check encoded size, rendered size, loading strategy, and above-the-fold impact together."
metadata:
  category: images
  priority: high
  difficulty: intermediate
  estimatedTime: "20"
  source: frontendchecklist.io
  url: https://frontendchecklist.io/rules/images/responsive-size
---

# Serve images at the correct display size

A single oversized hero image can add several megabytes to a page load unnecessarily. On mobile devices with 375px screens, serving a 1600px image downloads 4x the data users need. The 'Properly size images' Lighthouse audit consistently identifies this as one of the highest-impact performance opportunities on most websites.

## Quick Reference

- Serving a 1600px image in a 400px container wastes ~16x the necessary bandwidth
- Use `srcset` with width descriptors and `sizes` with actual layout widths
- The `sizes` attribute is critical—without it the browser assumes `100vw` and picks the largest image
- Lighthouse 'Properly size images' audit reports estimated savings per oversized image

## Check

Audit images in this codebase for oversizing. Use Lighthouse 'Properly size images' audit results as the primary signal. For each <img> in the HTML: 1) Compare the image file's intrinsic width to the element's rendered CSS width (check CSS rules, container constraints). 2) Flag any image where the intrinsic width is more than 2x the rendered width at any common viewport size. 3) Check for srcset usage—images over 200px wide should have srcset variants. 4) Check sizes attribute accuracy—does it reflect the actual CSS layout?

## Fix

For each oversized image: 1) Generate multiple size variants: 400w, 800w, 1200w, 1600w (use Sharp or Squoosh). 2) Add srcset listing each variant with its width descriptor. 3) Add a sizes attribute describing the image's display width at each breakpoint (e.g., sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 400px"). 4) For art direction (different crops), use <picture> with media attributes. 5) For the <img> src fallback, use the medium size (800w). Show complete before/after HTML.

## Explain

Explain why serving oversized images wastes bandwidth. If a browser renders an image at 400px wide but the image file is 2000px wide, the browser downloads ~25x more pixel data than it can display (bandwidth scales with pixel count, not linear dimensions). The Lighthouse 'Properly size images' audit estimates potential savings in KiB for each oversized image. The sizes attribute is the key to accuracy—without it, the browser assumes 100vw and downloads the largest srcset candidate even on narrow viewports.

## Code Review

Review image assets, markup, and delivery configuration related to Serve images at the correct display size. Flag exact files or components where format choice, sizing, or loading behavior violates the rule, and describe how to confirm the fix in DevTools.

---

For full implementation details, code examples, and framework-specific guidance,
see `references/rule.md`.

Rule page: https://frontendchecklist.io/rules/images/responsive-size
