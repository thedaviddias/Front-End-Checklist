---
name: session-timeout-recovery
description: "Use when reviewing authenticated user flows or long forms. Check both client and server behavior: warning timing, dialog accessibility, autosave frequency, timeout extension, and post-login state restoration."
metadata:
  category: accessibility
  priority: high
  difficulty: advanced
  estimatedTime: "30"
  source: frontendchecklist.io
  url: https://frontendchecklist.io/rules/accessibility/session-timeout-recovery
---

# Prevent data loss from session timeouts

Users with cognitive, motor, or vision disabilities may need longer to finish forms and authenticated tasks. Silent session expiry can erase work, force a restart, and block completion of important transactions.

## Quick Reference

- Warn users before a timeout causes lost work
- Allow time extension for content-controlled time limits when feasible
- Autosave or preserve entered data across logout and re-authentication
- Keep timeout dialogs keyboard accessible and announced to assistive technology

## Check

Review authenticated flows, forms, and long-running tasks for inactivity timeouts. Verify users are told the timeout duration, warned before expiry, can extend the session when allowed, and can resume after re-authenticating without losing work.

## Fix

Add an accessible timeout warning, preserve drafts or submitted data across session expiry, and restore the user to the same step after re-authentication. Where the time limit is content-controlled, offer turn off, adjust, or extend behavior when feasible.

## Explain

Explain how timeout warnings, extension controls, autosave, and re-authentication recovery reduce data loss and align with WCAG enough-time guidance.

## Code Review

Review authenticated forms, checkout flows, editors, and long-running tasks related to Prevent data loss from session timeouts. Flag routes or components that can expire silently, discard entered data, or block recovery after re-authentication.

---

For full implementation details, code examples, and framework-specific guidance,
see `references/rule.md`.

Rule page: https://frontendchecklist.io/rules/accessibility/session-timeout-recovery
