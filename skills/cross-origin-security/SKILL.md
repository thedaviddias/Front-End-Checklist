---
name: cross-origin-security
description: "Use when reviewing scripts, client components, bundles, or runtime behavior related to Handle cross-origin requests securely. Inspect both source code and the browser execution path so fixes target the real bottleneck or bug."
metadata:
  category: javascript
  priority: high
  difficulty: intermediate
  estimatedTime: "20"
  source: frontendchecklist.io
  url: https://frontendchecklist.io/rules/javascript/cross-origin-security
---

# Handle cross-origin requests securely

The Same-Origin Policy is the browser's primary defense against malicious sites stealing data or performing actions on behalf of your users. Misconfiguring CORS or failing to validate postMessage origins can allow attackers to bypass this protection — reading private data, submitting forms as users, or injecting content into your pages.

## Quick Reference

- Always verify event.origin before processing postMessage data
- Never set Access-Control-Allow-Origin: * for authenticated endpoints
- Validate and sanitize all data received from cross-origin messages
- Use SameSite cookies to prevent CSRF from cross-origin requests
- Reject unvalidated redirect targets such as `next`, `redirect`, or `callbackUrl`

## Check

Check this code for insecure cross-origin patterns: missing origin validation in postMessage listeners, overly permissive CORS settings, and missing CSRF protections. Flag redirect parameters that accept arbitrary external URLs.

## Fix

Add origin validation to postMessage listeners and review CORS configuration to ensure it's not overly permissive for authenticated routes. Reject or allow-list untrusted redirect destinations before navigating.

## Explain

Explain the Same-Origin Policy, how CORS works, and how to securely use postMessage for cross-origin communication.

## Code Review

Review scripts, client components, and browser execution paths related to Handle cross-origin requests securely. Flag exact imports, event handlers, runtime side effects, or blocking operations that violate the rule, and state how the change should be verified in the browser. Check login, logout, SSO, and return-to flows for open redirects.

---

For full implementation details, code examples, and framework-specific guidance,
see `references/rule.md`.

Rule page: https://frontendchecklist.io/rules/javascript/cross-origin-security
