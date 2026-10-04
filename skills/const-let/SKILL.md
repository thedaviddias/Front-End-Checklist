---
name: const-let
description: "Use when reviewing scripts, client components, bundles, or runtime behavior related to Prefer const and let over var. Inspect both source code and the browser execution path so fixes target the real bottleneck or bug."
metadata:
  category: javascript
  priority: high
  difficulty: beginner
  estimatedTime: "10"
  source: frontendchecklist.io
  url: https://frontendchecklist.io/rules/javascript/const-let
---

# Prefer const and let over var

var's function scope and hoisting behavior regularly causes bugs where variables are accessible outside the block they were declared in. const and let enforce block scope and make code intent clearer — const signals that a binding should not be reassigned, which helps readers understand data flow.

## Quick Reference

- Use const for values that are never reassigned
- Use let when reassignment is needed
- Never use var — it has function scope and is hoisted, causing subtle bugs
- const does not mean immutable — objects and arrays declared with const can still be mutated

## Check

Scan this JavaScript file for any use of var and flag every occurrence with line numbers.

## Fix

Replace all var declarations with const or let as appropriate. Use const when the variable is never reassigned, let otherwise.

## Explain

Explain why const and let are preferred over var, covering scope, hoisting, and temporal dead zone.

## Code Review

Review scripts, client components, and browser execution paths related to Prefer const and let over var. Flag exact imports, event handlers, runtime side effects, or blocking operations that violate the rule, and state how the change should be verified in the browser.

---

For full implementation details, code examples, and framework-specific guidance,
see `references/rule.md`.

Rule page: https://frontendchecklist.io/rules/javascript/const-let
