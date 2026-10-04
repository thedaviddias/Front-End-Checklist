---
name: frame-title
description: "Use when reviewing rendered HTML, interactive components, or design-system patterns related to Provide titles for iframes and frames. Check native semantics first, then inspect keyboard behavior, focus flow, accessible names, and screen-reader output where relevant."
metadata:
  category: accessibility
  priority: medium
  difficulty: beginner
  estimatedTime: "5"
  source: frontendchecklist.io
  url: https://frontendchecklist.io/rules/accessibility/frame-title
---

# Provide titles for iframes and frames

Frame titles allow users of assistive technology to quickly understand the content of an iframe without having to navigate into it, which is crucial for navigation and orientation.

## Quick Reference

- Add a descriptive `title` attribute to every `<iframe>`
- Ensure titles clearly describe the frame's content
- Helps screen reader users navigate between frames

## Check

Verify that all <iframe> and <frame> elements have a non-empty 'title' attribute.

## Fix

Add a descriptive 'title' attribute to the <iframe> tag that explains what the embedded content is.

## Explain

Explain how frame titles help screen reader users identify and bypass embedded content like advertisements or social media widgets.

## Code Review

Review the rendered markup and interactive states that affect Provide titles for iframes and frames. Flag exact elements, roles, labels, focus behavior, or keyboard interactions that violate the rule, and note how to verify the fix with browser accessibility tooling or assistive tech.

---

For full implementation details, code examples, and framework-specific guidance,
see `references/rule.md`.

Rule page: https://frontendchecklist.io/rules/accessibility/frame-title
