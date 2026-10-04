---
name: browser-caching
description: "Use when auditing slow page loads, heavy assets, or rendering delays related to Enable browser caching. Verify the actual bottleneck in DevTools, Lighthouse, or field data before recommending changes."
metadata:
  category: performance
  priority: high
  difficulty: intermediate
  estimatedTime: "20"
  source: frontendchecklist.io
  url: https://frontendchecklist.io/rules/performance/browser-caching
---

# Enable browser caching

Proper caching eliminates redundant downloads on repeat visits—returning users see near-instant page loads when assets are served from browser cache.

## Quick Reference

- Use immutable caching for hashed assets (1 year max-age)
- Use short cache + revalidation for HTML pages
- ETags enable efficient cache validation
- stale-while-revalidate improves perceived performance

## Check

Verify that proper cache headers are set for static resources to enable browser caching.

## Fix

Configure appropriate Cache-Control and ETag headers for different resource types.

## Explain

Explain how browser caching reduces server requests and improves repeat visit performance.

## Code Review

Review the routes, assets, and loading behavior that affect Enable browser caching. Flag exact files, requests, or rendering steps that add unnecessary network, CPU, or layout cost, and describe the measurement method used to confirm the issue.

---

For full implementation details, code examples, and framework-specific guidance,
see `references/rule.md`.

Rule page: https://frontendchecklist.io/rules/performance/browser-caching
