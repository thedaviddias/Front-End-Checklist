---
name: flashing-content
description: "Use when reviewing rendered HTML, interactive components, or design-system patterns related to Prevent seizure-triggering flashing content. Check native semantics first, then inspect keyboard behavior, focus flow, accessible names, and screen-reader output where relevant."
metadata:
  category: accessibility
  priority: critical
  difficulty: beginner
  estimatedTime: "15"
  source: frontendchecklist.io
  url: https://frontendchecklist.io/rules/accessibility/flashing-content
---

# Prevent seizure-triggering flashing content

Flashing content between 3-60 Hz can trigger seizures in people with photosensitive epilepsy—this is a critical safety requirement, not just an accessibility preference.

## Quick Reference

- Never flash content more than 3 times per second (WCAG Level A)
- Flashing area must be smaller than 25% of viewport
- Red flashing is especially dangerous—avoid entirely
- Test GIFs, videos, and CSS animations for rapid flashing

## Check

Verify no content flashes more than 3 times per second, and that any flashing content occupies less than 25% of the viewport. Test animated GIFs, videos, and CSS animations for rapid flashing patterns.

## Fix

Remove or slow down rapid flashing animations. Use animation tools to measure flash frequency. Replace flashing effects with fade transitions or static alternatives that convey the same information.

## Explain

Explain how flashing content between 3-60 Hz can trigger seizures in people with photosensitive epilepsy, and why this is a critical accessibility and safety requirement under WCAG 2.3.1.

## Code Review

Review the rendered markup and interactive states that affect Prevent seizure-triggering flashing content. Flag exact elements, roles, labels, focus behavior, or keyboard interactions that violate the rule, and note how to verify the fix with browser accessibility tooling or assistive tech.

---

For full implementation details, code examples, and framework-specific guidance,
see `references/rule.md`.

Rule page: https://frontendchecklist.io/rules/accessibility/flashing-content
