---
name: direction-attribute
description: "Use when reviewing templates, rendered HTML, or shared components related to Set text direction for RTL languages. Validate the final browser-facing markup, not just the source framework abstraction."
metadata:
  category: html
  priority: medium
  difficulty: intermediate
  estimatedTime: "15"
  source: frontendchecklist.io
  url: https://frontendchecklist.io/rules/html/direction-attribute
---

# Set text direction for RTL languages

Without proper dir attributes, RTL text displays incorrectly, UI elements appear backwards, and screen readers announce content in the wrong order.

## Quick Reference

- Set `dir="rtl"` on <html> for Arabic, Hebrew, Persian, Urdu
- Use `dir="auto"` for user-generated content
- Combine with CSS logical properties (inline-start, inline-end)
- Test UI mirroring for navigation, icons, and layouts
- Use bidi isolation such as `<bdi>` for inline mixed-direction user content

## Check

Verify that this HTML document uses the appropriate dir attribute to indicate text direction for right-to-left languages like Arabic, Hebrew, or mixed content. Check user-generated inline text for `dir="auto"` or bidi isolation where names, handles, or snippets mix writing directions.

## Fix

Add the dir attribute to the html element or specific elements with values 'ltr' (left-to-right), 'rtl' (right-to-left), or 'auto' for automatic detection. Use `<bdi>` or equivalent bidi isolation for mixed-direction inline content.

## Explain

Explain how the dir attribute helps browsers and screen readers properly display and navigate text in different writing directions.

## Code Review

Review templates, server-rendered HTML, and shared components that output markup related to Set text direction for RTL languages. Flag exact elements, attributes, and routes where the rendered HTML violates the rule. Inspect user-generated inline content, not only page-level locale wrappers.

---

For full implementation details, code examples, and framework-specific guidance,
see `references/rule.md`.

Rule page: https://frontendchecklist.io/rules/html/direction-attribute
