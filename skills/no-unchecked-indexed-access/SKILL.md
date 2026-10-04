---
name: no-unchecked-indexed-access
description: "Use when auditing tsconfig.json for missing safety flags, reviewing code that uses array index access in data processing pipelines, or investigating runtime undefined errors that TypeScript did not catch."
metadata:
  category: javascript
  priority: medium
  difficulty: intermediate
  estimatedTime: "15"
  source: frontendchecklist.io
  url: https://frontendchecklist.io/rules/javascript/no-unchecked-indexed-access
---

# Enable noUncheckedIndexedAccess to catch out-of-bounds array bugs

TypeScript's default behaviour types `array[0]` as `T`, pretending the access is always safe. In reality, the array might be empty or the index might be out of range, leading to silent `undefined` values that cause downstream crashes. Enabling `noUncheckedIndexedAccess` surfaces these potential failures as type errors at compile time, requiring developers to prove the access is safe before the code runs.

## Quick Reference

- Without the flag, array[0] is typed as T even if the array is empty
- noUncheckedIndexedAccess changes array[n] to return T | undefined
- Forces an explicit check before using any array element accessed by index
- Optional chaining and nullish coalescing handle most false positives cleanly

## Check

Check whether noUncheckedIndexedAccess is enabled in the project's tsconfig.json. If not, scan for array index accesses (arr[0], arr[i]) that could fail if the array is shorter than expected.

## Fix

Enable noUncheckedIndexedAccess in tsconfig.json, then update any array index accesses that TypeScript now flags to include an explicit undefined check or use optional chaining before the accessed value is used.

## Explain

Explain what noUncheckedIndexedAccess does, why the default TypeScript behaviour is unsound for array index access, and how optional chaining and Array.at() interact with the flag.

## Code Review

Review all array index accesses in this file (arr[0], arr[i], object[key]). Flag any location where the accessed value is used without a preceding undefined check, even if noUncheckedIndexedAccess is not yet enabled in the project.

---

For full implementation details, code examples, and framework-specific guidance,
see `references/rule.md`.

Rule page: https://frontendchecklist.io/rules/javascript/no-unchecked-indexed-access
