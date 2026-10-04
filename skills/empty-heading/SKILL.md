---
name: empty-heading
description: "Use when reviewing rendered HTML, interactive components, or design-system patterns related to Ensure headings contain text. Check native semantics first, then inspect keyboard behavior, focus flow, accessible names, and screen-reader output where relevant."
metadata:
  category: accessibility
  priority: medium
  difficulty: beginner
  estimatedTime: "5"
  source: frontendchecklist.io
  url: https://frontendchecklist.io/rules/accessibility/empty-heading
---

# Ensure headings contain text

Empty headings create 'ghost' stops in the document outline, confusing users who rely on headings to navigate and understand the page structure.

## Quick Reference

- Add visible, descriptive text to all heading elements (h1-h6)
- Avoid using headings solely for styling or as empty placeholders
- Ensure document structure is meaningful for screen reader navigation

## Check

Find any heading tags (h1 through h6) that are empty or contain only non-perceivable whitespace.

## Fix

Add descriptive text content to the empty heading or remove the heading tag if it's not needed.

## Explain

Explain why meaningful heading content is vital for document navigation and accessibility.

## Code Review

Review the rendered markup and interactive states that affect Ensure headings contain text. Flag exact elements, roles, labels, focus behavior, or keyboard interactions that violate the rule, and note how to verify the fix with browser accessibility tooling or assistive tech.

---

For full implementation details, code examples, and framework-specific guidance,
see `references/rule.md`.

Rule page: https://frontendchecklist.io/rules/accessibility/empty-heading
