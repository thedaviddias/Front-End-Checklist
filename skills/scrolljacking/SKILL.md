---
name: scrolljacking
description: "Use when reviewing rendered HTML, interactive components, or design-system patterns related to Avoid scrolljacking and custom scroll behavior. Check native semantics first, then inspect keyboard behavior, focus flow, accessible names, and screen-reader output where relevant."
metadata:
  category: accessibility
  priority: medium
  difficulty: beginner
  estimatedTime: "15"
  source: frontendchecklist.io
  url: https://frontendchecklist.io/rules/accessibility/scrolljacking
---

# Avoid scrolljacking and custom scroll behavior

Scrolljacking breaks user expectations, interferes with assistive technologies, and creates unpredictable experiences that frustrate users with motor impairments or cognitive disabilities.

## Quick Reference

- Never override native scroll speed or direction
- Avoid scroll-triggered navigation (one page per scroll)
- Scrolljacking breaks assistive technologies and user expectations
- If custom scrolling is essential, provide a way to disable it

## Check

Test scrolling behavior and verify it feels native. Check that scroll speed is not modified, scroll direction is not inverted, and scroll events are not hijacked for animations or navigation without user consent.

## Fix

Remove JavaScript that overrides default scroll behavior. If custom scrolling is essential, respect prefers-reduced-motion and provide a way to disable custom scroll effects.

## Explain

Explain how scrolljacking disrupts expected navigation patterns, interferes with assistive technologies, and creates unpredictable experiences for users with motor impairments or cognitive disabilities.

## Code Review

Review the rendered markup and interactive states that affect Avoid scrolljacking and custom scroll behavior. Flag exact elements, roles, labels, focus behavior, or keyboard interactions that violate the rule, and note how to verify the fix with browser accessibility tooling or assistive tech.

---

For full implementation details, code examples, and framework-specific guidance,
see `references/rule.md`.

Rule page: https://frontendchecklist.io/rules/accessibility/scrolljacking
