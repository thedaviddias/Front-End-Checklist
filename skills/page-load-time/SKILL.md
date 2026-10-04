---
name: page-load-time
description: "Use when auditing slow page loads, heavy assets, or rendering delays related to Keep page load time under 3 seconds. Verify the actual bottleneck in DevTools, Lighthouse, or field data before recommending changes."
metadata:
  category: performance
  priority: high
  difficulty: intermediate
  estimatedTime: "30"
  source: frontendchecklist.io
  url: https://frontendchecklist.io/rules/performance/page-load-time
---

# Keep page load time under 3 seconds

Studies show 53% of mobile users abandon sites that take longer than 3 seconds to load—slow pages directly hurt conversions, engagement, and SEO rankings.

## Quick Reference

- 3 seconds is the threshold where bounce rates spike dramatically
- 53% of mobile users abandon sites taking over 3 seconds
- Focus on Core Web Vitals: LCP, FID/INP, CLS
- Test on throttled 3G to simulate real-world conditions

## Check

Measure the page load time and verify it's under 3 seconds on a standard connection.

## Fix

Optimize page load time through lazy loading, CDN usage, caching strategies, and resource optimization.

## Explain

Explain how page load time affects bounce rate, SEO rankings, and user satisfaction.

## Code Review

Review the routes, assets, and loading behavior that affect Keep page load time under 3 seconds. Flag exact files, requests, or rendering steps that add unnecessary network, CPU, or layout cost, and describe the measurement method used to confirm the issue.

---

For full implementation details, code examples, and framework-specific guidance,
see `references/rule.md`.

Rule page: https://frontendchecklist.io/rules/performance/page-load-time
