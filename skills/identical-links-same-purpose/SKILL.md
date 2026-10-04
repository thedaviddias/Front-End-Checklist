---
name: identical-links-same-purpose
description: "Use when reviewing rendered HTML, interactive components, or design-system patterns related to Ensure identical links have consistent destinations. Check native semantics first, then inspect keyboard behavior, focus flow, accessible names, and screen-reader output where relevant."
metadata:
  category: accessibility
  priority: medium
  difficulty: intermediate
  estimatedTime: "10"
  source: frontendchecklist.io
  url: https://frontendchecklist.io/rules/accessibility/identical-links-same-purpose
---

# Ensure identical links have consistent destinations

When links with identical text lead to different destinations, it creates confusion and unpredictability, especially for users who rely on a list of links to navigate.

## Quick Reference

- Links with the same text should point to the same URL
- Differentiate links that lead to different places
- Reduces confusion for screen reader users navigating by link list

## Check

Identify any links on the page that have identical link text but point to different URLs.

## Fix

Change the link text to be unique for each destination, or ensure that identical text always leads to the same resource.

## Explain

Explain how identical link text for different destinations can mislead users, particularly those using screen readers to scan a list of links.

## Code Review

Review the rendered markup and interactive states that affect Ensure identical links have consistent destinations. Flag exact elements, roles, labels, focus behavior, or keyboard interactions that violate the rule, and note how to verify the fix with browser accessibility tooling or assistive tech.

---

For full implementation details, code examples, and framework-specific guidance,
see `references/rule.md`.

Rule page: https://frontendchecklist.io/rules/accessibility/identical-links-same-purpose
