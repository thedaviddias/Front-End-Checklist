---
name: first-contentful-paint
description: "Use when auditing slow page loads, heavy assets, or rendering delays related to Optimize first contentful paint. Verify the actual bottleneck in DevTools, Lighthouse, or field data before recommending changes."
metadata:
  category: performance
  priority: high
  difficulty: intermediate
  estimatedTime: "20"
  source: frontendchecklist.io
  url: https://frontendchecklist.io/rules/performance/first-contentful-paint
---

# Optimize first contentful paint

FCP is the first visual signal that a page is loading—fast FCP reassures users that the site is responding, reducing perceived wait time and bounce rates.

## Quick Reference

- FCP measures time until first text/image appears—target under 1.8s
- Eliminate render-blocking CSS and JavaScript
- Inline critical CSS for above-fold content
- Use preconnect for third-party origins

## Check

Measure FCP using Lighthouse or PageSpeed Insights. Verify first content appears within 1.8 seconds.

## Fix

Optimize FCP by eliminating render-blocking resources, inlining critical CSS, and reducing server response time.

## Explain

Explain how FCP measures the time until the first text or image is painted, indicating page load has begun.

## Code Review

Review the routes, assets, and loading behavior that affect Optimize first contentful paint. Flag exact files, requests, or rendering steps that add unnecessary network, CPU, or layout cost, and describe the measurement method used to confirm the issue.

---

For full implementation details, code examples, and framework-specific guidance,
see `references/rule.md`.

Rule page: https://frontendchecklist.io/rules/performance/first-contentful-paint
