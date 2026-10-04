---
name: service-worker
description: "Use when auditing repeat-visit performance, adding offline support, or evaluating PWA readiness for a web application."
metadata:
  category: performance
  priority: medium
  difficulty: intermediate
  estimatedTime: "60"
  source: frontendchecklist.io
  url: https://frontendchecklist.io/rules/performance/service-worker
---

# Register a service worker for caching and offline support

Service workers act as a programmable network proxy between the browser and the network. They eliminate repeated server round-trips for static assets, cut load times on repeat visits by 50–90 %, and allow the app to function at all on flaky or offline networks — which is critical for users on mobile or low-bandwidth connections.

## Quick Reference

- Register a service worker in your main JavaScript entry point
- Use an install event to pre-cache critical static assets
- Choose a caching strategy (cache-first, network-first, stale-while-revalidate) per resource type
- Implement an activate event to clean up old caches on update

## Check

Check whether a service worker is registered and whether it caches static assets, API responses, or provides an offline fallback.

## Fix

Add a service worker registration call and implement appropriate caching strategies for static assets and navigation requests.

## Explain

Explain how service workers intercept network requests and how different caching strategies trade off freshness vs. speed.

## Code Review

Review the service worker file and its registration. Flag missing install/ activate lifecycle handlers, absent cache-versioning, missing fetch handlers, and any patterns that could cause stale content to be served indefinitely.

---

For full implementation details, code examples, and framework-specific guidance,
see `references/rule.md`.

Rule page: https://frontendchecklist.io/rules/performance/service-worker
