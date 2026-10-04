---
name: offscreen-lazy
description: "Use when reviewing image assets, markup, and CDN or build transforms related to Lazy load offscreen images. Check encoded size, rendered size, loading strategy, and above-the-fold impact together. Missing `loading='lazy'` is only a valid finding when you can reasonably tell the image is offscreen or non-critical."
metadata:
  category: images
  priority: high
  difficulty: beginner
  estimatedTime: "10"
  source: frontendchecklist.io
  url: https://frontendchecklist.io/rules/images/offscreen-lazy
---

# Lazy load offscreen images

Lazy loading eliminates unnecessary image downloads on initial page load. A page with 20 images below the fold may transfer several megabytes of data that users who don't scroll will never see. Deferring these downloads reduces Time to Interactive, improves LCP for above-fold content, and saves bandwidth—particularly impactful for users on metered mobile connections.

## Quick Reference

- Add `loading="lazy"` to all `<img>` elements below the fold
- Never lazy-load the LCP image (hero, first product image)—use `fetchpriority="high"` instead
- Always pair `loading="lazy"` with `width` and `height` attributes to prevent CLS
- Native `loading="lazy"` has universal support in all modern browsers—no JavaScript polyfill needed
- If fold position is unclear from the snippet, do not invent a lazy-loading defect

## Check

Scan all <img> elements in this codebase. Identify: 1) Any <img> elements below the fold (not in the first viewport) that are missing loading="lazy". 2) Any <img> elements marked loading="lazy" that appear to be above the fold (hero images, first product images, logos in headers). 3) Any <img> with loading="eager" below the fold. Report the above-fold images that should NOT have lazy loading separately from below-fold images that should have it. If fold position cannot be inferred from the snippet, do not report missing lazy loading as a defect.

## Fix

For images that should use lazy loading: 1) Add loading="lazy" to all <img> elements that appear below the fold. 2) Remove loading="lazy" from any hero, logo, or first-visible image—these should load immediately. 3) Ensure all lazy-loaded images have explicit width and height attributes to prevent CLS. 4) For the LCP image specifically, add fetchpriority="high" and remove loading="lazy". Show the corrected HTML for each modified image.

## Explain

Explain how native browser lazy loading works. The loading="lazy" attribute tells the browser to defer image download until the image is within a browser-defined distance from the viewport (typically 1250px on a slow connection). This reduces the data transferred on initial load, lowers Time to Interactive, and saves bandwidth for users who never scroll to those images. Browser support is universal in modern browsers. The critical caveat: never lazy-load the LCP image—it must load as fast as possible.

## Code Review

Review image assets, markup, and delivery configuration related to Lazy load offscreen images. Flag exact files or components where format choice, sizing, or loading behavior violates the rule, and describe how to confirm the fix in DevTools.

---

For full implementation details, code examples, and framework-specific guidance,
see `references/rule.md`.

Rule page: https://frontendchecklist.io/rules/images/offscreen-lazy
