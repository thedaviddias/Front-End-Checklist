---
name: heading-order
description: "Use when reviewing rendered HTML, interactive components, or design-system patterns related to Maintain logical heading order. Check native semantics first, then inspect keyboard behavior, focus flow, accessible names, and screen-reader output where relevant."
metadata:
  category: accessibility
  priority: medium
  difficulty: beginner
  estimatedTime: "5"
  source: frontendchecklist.io
  url: https://frontendchecklist.io/rules/accessibility/heading-order
---

# Maintain logical heading order

A logical heading structure allows screen reader users to navigate the page content efficiently and helps all users understand the relationship between different sections.

## Quick Reference

- Use heading levels (`<h1>`-`<h6>`) in sequential order
- Do not skip heading levels (e.g., `<h1>` followed by `<h3>`)
- Ensure the document structure is logical and hierarchical

## Check

Check the heading structure of the page to ensure that heading levels are not skipped (e.g., check that an <h2> follows an <h1>).

## Fix

Adjust the heading levels to ensure a correct hierarchy (e.g., change an <h3> to an <h2> if it follows an <h1>).

## Explain

Explain how a consistent heading hierarchy aids navigation for screen reader users who rely on heading lists to understand page layout.

## Code Review

Review the rendered markup and interactive states that affect Maintain logical heading order. Flag exact elements, roles, labels, focus behavior, or keyboard interactions that violate the rule, and note how to verify the fix with browser accessibility tooling or assistive tech.

---

For full implementation details, code examples, and framework-specific guidance,
see `references/rule.md`.

Rule page: https://frontendchecklist.io/rules/accessibility/heading-order
