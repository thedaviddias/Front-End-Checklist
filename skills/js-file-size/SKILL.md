---
name: js-file-size
description: "Use when auditing slow page loads, heavy assets, or rendering delays related to Optimize JavaScript bundle size. Verify the actual bottleneck in DevTools, Lighthouse, or field data before recommending changes."
metadata:
  category: performance
  priority: medium
  difficulty: intermediate
  estimatedTime: "10"
  source: frontendchecklist.io
  url: https://frontendchecklist.io/rules/performance/js-file-size
---

# Optimize JavaScript bundle size

Excessive JavaScript increases parse and execution time, especially on low-end devices, leading to sluggish user experiences and high data costs.

## Quick Reference

- Keep individual JS bundles under 200KB (compressed)
- Large bundles delay Time to Interactive (TTI) and First Input Delay (FID)
- Use code-splitting and tree-shaking to reduce unused code

## Check

Review the JavaScript bundle sizes and identify any files exceeding 200KB (Gzip/Brotli).

## Fix

Implement code-splitting, tree-shaking, and dependency audits to reduce the size of the JavaScript bundles.

## Explain

Explain how large JavaScript files impact the main thread and delay user interactivity (FID/TTI).

## Code Review

Review the routes, assets, and loading behavior that affect Optimize JavaScript bundle size. Flag exact files, requests, or rendering steps that add unnecessary network, CPU, or layout cost, and describe the measurement method used to confirm the issue.

---

For full implementation details, code examples, and framework-specific guidance,
see `references/rule.md`.

Rule page: https://frontendchecklist.io/rules/performance/js-file-size
