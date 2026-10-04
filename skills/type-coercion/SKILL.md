---
name: type-coercion
description: "Use when reviewing scripts, client components, bundles, or runtime behavior related to Avoid implicit type coercion. Inspect both source code and the browser execution path so fixes target the real bottleneck or bug."
metadata:
  category: javascript
  priority: medium
  difficulty: beginner
  estimatedTime: "15"
  source: frontendchecklist.io
  url: https://frontendchecklist.io/rules/javascript/type-coercion
---

# Avoid implicit type coercion

JavaScript's implicit type coercion produces results that look like bugs to anyone who doesn't know the exact coercion rules. `==` comparisons with mixed types silently convert values in ways that fail to catch genuine errors. Explicit conversions make code intent clear and catch real type mismatches at the point where they occur.

## Quick Reference

- Always use === and !== instead of == and !=
- Convert types explicitly with Number(), String(), Boolean(), parseInt()
- Be careful with + operator — it concatenates strings but adds numbers
- Use Array.isArray() instead of typeof for array checks

## Check

Find all uses of == and != (non-strict equality) in this file. Also look for implicit type conversions from + operator and other coercion traps.

## Fix

Replace all == with === and != with !==. Add explicit type conversions where mixed types are intentionally compared.

## Explain

Explain JavaScript's implicit type coercion rules, why == is problematic, and how to write safe type comparisons.

## Code Review

Review scripts, client components, and browser execution paths related to Avoid implicit type coercion. Flag exact imports, event handlers, runtime side effects, or blocking operations that violate the rule, and state how the change should be verified in the browser.

---

For full implementation details, code examples, and framework-specific guidance,
see `references/rule.md`.

Rule page: https://frontendchecklist.io/rules/javascript/type-coercion
