---
name: javascript-inline
description: "Use when reviewing scripts, client components, bundles, or runtime behavior related to Avoid inline JavaScript. Inspect both source code and the browser execution path so fixes target the real bottleneck or bug."
metadata:
  category: javascript
  priority: high
  difficulty: beginner
  estimatedTime: "15"
  source: frontendchecklist.io
  url: https://frontendchecklist.io/rules/javascript/javascript-inline
---

# Avoid inline JavaScript

Inline JavaScript breaks browser caching, violates Content Security Policy (CSP), and creates unmaintainable spaghetti code mixing markup with behavior.

## Quick Reference

- Move onclick/onmouseover handlers to external JS files
- Use addEventListener instead of inline event handlers
- Exception: critical above-the-fold JS can be inlined
- External files enable browser caching across pages

## Check

Verify that JavaScript code is not mixed with HTML markup using external script files and proper separation of concerns for better maintainability and performance.

## Fix

Move inline JavaScript to external files, implement proper event handling, and use modern JavaScript patterns for DOM interaction.

## Explain

Explain why separating JavaScript from HTML improves maintainability, enables caching, reduces security risks, and follows best practices for separation of concerns.

## Code Review

Review scripts, client components, and browser execution paths related to Avoid inline JavaScript. Flag exact imports, event handlers, runtime side effects, or blocking operations that violate the rule, and state how the change should be verified in the browser.

---

For full implementation details, code examples, and framework-specific guidance,
see `references/rule.md`.

Rule page: https://frontendchecklist.io/rules/javascript/javascript-inline
