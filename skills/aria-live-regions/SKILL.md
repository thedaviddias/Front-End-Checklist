---
name: aria-live-regions
description: "Use when reviewing rendered HTML, interactive components, or design-system patterns related to Announce dynamic content with ARIA live regions. Check native semantics first, then inspect keyboard behavior, focus flow, accessible names, and screen-reader output where relevant."
metadata:
  category: accessibility
  priority: high
  difficulty: intermediate
  estimatedTime: "20"
  source: frontendchecklist.io
  url: https://frontendchecklist.io/rules/accessibility/aria-live-regions
---

# Announce dynamic content with ARIA live regions

Without live regions, screen reader users miss dynamic updates entirely—they won't know their form submitted, their cart updated, or an error occurred.

## Quick Reference

- Use aria-live='polite' for non-urgent updates (cart count, status messages)
- Use aria-live='assertive' only for critical alerts (errors, session expiry)
- Use role='alert' or role='status' for semantic live regions
- The live region must exist in DOM before content changes

## Check

Verify that dynamic content changes (notifications, form errors, loading states) use aria-live regions appropriately.

## Fix

Add aria-live attributes with correct politeness levels (polite, assertive) to containers with dynamic content.

## Explain

Explain how ARIA live regions enable screen readers to announce content changes without requiring user focus.

## Code Review

Review the rendered markup and interactive states that affect Announce dynamic content with ARIA live regions. Flag exact elements, roles, labels, focus behavior, or keyboard interactions that violate the rule, and note how to verify the fix with browser accessibility tooling or assistive tech.

---

For full implementation details, code examples, and framework-specific guidance,
see `references/rule.md`.

Rule page: https://frontendchecklist.io/rules/accessibility/aria-live-regions
