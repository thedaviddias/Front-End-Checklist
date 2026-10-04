---
name: hsts
description: "Use when reviewing HTTP response headers on any site that serves content over HTTPS."
metadata:
  category: security
  priority: high
  difficulty: intermediate
  estimatedTime: "15"
  source: frontendchecklist.io
  url: https://frontendchecklist.io/rules/security/hsts
---

# Set an HSTS header

Without HSTS, an attacker on the same network can intercept the first HTTP request and strip TLS (SSL stripping), silently downgrading the connection before the browser ever sees a redirect.

## Quick Reference

- Set `Strict-Transport-Security: max-age=31536000; includeSubDomains` on all HTTPS responses
- Use `max-age=31536000` (1 year) minimum; HSTS preloading requires at least 1 year
- Add `includeSubDomains` to protect all subdomains from downgrade attacks
- Add `preload` only after testing — it is difficult to reverse and takes weeks to propagate
- Never send the HSTS header over plain HTTP — only over HTTPS

## Check

Check whether the server sends a Strict-Transport-Security header on all HTTPS responses, and verify the max-age, includeSubDomains, and preload directives are appropriate.

## Fix

Add a Strict-Transport-Security header with max-age=31536000 and includeSubDomains to all HTTPS responses. Configure your web server or CDN to send this header, and validate it with curl or securityheaders.com.

## Explain

Explain what HTTP Strict Transport Security (HSTS) is, how it prevents SSL stripping attacks, what the max-age and includeSubDomains directives do, and why the preload directive requires caution.

## Code Review

Review server config, headers, forms, and integration points related to Set an HSTS header. Flag exact responses, cookies, or browser behaviors that violate the rule, and verify them against the effective production-like response.

---

For full implementation details, code examples, and framework-specific guidance,
see `references/rule.md`.

Rule page: https://frontendchecklist.io/rules/security/hsts
