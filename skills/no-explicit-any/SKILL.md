---
name: no-explicit-any
description: "Use when reviewing TypeScript files for type safety regressions, during code review of functions that handle external data, or when the codebase has ESLint warnings for @typescript-eslint/no-explicit-any."
metadata:
  category: javascript
  priority: medium
  difficulty: intermediate
  estimatedTime: "20"
  source: frontendchecklist.io
  url: https://frontendchecklist.io/rules/javascript/no-explicit-any
---

# Avoid the any type — use unknown, generics, or type guards instead

The any type is a local opt-out that becomes a global problem: a function returning any propagates unchecked types to every caller, silently undermining the type system across the entire codebase. Replacing any with unknown forces type narrowing at the point of use, turning latent runtime errors into compile-time failures where they are cheapest to fix.

## Quick Reference

- any disables all type checking for a value and cascades to callers
- unknown is the safe alternative — it requires a type check before use
- Use generics to express "I accept any type, but it stays consistent"
- At API boundaries, validate with Zod rather than asserting with as Type

## Check

Scan this TypeScript file for uses of the any type (explicit annotations, implicit any from missing types, and type assertions to any). Report each location and suggest a safer alternative.

## Fix

Replace the any types in this code with unknown (for values of unknown shape), appropriate generics (for type-consistent operations), or Zod validation (for external data). Show the narrowing or generic constraint needed at each usage site.

## Explain

Explain why the any type undermines TypeScript's guarantees, how unknown differs from any, and when a type assertion (as Type) is acceptable versus dangerous.

## Code Review

Review all type annotations, function signatures, and external data handling in this file. Flag every explicit or implicit any, any type assertion that lacks a preceding type guard, and any return types inferred as any from untyped dependencies.

---

For full implementation details, code examples, and framework-specific guidance,
see `references/rule.md`.

Rule page: https://frontendchecklist.io/rules/javascript/no-explicit-any
