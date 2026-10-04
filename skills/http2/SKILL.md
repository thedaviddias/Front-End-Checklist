---
name: http2
description: "Use when auditing slow page loads, heavy assets, or rendering delays related to Enable HTTP/2 or HTTP/3. Verify the actual bottleneck in DevTools, Lighthouse, or field data before recommending changes."
metadata:
  category: performance
  priority: high
  difficulty: intermediate
  estimatedTime: "15"
  source: frontendchecklist.io
  url: https://frontendchecklist.io/rules/performance/http2
---

# Enable HTTP/2 or HTTP/3

Modern HTTP protocols significantly reduce the impact of latency and allow multiple resources to be downloaded simultaneously over a single connection, leading to much faster page loads.

## Quick Reference

- Enable HTTP/2 or HTTP/3 for request multiplexing
- Eliminate the need for resource concatenation
- Reduce overhead with header compression

## Check

Verify that the server is serving resources over HTTP/2 or HTTP/3 using browser DevTools or online checkers.

## Fix

Enable HTTP/2 or HTTP/3 in your web server (Nginx, Apache) or via a CDN/load balancer.

## Explain

Explain the advantages of HTTP/2 and HTTP/3 over HTTP/1.1, such as multiplexing and header compression.

## Code Review

Review the routes, assets, and loading behavior that affect Enable HTTP/2 or HTTP/3. Flag exact files, requests, or rendering steps that add unnecessary network, CPU, or layout cost, and describe the measurement method used to confirm the issue.

---

For full implementation details, code examples, and framework-specific guidance,
see `references/rule.md`.

Rule page: https://frontendchecklist.io/rules/performance/http2
