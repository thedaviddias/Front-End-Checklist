---
name: third-party-scripts
description: "Use when auditing slow page loads, heavy assets, or rendering delays related to Optimize third-party script loading. Verify the actual bottleneck in DevTools, Lighthouse, or field data before recommending changes."
metadata:
  category: performance
  priority: high
  difficulty: intermediate
  estimatedTime: "20"
  source: frontendchecklist.io
  url: https://frontendchecklist.io/rules/performance/third-party-scripts
---

# Optimize third-party script loading

Third-party scripts are the #1 cause of slow websites—unoptimized loading can add 2-5 seconds to your page load time.

## Quick Reference

- Use async for independent scripts (analytics, ads)
- Use defer for DOM-dependent scripts (chat widgets, social)
- Lazy-load non-critical scripts after page load
- Consider self-hosting critical third-party scripts

## Check

Analyze third-party scripts on this page to ensure they use async/defer and don't block rendering.

## Fix

Add async or defer attributes to third-party scripts and consider lazy loading non-critical scripts.

## Explain

Explain the performance impact of third-party scripts and strategies to minimize their blocking effect.

## Code Review

Review the routes, assets, and loading behavior that affect Optimize third-party script loading. Flag exact files, requests, or rendering steps that add unnecessary network, CPU, or layout cost, and describe the measurement method used to confirm the issue.

---

For full implementation details, code examples, and framework-specific guidance,
see `references/rule.md`.

Rule page: https://frontendchecklist.io/rules/performance/third-party-scripts
