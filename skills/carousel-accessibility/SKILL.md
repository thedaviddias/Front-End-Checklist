---
name: carousel-accessibility
description: "Use when reviewing templates, rendered HTML, or shared components related to Make carousels accessible. Validate the final browser-facing markup, not just the source framework abstraction."
metadata:
  category: html
  priority: medium
  difficulty: advanced
  estimatedTime: "30"
  source: frontendchecklist.io
  url: https://frontendchecklist.io/rules/html/carousel-accessibility
---

# Make carousels accessible

Auto-playing carousels without controls trap users, cause disorientation, and violate WCAG requirements—proper implementation ensures all users can interact with slideshow content.

## Quick Reference

- Always provide pause/stop controls for auto-rotating carousels
- Support keyboard navigation with arrow keys and tab
- Use aria-live regions to announce slide changes
- Respect prefers-reduced-motion preference

## Check

Verify carousels have pause/play controls, keyboard navigation, proper ARIA roles, and respect prefers-reduced-motion.

## Fix

Implement carousels with pause buttons, arrow key navigation, aria-live for announcements, and motion preference support.

## Explain

Explain accessibility requirements for carousels including auto-play controls, keyboard access, and screen reader support.

## Code Review

Review templates, server-rendered HTML, and shared components that output markup related to Make carousels accessible. Flag exact elements, attributes, and routes where the rendered HTML violates the rule.

---

For full implementation details, code examples, and framework-specific guidance,
see `references/rule.md`.

Rule page: https://frontendchecklist.io/rules/html/carousel-accessibility
