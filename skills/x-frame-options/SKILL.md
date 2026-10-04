---
name: x-frame-options
description: "Use when reviewing HTTP response headers for clickjacking protection on any web application with authenticated user actions."
metadata:
  category: security
  priority: high
  difficulty: beginner
  estimatedTime: "5"
  source: frontendchecklist.io
  url: https://frontendchecklist.io/rules/security/x-frame-options
---

# Set an X-Frame-Options header

Without framing protection, an attacker can embed your banking login page in a transparent iframe on a malicious site and trick users into clicking buttons they cannot see — transferring money, changing settings, or leaking credentials.

## Quick Reference

- Use `X-Frame-Options: DENY` to prevent all framing, or `SAMEORIGIN` to allow framing only from your own domain
- `ALLOWFROM` is obsolete and unsupported in modern browsers — use CSP `frame-ancestors` instead
- The modern equivalent is `Content-Security-Policy: frame-ancestors 'none'` — prefer CSP for new sites
- Both headers can coexist: X-Frame-Options for older browsers, frame-ancestors for modern ones
- Clickjacking attacks trick users into clicking invisible iframe buttons — DENY eliminates this entirely

## Check

Check whether the server sends an X-Frame-Options header (DENY or SAMEORIGIN) or a Content-Security-Policy header with frame-ancestors directive to prevent clickjacking.

## Fix

Add X-Frame-Options: DENY to all responses if the site does not need to be embedded anywhere. If legitimate framing is needed on the same origin, use SAMEORIGIN. For fine-grained control, use CSP frame-ancestors instead.

## Explain

Explain what a clickjacking attack is, how X-Frame-Options and CSP frame-ancestors prevent it, and the difference between DENY and SAMEORIGIN values.

## Code Review

Review server config, headers, forms, and integration points related to Set an X-Frame-Options header. Flag exact responses, cookies, or browser behaviors that violate the rule, and verify them against the effective production-like response.

---

For full implementation details, code examples, and framework-specific guidance,
see `references/rule.md`.

Rule page: https://frontendchecklist.io/rules/security/x-frame-options
