---
name: compression
description: "Use when auditing slow page loads, heavy assets, or rendering delays related to Enable text-based compression. Verify the actual bottleneck in DevTools, Lighthouse, or field data before recommending changes."
metadata:
  category: performance
  priority: high
  difficulty: beginner
  estimatedTime: "10"
  source: frontendchecklist.io
  url: https://frontendchecklist.io/rules/performance/compression
---

# Enable text-based compression

Compressed assets download faster, reducing the time to first paint and improving the overall perceived performance, especially on slower mobile networks.

## Quick Reference

- Use Gzip or Brotli to compress text resources (HTML, JS, CSS)
- Brotli provides superior compression for modern browsers
- Significantly reduces data transfer size and load times
- Compression helps network cost, but it does not remove parse and execution cost from oversized bundles

## Check

Verify that text-based resources are served with `Content-Encoding: gzip` or `br` headers.

## Fix

Enable Gzip or Brotli compression in your web server (Nginx, Apache) or CDN settings.

## Explain

Explain how text-based compression works and its impact on asset delivery speed.

## Code Review

Review the routes, assets, and loading behavior that affect Enable text-based compression. Flag exact files, requests, or rendering steps that add unnecessary network, CPU, or layout cost, and describe the measurement method used to confirm the issue.

---

For full implementation details, code examples, and framework-specific guidance,
see `references/rule.md`.

Rule page: https://frontendchecklist.io/rules/performance/compression
