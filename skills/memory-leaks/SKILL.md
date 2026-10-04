---
name: memory-leaks
description: "Use when reviewing scripts, client components, bundles, or runtime behavior related to Prevent common memory leak patterns. Inspect both source code and the browser execution path so fixes target the real bottleneck or bug."
metadata:
  category: javascript
  priority: high
  difficulty: intermediate
  estimatedTime: "25"
  source: frontendchecklist.io
  url: https://frontendchecklist.io/rules/javascript/memory-leaks
---

# Prevent common memory leak patterns

Memory leaks cause applications to consume increasing amounts of memory over time, eventually slowing the browser tab or crashing it. In single-page applications, where users don't reload the page, small leaks in components accumulate with each navigation and can make an app unusable after 30 minutes of use.

## Quick Reference

- Remove event listeners when the element or component is destroyed
- Clear setInterval and setTimeout when they're no longer needed
- Avoid storing DOM references in long-lived objects after elements are removed
- Use WeakMap and WeakSet when storing metadata about objects you don't own
- Use AbortController to cancel stale async requests when UI state changes

## Check

Analyze this code for memory leak patterns: uncleaned event listeners, retained DOM references after removal, closures holding large objects, and uncleared timers. Also flag fetches and async tasks that continue after the owning component or view is gone.

## Fix

Fix the memory leaks in this code by cleaning up event listeners, clearing timers, canceling stale async requests, and releasing DOM references when they're no longer needed.

## Explain

Explain the four most common JavaScript memory leak patterns and how to detect them with Chrome DevTools.

## Code Review

Review scripts, client components, and browser execution paths related to Prevent common memory leak patterns. Flag exact imports, event handlers, runtime side effects, or blocking operations that violate the rule, and state how the change should be verified in the browser.

---

For full implementation details, code examples, and framework-specific guidance,
see `references/rule.md`.

Rule page: https://frontendchecklist.io/rules/javascript/memory-leaks
