---
name: image-file-size
description: "Use when auditing the image pipeline, static assets in `public/`, CMS-managed media, or image CDN transforms. Separate file-size problems from dimension mismatches so you can tell whether the issue is compression, format choice, or responsive delivery."
metadata:
  category: images
  priority: high
  difficulty: intermediate
  estimatedTime: "20"
  source: frontendchecklist.io
  url: https://frontendchecklist.io/rules/images/image-file-size
---

# Keep image file sizes within recommended limits

Images account for over 50% of average page weight according to HTTP Archive data. Oversized images waste user bandwidth (costly on mobile data plans), delay Largest Contentful Paint (LCP), and increase bounce rates. A 1-second delay in mobile page load can reduce conversions by up to 20% according to Google research.

## Quick Reference

- Photos: target under 200KB (WebP 80% quality); under 400KB for full-bleed hero images
- Graphics/icons: target under 50KB; use SVG for vector graphics
- WebP is typically 25-35% smaller than equivalent-quality JPEG (per web.dev)
- AVIF is typically 40-50% smaller than equivalent-quality JPEG (per web.dev)

## Check

Audit all image assets in this project. For each image: 1) Check the file size in bytes. 2) Flag any photo (JPEG/WebP/AVIF) over 200KB. 3) Flag any graphic/icon (PNG/SVG) over 100KB. 4) Flag any hero or full-width image over 400KB. 5) Flag any thumbnail (under 200px wide) over 30KB. Also check if Lighthouse reports 'Properly size images' or 'Efficiently encode images' as opportunities. Report each oversized image with its path, current size, and an estimated target size.

## Fix

For each oversized image: 1) Convert JPEG/PNG to WebP at 80% quality using Squoosh, Sharp, or ImageOptim—this typically yields 25-35% size reduction over optimised JPEG. 2) Try AVIF at 60% quality for further reduction (often 40-50% smaller than JPEG). 3) Strip metadata (EXIF/IPTC) from images served on the web. 4) For PNGs, run through oxipng or pngquant for lossless or near-lossless compression. 5) For SVGs, run through SVGO. 6) Implement multiple srcset sizes so mobile users download smaller files.

## Explain

Explain how oversized images impact web performance. Images are typically the largest assets on a page—HTTP Archive data consistently shows images account for 40-60% of total page weight. Each KB saved reduces transfer time, especially on mobile networks (4G averages 20Mbps, with significant latency). Large images also delay Largest Contentful Paint (LCP), the primary Core Web Vitals metric. Google's Lighthouse flags images that could be reduced by more than 4KB as an opportunity.

## Code Review

Inspect image assets, build transforms, CMS output, and rendered markup. Flag photos above the documented file-size thresholds, hero images that exceed budget without justification, and image pipelines that ship original uploads instead of compressed responsive variants.

---

For full implementation details, code examples, and framework-specific guidance,
see `references/rule.md`.

Rule page: https://frontendchecklist.io/rules/images/image-file-size
