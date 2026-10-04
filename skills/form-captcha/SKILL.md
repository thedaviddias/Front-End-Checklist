---
name: form-captcha
description: "Use when reviewing public HTML forms (no authentication required to reach them) for bot and abuse protection mechanisms."
metadata:
  category: security
  priority: medium
  difficulty: intermediate
  estimatedTime: "30"
  source: frontendchecklist.io
  url: https://frontendchecklist.io/rules/security/form-captcha
---

# Protect public forms with CAPTCHA

An unprotected registration form can create thousands of spam accounts per minute; an unprotected login form enables credential stuffing attacks that test millions of username/password combinations from data breaches.

## Quick Reference

- Public forms (contact, registration, login, password reset, comment) without CAPTCHA are targets for automated abuse
- Prefer invisible/automated solutions (Cloudflare Turnstile, Google reCAPTCHA v3, hCaptcha) over interactive challenges that harm UX
- Always validate CAPTCHA tokens server-side — client-side validation is bypassable
- Rate limiting is complementary to CAPTCHA but not a substitute — bots can solve rate limits with distributed attacks
- Honeypot fields (hidden inputs that users never fill but bots do) are a lightweight CAPTCHA alternative for low-risk forms

## Check

Identify all public-facing forms (contact, registration, login, password reset, newsletter, comment). Check whether each has CAPTCHA, honeypot fields, or server-side rate limiting. Verify any CAPTCHA tokens are validated server-side.

## Fix

Integrate a CAPTCHA service (Cloudflare Turnstile, hCaptcha, or Google reCAPTCHA v3) on all public forms. Validate the CAPTCHA response token on your server before processing the form submission. Add rate limiting as a defense-in-depth measure.

## Explain

Explain what credential stuffing and spam bot attacks are, how CAPTCHA protects public forms, the trade-offs between different CAPTCHA approaches (v2 checkbox, v3 invisible, Turnstile), and why server-side validation is required.

## Code Review

Review server config, headers, forms, and integration points related to Protect public forms with CAPTCHA. Flag exact responses, cookies, or browser behaviors that violate the rule, and verify them against the effective production-like response.

---

For full implementation details, code examples, and framework-specific guidance,
see `references/rule.md`.

Rule page: https://frontendchecklist.io/rules/security/form-captcha
