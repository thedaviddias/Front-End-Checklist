---
name: console-cleanup
description: "Use when reviewing scripts, client components, bundles, or runtime behavior related to Remove console statements in production. Inspect both source code and the browser execution path so fixes target the real bottleneck or bug."
metadata:
  category: javascript
  priority: medium
  difficulty: beginner
  estimatedTime: "10"
  source: frontendchecklist.io
  url: https://frontendchecklist.io/rules/javascript/console-cleanup
---

# Remove console statements in production

Console statements leak sensitive information, impact performance, and create unprofessional user experiences when visible in production.

## Quick Reference

- Remove console.log, console.debug, console.table before production
- Use environment-aware logging utilities
- Configure build tools to strip console statements automatically
- Keep console.error for critical error tracking if needed

## Check

Scan this JavaScript code for console.log, console.debug, console.warn, console.error, and other console statements that should be removed before production deployment.

## Fix

Remove or conditionally disable console statements for production, or replace them with a proper logging service.

## Explain

Explain why console statements should be removed from production code and alternatives for logging.

## Code Review

Review scripts, client components, and browser execution paths related to Remove console statements in production. Flag exact imports, event handlers, runtime side effects, or blocking operations that violate the rule, and state how the change should be verified in the browser.

---

For full implementation details, code examples, and framework-specific guidance,
see `references/rule.md`.

Rule page: https://frontendchecklist.io/rules/javascript/console-cleanup
