---
name: progressive-jpeg
description: "Use when reviewing image assets, markup, and CDN or build transforms related to Use progressive JPEG encoding. Check encoded size, rendered size, loading strategy, and above-the-fold impact together."
metadata:
  category: images
  priority: low
  difficulty: beginner
  estimatedTime: "10"
  source: frontendchecklist.io
  url: https://frontendchecklist.io/rules/images/progressive-jpeg
---

# Use progressive JPEG encoding

Progressive JPEGs display a low-quality preview immediately rather than loading line-by-line—users see something faster, improving perceived performance even if total load time is similar.

## Quick Reference

- Progressive JPEGs show blurry preview immediately, then sharpen
- Better perceived performance than baseline JPEGs that load top-to-bottom
- Similar file size to baseline JPEG (sometimes slightly smaller)
- Less relevant with modern formats (WebP, AVIF) but still useful for fallbacks

## Check

Check if JPEG images are saved in progressive format for better perceived performance.

## Fix

Convert baseline JPEGs to progressive format for improved loading experience.

## Explain

Explain how progressive JPEGs show a low-quality preview that improves perceived performance.

## Code Review

Review image assets, markup, and delivery configuration related to Use progressive JPEG encoding. Flag exact files or components where format choice, sizing, or loading behavior violates the rule, and describe how to confirm the fix in DevTools.

---

For full implementation details, code examples, and framework-specific guidance,
see `references/rule.md`.

Rule page: https://frontendchecklist.io/rules/images/progressive-jpeg
