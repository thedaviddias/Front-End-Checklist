---
name: reduced-motion
description: "Use when reviewing rendered HTML, interactive components, or design-system patterns related to Respect reduced motion preferences. Check native semantics first, then inspect keyboard behavior, focus flow, accessible names, and screen-reader output where relevant."
metadata:
  category: accessibility
  priority: high
  difficulty: beginner
  estimatedTime: "15"
  source: frontendchecklist.io
  url: https://frontendchecklist.io/rules/accessibility/reduced-motion
---

# Respect reduced motion preferences

Animations can trigger vestibular disorders, migraines, and seizures—respecting motion preferences makes your site usable for millions of affected users.

## Quick Reference

- Use prefers-reduced-motion media query to disable non-essential animations
- Never flash content more than 3 times per second (seizure risk)
- Replace motion with opacity/color transitions when reduced motion is enabled
- Provide user controls to pause or disable animations

## Check

Verify that animations respect prefers-reduced-motion, no content flashes more than 3 times per second, parallax and scrolljacking effects have alternatives, and motion warnings appear before pages with excessive animation.

## Fix

Use @media (prefers-reduced-motion: reduce) to disable animations. Ensure no flashing exceeds 3 flashes/second. Avoid motion behind static text. Provide motion warnings for immersive experiences.

## Explain

Explain how motion affects users with vestibular disorders, photosensitive epilepsy, and cognitive disabilities, and why providing motion controls and warnings is essential for inclusive design.

## Code Review

Review the rendered markup and interactive states that affect Respect reduced motion preferences. Flag exact elements, roles, labels, focus behavior, or keyboard interactions that violate the rule, and note how to verify the fix with browser accessibility tooling or assistive tech.

---

For full implementation details, code examples, and framework-specific guidance,
see `references/rule.md`.

Rule page: https://frontendchecklist.io/rules/accessibility/reduced-motion
