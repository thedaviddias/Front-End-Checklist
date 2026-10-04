---
name: accessible-tooltips
description: "Use when reviewing templates, rendered HTML, or shared components related to Create accessible tooltips. Validate the final browser-facing markup, not just the source framework abstraction."
metadata:
  category: html
  priority: medium
  difficulty: intermediate
  estimatedTime: "20"
  source: frontendchecklist.io
  url: https://frontendchecklist.io/rules/html/accessible-tooltips
---

# Create accessible tooltips

Inaccessible tooltips leave keyboard and screen reader users without important contextual information, creating an unequal experience and potential confusion.

## Quick Reference

- Tooltips must be keyboard accessible (focusable trigger)
- Use aria-describedby to associate tooltip with trigger
- Allow hover and focus to show tooltip, Escape to dismiss
- Ensure sufficient contrast and don't hide essential info in tooltips

## Check

Verify tooltips are keyboard accessible, use appropriate ARIA roles (tooltip), and can be dismissed without moving focus.

## Fix

Implement tooltips with role='tooltip', aria-describedby, keyboard triggering, and Escape key dismissal.

## Explain

Explain the accessibility requirements for tooltips including keyboard access, ARIA attributes, and timing considerations.

## Code Review

Review templates, server-rendered HTML, and shared components that output markup related to Create accessible tooltips. Flag exact elements, attributes, and routes where the rendered HTML violates the rule.

---

For full implementation details, code examples, and framework-specific guidance,
see `references/rule.md`.

Rule page: https://frontendchecklist.io/rules/html/accessible-tooltips
