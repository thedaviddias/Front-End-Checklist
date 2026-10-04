---
name: lazy-above-fold
description: "Use when auditing slow page loads, heavy assets, or rendering delays related to Disable lazy loading for above-the-fold content. Verify the actual bottleneck in DevTools, Lighthouse, or field data before recommending changes."
metadata:
  category: performance
  priority: medium
  difficulty: intermediate
  estimatedTime: "10"
  source: frontendchecklist.io
  url: https://frontendchecklist.io/rules/performance/lazy-above-fold
---

# Disable lazy loading for above-the-fold content

Applying lazy loading to hero images or other primary content can cause a significant delay in how quickly users perceive the page as loaded.

## Quick Reference

- Do not use `loading="lazy"` for images in the initial viewport
- Lazy loading above-the-fold images delays the Largest Contentful Paint (LCP)
- Ensure critical images start downloading as early as possible

## Check

Review the page's images and check for `loading="lazy"` on any images that are likely to be in the initial viewport (above-the-fold).

## Fix

Remove `loading="lazy"` from above-the-fold images and consider using `fetchpriority="high"` instead.

## Explain

Explain why lazy loading above-the-fold content negatively impacts perceived performance and LCP.

## Code Review

Review the routes, assets, and loading behavior that affect Disable lazy loading for above-the-fold content. Flag exact files, requests, or rendering steps that add unnecessary network, CPU, or layout cost, and describe the measurement method used to confirm the issue.

---

For full implementation details, code examples, and framework-specific guidance,
see `references/rule.md`.

Rule page: https://frontendchecklist.io/rules/performance/lazy-above-fold
