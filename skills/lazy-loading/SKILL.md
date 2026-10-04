---
name: lazy-loading
description: "Use when auditing slow page loads, heavy assets, or rendering delays related to Implement lazy loading for offscreen content. Verify the actual bottleneck in DevTools, Lighthouse, or field data before recommending changes. Absence of `loading='lazy'` is not enough by itself when fold position is unknown."
metadata:
  category: performance
  priority: high
  difficulty: beginner
  estimatedTime: "15"
  source: frontendchecklist.io
  url: https://frontendchecklist.io/rules/performance/lazy-loading
---

# Implement lazy loading for offscreen content

Lazy loading defers non-critical resources until needed—this reduces initial page weight, speeds up first paint, and saves bandwidth for content users may never scroll to.

## Quick Reference

- Use loading='lazy' for images below the fold
- Never lazy load LCP/above-fold images—they need priority
- Lazy load iframes, videos, and heavy components
- Use Intersection Observer for custom lazy loading
- If fold position is unclear from the snippet, do not invent a lazy-loading defect

## Check

Verify that images and other heavy resources below the fold are lazy loaded. Only report this when the code or route context makes offscreen placement clear.

## Fix

Implement lazy loading for images, videos, and iframes using native loading='lazy' or JavaScript solutions.

## Explain

Explain how lazy loading defers resource loading until needed, improving initial page load performance.

## Code Review

Review the routes, assets, and loading behavior that affect Implement lazy loading for offscreen content. Flag exact files, requests, or rendering steps that add unnecessary network, CPU, or layout cost, and describe the measurement method used to confirm the issue.

---

For full implementation details, code examples, and framework-specific guidance,
see `references/rule.md`.

Rule page: https://frontendchecklist.io/rules/performance/lazy-loading
