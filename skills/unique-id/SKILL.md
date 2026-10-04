---
name: unique-id
description: "Use when reviewing templates, rendered HTML, or shared components related to Ensure all IDs are unique. Validate the final browser-facing markup, not just the source framework abstraction."
metadata:
  category: html
  priority: high
  difficulty: beginner
  estimatedTime: "10"
  source: frontendchecklist.io
  url: https://frontendchecklist.io/rules/html/unique-id
---

# Ensure all IDs are unique

Duplicate IDs break form accessibility (labels don't connect), ARIA relationships fail, and JavaScript getElementById returns wrong elements—causing silent bugs.

## Quick Reference

- Each ID must appear only once per HTML document
- Use classes for styling, IDs for unique anchors/references
- Check for duplicates introduced by component libraries
- Duplicate IDs break form labels, ARIA, and getElementById

## Check

Scan this HTML document to ensure all ID attributes are unique across the entire page and properly reference related elements.

## Fix

Remove duplicate ID values, ensure each ID is used only once per page, and update any references like labels, ARIA attributes, or JavaScript selectors.

## Explain

Explain why unique IDs are essential for HTML validity, accessibility (form labels, ARIA), JavaScript functionality, and CSS styling.

## Code Review

Review templates, server-rendered HTML, and shared components that output markup related to Ensure all IDs are unique. Flag exact elements, attributes, and routes where the rendered HTML violates the rule.

---

For full implementation details, code examples, and framework-specific guidance,
see `references/rule.md`.

Rule page: https://frontendchecklist.io/rules/html/unique-id
