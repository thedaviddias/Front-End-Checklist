---
name: token-storage-security
description: "Use when reviewing authentication implementation, setting up a new auth system, or evaluating whether the current token storage approach exposes the application to XSS-based token theft."
metadata:
  category: security
  priority: high
  difficulty: intermediate
  estimatedTime: "30"
  source: frontendchecklist.io
  url: https://frontendchecklist.io/rules/security/token-storage-security
---

# Store authentication tokens securely

localStorage is accessible to any JavaScript running on the page. A single XSS vulnerability — including one in a third-party script — can exfiltrate all tokens silently. httpOnly cookies are completely invisible to JavaScript; even if an attacker executes arbitrary code on the page, they cannot read the cookie. This single architectural choice eliminates the most common token theft vector.

## Quick Reference

- Store session tokens and JWTs in httpOnly cookies — not localStorage
- localStorage is readable by any JavaScript on the page, including injected XSS code
- Combine httpOnly with Secure and SameSite=Strict (or Lax) cookie flags
- Use short-lived access tokens and rotate refresh tokens on each use
- Protect every state-changing request with CSRF defenses, not cookie flags alone

## Check

Check whether authentication tokens are stored in httpOnly cookies or in JavaScript-accessible storage like localStorage. Verify that POST, PUT, PATCH, and DELETE requests also require a CSRF token or an equivalent anti-forgery control.

## Fix

Move token storage from localStorage/sessionStorage to httpOnly cookies set by the server, and ensure the cookies have Secure and SameSite flags. Add CSRF protection to every state-changing route that relies on browser-sent credentials.

## Explain

Explain why localStorage is vulnerable to XSS token theft and how httpOnly cookies mitigate this attack vector.

## Code Review

Review authentication flows, token storage calls, and API client code. Flag any use of localStorage.setItem, sessionStorage.setItem, or document.cookie for storing access tokens, JWTs, or session identifiers. Also flag credentialed mutations that lack a CSRF token, Origin check, or same-site enforcement.

---

For full implementation details, code examples, and framework-specific guidance,
see `references/rule.md`.

Rule page: https://frontendchecklist.io/rules/security/token-storage-security
