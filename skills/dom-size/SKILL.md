---
name: dom-size
description: "Use when auditing slow page loads, heavy assets, or rendering delays related to Reduce DOM size and complexity. Verify the actual bottleneck in DevTools, Lighthouse, or field data before recommending changes."
metadata:
  category: performance
  priority: medium
  difficulty: intermediate
  estimatedTime: "10"
  source: frontendchecklist.io
  url: https://frontendchecklist.io/rules/performance/dom-size
---

# Reduce DOM size and complexity

An excessive DOM size increases memory usage, slows down style calculations, and makes layout reflows more expensive, leading to poor interaction performance.

## Quick Reference

- Keep total DOM nodes below 1,500
- Avoid deep nesting (maximum depth < 32)
- Use virtualization for long lists of elements

## Check

Check the total number of DOM nodes and the maximum DOM depth using Lighthouse or Chrome DevTools.

## Fix

Simplify the HTML structure, remove unnecessary wrapper elements, and implement virtualization for large lists.

## Explain

Explain the performance impact of a large DOM tree on memory and rendering speed.

## Code Review

Review the routes, assets, and loading behavior that affect Reduce DOM size and complexity. Flag exact files, requests, or rendering steps that add unnecessary network, CPU, or layout cost, and describe the measurement method used to confirm the issue.

---

For full implementation details, code examples, and framework-specific guidance,
see `references/rule.md`.

Rule page: https://frontendchecklist.io/rules/performance/dom-size
