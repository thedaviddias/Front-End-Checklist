---
name: runtime-validation
description: "Use when reviewing code that calls fetch(), reads from localStorage, accesses process.env, or processes form submissions without explicitly validating the incoming data shape."
metadata:
  category: javascript
  priority: high
  difficulty: intermediate
  estimatedTime: "30"
  source: frontendchecklist.io
  url: https://frontendchecklist.io/rules/javascript/runtime-validation
---

# Validate external data at runtime with a schema library

TypeScript gives you confidence at compile time, but data from the network, user input, and storage arrives at runtime as raw, untyped values. A backend schema change, a misconfigured API, or malicious input can produce data that does not match your TypeScript types — and the compiler will never warn you. Runtime validation with a schema library catches these mismatches at the boundary, surfaces clear error messages, and prevents type-unsafe data from propagating through your application.

## Quick Reference

- TypeScript types are compile-time only — they are completely erased at runtime
- API responses can differ from their declared types without causing a compile error
- A Zod schema simultaneously validates data and infers the TypeScript type
- Validate at trust boundaries only — not inside every internal function call

## Check

Identify all places in this code where external data enters the application (fetch calls, localStorage reads, env variable access, form submissions) and report which ones lack runtime schema validation.

## Fix

Add Zod schemas to validate the external data entry points in this code. Show the schema definition, the validated type inference, and where to call .parse() or .safeParse().

## Explain

Explain why TypeScript types do not protect against runtime data mismatches, how Zod bridges compile-time and runtime safety, and when to use .parse() versus .safeParse().

## Code Review

Review all external data entry points in this file: API calls, storage reads, environment variable access, and form handling. Flag any location where data is cast to a TypeScript type without a preceding runtime validation step.

---

For full implementation details, code examples, and framework-specific guidance,
see `references/rule.md`.

Rule page: https://frontendchecklist.io/rules/javascript/runtime-validation
