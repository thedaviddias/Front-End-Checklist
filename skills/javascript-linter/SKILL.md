---
name: javascript-linter
description: "Use when reviewing scripts, client components, bundles, or runtime behavior related to Lint JavaScript code. Inspect both source code and the browser execution path so fixes target the real bottleneck or bug."
metadata:
  category: javascript
  priority: medium
  difficulty: beginner
  estimatedTime: "20"
  source: frontendchecklist.io
  url: https://frontendchecklist.io/rules/javascript/javascript-linter
---

# Lint JavaScript code

Linting catches bugs before runtime, enforces team coding standards, and prevents common mistakes that slip through code review.

## Quick Reference

- Set up ESLint with `pnpm dlx eslint --init`
- Use shared configs (eslint:recommended, @typescript-eslint)
- Integrate with your editor for real-time feedback
- Add lint checks to CI/CD pipeline

## Check

Set up JavaScript linting tools like ESLint to automatically detect syntax errors, enforce coding standards, and maintain consistent code quality across the team.

## Fix

Configure ESLint with appropriate rules and plugins, integrate it into your development workflow, and fix all linting errors and warnings.

## Explain

Explain how JavaScript linting prevents bugs, enforces consistent coding standards, improves code readability, and catches potential issues before runtime.

## Code Review

Review scripts, client components, and browser execution paths related to Lint JavaScript code. Flag exact imports, event handlers, runtime side effects, or blocking operations that violate the rule, and state how the change should be verified in the browser.

---

For full implementation details, code examples, and framework-specific guidance,
see `references/rule.md`.

Rule page: https://frontendchecklist.io/rules/javascript/javascript-linter
