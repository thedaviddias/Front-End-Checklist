---
name: optimized
description: "Use when reviewing image assets, markup, and CDN or build transforms related to Optimise images for faster loading. Check encoded size, rendered size, loading strategy, and above-the-fold impact together."
metadata:
  category: images
  priority: high
  difficulty: intermediate
  estimatedTime: "20"
  source: frontendchecklist.io
  url: https://frontendchecklist.io/rules/images/optimized
---

# Optimise images for faster loading

Unoptimised images are the most prevalent cause of page bloat. A DSLR-quality JPEG with EXIF data can be 8MB; the same image optimised for web delivery is under 200KB with no visible quality difference. Lighthouse's 'Efficiently encode images' audit reports potential savings that, when fixed, directly improve LCP and reduce bandwidth costs.

## Quick Reference

- Strip EXIF metadata from all JPEG/WebP images before deployment—it adds unnecessary bytes
- JPEG: quality 80 with `progressive: true` (mozjpeg); PNG: run pngquant at quality 65-80
- SVG: run through SVGO to remove editor artefacts and reduce file size
- Lighthouse flags images reducible by 4KB+ as 'Efficiently encode images' opportunities

## Check

Audit all image assets in this project for optimisation issues: 1) Run Lighthouse and check the 'Efficiently encode images' audit—it flags images that could be reduced by 4KB or more. 2) Check if JPEG images use progressive encoding (better perceived performance). 3) Check if images retain EXIF/IPTC metadata (adds unnecessary bytes). 4) Check if PNG images could be quantised (pngquant) for smaller files. 5) Check if SVG files contain unnecessary editor metadata, comments, or redundant attributes. Report each image with its current size and estimated savings.

## Fix

For each unoptimised image: 1) JPEG: re-encode with mozjpeg at quality 80 with progressive=true. 2) PNG: run pngquant at quality 65-80 for lossy compression, or oxipng for lossless. 3) WebP: encode at quality 80. 4) AVIF: encode at quality 60 with effort 6. 5) SVG: run through SVGO to remove editor metadata, comments, and redundant attributes. 6) Strip EXIF metadata from all JPEG/WebP images. For each image, show the before/after file size and percentage reduction.

## Explain

Explain what image optimisation means technically. JPEG compression works by converting pixel data to frequency components (DCT) and quantising the high-frequency data—quality settings control how aggressively this quantisation occurs. PNG uses lossless DEFLATE compression, but colour quantisation (pngquant) can massively reduce file size with minimal visible change. EXIF metadata (GPS, camera model, timestamps) adds kilobytes to images with no benefit for web users. Progressive JPEG encoding allows the browser to show a low-resolution version immediately while the full image loads, improving perceived performance.

## Code Review

Review image assets, markup, and delivery configuration related to Optimise images for faster loading. Flag exact files or components where format choice, sizing, or loading behavior violates the rule, and describe how to confirm the fix in DevTools.

---

For full implementation details, code examples, and framework-specific guidance,
see `references/rule.md`.

Rule page: https://frontendchecklist.io/rules/images/optimized
