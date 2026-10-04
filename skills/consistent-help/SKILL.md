---
name: consistent-help
description: "Use when reviewing support UI across multi-page flows such as checkout, onboarding, account recovery, or support journeys. Compare multiple pages in the same variation instead of reviewing a single page alone."
metadata:
  category: accessibility
  priority: medium
  difficulty: beginner
  estimatedTime: "15"
  source: frontendchecklist.io
  url: https://frontendchecklist.io/rules/accessibility/consistent-help
---

# Keep repeated help mechanisms in a consistent location

Users who need help during a task should not have to hunt for it on every screen. Predictable placement reduces stress and makes support easier to find when a user is already struggling.

## Quick Reference

- Put repeated help in the same place across related pages
- Keep the same relative order at the same breakpoint and zoom level
- Review chat, phone, contact, FAQ, and help-center entry points together
- Inconsistency across steps matters more than the exact visual style

## Check

Audit repeated help mechanisms across this set of pages. Check whether contact links, chat triggers, help-center links, or support phone numbers appear in the same relative order on each page.

## Fix

Move repeated help mechanisms into a consistent location and keep their relative order stable across the flow at the same breakpoint.

## Explain

Explain WCAG Consistent Help, what counts as a repeated help mechanism, and why consistent serial order matters more than pixel-perfect placement.

## Code Review

Review page chrome, support UI, and responsive layouts related to Keep repeated help mechanisms in a consistent location. Flag exact pages or breakpoints where repeated help moves to a different relative position.

---

For full implementation details, code examples, and framework-specific guidance,
see `references/rule.md`.

Rule page: https://frontendchecklist.io/rules/accessibility/consistent-help
