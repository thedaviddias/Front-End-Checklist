---
name: critical-request-chains
description: "Use when auditing slow page loads, heavy assets, or rendering delays related to Minimize critical request chains. Verify the actual bottleneck in DevTools, Lighthouse, or field data before recommending changes."
metadata:
  category: performance
  priority: high
  difficulty: advanced
  estimatedTime: "20"
  source: frontendchecklist.io
  url: https://frontendchecklist.io/rules/performance/critical-request-chains
---

# Minimize critical request chains

Long chains of dependent requests delay the initial rendering of the page, as each resource must wait for its parent to be fetched and processed.

## Quick Reference

- Reduce the depth of dependent resource requests
- Inline critical CSS to avoid extra network roundtrips
- Use `preload` hints for essential assets found deep in the chain

## Check

Identify long chains of dependent requests that block the critical rendering path using Lighthouse or WebPageTest.

## Fix

Flatten the request chain by inlining critical resources or using preload hints for essential assets.

## Explain

Explain how critical request chains impact the Time to First Paint and how to optimize the rendering path.

## Code Review

Review the routes, assets, and loading behavior that affect Minimize critical request chains. Flag exact files, requests, or rendering steps that add unnecessary network, CPU, or layout cost, and describe the measurement method used to confirm the issue.

---

For full implementation details, code examples, and framework-specific guidance,
see `references/rule.md`.

Rule page: https://frontendchecklist.io/rules/performance/critical-request-chains
