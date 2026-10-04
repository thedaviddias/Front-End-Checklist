---
name: input-image-alt
description: "Use when reviewing rendered HTML, interactive components, or design-system patterns related to Provide alt text for image buttons. Check native semantics first, then inspect keyboard behavior, focus flow, accessible names, and screen-reader output where relevant."
metadata:
  category: accessibility
  priority: critical
  difficulty: beginner
  estimatedTime: "5"
  source: frontendchecklist.io
  url: https://frontendchecklist.io/rules/accessibility/input-image-alt
---

# Provide alt text for image buttons

Without alt text, screen readers may read the file name of the image, leaving users unable to determine the function of the button.

## Quick Reference

- Add an `alt` attribute to `<input type='image'>`
- Describe the action of the button, not just the image
- Ensures the button's purpose is clear to assistive technology

## Check

Verify that all <input type='image'> elements have a non-empty 'alt' attribute.

## Fix

Add an 'alt' attribute to the <input type='image'> that describes the action performed when the button is clicked (e.g., 'Search', 'Submit').

## Explain

Explain why image buttons require alternative text to communicate their function to users who cannot see the image.

## Code Review

Review the rendered markup and interactive states that affect Provide alt text for image buttons. Flag exact elements, roles, labels, focus behavior, or keyboard interactions that violate the rule, and note how to verify the fix with browser accessibility tooling or assistive tech.

---

For full implementation details, code examples, and framework-specific guidance,
see `references/rule.md`.

Rule page: https://frontendchecklist.io/rules/accessibility/input-image-alt
