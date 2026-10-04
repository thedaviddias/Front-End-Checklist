---
name: parallax-effects
description: "Use when reviewing rendered HTML, interactive components, or design-system patterns related to Provide alternatives to parallax effects. Check native semantics first, then inspect keyboard behavior, focus flow, accessible names, and screen-reader output where relevant."
metadata:
  category: accessibility
  priority: medium
  difficulty: intermediate
  estimatedTime: "20"
  source: frontendchecklist.io
  url: https://frontendchecklist.io/rules/accessibility/parallax-effects
---

# Provide alternatives to parallax effects

Parallax creates a mismatch between what the eyes see and what the inner ear senses—triggering dizziness, nausea, and vertigo for users with vestibular disorders.

## Quick Reference

- Disable parallax when prefers-reduced-motion is set
- Parallax creates depth mismatch triggering vestibular disorders
- Provide user toggle to disable motion effects site-wide
- Ensure essential content is accessible without the effect

## Check

Identify parallax effects where background and foreground move at different speeds. Verify these effects are disabled when prefers-reduced-motion is set, and essential content is accessible without the effect.

## Fix

Wrap parallax effects in @media (prefers-reduced-motion: no-preference) queries. Provide static fallbacks that convey the same content. Consider adding a user toggle to disable motion effects site-wide.

## Explain

Explain how parallax effects create a depth mismatch that can trigger vestibular disorders, causing dizziness, nausea, and disorientation in affected users.

## Code Review

Review the rendered markup and interactive states that affect Provide alternatives to parallax effects. Flag exact elements, roles, labels, focus behavior, or keyboard interactions that violate the rule, and note how to verify the fix with browser accessibility tooling or assistive tech.

---

For full implementation details, code examples, and framework-specific guidance,
see `references/rule.md`.

Rule page: https://frontendchecklist.io/rules/accessibility/parallax-effects
