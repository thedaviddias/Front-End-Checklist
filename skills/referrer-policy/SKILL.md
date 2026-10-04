---
name: referrer-policy
description: "Use when reviewing HTTP response headers for privacy hardening on any website that handles authentication, session state, or sensitive URL parameters."
metadata:
  category: security
  priority: medium
  difficulty: beginner
  estimatedTime: "10"
  source: frontendchecklist.io
  url: https://frontendchecklist.io/rules/security/referrer-policy
---

# Set a Referrer-Policy header

Without a Referrer-Policy, a password reset link like `https://example.com/reset?token=abc123` is included in the `Referer` header when the user clicks an external link on that page — leaking the token to third parties.

## Quick Reference

- Use `Referrer-Policy: strict-origin-when-cross-origin` — the recommended modern default
- `strict-origin-when-cross-origin` sends the full URL for same-origin requests, only the origin for cross-origin HTTPS, and nothing for HTTPS→HTTP
- Never use `unsafe-url` — it sends the full URL including path and query string to every external site
- Can be set via HTTP header, `<meta>` tag, or the `referrerpolicy` attribute on individual `<a>` and `<img>` elements
- Sensitive URLs (reset tokens, private IDs) in query strings can be exposed via the Referer header if policy is too permissive

## Check

Check whether the server sends a Referrer-Policy header and verify the value is appropriate. The recommended value is strict-origin-when-cross-origin. Check for any pages with sensitive URL parameters that could be leaked via the Referer header.

## Fix

Add Referrer-Policy: strict-origin-when-cross-origin to all HTTP responses. Configure it in your web server, CDN, or application framework. For pages with particularly sensitive URLs, consider no-referrer or same-origin.

## Explain

Explain what the Referer header contains, how a permissive Referrer-Policy can leak sensitive URL parameters to third parties, and what the difference is between the various Referrer-Policy values.

## Code Review

Review server config, headers, forms, and integration points related to Set a Referrer-Policy header. Flag exact responses, cookies, or browser behaviors that violate the rule, and verify them against the effective production-like response.

---

For full implementation details, code examples, and framework-specific guidance,
see `references/rule.md`.

Rule page: https://frontendchecklist.io/rules/security/referrer-policy
