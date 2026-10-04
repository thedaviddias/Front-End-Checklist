---
name: permissions-policy
description: "Use when reviewing HTTP response headers for defense-in-depth security hardening on any web application."
metadata:
  category: security
  priority: medium
  difficulty: intermediate
  estimatedTime: "15"
  source: frontendchecklist.io
  url: https://frontendchecklist.io/rules/security/permissions-policy
---

# Set a Permissions-Policy header

A site compromised by XSS that has unrestricted camera and microphone access can silently record the user. Permissions-Policy limits which browser APIs are available, reducing attacker capabilities even after a successful injection.

## Quick Reference

- Use `Permissions-Policy` to disable browser features your site does not use (camera, microphone, geolocation, payment)
- Syntax: `Permissions-Policy: camera=(), microphone=(), geolocation=()` — empty `()` means denied to all
- Previously called `Feature-Policy` — the old syntax is deprecated and only supported in older browsers
- Restricting unused features limits the blast radius if your site is compromised by XSS
- Third-party iframes inherit page restrictions unless you explicitly grant them permissions

## Check

Check whether the server sends a Permissions-Policy header and review which browser features are allowed or denied. Identify any powerful features (camera, microphone, geolocation, payment, USB) that are enabled but not required by the application.

## Fix

Add a Permissions-Policy header that disables all browser features your site does not use. Start with camera=(), microphone=(), geolocation=() and expand the list based on what the application actually needs.

## Explain

Explain what the Permissions-Policy header does, how it restricts browser APIs like camera and geolocation, and why disabling unused features improves security.

## Code Review

Review server config, headers, forms, and integration points related to Set a Permissions-Policy header. Flag exact responses, cookies, or browser behaviors that violate the rule, and verify them against the effective production-like response.

---

For full implementation details, code examples, and framework-specific guidance,
see `references/rule.md`.

Rule page: https://frontendchecklist.io/rules/security/permissions-policy
