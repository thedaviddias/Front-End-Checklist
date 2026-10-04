---
name: image-cdn
description: "Use when reviewing image assets, markup, and CDN or build transforms related to Serve images from a CDN. Check encoded size, rendered size, loading strategy, and above-the-fold impact together."
metadata:
  category: images
  priority: high
  difficulty: intermediate
  estimatedTime: "30"
  source: frontendchecklist.io
  url: https://frontendchecklist.io/rules/images/image-cdn
---

# Serve images from a CDN

Image CDNs automatically optimize, resize, and convert images on-the-fly—delivering the smallest file in the best format without manual processing.

## Quick Reference

- Use image CDN for automatic format conversion (WebP, AVIF)
- Generate responsive sizes on-the-fly via URL parameters
- CDN edge caching delivers images from nearest location
- Popular options: Cloudinary, Imgix, Cloudflare Images, Vercel

## Check

Verify if images are served from a CDN or image optimization service.

## Fix

Configure an image CDN like Cloudinary, Imgix, or Cloudflare Images for automatic optimization.

## Explain

Explain how image CDNs provide on-the-fly optimization, resizing, and format conversion.

## Code Review

Review image assets, markup, and delivery configuration related to Serve images from a CDN. Flag exact files or components where format choice, sizing, or loading behavior violates the rule, and describe how to confirm the fix in DevTools.

---

For full implementation details, code examples, and framework-specific guidance,
see `references/rule.md`.

Rule page: https://frontendchecklist.io/rules/images/image-cdn
