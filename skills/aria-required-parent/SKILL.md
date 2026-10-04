---
name: aria-required-parent
description: "Use when reviewing rendered HTML, interactive components, or design-system patterns related to Ensure ARIA roles are contained by required parent roles. Check native semantics first, then inspect keyboard behavior, focus flow, accessible names, and screen-reader output where relevant."
metadata:
  category: accessibility
  priority: medium
  difficulty: intermediate
  estimatedTime: "10"
  source: frontendchecklist.io
  url: https://frontendchecklist.io/rules/accessibility/aria-required-parent
---

# Ensure ARIA roles are contained by required parent roles

If an ARIA child role (like a menu item) is not contained within its required parent role (like a menu), screen readers may fail to announce the item as part of a group, breaking navigation.

## Quick Reference

- Certain roles (like `listitem`) must be owned by specific parent roles (like `list`)
- Ensure children elements are not orphaned from their semantic containers
- Maintain valid ARIA hierarchies for menu items, tabs, and list items

## Check

Verify that elements with roles like listitem, tab, or menuitem are correctly nested within their required parent roles.

## Fix

Wrap elements with roles that require a specific parent in the appropriate container role (e.g., wrap role="listitem" in role="list").

## Explain

Explain why certain ARIA roles must be nested within specific parent containers to maintain semantic meaning and group navigation.

## Code Review

Review the rendered markup and interactive states that affect Ensure ARIA roles are contained by required parent roles. Flag exact elements, roles, labels, focus behavior, or keyboard interactions that violate the rule, and note how to verify the fix with browser accessibility tooling or assistive tech.

---

For full implementation details, code examples, and framework-specific guidance,
see `references/rule.md`.

Rule page: https://frontendchecklist.io/rules/accessibility/aria-required-parent
