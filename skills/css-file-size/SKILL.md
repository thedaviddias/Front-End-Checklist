---
name: css-file-size
description: "Use when auditing slow page loads, heavy assets, or rendering delays related to Optimize CSS file size. Verify the actual bottleneck in DevTools, Lighthouse, or field data before recommending changes."
metadata:
  category: performance
  priority: medium
  difficulty: intermediate
  estimatedTime: "10"
  source: frontendchecklist.io
  url: https://frontendchecklist.io/rules/performance/css-file-size
---

# Optimize CSS file size

Large CSS files block rendering and increase the time it takes for the browser to construct the CSSOM, leading to a slower First Contentful Paint.

## Quick Reference

- Keep individual CSS files small to speed up parsing and rendering
- Use minification and remove unused CSS (PurgeCSS)
- Leverage modular CSS or Tailwind to reduce duplication

## Check

Audit the size of CSS files and identify those exceeding recommended limits (e.g., > 50KB gzipped).

## Fix

Minify CSS, remove unused styles, and consider splitting large stylesheets into smaller, page-specific files.

## Explain

Explain how CSS file size affects the critical rendering path and browser performance.

## Code Review

Review the routes, assets, and loading behavior that affect Optimize CSS file size. Flag exact files, requests, or rendering steps that add unnecessary network, CPU, or layout cost, and describe the measurement method used to confirm the issue.

---

For full implementation details, code examples, and framework-specific guidance,
see `references/rule.md`.

Rule page: https://frontendchecklist.io/rules/performance/css-file-size
