---
name: link-text
description: "Use when reviewing rendered HTML, interactive components, or design-system patterns related to Use descriptive link text. Check native semantics first, then inspect keyboard behavior, focus flow, accessible names, and screen-reader output where relevant."
metadata:
  category: accessibility
  priority: high
  difficulty: beginner
  estimatedTime: "10"
  source: frontendchecklist.io
  url: https://frontendchecklist.io/rules/accessibility/link-text
---

# Use descriptive link text

Screen reader users navigate by listing all links—'click here' repeated 10 times tells them nothing, while descriptive links let them jump directly to relevant content.

## Quick Reference

- Avoid generic text like 'click here', 'read more', 'learn more'
- Link text should describe the destination without surrounding context
- Use links for navigation to a URL, not for in-page actions
- Use aria-label when visual design requires short text
- Include file type and size for download links

## Check

Review all links and verify text describes the destination. Avoid generic phrases like 'click here', 'read more', 'learn more' without additional context. Check that screen readers can understand link purpose out of context.

## Fix

Replace generic link text with descriptive phrases. Use aria-label or aria-labelledby when visual design requires short text but context is needed. Ensure each link's purpose is clear from its text alone.

## Explain

Explain how screen reader users often navigate by listing all links on a page, and why 'click here' repeated multiple times provides no useful information about where each link leads.

## Code Review

Review the rendered markup and interactive states that affect Use descriptive link text. Flag exact elements, roles, labels, focus behavior, or keyboard interactions that violate the rule, and note how to verify the fix with browser accessibility tooling or assistive tech.

---

For full implementation details, code examples, and framework-specific guidance,
see `references/rule.md`.

Rule page: https://frontendchecklist.io/rules/accessibility/link-text
