---
name: web-storage
description: "Use when reviewing scripts, client components, bundles, or runtime behavior related to Use Web Storage API safely. Inspect both source code and the browser execution path so fixes target the real bottleneck or bug."
metadata:
  category: javascript
  priority: medium
  difficulty: beginner
  estimatedTime: "15"
  source: frontendchecklist.io
  url: https://frontendchecklist.io/rules/javascript/web-storage
---

# Use Web Storage API safely

localStorage and sessionStorage have a 5–10 MB quota per origin, and any write can throw a QuotaExceededError. Private browsing modes in some browsers disable storage entirely and throw on all writes. Applications that don't handle these errors crash silently, leaving users unable to use the app.

## Quick Reference

- Always wrap localStorage access in try/catch — storage can be full or disabled
- Serialize objects with JSON.stringify and validate on read with JSON.parse
- Never store sensitive data (tokens, passwords) in localStorage — use httpOnly cookies
- Use sessionStorage for tab-scoped data that shouldn't persist

## Check

Find all localStorage and sessionStorage accesses in this file. Check for missing try/catch, unhandled JSON parsing, and any storage of sensitive data.

## Fix

Add try/catch error handling to all Web Storage operations and ensure all object values are properly serialized and deserialized.

## Explain

Explain the Web Storage API, its limitations, when to use localStorage vs sessionStorage, and what data should never be stored there.

## Code Review

Review scripts, client components, and browser execution paths related to Use Web Storage API safely. Flag exact imports, event handlers, runtime side effects, or blocking operations that violate the rule, and state how the change should be verified in the browser.

---

For full implementation details, code examples, and framework-specific guidance,
see `references/rule.md`.

Rule page: https://frontendchecklist.io/rules/javascript/web-storage
