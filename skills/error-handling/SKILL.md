---
name: error-handling
description: "Use when reviewing scripts, client components, bundles, or runtime behavior related to Implement proper error handling. Inspect both source code and the browser execution path so fixes target the real bottleneck or bug."
metadata:
  category: javascript
  priority: high
  difficulty: intermediate
  estimatedTime: "20"
  source: frontendchecklist.io
  url: https://frontendchecklist.io/rules/javascript/error-handling
---

# Implement proper error handling

Unhandled errors crash applications, create poor user experiences, and make debugging impossible without proper context.

## Quick Reference

- Wrap async operations in try-catch blocks
- Use Error Boundaries in React for UI-level error handling
- Log errors with context for debugging
- Always re-throw or handle—never silently swallow errors

## Check

Review error handling in this code, ensuring async operations use try-catch and errors are properly logged.

## Fix

Add try-catch blocks to async operations and implement error boundaries for React components.

## Explain

Explain JavaScript error handling best practices including try-catch, Promise rejection, and error boundaries.

## Code Review

Review scripts, client components, and browser execution paths related to Implement proper error handling. Flag exact imports, event handlers, runtime side effects, or blocking operations that violate the rule, and state how the change should be verified in the browser.

---

For full implementation details, code examples, and framework-specific guidance,
see `references/rule.md`.

Rule page: https://frontendchecklist.io/rules/javascript/error-handling
