---
name: cumulative-layout-shift
description: "Use when auditing slow page loads, heavy assets, or rendering delays related to Minimize cumulative layout shift. Verify the actual bottleneck in DevTools, Lighthouse, or field data before recommending changes."
metadata:
  category: performance
  priority: high
  difficulty: intermediate
  estimatedTime: "20"
  source: frontendchecklist.io
  url: https://frontendchecklist.io/rules/performance/cumulative-layout-shift
---

# Minimize cumulative layout shift

Layout shifts cause accidental clicks, reading disruption, and user frustration—a good CLS score ensures content stays where users expect it.

## Quick Reference

- CLS measures visual stability—target score below 0.1
- Always set width/height on images and embeds
- Reserve space for ads, banners, and dynamic content
- Use transform animations instead of layout-changing properties

## Check

Measure CLS using Lighthouse or PageSpeed Insights. Verify score is below 0.1 for good visual stability.

## Fix

Reserve space for images/embeds with dimensions, use font-display strategies, and avoid injecting content above existing content.

## Explain

Explain how CLS measures visual stability and why unexpected layout shifts frustrate users and cause accidental clicks.

## Code Review

Review the routes, assets, and loading behavior that affect Minimize cumulative layout shift. Flag exact files, requests, or rendering steps that add unnecessary network, CPU, or layout cost, and describe the measurement method used to confirm the issue.

---

For full implementation details, code examples, and framework-specific guidance,
see `references/rule.md`.

Rule page: https://frontendchecklist.io/rules/performance/cumulative-layout-shift
