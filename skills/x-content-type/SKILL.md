---
name: x-content-type
description: "Use when auditing HTTP response headers on any web server or CDN for security hardening."
metadata:
  category: security
  priority: high
  difficulty: beginner
  estimatedTime: "5"
  source: frontendchecklist.io
  url: https://frontendchecklist.io/rules/security/x-content-type
---

# Set X-Content-Type-Options: nosniff

Browsers that MIME-sniff can be tricked into executing malicious JavaScript uploaded as an image — even if the server sends `Content-Type: image/png`. `nosniff` forces the browser to honor the declared type.

## Quick Reference

- Set `X-Content-Type-Options: nosniff` on all responses — the only valid value is `nosniff`
- Without this header, browsers may execute a JavaScript file disguised as an image if the server serves it with the wrong MIME type
- This header is required by OWASP's security hardening checklist and the Fetch specification
- Pair with correct `Content-Type` headers on all responses for defense in depth
- Takes 5 minutes to configure and has no compatibility issues

## Check

Check whether the server sends an X-Content-Type-Options: nosniff header on responses. Verify the header is present on HTML pages, scripts, stylesheets, and API responses.

## Fix

Add X-Content-Type-Options: nosniff to all HTTP responses. Configure it at the web server level (Nginx, Apache) or in your application framework, and verify with curl -I https://example.com.

## Explain

Explain what MIME type sniffing is, how it can be exploited to execute malicious files, and how X-Content-Type-Options: nosniff prevents this attack.

## Code Review

Review server config, headers, forms, and integration points related to Set X-Content-Type-Options: nosniff. Flag exact responses, cookies, or browser behaviors that violate the rule, and verify them against the effective production-like response.

---

For full implementation details, code examples, and framework-specific guidance,
see `references/rule.md`.

Rule page: https://frontendchecklist.io/rules/security/x-content-type
