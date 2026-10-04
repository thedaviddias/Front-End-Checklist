---
name: type-only-imports
description: "Use when auditing import statements in TypeScript files, setting up a new TypeScript project, or investigating unexpected bundle inclusions from type-only dependencies."
metadata:
  category: javascript
  priority: low
  difficulty: beginner
  estimatedTime: "10"
  source: frontendchecklist.io
  url: https://frontendchecklist.io/rules/javascript/type-only-imports
---

# Use import type for type-only imports

Regular imports cause the JavaScript runtime to evaluate and execute the imported module even when only a TypeScript type from that module is used. This can increase bundle size, introduce unintended side effects, and create circular dependency issues that are otherwise avoidable. Using import type makes the erased-at-runtime nature of type imports explicit and enables bundlers and the TypeScript compiler to handle them optimally.

## Quick Reference

- import type is erased entirely at compile time — no runtime module evaluation
- Prevents accidentally importing a value when only a type is needed
- Reduces circular dependency issues caused by type-only relationships
- verbatimModuleSyntax in TypeScript 5 enforces this automatically

## Check

Review the import statements in this TypeScript file and identify any imports where only types or interfaces are used. These should use import type instead of a regular import.

## Fix

Convert the identified regular imports to import type where the imported binding is only used as a TypeScript type annotation and not as a runtime value.

## Explain

Explain the difference between import and import type in TypeScript, why type-only imports should be declared explicitly, and how verbatimModuleSyntax enforces this at the compiler level.

## Code Review

Inspect all import statements in this file. For each import, check whether the imported name appears only in type positions (annotations, generics, implements clauses) versus runtime positions (function calls, new, typeof). Flag any regular import that is used only as a type.

---

For full implementation details, code examples, and framework-specific guidance,
see `references/rule.md`.

Rule page: https://frontendchecklist.io/rules/javascript/type-only-imports
