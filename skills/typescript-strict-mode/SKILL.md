---
name: typescript-strict-mode
description: "Use when setting up a new TypeScript project, auditing an existing tsconfig.json, or reviewing code where null-reference errors or implicit any types are present."
metadata:
  category: javascript
  priority: high
  difficulty: beginner
  estimatedTime: "15"
  source: frontendchecklist.io
  url: https://frontendchecklist.io/rules/javascript/typescript-strict-mode
---

# Enable TypeScript strict mode in tsconfig.json

Without strict mode, TypeScript allows implicit `any` types, ignores possible `null`/`undefined` values, and silently accepts unsound function assignments — meaning the type system gives a false sense of safety. Enabling strict mode makes TypeScript catch the bugs it was designed to prevent, turning type errors into compile-time failures rather than runtime surprises in production.

## Quick Reference

- "strict": true enables strictNullChecks, noImplicitAny, and six other checks
- Enable strict from project start — retrofitting a large codebase is painful
- On existing projects: enable strictNullChecks first, then other flags incrementally
- Strict mode eliminates entire classes of null reference and implicit-any bugs

## Check

Inspect the tsconfig.json in this project and report whether "strict": true (or individual strict flags) is enabled. List any missing strict flags.

## Fix

Add "strict": true to the compilerOptions in tsconfig.json. If the project has existing type errors, explain how to enable strictNullChecks first as a stepping stone.

## Explain

Explain what TypeScript strict mode enables, which individual flags it activates, and why each flag matters for catching real bugs.

## Code Review

Check whether the codebase relies on implicit any, unchecked null access, or loose function type assignments that strict mode would reject. Flag the specific patterns and show what stricter types would look like.

---

For full implementation details, code examples, and framework-specific guidance,
see `references/rule.md`.

Rule page: https://frontendchecklist.io/rules/javascript/typescript-strict-mode
