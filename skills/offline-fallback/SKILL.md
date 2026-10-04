---
name: offline-fallback
description: "Use when adding PWA capabilities, implementing a service worker, or improving the experience for users on unreliable network connections."
metadata:
  category: performance
  priority: low
  difficulty: beginner
  estimatedTime: "20"
  source: frontendchecklist.io
  url: https://frontendchecklist.io/rules/performance/offline-fallback
---

# Provide an offline fallback page

The browser's default offline error screen ("No internet connection") is confusing and completely outside your brand. A custom offline page maintains the user experience, reinforces trust, and can surface cached content or useful actions — such as enabling users to continue reading a cached article or queuing a form submission for later.

## Quick Reference

- Create a minimal /offline HTML page that works without any network requests
- Pre-cache the offline page during the service worker install event
- Intercept failed navigation requests and serve the offline page instead
- Include helpful guidance so users know what to do while offline

## Check

Check whether the site shows a custom offline fallback page when the network is disconnected and a navigation request cannot be fulfilled.

## Fix

Create a self-contained /offline page and configure the service worker to pre-cache it and serve it for failed navigation requests.

## Explain

Explain how a service worker can intercept failed network requests and return a cached offline fallback page to the user.

## Code Review

Review the service worker fetch handler and the offline page markup. Verify the offline page is pre-cached at install time, that it does not depend on external resources, and that the fallback is only served for navigation requests (not sub-resources).

---

For full implementation details, code examples, and framework-specific guidance,
see `references/rule.md`.

Rule page: https://frontendchecklist.io/rules/performance/offline-fallback
