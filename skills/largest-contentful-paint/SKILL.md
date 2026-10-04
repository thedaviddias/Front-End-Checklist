---
name: largest-contentful-paint
description: "Use when auditing slow page loads, heavy assets, or rendering delays related to Optimize largest contentful paint. Verify the actual bottleneck in DevTools, Lighthouse, or field data before recommending changes."
metadata:
  category: performance
  priority: critical
  difficulty: intermediate
  estimatedTime: "25"
  source: frontendchecklist.io
  url: https://frontendchecklist.io/rules/performance/largest-contentful-paint
---

# Optimize largest contentful paint

LCP is the most important Core Web Vital for perceived load speed—it measures when the main content becomes visible, directly impacting user perception and SEO rankings.

## Quick Reference

- LCP measures when the largest element renders—target under 2.5s
- Use preload for hero images and critical resources
- Optimize image formats and use responsive sizes
- Reduce server response time (TTFB)

## Check

Measure LCP using Lighthouse or PageSpeed Insights. Verify the largest visible element renders within 2.5 seconds.

## Fix

Optimize LCP by preloading critical resources, optimizing images, using CDN, and reducing server response time.

## Explain

Explain how LCP measures perceived load speed by tracking when the largest visible content element becomes visible.

## Code Review

Review the routes, assets, and loading behavior that affect Optimize largest contentful paint. Flag exact files, requests, or rendering steps that add unnecessary network, CPU, or layout cost, and describe the measurement method used to confirm the issue.

---

For full implementation details, code examples, and framework-specific guidance,
see `references/rule.md`.

Rule page: https://frontendchecklist.io/rules/performance/largest-contentful-paint
