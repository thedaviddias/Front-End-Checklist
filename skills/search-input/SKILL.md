---
name: search-input
description: "Use when reviewing templates, rendered HTML, or shared components related to Make search inputs accessible. Validate the final browser-facing markup, not just the source framework abstraction."
metadata:
  category: html
  priority: medium
  difficulty: intermediate
  estimatedTime: "20"
  source: frontendchecklist.io
  url: https://frontendchecklist.io/rules/html/search-input
---

# Make search inputs accessible

Search is a primary navigation method—inaccessible search functionality prevents users from finding content efficiently regardless of their abilities.

## Quick Reference

- Use type='search' and role='search' on the form
- Provide visible or screen reader accessible label
- Make autocomplete suggestions keyboard navigable
- Announce result counts to screen readers

## Check

Verify search inputs use type='search', have accessible labels, and use role='search' on the containing form.

## Fix

Implement search with type='search', visible or aria-label, form role='search', and accessible autocomplete suggestions.

## Explain

Explain how accessible search implementations help users find content efficiently regardless of their abilities.

## Code Review

Review templates, server-rendered HTML, and shared components that output markup related to Make search inputs accessible. Flag exact elements, attributes, and routes where the rendered HTML violates the rule.

---

For full implementation details, code examples, and framework-specific guidance,
see `references/rule.md`.

Rule page: https://frontendchecklist.io/rules/html/search-input
