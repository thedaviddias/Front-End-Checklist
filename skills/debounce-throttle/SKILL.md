---
name: debounce-throttle
description: "Use when reviewing scripts, client components, bundles, or runtime behavior related to Debounce and throttle event handlers. Inspect both source code and the browser execution path so fixes target the real bottleneck or bug."
metadata:
  category: javascript
  priority: high
  difficulty: intermediate
  estimatedTime: "15"
  source: frontendchecklist.io
  url: https://frontendchecklist.io/rules/javascript/debounce-throttle
---

# Debounce and throttle event handlers

High-frequency events fire hundreds of times per second, causing UI jank, excessive API calls, and poor Interaction to Next Paint (INP) scores.

## Quick Reference

- Debounce: delays execution until activity stops (search inputs, form validation)
- Throttle: limits execution rate (scroll, resize handlers)
- Use 150-300ms delay for user input, 100ms for scroll/resize
- Clean up event listeners to prevent memory leaks

## Check

Review this JavaScript code for scroll, resize, input, mousemove, or other high-frequency event handlers that should use debounce or throttle.

## Fix

Add debounce or throttle to high-frequency event handlers to limit execution rate and improve performance.

## Explain

Explain the difference between debounce and throttle, and when to use each pattern for optimal performance.

## Code Review

Review scripts, client components, and browser execution paths related to Debounce and throttle event handlers. Flag exact imports, event handlers, runtime side effects, or blocking operations that violate the rule, and state how the change should be verified in the browser.

---

For full implementation details, code examples, and framework-specific guidance,
see `references/rule.md`.

Rule page: https://frontendchecklist.io/rules/javascript/debounce-throttle
