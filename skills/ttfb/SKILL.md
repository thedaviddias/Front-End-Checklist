---
name: ttfb
description: "Use when auditing slow first responses on SSR pages, APIs, or cacheable HTML. Distinguish origin compute time from network latency and CDN cache misses before proposing a fix."
metadata:
  category: performance
  priority: medium
  difficulty: intermediate
  estimatedTime: "10"
  source: frontendchecklist.io
  url: https://frontendchecklist.io/rules/performance/ttfb
---

# Reduce Time to First Byte (TTFB)

TTFB is the foundation of page performance; if the server is slow to respond, all subsequent loading stages are delayed.

## Quick Reference

- Optimize server-side logic and database queries to speed up response generation
- Use a Content Delivery Network (CDN) to serve content closer to users
- Implement effective caching strategies at the server and edge levels

## Check

Review the page's TTFB and identify any bottlenecks in the server-side processing or network transmission.

## Fix

Optimize the server's response time by improving database queries, caching responses, and using a CDN.

## Explain

Explain how TTFB impacts the entire page load process and why it is a critical starting point for performance optimization.

## Code Review

Review server-rendered routes, API handlers, cache configuration, and database access on the critical path. Flag uncached HTML, slow synchronous work before the first byte, repeated upstream fetches, or expensive queries that keep TTFB above roughly 800ms.

---

For full implementation details, code examples, and framework-specific guidance,
see `references/rule.md`.

Rule page: https://frontendchecklist.io/rules/performance/ttfb
