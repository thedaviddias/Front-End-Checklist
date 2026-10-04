---
name: svg-optimization
description: "Use when reviewing image assets, markup, and CDN or build transforms related to Optimize SVG files. Check encoded size, rendered size, loading strategy, and above-the-fold impact together."
metadata:
  category: images
  priority: medium
  difficulty: beginner
  estimatedTime: "10"
  source: frontendchecklist.io
  url: https://frontendchecklist.io/rules/images/svg-optimization
---

# Optimize SVG files

SVGs exported from design tools contain unnecessary metadata, comments, and redundant code—optimization removes this bloat, often cutting file size in half.

## Quick Reference

- SVGO can reduce SVG file size by 50-80%
- Removes editor metadata, comments, and redundant attributes
- Preserve viewBox and accessibility attributes
- Integrate into build process for automatic optimization

## Check

Check if SVG files are optimized by removing unnecessary metadata and formatting.

## Fix

Optimize SVG files using SVGO or similar tools to reduce file size.

## Explain

Explain how SVG optimization can reduce file sizes by 50-80% without quality loss.

## Code Review

Review image assets, markup, and delivery configuration related to Optimize SVG files. Flag exact files or components where format choice, sizing, or loading behavior violates the rule, and describe how to confirm the fix in DevTools.

---

For full implementation details, code examples, and framework-specific guidance,
see `references/rule.md`.

Rule page: https://frontendchecklist.io/rules/images/svg-optimization
