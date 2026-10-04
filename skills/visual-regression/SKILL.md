---
name: visual-regression
description: "Use when reviewing CI coverage, automated checks, or test strategy related to Use visual regression testing. Focus on whether the rule is continuously verified, not just documented."
metadata:
  category: testing
  priority: medium
  difficulty: intermediate
  estimatedTime: "30"
  source: frontendchecklist.io
  url: https://frontendchecklist.io/rules/testing/visual-regression
---

# Use visual regression testing

Functional tests verify behavior but don't see your page. A CSS refactor might pass all unit and integration tests while completely breaking the layout — text overlapping images, buttons invisible, wrong colors. Visual regression testing acts as a safety net that reviews your actual rendered output, catching changes that no amount of JavaScript testing can detect.

## Quick Reference

- Visual regression tests catch CSS regressions that functional tests miss
- Run screenshot comparisons in CI to block merges that break visual appearance
- Use component-level (Storybook) tests for focused, fast visual coverage
- Set pixel difference thresholds to avoid flaky tests from sub-pixel rendering

## Check

Does this project have visual regression testing? What critical components or pages would benefit most from visual baselines?

## Fix

Set up visual regression tests for the key components using Playwright's screenshot comparison or a tool like Chromatic.

## Explain

Explain visual regression testing, how it differs from functional tests, and how to set up screenshot comparison in a CI pipeline.

## Code Review

Review tests, CI workflows, and enforcement points related to Use visual regression testing. Flag exact gaps where the rule is not automatically verified or where failures do not block regressions.

---

For full implementation details, code examples, and framework-specific guidance,
see `references/rule.md`.

Rule page: https://frontendchecklist.io/rules/testing/visual-regression
