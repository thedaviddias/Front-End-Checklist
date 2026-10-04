---
name: skip-navigation
description: "Use when reviewing rendered HTML, interactive components, or design-system patterns related to Include a skip navigation link. Check native semantics first, then inspect keyboard behavior, focus flow, accessible names, and screen-reader output where relevant."
metadata:
  category: accessibility
  priority: high
  difficulty: beginner
  estimatedTime: "10"
  source: frontendchecklist.io
  url: https://frontendchecklist.io/rules/accessibility/skip-navigation
---

# Include a skip navigation link

Skip links save keyboard and screen reader users from tabbing through 50+ navigation items on every page visit—turning a frustrating experience into an efficient one.

## Quick Reference

- Add a 'Skip to main content' link as the first focusable element
- Hide visually but show on focus with CSS
- Link to main content using id='main-content'
- Test by pressing Tab immediately after page load

## Check

Verify that a 'Skip to main content' link is present and functional at the beginning of the page.

## Fix

Add a visually hidden skip link that becomes visible on focus and links to the main content area.

## Explain

Explain how skip links improve efficiency for keyboard users by allowing them to bypass repeated navigation elements.

## Code Review

Review the rendered markup and interactive states that affect Include a skip navigation link. Flag exact elements, roles, labels, focus behavior, or keyboard interactions that violate the rule, and note how to verify the fix with browser accessibility tooling or assistive tech.

---

For full implementation details, code examples, and framework-specific guidance,
see `references/rule.md`.

Rule page: https://frontendchecklist.io/rules/accessibility/skip-navigation
