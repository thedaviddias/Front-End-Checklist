---
name: duplicate-js
description: "Use when auditing slow page loads, heavy assets, or rendering delays related to Remove duplicate JavaScript libraries. Verify the actual bottleneck in DevTools, Lighthouse, or field data before recommending changes."
metadata:
  category: performance
  priority: medium
  difficulty: intermediate
  estimatedTime: "15"
  source: frontendchecklist.io
  url: https://frontendchecklist.io/rules/performance/duplicate-js
---

# Remove duplicate JavaScript libraries

Duplicate libraries increase bundle size and memory usage, and can lead to unexpected behavior or conflicts between different versions of the same code.

## Quick Reference

- Detect and remove multiple versions of the same library
- Use a single version across the entire application
- Audit third-party scripts for bundled dependencies

## Check

Identify duplicate JavaScript libraries or multiple versions of the same library being loaded using Lighthouse or bundle analysis tools.

## Fix

Consolidate dependencies to use a single version and ensure third-party scripts don't bring in redundant libraries.

## Explain

Explain the risks of loading duplicate JavaScript libraries and how it impacts performance and stability.

## Code Review

Review the routes, assets, and loading behavior that affect Remove duplicate JavaScript libraries. Flag exact files, requests, or rendering steps that add unnecessary network, CPU, or layout cost, and describe the measurement method used to confirm the issue.

---

For full implementation details, code examples, and framework-specific guidance,
see `references/rule.md`.

Rule page: https://frontendchecklist.io/rules/performance/duplicate-js
