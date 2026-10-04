---
name: webfont-format
description: "Use when reviewing stylesheets, component styles, and responsive behavior related to Optimize web font formats. Check the rendered layout across breakpoints and interaction states before proposing a fix."
metadata:
  category: css
  priority: medium
  difficulty: intermediate
  estimatedTime: "20"
  source: frontendchecklist.io
  url: https://frontendchecklist.io/rules/css/webfont-format
---

# Optimize web font formats

Modern font formats reduce file sizes by 30-50%—directly improving page load speed and Core Web Vitals scores.

## Quick Reference

- Use WOFF2 as primary format (~30% smaller than WOFF)
- Include WOFF fallback for older browsers
- Apply font-display: swap for better perceived performance
- Preload critical fonts and subset to reduce file sizes

## Check

Verify that web fonts use modern formats (WOFF2, WOFF) with proper fallbacks and are optimized for performance with font-display and preloading strategies.

## Fix

Convert fonts to WOFF2/WOFF formats, implement proper font loading strategies, and optimize font delivery with compression and caching.

## Explain

Explain how modern web font formats reduce file sizes, improve loading performance, and provide better browser support compared to legacy formats.

## Code Review

Review stylesheets, component styles, and responsive states related to Optimize web font formats. Flag exact selectors, declarations, or breakpoints that violate the rule in the rendered UI.

---

For full implementation details, code examples, and framework-specific guidance,
see `references/rule.md`.

Rule page: https://frontendchecklist.io/rules/css/webfont-format
