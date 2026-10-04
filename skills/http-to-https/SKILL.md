---
name: http-to-https
description: "Use when checking whether a web server is configured to redirect all HTTP traffic to HTTPS."
metadata:
  category: security
  priority: critical
  difficulty: beginner
  estimatedTime: "10"
  source: frontendchecklist.io
  url: https://frontendchecklist.io/rules/security/http-to-https
---

# Redirect HTTP to HTTPS

Without an HTTP-to-HTTPS redirect, users who type the domain without `https://` or follow old links land on the insecure version of the site, exposing session cookies and form data to network attackers.

## Quick Reference

- Redirect `http://example.com` to `https://example.com` with HTTP 301 (permanent redirect)
- Preserve the full path and query string in the redirect: `https://$host$request_uri`
- Use 301 (not 302) so browsers and search engines cache the redirect and future requests go directly to HTTPS
- Configure redirects at the server/CDN level — never rely on client-side JavaScript for security redirects
- After validating HTTPS works, add HSTS to eliminate future HTTP requests entirely

## Check

Test whether http://example.com redirects to https://example.com with a 301 status code. Check that the full URL path and query string are preserved in the redirect Location header.

## Fix

Configure the web server to redirect all HTTP requests to HTTPS with a 301 status code, preserving the full request path. Verify the redirect with curl -I http://example.com.

## Explain

Explain why redirecting HTTP to HTTPS is necessary, the difference between 301 and 302 redirects, and how HSTS can eliminate the redirect for returning users.

## Code Review

Review server config, headers, forms, and integration points related to Redirect HTTP to HTTPS. Flag exact responses, cookies, or browser behaviors that violate the rule, and verify them against the effective production-like response.

---

For full implementation details, code examples, and framework-specific guidance,
see `references/rule.md`.

Rule page: https://frontendchecklist.io/rules/security/http-to-https
