---
name: content-without-css
description: "Use when reviewing rendered HTML, layout components, or design-system patterns that may depend on presentation for meaning. Check the DOM order, semantic structure, form relationships, and whether CSS generated content carries essential information."
metadata:
  category: accessibility
  priority: high
  difficulty: intermediate
  estimatedTime: "20"
  source: frontendchecklist.io
  url: https://frontendchecklist.io/rules/accessibility/content-without-css
---

# Ensure content remains usable without CSS

Users can browse with custom styles, high contrast modes, reader tools, or failed stylesheets. If the page only makes sense visually, content order, instructions, and task flow break as soon as presentation changes.

## Quick Reference

- Use semantic HTML so headings, lists, and form relationships survive without CSS
- Keep DOM order aligned with the reading and task-completion order
- Do not put essential labels, instructions, or required markers in CSS generated content
- Test key journeys with author styles disabled or overridden by user styles

## Check

Find pages or components that rely on CSS for meaning. Verify the page still has a logical reading order, visible labels, instructions, error text, and operable primary actions when author styles are disabled or replaced by user styles.

## Fix

Use semantic HTML and DOM order to preserve headings, lists, labels, field groups, helper text, and error messaging without relying on CSS positioning, pseudo-elements, or visual-only cues.

## Explain

Explain why semantic HTML and meaningful DOM order let content remain understandable when CSS fails to load or users apply their own styles.

## Code Review

Review templates, rendered HTML, and component markup related to Ensure content remains usable without CSS. Flag where meaning, reading order, labels, instructions, or task flow depend on CSS rather than semantics, and note how to verify the fix with styles disabled.

---

For full implementation details, code examples, and framework-specific guidance,
see `references/rule.md`.

Rule page: https://frontendchecklist.io/rules/accessibility/content-without-css
