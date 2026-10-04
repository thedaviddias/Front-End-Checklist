---
name: immutable-patterns
description: "Use when reviewing scripts, client components, bundles, or runtime behavior related to Prefer immutable data patterns. Inspect both source code and the browser execution path so fixes target the real bottleneck or bug."
metadata:
  category: javascript
  priority: medium
  difficulty: intermediate
  estimatedTime: "20"
  source: frontendchecklist.io
  url: https://frontendchecklist.io/rules/javascript/immutable-patterns
---

# Prefer immutable data patterns

Mutating shared objects makes it impossible to track where a value changed. When you update state immutably, each version of the data is a separate object — you can compare references to detect changes, time-travel debug, and know exactly which part of your code changed the data.

## Quick Reference

- Use spread (...) to create modified copies of objects and arrays
- Prefer map(), filter(), and reduce() over push(), splice(), and direct assignment
- Use Object.freeze() for configuration objects that should never change
- Immutability is especially important in state management (Redux, Zustand, Signals)

## Check

Find all places in this code where objects or arrays are mutated in place. Flag direct property assignments on function parameters and push/splice on arrays.

## Fix

Replace in-place mutations with immutable patterns using spread operators and non-mutating array methods.

## Explain

Explain immutable data patterns, why mutation causes bugs in shared state, and how spread and array methods enable immutability.

## Code Review

Review scripts, client components, and browser execution paths related to Prefer immutable data patterns. Flag exact imports, event handlers, runtime side effects, or blocking operations that violate the rule, and state how the change should be verified in the browser.

---

For full implementation details, code examples, and framework-specific guidance,
see `references/rule.md`.

Rule page: https://frontendchecklist.io/rules/javascript/immutable-patterns
