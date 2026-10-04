---
name: scheduler-yield
description: "Use when reviewing JavaScript that performs synchronous loops over large datasets, recursive tree traversals, or bulk DOM updates that may exceed 50 ms on mid-range devices."
metadata:
  category: javascript
  priority: medium
  difficulty: intermediate
  estimatedTime: "20"
  source: frontendchecklist.io
  url: https://frontendchecklist.io/rules/javascript/scheduler-yield
---

# Use scheduler.yield() to keep the main thread responsive during long tasks

Any JavaScript task longer than 50 ms blocks the browser's main thread, preventing it from processing clicks, keyboard events, and rendering frames. Yielding between chunks of work keeps Interaction to Next Paint (INP) low and makes the page feel responsive even during heavy computation.

## Quick Reference

- Tasks longer than 50 ms block input and hurt Interaction to Next Paint (INP)
- scheduler.yield() pauses execution, lets the browser handle queued input, then resumes
- Use a MessageChannel-based polyfill where scheduler.yield() is unavailable
- Apply to data processing loops, tree traversals, and bulk DOM mutations

## Check

Identify synchronous loops, recursive traversals, or bulk operations in this code that could run for more than 50 ms and block user input.

## Fix

Refactor long synchronous tasks to yield to the browser between chunks using scheduler.yield() with a MessageChannel fallback.

## Explain

Explain why tasks longer than 50 ms hurt INP, how scheduler.yield() works, and when to use it versus Web Workers.

## Code Review

Review event handlers, data transformation functions, and initialization routines for synchronous loops over large collections that could block input. Flag any loop where the total work could exceed 50 ms.

---

For full implementation details, code examples, and framework-specific guidance,
see `references/rule.md`.

Rule page: https://frontendchecklist.io/rules/javascript/scheduler-yield
