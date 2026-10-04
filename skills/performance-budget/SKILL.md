---
name: performance-budget
description: "Use when reviewing CI configuration, bundle analysis workflows, or pull requests that add dependencies and assets. Distinguish bundle-size budgets from runtime budgets such as Lighthouse or Core Web Vitals so teams can enforce both."
metadata:
  category: testing
  priority: medium
  difficulty: intermediate
  estimatedTime: "25"
  source: frontendchecklist.io
  url: https://frontendchecklist.io/rules/testing/performance-budget
---

# Enforce performance budgets in CI

Without automated enforcement, performance degrades gradually — each PR adds a small library, each feature adds a few KB, and within months the app that loaded in 2 seconds now takes 5. Performance budgets make regressions visible at PR time rather than after user complaints. Catching 'this PR added 200KB to the bundle' in review is far cheaper than debugging a slow production site.

## Quick Reference

- Define specific thresholds: max bundle size, min Lighthouse score, max LCP time
- Fail CI when budgets are exceeded to prevent performance regressions
- Size budgets catch accidental heavy dependencies; Lighthouse budgets catch runtime regressions
- Start with loose budgets and tighten them as you optimize
- Monitor production RUM so regressions are caught after deploy, not only in CI

## Check

Does this project have performance budgets defined? Check package.json and CI configuration for size or Lighthouse thresholds.

## Fix

Set up bundle size limits with size-limit and Lighthouse CI assertions in the CI pipeline.

## Explain

Explain performance budgets, how to choose appropriate thresholds, and how to enforce them with size-limit and Lighthouse CI.

## Code Review

Inspect CI workflows, `package.json`, and Lighthouse or bundle-size config for explicit thresholds. Flag repos where budgets are missing, too loose to catch regressions, or unenforced on pull requests. Check whether production RUM and alerting are wired to detect regressions after release.

---

For full implementation details, code examples, and framework-specific guidance,
see `references/rule.md`.

Rule page: https://frontendchecklist.io/rules/testing/performance-budget
