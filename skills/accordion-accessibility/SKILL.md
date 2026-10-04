---
name: accordion-accessibility
description: "Use when reviewing templates, rendered HTML, or shared components related to Make accordions keyboard navigable. Validate the final browser-facing markup, not just the source framework abstraction."
metadata:
  category: html
  priority: medium
  difficulty: intermediate
  estimatedTime: "25"
  source: frontendchecklist.io
  url: https://frontendchecklist.io/rules/html/accordion-accessibility
---

# Make accordions keyboard navigable

Poorly implemented accordions trap keyboard users and leave screen reader users unable to understand or navigate collapsed content sections.

## Quick Reference

- Use button elements for accordion triggers with aria-expanded
- Associate panels with triggers using aria-controls
- Support Arrow keys for navigation between headers
- Use heading elements appropriately for document structure

## Check

Verify accordions use button triggers with aria-expanded, aria-controls, and proper keyboard navigation (Enter, Space, arrows).

## Fix

Implement accordions with button elements, aria-expanded state, aria-controls linking to content panels, and keyboard support.

## Explain

Explain the ARIA pattern for accessible accordions and how they enable keyboard and screen reader users to navigate collapsible content.

## Code Review

Review templates, server-rendered HTML, and shared components that output markup related to Make accordions keyboard navigable. Flag exact elements, attributes, and routes where the rendered HTML violates the rule.

---

For full implementation details, code examples, and framework-specific guidance,
see `references/rule.md`.

Rule page: https://frontendchecklist.io/rules/html/accordion-accessibility
