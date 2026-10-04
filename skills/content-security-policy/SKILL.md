---
name: content-security-policy
description: "Use when reviewing headers, forms, cookies, or third-party integrations related to Implement a content security policy. Validate the effective browser and HTTP behavior in a production-like environment."
metadata:
  category: security
  priority: high
  difficulty: advanced
  estimatedTime: "45"
  source: frontendchecklist.io
  url: https://frontendchecklist.io/rules/security/content-security-policy
---

# Implement a content security policy

Content Security Policy prevents cross-site scripting (XSS), clickjacking, and data injection attacks by controlling which resources can be loaded and executed on your pages. It reduces blast radius, but it does not replace output encoding and sanitization.

## Quick Reference

- Start with Content-Security-Policy-Report-Only to test without breaking your site
- Use nonces or hashes for inline scripts instead of unsafe-inline
- Avoid unsafe-eval unless absolutely necessary
- Set strict default-src then allow specific sources
- Monitor CSP reports to catch violations
- Sanitize untrusted HTML before rendering it into the DOM
- Use Trusted Types in larger apps as defense in depth for DOM XSS sinks

## Check

Check if this website implements a Content Security Policy header and analyze its directives. Also review any use of `innerHTML`, `dangerouslySetInnerHTML`, HTML template injection, and Trusted Types enforcement for large applications.

## Fix

Implement a strict Content Security Policy to prevent XSS attacks and control resource loading. Sanitize untrusted HTML before rendering and add Trusted Types enforcement where the application has enough DOM injection surface to benefit from it.

## Explain

Explain how CSP provides a security layer that helps detect and mitigate XSS and data injection attacks, and why sanitization is still required before rendering untrusted HTML.

## Code Review

Review server config, headers, forms, and integration points related to Implement a content security policy. Flag exact responses, cookies, or browser behaviors that violate the rule, and verify them against the effective production-like response. Inspect HTML injection sinks and note whether Trusted Types or sanitization protects them.

---

For full implementation details, code examples, and framework-specific guidance,
see `references/rule.md`.

Rule page: https://frontendchecklist.io/rules/security/content-security-policy
