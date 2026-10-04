---
name: aria-required-children
description: "Use when applies to custom ARIA widgets using composite roles: tablist, list, listbox, menu, menubar, tree, treegrid, grid, rowgroup, row, radiogroup. Use when reviewing components built with div/span elements that replace native HTML list, select, or nav elements."
metadata:
  category: accessibility
  priority: high
  difficulty: intermediate
  estimatedTime: "15"
  source: frontendchecklist.io
  url: https://frontendchecklist.io/rules/accessibility/aria-required-children
---

# Ensure ARIA roles contain required child roles

Screen readers like NVDA and VoiceOver navigate composite widgets (menus, tabs, trees) by moving between the required child roles. If a `tablist` contains `<div>` elements instead of `role='tab'`, the user hears no tabs at all. JAWS announces 'list of 5 items' only when `role='listitem'` children exist inside `role='list'`. Without correct nesting, the entire widget becomes opaque to keyboard-only and screen reader users.

## Quick Reference

- Container roles mandate specific owned child roles: `tablist` → `tab`, `list`/`listbox` → `listitem`/`option`, `menu`/`menubar` → `menuitem`, `tree` → `treeitem`, `grid`/`rowgroup` → `row`
- Missing required children break the accessibility tree so screen readers cannot enumerate items or announce counts
- Use `role='none'` or `role='presentation'` on purely structural wrapper elements inside the container to avoid invalid nesting
- Applies to WAI-ARIA 1.2 required owned elements for composite widget roles

## Check

Identify all elements with ARIA container roles (tablist, list, listbox, menu, menubar, tree, treegrid, grid, rowgroup, radiogroup). For each, verify it contains the required owned child roles per the WAI-ARIA spec: tablist must own tab elements; list must own listitem; listbox must own option; menu/menubar must own menuitem, menuitemcheckbox, or menuitemradio; tree must own treeitem; grid must own row (which owns gridcell); radiogroup must own radio. Flag any container roles missing required children.

## Fix

For each container role missing its required children: (1) Add the correct role to each child element — e.g., add `role='tab'` to each tab button inside `role='tablist'`. (2) If wrapper `<div>` elements exist between the container and the required children for layout purposes, add `role='none'` or `role='presentation'` to those wrappers. (3) Prefer native HTML equivalents where possible: `<ul>`/`<li>` instead of `role='list'`/`role='listitem'`, `<select>`/`<option>` instead of `role='listbox'`/`role='option'`.

## Explain

WAI-ARIA 1.2 defines 'required owned elements' for composite widget roles — these are the child roles a container must contain for the widget to be valid. Screen readers build their understanding of a widget from this structure. A `tablist` without `tab` children means a screen reader user in Forms Mode will find nothing to navigate between. A `menu` without `menuitem` children will not be announced as a menu at all in some ATs. This is distinct from aria-required-parent, which checks the inverse direction.

## Code Review

Review the rendered markup and interactive states that affect Ensure ARIA roles contain required child roles. Flag exact elements, roles, labels, focus behavior, or keyboard interactions that violate the rule, and note how to verify the fix with browser accessibility tooling or assistive tech.

---

For full implementation details, code examples, and framework-specific guidance,
see `references/rule.md`.

Rule page: https://frontendchecklist.io/rules/accessibility/aria-required-children
