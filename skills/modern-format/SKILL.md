---
name: modern-format
description: "Use when reviewing image assets, markup, and CDN or build transforms related to Use modern image formats (WebP, AVIF). Check encoded size, rendered size, loading strategy, and above-the-fold impact together."
metadata:
  category: images
  priority: high
  difficulty: intermediate
  estimatedTime: "20"
  source: frontendchecklist.io
  url: https://frontendchecklist.io/rules/images/modern-format
---

# Use modern image formats (WebP, AVIF)

Images are typically 50%+ of page weight. Switching from JPEG to WebP alone reduces transfer sizes by 25-35% with no visible quality change, directly improving Largest Contentful Paint (LCP) and saving bandwidth for users on mobile data plans. These savings compound across every visitor and every image on the site.

## Quick Reference

- WebP is ~25-35% smaller than JPEG at equivalent quality (per web.dev)
- AVIF is ~40-50% smaller than JPEG at equivalent quality (per web.dev)
- Use `<picture>` with `<source type="image/avif">` and `<source type="image/webp">` plus an `<img>` fallback
- WebP has 97%+ global browser support; AVIF is supported in all modern browsers as of 2023

## Check

Scan all <img> elements and CSS background-image declarations in this codebase. Identify: 1) Any <img src> pointing to .jpg, .jpeg, or .png files (not served via a CDN that auto-negotiates format). 2) Any <picture> elements that lack <source type="image/webp"> or <source type="image/avif"> entries. 3) Any CSS background images using JPEG or PNG when a WebP equivalent could be used. Report each finding with file path and line number.

## Fix

For each image not using modern formats: 1) Convert to WebP at 80% quality using Squoosh or Sharp. 2) Optionally also generate AVIF at 60% quality for browsers that support it. 3) Wrap the original <img> in a <picture> element and add <source type="image/avif"> and <source type="image/webp"> entries with the new files. 4) Keep the original JPEG/PNG as the <img src> fallback. For CSS background images, use a @supports (background-image: url('.webp')) { } query to serve WebP to supporting browsers.

## Explain

Explain the compression advantages of WebP and AVIF over JPEG and PNG. According to web.dev, WebP lossless images are 26% smaller than PNG and WebP lossy images are 25-35% smaller than JPEG at equivalent visual quality. AVIF offers further improvements: roughly 40-50% smaller than equivalent JPEG. Explain browser support: WebP has 97%+ global browser support as of 2024. AVIF is supported in Chrome 85+, Firefox 93+, and Safari 16.4+. The <picture> element with fallbacks means there is no risk in adopting these formats today.

## Code Review

Review image assets, markup, and delivery configuration related to Use modern image formats (WebP, AVIF). Flag exact files or components where format choice, sizing, or loading behavior violates the rule, and describe how to confirm the fix in DevTools.

---

For full implementation details, code examples, and framework-specific guidance,
see `references/rule.md`.

Rule page: https://frontendchecklist.io/rules/images/modern-format
