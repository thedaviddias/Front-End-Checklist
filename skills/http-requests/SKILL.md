---
name: http-requests
description: "Use when auditing slow page loads, heavy assets, or rendering delays related to Minimize HTTP requests. Verify the actual bottleneck in DevTools, Lighthouse, or field data before recommending changes."
metadata:
  category: performance
  priority: high
  difficulty: intermediate
  estimatedTime: "20"
  source: frontendchecklist.io
  url: https://frontendchecklist.io/rules/performance/http-requests
---

# Minimize HTTP requests

Each HTTP request incurs network overhead—DNS lookup, TCP connection, and TLS handshake add latency. Reducing requests significantly improves initial load time.

## Quick Reference

- Each HTTP request adds latency (DNS, TCP, TLS handshakes)
- HTTP/2 multiplexing reduces but doesn't eliminate request overhead
- Bundle critical CSS/JS, use SVG sprites for icons
- Target under 50 requests for initial page load

## Check

Count the number of HTTP requests this page makes and identify opportunities for reduction.

## Fix

Reduce HTTP requests by combining files, using sprites, inlining critical resources, and implementing HTTP/2.

## Explain

Explain how each HTTP request adds latency and why minimizing requests improves performance.

## Code Review

Review the routes, assets, and loading behavior that affect Minimize HTTP requests. Flag exact files, requests, or rendering steps that add unnecessary network, CPU, or layout cost, and describe the measurement method used to confirm the issue.

---

For full implementation details, code examples, and framework-specific guidance,
see `references/rule.md`.

Rule page: https://frontendchecklist.io/rules/performance/http-requests
