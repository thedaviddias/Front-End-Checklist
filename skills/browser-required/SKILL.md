---
name: browser-required
description: "Use when auditing slow page loads, heavy assets, or rendering delays related to Perform browser-based performance audits. Verify the actual bottleneck in DevTools, Lighthouse, or field data before recommending changes."
metadata:
  category: performance
  priority: medium
  difficulty: intermediate
  estimatedTime: "10"
  source: frontendchecklist.io
  url: https://frontendchecklist.io/rules/performance/browser-required
---

# Perform browser-based performance audits

Static analysis alone cannot simulate the complex rendering, script execution, and layout processes of modern web browsers, which is essential for capturing real-world performance.

## Quick Reference

- Use real browser engines to capture runtime metrics (LCP, CLS, INP)
- Synthetic tests in full browsers reveal execution bottlenecks
- Verify performance across different device and connection simulations

## Check

Ensure that performance audits are conducted in an environment that executes JavaScript and renders the page (e.g., Lighthouse, Puppeteer).

## Fix

Integrate browser-based testing tools like Lighthouse or WebPageTest into the development workflow and CI/CD pipeline.

## Explain

Explain the limitations of static analysis for performance and why a full browser environment is necessary.

## Code Review

Review the routes, assets, and loading behavior that affect Perform browser-based performance audits. Flag exact files, requests, or rendering steps that add unnecessary network, CPU, or layout cost, and describe the measurement method used to confirm the issue.

---

For full implementation details, code examples, and framework-specific guidance,
see `references/rule.md`.

Rule page: https://frontendchecklist.io/rules/performance/browser-required
