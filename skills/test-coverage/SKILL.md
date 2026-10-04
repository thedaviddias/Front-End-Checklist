---
name: test-coverage
description: "Use when reviewing CI coverage, automated checks, or test strategy related to Maintain test coverage thresholds. Focus on whether the rule is continuously verified, not just documented."
metadata:
  category: testing
  priority: medium
  difficulty: beginner
  estimatedTime: "15"
  source: frontendchecklist.io
  url: https://frontendchecklist.io/rules/testing/test-coverage
---

# Maintain test coverage thresholds

Coverage thresholds prevent code quality from degrading over time by failing builds when test coverage drops below safe levels.

## Quick Reference

- Set global thresholds: 70% branches, 80% lines/functions/statements
- Apply stricter thresholds (90%+) to critical utility code
- Exclude generated code, type definitions, and config files
- Focus on meaningful coverage—test behavior, not just lines

## Check

Review this project's test coverage configuration to ensure minimum thresholds are set and enforced in CI/CD.

## Fix

Configure coverage thresholds in Jest, Vitest, or your testing framework, and add coverage checks to CI/CD.

## Explain

Explain how to set up test coverage thresholds and what coverage levels are appropriate for different types of code.

## Code Review

Review tests, CI workflows, and enforcement points related to Maintain test coverage thresholds. Flag exact gaps where the rule is not automatically verified or where failures do not block regressions.

---

For full implementation details, code examples, and framework-specific guidance,
see `references/rule.md`.

Rule page: https://frontendchecklist.io/rules/testing/test-coverage
