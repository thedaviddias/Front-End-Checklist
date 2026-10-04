---
name: css-minification
description: "Use when reviewing stylesheets, component styles, and responsive behavior related to Minify all CSS files. Check the rendered layout across breakpoints and interaction states before proposing a fix."
metadata:
  category: css
  priority: high
  difficulty: beginner
  estimatedTime: "15"
  source: frontendchecklist.io
  url: https://frontendchecklist.io/rules/css/css-minification
---

# Minify all CSS files

Unminified CSS wastes bandwidth with whitespace, comments, and verbose syntax—minification delivers the same styles in significantly fewer bytes.

## Quick Reference

- Enable minification in build tool (Vite, webpack, etc.)
- Use cssnano or lightningcss for PostCSS pipelines
- Typical reduction: 20-40% file size savings
- Combine with Gzip/Brotli for maximum compression

## Check

Verify that all CSS files are minified in production to reduce file size, eliminate whitespace, and improve page load performance.

## Fix

Set up CSS minification in your build process using tools like cssnano, CleanCSS, or built-in framework minification to compress CSS files.

## Explain

Explain how CSS minification improves website performance by reducing file sizes, decreasing bandwidth usage, and speeding up page load times.

## Code Review

Review stylesheets, component styles, and responsive states related to Minify all CSS files. Flag exact selectors, declarations, or breakpoints that violate the rule in the rendered UI.

---

For full implementation details, code examples, and framework-specific guidance,
see `references/rule.md`.

Rule page: https://frontendchecklist.io/rules/css/css-minification
