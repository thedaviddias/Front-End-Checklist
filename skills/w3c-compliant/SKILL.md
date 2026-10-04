---
name: w3c-compliant
description: "Use when reviewing templates, rendered HTML, or shared components related to Validate HTML against W3C standards. Validate the final browser-facing markup, not just the source framework abstraction."
metadata:
  category: html
  priority: high
  difficulty: beginner
  estimatedTime: "15"
  source: frontendchecklist.io
  url: https://frontendchecklist.io/rules/html/w3c-compliant
---

# Validate HTML against W3C standards

Invalid HTML causes unpredictable rendering across browsers, breaks accessibility tools, and makes debugging significantly harder.

## Quick Reference

- Use validator.w3.org or browser extensions for validation
- Fix errors first, then warnings (errors cause rendering issues)
- Integrate validation into CI/CD with html-validate
- Common issues: unclosed tags, invalid nesting, missing attributes

## Check

Validate HTML markup using the W3C HTML Validator to identify and fix markup errors that could cause cross-browser compatibility issues.

## Fix

Run HTML through W3C validator and fix reported errors including unclosed tags, missing attributes, and invalid nesting.

## Explain

Explain why W3C HTML validation is important for cross-browser compatibility, accessibility, and maintainable code.

## Code Review

Review templates, server-rendered HTML, and shared components that output markup related to Validate HTML against W3C standards. Flag exact elements, attributes, and routes where the rendered HTML violates the rule.

---

For full implementation details, code examples, and framework-specific guidance,
see `references/rule.md`.

Rule page: https://frontendchecklist.io/rules/html/w3c-compliant
