---
name: accessibility-testing
description: "Use when reviewing component libraries, page flows, or CI pipelines that need repeatable accessibility checks. Automated testing is strongest at catching structural and attribute-level issues; it does not replace keyboard, screen reader, and manual UX testing."
metadata:
  category: testing
  priority: high
  difficulty: intermediate
  estimatedTime: "30"
  source: frontendchecklist.io
  url: https://frontendchecklist.io/rules/testing/accessibility-testing
---

# Include accessibility testing

Automated accessibility testing catches 30-50% of WCAG violations before code reaches users—reducing legal risk and improving usability for everyone.

## Quick Reference

- Use jest-axe for component-level accessibility testing
- Integrate @axe-core/playwright or cypress-axe for E2E a11y tests
- Run accessibility tests in CI/CD to catch regressions early
- Test specific WCAG rules like color-contrast individually

## Check

Review this test suite for accessibility testing coverage using axe-core, jest-axe, or similar tools.

## Fix

Add automated accessibility testing to detect WCAG violations in components and pages.

## Explain

Explain how to implement automated accessibility testing and what issues it can detect.

## Code Review

Inspect component tests, E2E suites, and CI workflows for automated accessibility coverage. Flag critical pages or shared components that ship without axe-based checks, and note issues that still require manual keyboard or screen reader validation.

---

For full implementation details, code examples, and framework-specific guidance,
see `references/rule.md`.

Rule page: https://frontendchecklist.io/rules/testing/accessibility-testing
