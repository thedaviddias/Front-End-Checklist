---
name: avoid-eval
description: "Use when reviewing scripts, client components, bundles, or runtime behavior related to Never use eval() or unsafe dynamic code execution. Inspect both source code and the browser execution path so fixes target the real bottleneck or bug."
metadata:
  category: javascript
  priority: critical
  difficulty: beginner
  estimatedTime: "10"
  source: frontendchecklist.io
  url: https://frontendchecklist.io/rules/javascript/avoid-eval
---

# Never use eval() or unsafe dynamic code execution

eval() and its equivalents are the root cause of some of the most severe XSS vulnerabilities. If any user-controlled string reaches eval(), an attacker can execute arbitrary JavaScript in your users' browsers — stealing sessions, making requests as the user, or redirecting to malicious sites. Content Security Policy (CSP) blocks eval() but not new Function(), and there is never a legitimate use case that can't be solved without it.

## Quick Reference

- eval() executes arbitrary strings as code — any user input passed to it is a critical security hole
- new Function() is equally dangerous and not caught by CSP eval restrictions
- setTimeout('code', delay) and setInterval('code', delay) also evaluate strings — use function references instead
- Use JSON.parse() instead of eval() for parsing JSON

## Check

Search this codebase for any use of eval(), new Function(), or setTimeout/setInterval with string arguments.

## Fix

Replace eval() calls with safe alternatives: JSON.parse for data, object lookups for dynamic dispatch, and Function references for timers.

## Explain

Explain why eval() is dangerous, how it enables XSS attacks, and what safe alternatives exist for each use case.

## Code Review

Review scripts, client components, and browser execution paths related to Never use eval() or unsafe dynamic code execution. Flag exact imports, event handlers, runtime side effects, or blocking operations that violate the rule, and state how the change should be verified in the browser.

---

For full implementation details, code examples, and framework-specific guidance,
see `references/rule.md`.

Rule page: https://frontendchecklist.io/rules/javascript/avoid-eval
