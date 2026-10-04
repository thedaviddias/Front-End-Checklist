---
name: interaction-to-next-paint
description: "Use when auditing slow page loads, heavy assets, or rendering delays related to Optimize interaction to next paint. Verify the actual bottleneck in DevTools, Lighthouse, or field data before recommending changes."
metadata:
  category: performance
  priority: high
  difficulty: advanced
  estimatedTime: "30"
  source: frontendchecklist.io
  url: https://frontendchecklist.io/rules/performance/interaction-to-next-paint
---

# Optimize interaction to next paint

INP replaced FID as a Core Web Vital in 2024—it measures how quickly your page responds to user interactions throughout the session, not just the first interaction.

## Quick Reference

- INP measures responsiveness to ALL interactions—target under 200ms
- Break up long tasks into smaller chunks
- Use web workers for heavy computation
- Optimize event handlers and avoid blocking the main thread

## Check

Measure INP using Chrome DevTools or PageSpeed Insights. Verify interaction responses occur within 200ms.

## Fix

Optimize event handlers, break up long tasks, use web workers for heavy computation, and reduce main thread blocking.

## Explain

Explain how INP measures overall page responsiveness by tracking the latency of all user interactions during a page visit.

## Code Review

Review the routes, assets, and loading behavior that affect Optimize interaction to next paint. Flag exact files, requests, or rendering steps that add unnecessary network, CPU, or layout cost, and describe the measurement method used to confirm the issue.

---

For full implementation details, code examples, and framework-specific guidance,
see `references/rule.md`.

Rule page: https://frontendchecklist.io/rules/performance/interaction-to-next-paint
