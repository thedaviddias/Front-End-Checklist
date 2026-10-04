---
name: image-optimization
description: "Use when reviewing image assets, markup, and CDN or build transforms related to Optimize all images for web. Check encoded size, rendered size, loading strategy, and above-the-fold impact together."
metadata:
  category: images
  priority: high
  difficulty: intermediate
  estimatedTime: "20"
  source: frontendchecklist.io
  url: https://frontendchecklist.io/rules/images/image-optimization
---

# Optimize all images for web

Images typically account for 50%+ of page weight. Unoptimized images cause slow load times, wasted bandwidth, poor Core Web Vitals scores, and frustrated users—especially on mobile networks.

## Quick Reference

- Use modern formats: AVIF > WebP > JPEG/PNG
- Compress images to 80% quality for photos
- Always provide responsive srcset for different screen sizes
- Use `<picture>` element for format fallbacks

## Check

Scan this codebase for all image assets and <img> elements. For each image, verify: 1) Format is appropriate (WebP/AVIF for photos, SVG for icons, PNG only for transparency). 2) Responsive srcset and sizes attributes exist for images > 100px wide. 3) width/height attributes are present to prevent layout shift. 4) loading='lazy' is set for below-fold images. 5) File sizes are reasonable (< 200KB for photos, < 50KB for graphics). Report issues grouped by severity with file paths.

## Fix

For each image optimization issue found: 1) Convert JPEG/PNG photos to WebP with AVIF fallback using <picture> element. 2) Add srcset with 400w, 800w, 1200w, 1600w variants and appropriate sizes attribute. 3) Add explicit width/height attributes matching aspect ratio. 4) Add loading='lazy' to images below the fold, keep priority images without lazy loading. 5) Compress images to 80% quality for photos, 60% for AVIF. 6) Use SVG for icons and logos. Show the corrected HTML with optimized image markup.

## Explain

Explain the impact of image optimization on Core Web Vitals, specifically how unoptimized images affect Largest Contentful Paint (LCP) and Cumulative Layout Shift (CLS). Cover the compression differences between AVIF, WebP, and JPEG formats, when to use each, and browser support considerations. Describe how srcset and sizes work together to serve appropriately-sized images, and why width/height attributes prevent layout shift. Include bandwidth savings calculations and loading performance improvements.

## Code Review

Review image assets, markup, and delivery configuration related to Optimize all images for web. Flag exact files or components where format choice, sizing, or loading behavior violates the rule, and describe how to confirm the fix in DevTools.

---

For full implementation details, code examples, and framework-specific guidance,
see `references/rule.md`.

Rule page: https://frontendchecklist.io/rules/images/image-optimization
