---
name: srcset
description: "Use when reviewing image assets, markup, and CDN or build transforms related to Use srcset for responsive images. Check encoded size, rendered size, loading strategy, and above-the-fold impact together."
metadata:
  category: images
  priority: high
  difficulty: intermediate
  estimatedTime: "15"
  source: frontendchecklist.io
  url: https://frontendchecklist.io/rules/images/srcset
---

# Use srcset for responsive images

Without `srcset`, every user—regardless of their device—downloads the same large image. A 1600px hero image served to a 375px mobile display downloads 4x the data needed. The `srcset` attribute lets browsers choose the optimal file automatically, reducing bandwidth by 50-80% for mobile users with no change to visual quality.

## Quick Reference

- Add `srcset` with width descriptors (`400w`, `800w`) to all images wider than ~100px
- Always pair `srcset` width descriptors with a `sizes` attribute—without `sizes` the browser assumes `100vw`
- Use density descriptors (`1x`, `2x`) only for fixed-size images like avatars and icons
- Keep `src` pointing to a fallback size for browsers that don't support `srcset`

## Check

Scan all <img> elements in this codebase. Flag: 1) Any <img> wider than 100px (in CSS or layout) that lacks a srcset attribute. 2) Any <img> with srcset but missing a sizes attribute (necessary for width descriptors). 3) Any <img> using only density descriptors (1x, 2x) where width descriptors (400w, 800w) would be more appropriate. 4) Any srcset that provides only one size (no benefit over plain src). Report each finding with file path and line number.

## Fix

For each <img> missing srcset: 1) Generate multiple width variants: typically 400w, 800w, 1200w (add 1600w for full-bleed images). 2) Add srcset listing each variant with its width descriptor. 3) Add a sizes attribute describing actual CSS layout width at each breakpoint. 4) Keep src pointing to a mid-range size (800w) as the fallback. 5) Add width and height attributes if missing. For each image, show the complete corrected HTML including srcset and sizes.

## Explain

Explain how srcset and the two descriptor types work. Width descriptors (400w, 800w) describe the intrinsic width of each candidate; the browser combines this with the sizes attribute to calculate which candidate provides the best pixel density for the current viewport. Density descriptors (1x, 2x) are simpler but less flexible—use them only for fixed-size images like avatars and icons. The sizes attribute is critical: without it, the browser assumes 100vw and always downloads the largest candidate even on narrow screens.

## Code Review

Review image assets, markup, and delivery configuration related to Use srcset for responsive images. Flag exact files or components where format choice, sizing, or loading behavior violates the rule, and describe how to confirm the fix in DevTools.

---

For full implementation details, code examples, and framework-specific guidance,
see `references/rule.md`.

Rule page: https://frontendchecklist.io/rules/images/srcset
