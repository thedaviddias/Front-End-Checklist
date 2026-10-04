---
name: accessible-authentication
description: "Use when reviewing sign-in, sign-up, MFA, CAPTCHA, recovery, and re-auth flows. Evaluate the full authentication path, including error handling and backup methods, not just the primary login form."
metadata:
  category: accessibility
  priority: high
  difficulty: advanced
  estimatedTime: "25"
  source: frontendchecklist.io
  url: https://frontendchecklist.io/rules/accessibility/accessible-authentication
---

# Provide accessible authentication methods

Authentication often becomes the first hard blocker for users with cognitive, motor, low-vision, or speech-input needs. If sign-in, MFA, or recovery relies on memorization or transcription with no assisted path, the user may be locked out before they can access the product at all.

## Quick Reference

- Do not block paste or password managers in login and recovery flows
- Prefer passkeys, magic links, device approval, or password-manager-friendly flows
- Support OTP autofill and paste with appropriate semantics such as `autocomplete="one-time-code"`
- Avoid CAPTCHA or secondary checks that require memorizing or transcribing information without an alternative

## Check

Review login, MFA, password reset, and account recovery for accessible authentication problems. Flag blocked paste, password-manager hostility, manual transcription requirements, inaccessible OTP handling, and CAPTCHA or knowledge checks without a compliant alternative.

## Fix

Add password-manager-friendly fields, support paste and OTP autofill, and provide at least one authentication path that does not depend on a cognitive function test.

## Explain

Explain WCAG Accessible Authentication, why memorization and transcription are barriers, and how passkeys, password managers, OTP autofill, and device approval improve both accessibility and security.

## Code Review

Review authentication pages, MFA steps, recovery flows, and security controls related to Provide accessible authentication methods. Flag exact steps that require memorization, transcription, blocked assistive tooling, or inaccessible fallback paths.

---

For full implementation details, code examples, and framework-specific guidance,
see `references/rule.md`.

Rule page: https://frontendchecklist.io/rules/accessibility/accessible-authentication
