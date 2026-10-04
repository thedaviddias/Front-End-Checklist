---
name: autofocus-avoidance
description: "Use when reviewing rendered HTML, interactive components, or design-system patterns related to Avoid autofocus on form fields. Check native semantics first, then inspect keyboard behavior, focus flow, accessible names, and screen-reader output where relevant."
metadata:
  category: accessibility
  priority: low
  difficulty: beginner
  estimatedTime: "10"
  source: frontendchecklist.io
  url: https://frontendchecklist.io/rules/accessibility/autofocus-avoidance
---

# Avoid autofocus on form fields

Autofocus teleports screen reader users to mid-page without context—they miss everything before the form and have no idea where they landed.

## Quick Reference

- Avoid autofocus on pages with content before the form
- Autofocus disrupts screen reader users who lose page context
- Use JavaScript focus after user interaction instead of page load
- Login and search-only pages are exceptions where autofocus may be acceptable

## Check

Search for autofocus attributes on form elements. Verify that page load does not unexpectedly move focus away from the page top, especially on pages with content before the form.

## Fix

Remove autofocus attributes from form elements. If focus management is needed, use JavaScript to set focus after user interaction rather than automatically on page load.

## Explain

Explain how autofocus moves screen reader users to mid-page without context, can trigger unexpected scrolling, and disrupts users who were reading content before the focused element.

## Code Review

Review the rendered markup and interactive states that affect Avoid autofocus on form fields. Flag exact elements, roles, labels, focus behavior, or keyboard interactions that violate the rule, and note how to verify the fix with browser accessibility tooling or assistive tech.

---

For full implementation details, code examples, and framework-specific guidance,
see `references/rule.md`.

Rule page: https://frontendchecklist.io/rules/accessibility/autofocus-avoidance
