---
name: dom-performance
description: "Use when reviewing scripts, client components, bundles, or runtime behavior related to Minimize costly DOM read/write operations. Inspect both source code and the browser execution path so fixes target the real bottleneck or bug. In React, repeated requestAnimationFrame-driven state updates across multiple mounted components are a valid performance smell when visible in the source."
metadata:
  category: javascript
  priority: high
  difficulty: intermediate
  estimatedTime: "20"
  source: frontendchecklist.io
  url: https://frontendchecklist.io/rules/javascript/dom-performance
---

# Minimize costly DOM read/write operations

Every time you read a layout property after making a DOM change, the browser must synchronously recalculate layout (reflow) before returning the value. Doing this in a loop — even with just 10 elements — can freeze the page for hundreds of milliseconds. This is called layout thrashing and is one of the most common causes of janky animations and slow renders.

## Quick Reference

- Never interleave DOM reads (offsetHeight, getBoundingClientRect) with DOM writes (style changes)
- Batch all reads first, then all writes
- Use requestAnimationFrame for visual updates
- Use DocumentFragment or innerHTML for bulk DOM insertion
- Avoid per-frame React state updates across many visible components when a simpler CSS or reduced-frequency approach would work
- Use passive listeners for scroll, touch, and wheel when you do not call preventDefault

## Check

Identify any layout thrashing in this code — places where DOM reads and writes are interleaved in loops. Also flag scroll, touch, and wheel listeners that should be passive to avoid blocking the main thread.

## Fix

Refactor this code to batch all DOM reads before writes, eliminating forced synchronous layouts. Mark relevant listeners as passive when they do not need to cancel scrolling.

## Explain

Explain layout thrashing, what causes it, and how batching reads and writes prevents it.

## Code Review

Review scripts, client components, and browser execution paths related to Minimize costly DOM read/write operations. Flag exact imports, event handlers, runtime side effects, or blocking operations that violate the rule, and state how the change should be verified in the browser.

---

For full implementation details, code examples, and framework-specific guidance,
see `references/rule.md`.

Rule page: https://frontendchecklist.io/rules/javascript/dom-performance
