---
name: clean-up-comments
description: "Use when reviewing templates, rendered HTML, or shared components related to Remove comments and debug code in production. Validate the final browser-facing markup, not just the source framework abstraction."
metadata:
  category: html
  priority: medium
  difficulty: beginner
  estimatedTime: "10"
  source: frontendchecklist.io
  url: https://frontendchecklist.io/rules/html/clean-up-comments
---

# Remove comments and debug code in production

Comments expose internal logic to attackers, increase file size, and can leak sensitive information like API endpoints, credentials, or system architecture.

## Quick Reference

- Remove TODO, FIXME, DEBUG comments before production
- Keep accessibility and legal comments
- Configure build tools to strip comments automatically
- Review for sensitive data leaks in comments

## Check

Review this HTML code for unnecessary comments, debug code, console logs, and temporary markup that should be removed before production deployment.

## Fix

Remove all development comments, debug code, unused markup, and temporary elements from the HTML before deploying to production.

## Explain

Explain why cleaning up code before production is important for security, performance, and professional presentation of web applications.

## Code Review

Review templates, server-rendered HTML, and shared components that output markup related to Remove comments and debug code in production. Flag exact elements, attributes, and routes where the rendered HTML violates the rule.

---

For full implementation details, code examples, and framework-specific guidance,
see `references/rule.md`.

Rule page: https://frontendchecklist.io/rules/html/clean-up-comments
