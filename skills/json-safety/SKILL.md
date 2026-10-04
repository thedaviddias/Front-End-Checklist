---
name: json-safety
description: "Use when reviewing scripts, client components, bundles, or runtime behavior related to Parse JSON safely with error handling. Inspect both source code and the browser execution path so fixes target the real bottleneck or bug."
metadata:
  category: javascript
  priority: medium
  difficulty: beginner
  estimatedTime: "10"
  source: frontendchecklist.io
  url: https://frontendchecklist.io/rules/javascript/json-safety
---

# Parse JSON safely with error handling

JSON.parse() on invalid input throws a SyntaxError that will crash your application if uncaught. API responses, localStorage values, and user-provided data can all be malformed. Safe parsing with validation catches these errors at the point of parsing, not deep in your application logic when a missing property causes an unexpected error.

## Quick Reference

- JSON.parse() throws a SyntaxError on invalid input — always use try/catch
- Validate the shape of parsed data before accessing its properties
- JSON.stringify() can return undefined for values that can't be serialized
- Use a type-safe parser (Zod, Valibot) for data from external sources

## Check

Find all JSON.parse() calls in this file and check whether each one is wrapped in try/catch and whether the result is validated before use.

## Fix

Add try/catch error handling to all JSON.parse() calls and add shape validation to protect against unexpected data structures.

## Explain

Explain why JSON.parse can throw, what safe JSON parsing looks like, and when to use schema validation libraries.

## Code Review

Review scripts, client components, and browser execution paths related to Parse JSON safely with error handling. Flag exact imports, event handlers, runtime side effects, or blocking operations that violate the rule, and state how the change should be verified in the browser.

---

For full implementation details, code examples, and framework-specific guidance,
see `references/rule.md`.

Rule page: https://frontendchecklist.io/rules/javascript/json-safety
