---
name: render-blocking
description: "Use when auditing slow page loads, heavy assets, or rendering delays related to Eliminate render-blocking resources. Verify the actual bottleneck in DevTools, Lighthouse, or field data before recommending changes."
metadata:
  category: performance
  priority: medium
  difficulty: intermediate
  estimatedTime: "10"
  source: frontendchecklist.io
  url: https://frontendchecklist.io/rules/performance/render-blocking
---

# Eliminate render-blocking resources

Render-blocking resources prevent the browser from painting anything on the screen, leading to a "white screen" effect and poor user experience.

## Quick Reference

- Load non-critical CSS and JS asynchronously using `defer`, `async`, or media queries
- Inline critical CSS to allow the page to start rendering immediately
- Avoid `@import` in CSS as it creates serial request chains

## Check

Review the page's resources and identify any CSS or JavaScript files that are blocking the initial render of the page.

## Fix

Update the loading strategy for render-blocking resources by using `defer`, `async`, or inlining critical styles.

## Explain

Explain how render-blocking resources impact the First Contentful Paint (FCP) and how to resolve them.

## Code Review

Review the routes, assets, and loading behavior that affect Eliminate render-blocking resources. Flag exact files, requests, or rendering steps that add unnecessary network, CPU, or layout cost, and describe the measurement method used to confirm the issue.

---

For full implementation details, code examples, and framework-specific guidance,
see `references/rule.md`.

Rule page: https://frontendchecklist.io/rules/performance/render-blocking
