---
name: gtm-present
description: "Use when auditing slow page loads, heavy assets, or rendering delays related to Optimize Google Tag Manager implementation. Verify the actual bottleneck in DevTools, Lighthouse, or field data before recommending changes."
metadata:
  category: performance
  priority: medium
  difficulty: intermediate
  estimatedTime: "15"
  source: frontendchecklist.io
  url: https://frontendchecklist.io/rules/performance/gtm-present
---

# Optimize Google Tag Manager implementation

An unoptimized GTM setup can lead to significant main-thread blocking and increased page weight, slowing down the overall user experience.

## Quick Reference

- Place the GTM script in the `<head>` but audit its impact
- Minimize the number of tags and triggers to reduce execution
- Use Server-Side GTM to offload processing from the client

## Check

Verify that GTM is implemented correctly and evaluate its impact on page performance using Lighthouse.

## Fix

Clean up unused tags, use asynchronous loading, and consider moving to a server-side implementation.

## Explain

Explain how GTM affects performance and how to balance tracking needs with speed.

## Code Review

Review the routes, assets, and loading behavior that affect Optimize Google Tag Manager implementation. Flag exact files, requests, or rendering steps that add unnecessary network, CPU, or layout cost, and describe the measurement method used to confirm the issue.

---

For full implementation details, code examples, and framework-specific guidance,
see `references/rule.md`.

Rule page: https://frontendchecklist.io/rules/performance/gtm-present
