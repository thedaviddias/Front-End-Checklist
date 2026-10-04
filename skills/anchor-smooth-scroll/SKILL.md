---
name: anchor-smooth-scroll
description: "Use when reviewing rendered HTML, interactive components, or design-system patterns related to Provide instant anchor scroll option. Check native semantics first, then inspect keyboard behavior, focus flow, accessible names, and screen-reader output where relevant."
metadata:
  category: accessibility
  priority: low
  difficulty: beginner
  estimatedTime: "10"
  source: frontendchecklist.io
  url: https://frontendchecklist.io/rules/accessibility/anchor-smooth-scroll
---

# Provide instant anchor scroll option

Smooth scroll animations can trigger vertigo, nausea, and disorientation for users with vestibular disorders—instant navigation is safer and often faster.

## Quick Reference

- Disable smooth scroll when prefers-reduced-motion is set
- Use CSS scroll-behavior: smooth with media query check
- Ensure focus moves to anchor target for keyboard users
- Provide instant scroll as default or fallback

## Check

Click anchor links (same-page navigation) and verify smooth scrolling is disabled when prefers-reduced-motion is set. Confirm anchor navigation works correctly with keyboard and screen readers.

## Fix

Use scroll-behavior: smooth only within a prefers-reduced-motion media query check. Provide instant scrolling as the default or reduced-motion fallback. Ensure focus moves to the anchor target.

## Explain

Explain how animated scroll transitions can cause motion sickness and disorientation for users with vestibular disorders, and why instant navigation is often preferable for accessibility.

## Code Review

Review the rendered markup and interactive states that affect Provide instant anchor scroll option. Flag exact elements, roles, labels, focus behavior, or keyboard interactions that violate the rule, and note how to verify the fix with browser accessibility tooling or assistive tech.

---

For full implementation details, code examples, and framework-specific guidance,
see `references/rule.md`.

Rule page: https://frontendchecklist.io/rules/accessibility/anchor-smooth-scroll
