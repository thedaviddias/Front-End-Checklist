---
name: modern-array-methods
description: "Use when reviewing scripts, client components, bundles, or runtime behavior related to Use modern array and object methods. Inspect both source code and the browser execution path so fixes target the real bottleneck or bug."
metadata:
  category: javascript
  priority: medium
  difficulty: beginner
  estimatedTime: "15"
  source: frontendchecklist.io
  url: https://frontendchecklist.io/rules/javascript/modern-array-methods
---

# Use modern array and object methods

Modern array and object methods produce code that directly expresses intent — a filter() call self-documents that you're selecting items. Manual for loops obscure the purpose behind implementation details. These methods are also well-optimized by JavaScript engines and support chaining for concise data transformations.

## Quick Reference

- Use map() to transform arrays, filter() to select items, reduce() for aggregation
- Use find() and findIndex() instead of manual loops with break
- Use Object.entries() and Object.fromEntries() to transform objects
- Use structuredClone() for deep copying instead of JSON.parse(JSON.stringify())

## Check

Find loops in this file that could be replaced with modern array methods like map, filter, reduce, find, or flatMap.

## Fix

Replace manual for/while loops with appropriate array methods to make the code more declarative.

## Explain

Explain map, filter, reduce, find, flatMap, and Object.entries with practical examples.

## Code Review

Review scripts, client components, and browser execution paths related to Use modern array and object methods. Flag exact imports, event handlers, runtime side effects, or blocking operations that violate the rule, and state how the change should be verified in the browser.

---

For full implementation details, code examples, and framework-specific guidance,
see `references/rule.md`.

Rule page: https://frontendchecklist.io/rules/javascript/modern-array-methods
