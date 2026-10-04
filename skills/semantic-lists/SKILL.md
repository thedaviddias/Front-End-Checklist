---
name: semantic-lists
description: "Use when reviewing rendered HTML, interactive components, or design-system patterns related to Use semantic list elements. Check native semantics first, then inspect keyboard behavior, focus flow, accessible names, and screen-reader output where relevant."
metadata:
  category: accessibility
  priority: medium
  difficulty: beginner
  estimatedTime: "10"
  source: frontendchecklist.io
  url: https://frontendchecklist.io/rules/accessibility/semantic-lists
---

# Use semantic list elements

Screen readers announce list structure and item count—'list with 5 items'—helping users understand content organization. Styled divs provide no context.

## Quick Reference

- Use <ul> for unordered lists (navigation, features, bullets)
- Use <ol> for ordered sequences (steps, rankings, instructions)
- Use &lt;dl&gt; for term-definition pairs (glossaries, FAQs)
- Screen readers announce 'list with X items' for proper lists

## Check

Identify groups of related items (navigation menus, product features, steps) and verify they use ul, ol, or dl elements rather than divs or spans styled to look like lists.

## Fix

Wrap related items in appropriate list elements: ul for unordered lists, ol for numbered sequences, dl for term-definition pairs. Use li for list items and proper dt/dd for definition lists.

## Explain

Explain how screen readers announce 'list with X items' to help users understand content structure, and why styled divs provide no semantic information about grouped content.

## Code Review

Review the rendered markup and interactive states that affect Use semantic list elements. Flag exact elements, roles, labels, focus behavior, or keyboard interactions that violate the rule, and note how to verify the fix with browser accessibility tooling or assistive tech.

---

For full implementation details, code examples, and framework-specific guidance,
see `references/rule.md`.

Rule page: https://frontendchecklist.io/rules/accessibility/semantic-lists
