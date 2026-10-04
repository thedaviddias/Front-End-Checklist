---
name: heading-hierarchy
description: "Use when reviewing rendered HTML, interactive components, or design-system patterns related to Use logical heading hierarchy. Check native semantics first, then inspect keyboard behavior, focus flow, accessible names, and screen-reader output where relevant."
metadata:
  category: accessibility
  priority: critical
  difficulty: beginner
  estimatedTime: "15"
  source: frontendchecklist.io
  url: https://frontendchecklist.io/rules/accessibility/heading-hierarchy
---

# Use logical heading hierarchy

Screen reader users navigate by headings like a table of contents—skipping levels or poor hierarchy makes content impossible to understand and navigate.

## Quick Reference

- Use exactly one h1 per page for the main title
- Never skip heading levels (h1 → h2 → h3, not h1 → h3)
- Heading text should describe the content that follows
- Don't use headings for visual styling—use CSS instead

## Check

Verify pages have exactly one h1, headings follow sequential order without skipping levels (h1 → h2 → h3), and heading text clearly describes the content that follows. Use accessibility tools to generate a heading outline.

## Fix

Structure headings to reflect content hierarchy. Start with h1 for the page title, use h2 for major sections, h3 for subsections. Never skip heading levels or use headings purely for visual styling.

## Explain

Explain how screen reader users navigate by headings like a table of contents, and why skipped levels or missing structure forces users to work harder to understand page organization.

## Code Review

Review the rendered markup and interactive states that affect Use logical heading hierarchy. Flag exact elements, roles, labels, focus behavior, or keyboard interactions that violate the rule, and note how to verify the fix with browser accessibility tooling or assistive tech.

---

For full implementation details, code examples, and framework-specific guidance,
see `references/rule.md`.

Rule page: https://frontendchecklist.io/rules/accessibility/heading-hierarchy
