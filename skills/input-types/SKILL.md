---
name: input-types
description: "Use when reviewing templates, rendered HTML, or shared components related to Use semantic input type attributes. Validate the final browser-facing markup, not just the source framework abstraction."
metadata:
  category: html
  priority: high
  difficulty: beginner
  estimatedTime: "10"
  source: frontendchecklist.io
  url: https://frontendchecklist.io/rules/html/input-types
---

# Use semantic input type attributes

Using type=text for every input forces mobile users to switch keyboards manually for email, phone, and number entry. The correct type also enables browser autofill to correctly identify fields for name, address, and payment data. Combined with autocomplete attributes, semantic types can make form completion 40% faster for returning users.

## Quick Reference

- type=email shows the @ keyboard on mobile and enables email format validation
- type=tel shows the numeric phone keypad on mobile
- type=number shows a numeric keypad; use inputmode=numeric for fields that look like numbers but aren't
- type=date/time renders native pickers and returns standardized values

## Check

Audit all input elements in this HTML file. Check whether each uses the most appropriate type attribute and autocomplete value.

## Fix

Update input type attributes to semantic values and add appropriate autocomplete attributes for autofill support.

## Explain

Explain the different HTML input types, what each one does on mobile keyboards, and how to combine them with autocomplete attributes.

## Code Review

Review templates, server-rendered HTML, and shared components that output markup related to Use semantic input type attributes. Flag exact elements, attributes, and routes where the rendered HTML violates the rule.

---

For full implementation details, code examples, and framework-specific guidance,
see `references/rule.md`.

Rule page: https://frontendchecklist.io/rules/html/input-types
