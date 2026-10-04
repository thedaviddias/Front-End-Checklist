---
name: integration-testing
description: "Use when reviewing CI coverage, automated checks, or test strategy related to Write integration tests for key workflows. Focus on whether the rule is continuously verified, not just documented."
metadata:
  category: testing
  priority: high
  difficulty: intermediate
  estimatedTime: "30"
  source: frontendchecklist.io
  url: https://frontendchecklist.io/rules/testing/integration-testing
---

# Write integration tests for key workflows

Unit tests verify individual functions in isolation, but they can't catch the bugs that occur when those functions interact — a perfectly correct validation function and a correct database function can still fail when wired together incorrectly. Integration tests catch these wiring bugs before they reach production, where they're expensive to diagnose.

## Quick Reference

- Integration tests verify that multiple units work correctly together
- Test at the boundary where different parts of your system meet
- Use a real database in tests (test DB or in-memory) rather than mocking everything
- Test happy paths and the most critical error paths

## Check

Identify the key integration points in this codebase — where API routes call services, where services interact with the database, and where components interact with state management. Are these tested?

## Fix

Write integration tests for the identified critical paths, testing the interactions between components rather than each in isolation.

## Explain

Explain integration testing, how it differs from unit and E2E testing, and what tools to use for API and component integration tests.

## Code Review

Review tests, CI workflows, and enforcement points related to Write integration tests for key workflows. Flag exact gaps where the rule is not automatically verified or where failures do not block regressions.

---

For full implementation details, code examples, and framework-specific guidance,
see `references/rule.md`.

Rule page: https://frontendchecklist.io/rules/testing/integration-testing
