---
name: meta-refresh
description: "Use when reviewing rendered HTML, interactive components, or design-system patterns related to Avoid meta refresh redirects. Check native semantics first, then inspect keyboard behavior, focus flow, accessible names, and screen-reader output where relevant."
metadata:
  category: accessibility
  priority: medium
  difficulty: intermediate
  estimatedTime: "10"
  source: frontendchecklist.io
  url: https://frontendchecklist.io/rules/accessibility/meta-refresh
---

# Avoid meta refresh redirects

Unexpected page refreshes or redirects can be extremely confusing for users with cognitive disabilities and can cause screen readers to restart reading from the beginning.

## Quick Reference

- Avoid using `<meta http-equiv="refresh">` for page redirects
- Use server-side redirects (301 or 302) instead of client-side meta refreshes
- Ensure users have control over page refreshes and redirects

## Check

Check the HTML for any meta tags that use `http-equiv="refresh"` for automatic page redirection.

## Fix

Replace meta refresh redirects with server-side redirects or clear, user-initiated links.

## Explain

Explain why automatic page refreshes can be a major barrier for accessibility and user experience.

## Code Review

Review the rendered markup and interactive states that affect Avoid meta refresh redirects. Flag exact elements, roles, labels, focus behavior, or keyboard interactions that violate the rule, and note how to verify the fix with browser accessibility tooling or assistive tech.

---

For full implementation details, code examples, and framework-specific guidance,
see `references/rule.md`.

Rule page: https://frontendchecklist.io/rules/accessibility/meta-refresh
