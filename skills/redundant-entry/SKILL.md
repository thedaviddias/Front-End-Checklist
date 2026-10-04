---
name: redundant-entry
description: "Use when reviewing any process that spans multiple screens, steps, or modal stages. Follow the real user journey and compare fields across steps instead of reviewing screens in isolation."
metadata:
  category: accessibility
  priority: high
  difficulty: intermediate
  estimatedTime: "20"
  source: frontendchecklist.io
  url: https://frontendchecklist.io/rules/accessibility/redundant-entry
---

# Avoid redundant entry in the same process

Re-entering the same information increases cognitive load, slows task completion, and introduces avoidable typing errors. Users with cognitive, motor, or speech-input limitations are affected first, but everyone benefits from fewer repeated fields.

## Quick Reference

- Do not ask users to retype information already provided earlier in the same flow
- Auto-populate repeated fields or offer a clear selection such as "same as billing"
- Review checkout, signup, onboarding, and support flows step by step
- Password confirmation can be a valid security exception, but general profile data is not

## Check

Review this multi-step flow for information that is requested more than once in the same process. Flag fields that should be auto-populated or selectable from previously entered data.

## Fix

Reuse previously entered information within the same process. Auto-populate repeat fields, add "same as" toggles where appropriate, and preserve data between steps so users do not need to retype it.

## Explain

Explain WCAG 2.2 Redundant Entry, what counts as the same process, and when security or validity exceptions allow re-entry.

## Code Review

Review multi-step forms, checkout, onboarding, support, and account flows related to Avoid redundant entry in the same process. Flag exact steps where previously entered information is required again without auto-population or a selection mechanism.

---

For full implementation details, code examples, and framework-specific guidance,
see `references/rule.md`.

Rule page: https://frontendchecklist.io/rules/accessibility/redundant-entry
