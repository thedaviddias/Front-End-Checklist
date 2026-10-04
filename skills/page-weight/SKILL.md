---
name: page-weight
description: "Use when auditing slow page loads, heavy assets, or rendering delays related to Keep page weight under 1500KB. Verify the actual bottleneck in DevTools, Lighthouse, or field data before recommending changes."
metadata:
  category: performance
  priority: high
  difficulty: beginner
  estimatedTime: "20"
  source: frontendchecklist.io
  url: https://frontendchecklist.io/rules/performance/page-weight
---

# Keep page weight under 1500KB

Page weight directly correlates with load time—a 1.5MB page takes 3-5 seconds on 4G mobile. Every 100KB reduction improves user experience, especially on slower networks.

## Quick Reference

- Target under 500KB for optimal performance, max 1500KB
- Images typically account for 50-70% of page weight
- JavaScript bundles are often the second largest contributor
- Monitor with performance budgets in CI/CD

## Check

Analyze the total page weight including all resources. Check if it's under 1500KB (ideally under 500KB).

## Fix

Optimize this page to reduce its total weight through image optimization, code minification, and removing unnecessary resources.

## Explain

Explain how page weight impacts loading time, especially on mobile networks, and affects user experience.

## Code Review

Review the routes, assets, and loading behavior that affect Keep page weight under 1500KB. Flag exact files, requests, or rendering steps that add unnecessary network, CPU, or layout cost, and describe the measurement method used to confirm the issue.

---

For full implementation details, code examples, and framework-specific guidance,
see `references/rule.md`.

Rule page: https://frontendchecklist.io/rules/performance/page-weight
