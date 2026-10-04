---
name: source-maps
description: "Use when auditing slow page loads, heavy assets, or rendering delays related to Provide source maps for production debugging. Verify the actual bottleneck in DevTools, Lighthouse, or field data before recommending changes."
metadata:
  category: performance
  priority: medium
  difficulty: intermediate
  estimatedTime: "10"
  source: frontendchecklist.io
  url: https://frontendchecklist.io/rules/performance/source-maps
---

# Provide source maps for production debugging

Source maps are essential for debugging production issues effectively without compromising the performance benefits of minification.

## Quick Reference

- Generate source maps to map minified code back to original source
- Upload source maps to error tracking services (e.g., Sentry) instead of serving them publicly
- Ensure source maps are correctly linked in your build process

## Check

Verify if the project's build process generates source maps and if they are being correctly handled for production debugging.

## Fix

Update the build configuration to generate source maps and integrate with an error tracking service for secure production debugging.

## Explain

Explain how source maps enable developers to debug original source code when only minified code is running in the browser.

## Code Review

Review the routes, assets, and loading behavior that affect Provide source maps for production debugging. Flag exact files, requests, or rendering steps that add unnecessary network, CPU, or layout cost, and describe the measurement method used to confirm the issue.

---

For full implementation details, code examples, and framework-specific guidance,
see `references/rule.md`.

Rule page: https://frontendchecklist.io/rules/performance/source-maps
