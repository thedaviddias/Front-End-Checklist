---
name: image-compression
description: "Use when reviewing image assets, markup, and CDN or build transforms related to Compress images without quality loss. Check encoded size, rendered size, loading strategy, and above-the-fold impact together."
metadata:
  category: images
  priority: high
  difficulty: beginner
  estimatedTime: "15"
  source: frontendchecklist.io
  url: https://frontendchecklist.io/rules/images/image-compression
---

# Compress images without quality loss

Uncompressed images are often 5-10x larger than needed—proper compression dramatically reduces page weight and load times with minimal visual impact.

## Quick Reference

- Compress JPEG to 70-85% quality (often visually identical)
- Use lossy compression for photos, lossless for graphics
- Automate compression in build process
- Can reduce file sizes by 60-80% without visible quality loss

## Check

Analyze if images are properly compressed without significant quality loss.

## Fix

Compress images using tools like ImageOptim, TinyPNG, or automated build processes.

## Explain

Explain how proper compression can reduce image sizes by 60-80% with minimal quality impact.

## Code Review

Review image assets, markup, and delivery configuration related to Compress images without quality loss. Flag exact files or components where format choice, sizing, or loading behavior violates the rule, and describe how to confirm the fix in DevTools.

---

For full implementation details, code examples, and framework-specific guidance,
see `references/rule.md`.

Rule page: https://frontendchecklist.io/rules/images/image-compression
