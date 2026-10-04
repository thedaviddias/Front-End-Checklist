---
name: resource-hints
description: "Use when auditing slow page loads, heavy assets, or rendering delays related to Use resource hints for faster loading. Verify the actual bottleneck in DevTools, Lighthouse, or field data before recommending changes."
metadata:
  category: performance
  priority: high
  difficulty: intermediate
  estimatedTime: "20"
  source: frontendchecklist.io
  url: https://frontendchecklist.io/rules/performance/resource-hints
---

# Use resource hints for faster loading

Resource hints let the browser start fetching critical assets earlier—improving LCP by 100-300ms on average.

## Quick Reference

- Use preload for critical above-the-fold resources (fonts, hero images)
- Use preconnect for third-party origins (CDNs, APIs, analytics)
- Use prefetch for resources likely needed on next navigation
- Use dns-prefetch as a lightweight alternative to preconnect

## Check

Analyze resource hints on this page and verify critical resources use preload/preconnect for optimal loading.

## Fix

Add appropriate resource hints (preload, prefetch, preconnect) for critical assets to improve loading performance.

## Explain

Explain the differences between preload, prefetch, preconnect, and dns-prefetch and when to use each.

## Code Review

Review the routes, assets, and loading behavior that affect Use resource hints for faster loading. Flag exact files, requests, or rendering steps that add unnecessary network, CPU, or layout cost, and describe the measurement method used to confirm the issue.

---

For full implementation details, code examples, and framework-specific guidance,
see `references/rule.md`.

Rule page: https://frontendchecklist.io/rules/performance/resource-hints
