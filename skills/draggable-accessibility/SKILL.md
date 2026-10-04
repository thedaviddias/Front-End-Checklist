---
name: draggable-accessibility
description: "Use when reviewing templates, rendered HTML, or shared components related to Make drag and drop accessible. Validate the final browser-facing markup, not just the source framework abstraction."
metadata:
  category: html
  priority: medium
  difficulty: advanced
  estimatedTime: "35"
  source: frontendchecklist.io
  url: https://frontendchecklist.io/rules/html/draggable-accessibility
---

# Make drag and drop accessible

Drag and drop is mouse-dependent by default—keyboard and screen reader users are completely locked out without proper alternatives and ARIA announcements.

## Quick Reference

- Always provide keyboard alternatives to drag and drop
- Use aria-grabbed and aria-dropeffect (or newer attributes)
- Announce drag operations to screen readers via live regions
- Support both mouse/touch and keyboard interaction patterns

## Check

Verify drag and drop interfaces have keyboard alternatives, proper ARIA attributes, and live region announcements.

## Fix

Implement keyboard alternatives (arrow keys, Enter/Space), aria-grabbed, aria-dropeffect, and status announcements.

## Explain

Explain how accessible drag and drop implementations provide equivalent functionality for keyboard and screen reader users.

## Code Review

Review templates, server-rendered HTML, and shared components that output markup related to Make drag and drop accessible. Flag exact elements, attributes, and routes where the rendered HTML violates the rule.

---

For full implementation details, code examples, and framework-specific guidance,
see `references/rule.md`.

Rule page: https://frontendchecklist.io/rules/html/draggable-accessibility
