---
name: preconnect
description: "Use when auditing slow page loads, heavy assets, or rendering delays related to Use preconnect for critical third-party origins. Verify the actual bottleneck in DevTools, Lighthouse, or field data before recommending changes."
metadata:
  category: performance
  priority: medium
  difficulty: intermediate
  estimatedTime: "10"
  source: frontendchecklist.io
  url: https://frontendchecklist.io/rules/performance/preconnect
---

# Use preconnect for critical third-party origins

Preconnecting to essential origins can shave hundreds of milliseconds off the critical path by handling connection overhead ahead of time.

## Quick Reference

- Establish early connections to important third-party domains (e.g., fonts, APIs)
- Reduce latency by performing DNS lookup, TCP handshake, and TLS negotiation early
- Avoid overusing preconnect; limit to 2-4 most critical origins

## Check

Review the page's head for preconnect hints and identify any missing or unnecessary connections to third-party domains.

## Fix

Add `<link rel="preconnect">` for critical third-party origins and remove it for non-essential or underutilized domains.

## Explain

Explain how preconnect helps reduce the time spent on connection overhead for third-party resources.

## Code Review

Review the routes, assets, and loading behavior that affect Use preconnect for critical third-party origins. Flag exact files, requests, or rendering steps that add unnecessary network, CPU, or layout cost, and describe the measurement method used to confirm the issue.

---

For full implementation details, code examples, and framework-specific guidance,
see `references/rule.md`.

Rule page: https://frontendchecklist.io/rules/performance/preconnect
