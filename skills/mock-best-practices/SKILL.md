---
name: mock-best-practices
description: "Use when reviewing CI coverage, automated checks, or test strategy related to Follow mocking best practices. Focus on whether the rule is continuously verified, not just documented."
metadata:
  category: testing
  priority: medium
  difficulty: intermediate
  estimatedTime: "20"
  source: frontendchecklist.io
  url: https://frontendchecklist.io/rules/testing/mock-best-practices
---

# Follow mocking best practices

Proper mocking isolates units under test while keeping tests realistic—over-mocking creates false confidence when tests pass but production breaks.

## Quick Reference

- Mock external dependencies (APIs, databases, file system), not business logic
- Always clean up mocks with jest.restoreAllMocks() in afterEach
- Use MSW for realistic API mocking without coupling to implementation
- Test behavior and outputs, not internal implementation details

## Check

Review this test file for mocking patterns, checking for over-mocking, missing mock cleanup, and proper mock implementation.

## Fix

Improve mocking strategy by removing unnecessary mocks, adding proper cleanup, and mocking at the right level of abstraction.

## Explain

Explain mocking best practices including when to mock, what to mock, and common mocking pitfalls.

## Code Review

Review tests, CI workflows, and enforcement points related to Follow mocking best practices. Flag exact gaps where the rule is not automatically verified or where failures do not block regressions.

---

For full implementation details, code examples, and framework-specific guidance,
see `references/rule.md`.

Rule page: https://frontendchecklist.io/rules/testing/mock-best-practices
