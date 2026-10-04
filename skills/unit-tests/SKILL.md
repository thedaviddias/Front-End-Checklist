---
name: unit-tests
description: "Use when reviewing CI coverage, automated checks, or test strategy related to Write unit tests. Focus on whether the rule is continuously verified, not just documented."
metadata:
  category: testing
  priority: high
  difficulty: intermediate
  estimatedTime: "30"
  source: frontendchecklist.io
  url: https://frontendchecklist.io/rules/testing/unit-tests
---

# Write unit tests

Unit tests catch bugs before they reach production, serve as documentation for expected behavior, and give developers confidence to refactor code without breaking functionality.

## Quick Reference

- Test business logic, utilities, and edge cases
- Aim for 80%+ coverage on critical paths
- Use descriptive test names that explain behavior
- Mock external dependencies, not internal modules
- Run tests in CI to catch regressions early

## Check

Check if this codebase has unit tests with good coverage for critical functionality.

## Fix

Write unit tests for untested functions and components to improve code reliability.

## Explain

Explain how unit tests catch bugs early and serve as documentation for expected behavior.

## Code Review

Review tests, CI workflows, and enforcement points related to Write unit tests. Flag exact gaps where the rule is not automatically verified or where failures do not block regressions.

---

For full implementation details, code examples, and framework-specific guidance,
see `references/rule.md`.

Rule page: https://frontendchecklist.io/rules/testing/unit-tests
