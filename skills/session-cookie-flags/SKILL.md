---
name: session-cookie-flags
description: "Use when reviewing server-side session management, setting up authentication middleware, or auditing cookie configuration in HTTP response headers."
metadata:
  category: security
  priority: high
  difficulty: beginner
  estimatedTime: "15"
  source: frontendchecklist.io
  url: https://frontendchecklist.io/rules/security/session-cookie-flags
---

# Set Secure, HttpOnly, and SameSite flags on session cookies

Missing cookie flags are one of the most common and easily fixed authentication weaknesses. Without Secure, session tokens are transmitted in plain text over HTTP and can be captured by network eavesdroppers. Without HttpOnly, any XSS payload can exfiltrate the session token in one line. Without SameSite, any website can trigger authenticated actions on behalf of the victim without their knowledge.

## Quick Reference

- Secure — cookie is only sent over HTTPS, never plain HTTP
- HttpOnly — cookie is invisible to JavaScript (blocks XSS theft)
- SameSite=Strict or Lax — prevents the cookie from being sent on cross-site requests (blocks CSRF)
- Never use SameSite=None without also setting Secure and understanding the CSRF implications

## Check

Check whether session and authentication cookies are set with the Secure, HttpOnly, and SameSite flags.

## Fix

Update the server's cookie configuration to include Secure, HttpOnly, and SameSite=Strict (or Lax) on all session and auth cookies.

## Explain

Explain what each cookie security flag does and the specific attack each one prevents.

## Code Review

Review all Set-Cookie headers and cookie creation code. Flag any cookies missing the HttpOnly flag, absent Secure flag, or an unspecified or overly permissive SameSite setting.

---

For full implementation details, code examples, and framework-specific guidance,
see `references/rule.md`.

Rule page: https://frontendchecklist.io/rules/security/session-cookie-flags
