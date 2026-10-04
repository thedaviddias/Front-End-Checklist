---
name: password-field-security
description: "Use when reviewing headers, forms, cookies, or third-party integrations related to Secure password input fields. Validate the effective browser and HTTP behavior in a production-like environment."
metadata:
  category: security
  priority: high
  difficulty: intermediate
  estimatedTime: "30"
  source: frontendchecklist.io
  url: https://frontendchecklist.io/rules/security/password-field-security
---

# Secure password input fields

Properly implemented password fields improve security by working with password managers, helping users create strong passwords, and providing accessible controls for all users.

## Quick Reference

- Use type='password' with correct autocomplete attribute
- Provide accessible show/hide toggle for password visibility
- Show password strength indicator with requirements
- Never store or transmit passwords in plain text
- Support password managers with proper input names

## Check

Verify password fields use type='password', have proper autocomplete values, and include accessible show/hide toggles.

## Fix

Implement password fields with autocomplete='new-password' or 'current-password', accessible toggle buttons, and optional strength meters.

## Explain

Explain security and UX best practices for password fields including autocomplete attributes and accessible reveal functionality.

## Code Review

Review server config, headers, forms, and integration points related to Secure password input fields. Flag exact responses, cookies, or browser behaviors that violate the rule, and verify them against the effective production-like response.

---

For full implementation details, code examples, and framework-specific guidance,
see `references/rule.md`.

Rule page: https://frontendchecklist.io/rules/security/password-field-security
