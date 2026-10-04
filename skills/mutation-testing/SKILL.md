---
name: mutation-testing
description: "Use when evaluating test quality on modules containing business logic, calculation utilities, or state machines to determine whether the tests provide genuine defect detection."
metadata:
  category: testing
  priority: medium
  difficulty: advanced
  estimatedTime: "120"
  source: frontendchecklist.io
  url: https://frontendchecklist.io/rules/testing/mutation-testing
---

# Use mutation testing to measure how well tests detect bugs

A codebase can have 90% line coverage and still ship critical bugs if tests only execute code without asserting meaningful outcomes. Mutation testing reveals these gaps by proving that your tests can distinguish correct code from subtly broken code — the standard that actually matters in production.

## Quick Reference

- Code coverage tells you which lines were executed; mutation score tells you which bugs were caught
- Stryker injects small code changes (mutations) and checks whether tests fail — if they don't, the tests are weak
- Aim for 80%+ mutation score on critical business logic paths
- Run Stryker on a focused scope (one module) rather than the whole codebase to keep CI times manageable

## Check

Assess whether this module has mutation testing configured and whether the mutation score on critical paths meets the project's quality threshold.

## Fix

Set up Stryker for this module, run an initial mutation report, and improve tests to kill surviving mutants in the critical business logic paths.

## Explain

Explain what mutation testing is, how Stryker works, and why mutation score is a more meaningful quality signal than code coverage alone.

## Code Review

Review the Stryker configuration and mutation report to identify surviving mutants in critical code paths, and suggest test improvements to kill them.

---

For full implementation details, code examples, and framework-specific guidance,
see `references/rule.md`.

Rule page: https://frontendchecklist.io/rules/testing/mutation-testing
