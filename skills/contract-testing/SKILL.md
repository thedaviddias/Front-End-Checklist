---
name: contract-testing
description: "Use when setting up integration testing for a frontend-backend API boundary, evaluating whether two services are safe to deploy independently, or replacing slow end-to-end tests with contract tests."
metadata:
  category: testing
  priority: medium
  difficulty: advanced
  estimatedTime: "120"
  source: frontendchecklist.io
  url: https://frontendchecklist.io/rules/testing/contract-testing
---

# Implement consumer-driven contract testing for API boundaries

Integration tests that require both services running at the same time are slow, brittle, and hard to maintain. Consumer-driven contract testing decouples the consumer and provider test suites — each team can run their tests independently, yet the broker guarantees that the published contract is always verified against the live provider. This catches API mismatches days earlier than end-to-end tests, with far less infrastructure overhead.

## Quick Reference

- The consumer writes tests that describe what it expects from the API (the "contract")
- The contract is published to a Pact Broker and verified against the real provider
- Provider changes that break the contract fail CI before they are deployed
- This replaces fragile end-to-end tests that require both services to be running simultaneously

## Check

Check whether the frontend has consumer-driven contract tests that define and verify the API contract with the backend.

## Fix

Add Pact consumer tests for the frontend API client, publish the contracts to a broker, and add provider verification to the backend CI pipeline.

## Explain

Explain how consumer-driven contract testing works, what the Pact workflow looks like end-to-end, and how it compares to mocking and end-to-end testing.

## Code Review

Review the Pact consumer tests. Flag interactions that are too permissive (any-type matchers on fields the consumer actually uses), missing status code assertions, and interactions for endpoints the consumer no longer calls.

---

For full implementation details, code examples, and framework-specific guidance,
see `references/rule.md`.

Rule page: https://frontendchecklist.io/rules/testing/contract-testing
