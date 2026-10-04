---
name: accessible-notifications
description: "Use when reviewing templates, rendered HTML, or shared components related to Make notifications accessible. Validate the final browser-facing markup, not just the source framework abstraction."
metadata:
  category: html
  priority: high
  difficulty: intermediate
  estimatedTime: "25"
  source: frontendchecklist.io
  url: https://frontendchecklist.io/rules/html/accessible-notifications
---

# Make notifications accessible

Without proper ARIA attributes, screen reader users miss critical notifications like form errors, success messages, and real-time updates—leaving them unaware of important page changes.

## Quick Reference

- Use aria-live regions to announce dynamic content changes
- Choose between 'polite' (waits) and 'assertive' (interrupts) based on urgency
- Ensure notifications persist long enough to be read
- Provide visible and programmatic dismiss options

## Check

Verify notifications use aria-live regions, appropriate role (alert or status), and persist long enough to be read.

## Fix

Implement notifications with role='alert' or role='status', aria-live='polite' or 'assertive', and adequate display time.

## Explain

Explain how accessible notifications ensure all users are informed of important updates regardless of how they interact with the page.

## Code Review

Review templates, server-rendered HTML, and shared components that output markup related to Make notifications accessible. Flag exact elements, attributes, and routes where the rendered HTML violates the rule.

---

For full implementation details, code examples, and framework-specific guidance,
see `references/rule.md`.

Rule page: https://frontendchecklist.io/rules/html/accessible-notifications
