---
name: form-https
description: "Use when reviewing HTML forms, fetch/XHR calls, and form action attributes to ensure data is submitted exclusively over HTTPS."
metadata:
  category: security
  priority: critical
  difficulty: beginner
  estimatedTime: "10"
  source: frontendchecklist.io
  url: https://frontendchecklist.io/rules/security/form-https
---

# Submit forms over HTTPS

A login form that posts credentials to an HTTP endpoint sends usernames and passwords as plain text over the network — anyone on the same Wi-Fi, the ISP, or a network proxy can read them without any special tools.

## Quick Reference

- Every `<form action>` URL must use `https://` — never `http://`
- Forms without an explicit `action` attribute submit to the current page URL — ensure the page itself is on HTTPS
- Check `fetch()` and `XMLHttpRequest` calls in JavaScript — data posted to `http://` endpoints is unencrypted
- Browsers show a 'Not Secure' warning in the address bar when a form is on an HTTP page
- From Chrome 86+, autofill is disabled on HTTP forms to protect credentials

## Check

Scan all HTML form elements for action attributes pointing to http:// URLs. Check all JavaScript fetch() and XMLHttpRequest calls for http:// endpoints. Verify the current page URL is HTTPS so forms without an explicit action submit securely.

## Fix

Replace all http:// form action URLs with https:// equivalents. Ensure the web server redirects HTTP to HTTPS (301) so that forms on the page also benefit. For JavaScript API calls, update all endpoint URLs to use https://.

## Explain

Explain why form submissions over HTTP expose user data in transit, how network attackers can intercept plain HTTP traffic, and what the browser security indicators look like on insecure forms.

## Code Review

Review server config, headers, forms, and integration points related to Submit forms over HTTPS. Flag exact responses, cookies, or browser behaviors that violate the rule, and verify them against the effective production-like response.

---

For full implementation details, code examples, and framework-specific guidance,
see `references/rule.md`.

Rule page: https://frontendchecklist.io/rules/security/form-https
