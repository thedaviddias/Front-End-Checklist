---
name: e2e-testing
description: "Use when reviewing CI coverage, automated checks, or test strategy related to Implement end-to-end testing. Focus on whether the rule is continuously verified, not just documented."
metadata:
  category: testing
  priority: high
  difficulty: intermediate
  estimatedTime: "30"
  source: frontendchecklist.io
  url: https://frontendchecklist.io/rules/testing/e2e-testing
---

# Implement end-to-end testing

E2E tests catch integration issues that unit tests miss—verifying your application works correctly from the user's perspective across all components.

## Quick Reference

- Test critical user journeys: authentication, checkout, core business flows
- Use data-testid attributes for stable, maintainable selectors
- Implement Page Object Model for reusable test components
- Run E2E tests in CI/CD with artifact uploads on failure

## Check

Review this project for E2E test coverage of critical user journeys like authentication, checkout, and form submissions.

## Fix

Add E2E tests for critical user journeys using Playwright or Cypress.

## Explain

Explain E2E testing best practices including test organization, selectors, and CI/CD integration.

## Code Review

Review tests, CI workflows, and enforcement points related to Implement end-to-end testing. Flag exact gaps where the rule is not automatically verified or where failures do not block regressions.

---

For full implementation details, code examples, and framework-specific guidance,
see `references/rule.md`.

Rule page: https://frontendchecklist.io/rules/testing/e2e-testing
