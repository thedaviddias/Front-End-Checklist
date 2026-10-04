---
name: aria-treeitem-name
description: "Use when applies to custom tree widgets built with role='tree', role='treeitem', and role='group'. Common in file explorers, nested navigation menus, org charts, and any UI where items can be expanded or collapsed to reveal children."
metadata:
  category: accessibility
  priority: medium
  difficulty: intermediate
  estimatedTime: "10"
  source: frontendchecklist.io
  url: https://frontendchecklist.io/rules/accessibility/aria-treeitem-name
---

# Provide accessible names for tree items

Tree widgets represent hierarchical data (file explorers, nested navigation, organization charts). Screen readers announce each focused treeitem's name, level, and position — e.g., 'src, collapsed, level 1, 1 of 3'. If the name is empty or generic ('folder', 'item'), blind users cannot distinguish between nodes and cannot navigate the hierarchy with confidence. VoiceOver on macOS uses the name to populate the rotor, and NVDA reads it as the user moves through the tree with arrow keys.

## Quick Reference

- Every element with `role='treeitem'` must have a non-empty accessible name
- Text content of the element is used as the name by default — ensure it is descriptive
- Use `aria-label` to override or supplement the visible text (e.g., adding file type context)
- Use `aria-labelledby` to compose a name from multiple visible elements within the item
- A treeitem with `aria-expanded` must also convey its expanded/collapsed state — this is separate from its name

## Check

Find all elements with `role='treeitem'`. For each, determine its accessible name via the accname computation: check `aria-labelledby` first, then `aria-label`, then visible text content. Flag any treeitem with an empty or whitespace-only accessible name. Also check whether treeitems with children have `aria-expanded` set to 'true' or 'false' (not just absent).

## Fix

For each unnamed treeitem: (1) If the element has visible text content that is descriptive, no change is needed — the text content becomes the accessible name. (2) If the visible text is ambiguous (e.g., an icon with no text), add `aria-label='Descriptive name'`. (3) If the item has multiple text parts (e.g., filename + file size), use `aria-labelledby` referencing the most descriptive element's id. (4) For expandable treeitems, ensure `aria-expanded='true'` or `aria-expanded='false'` is present and toggled on expand/collapse.

## Explain

WAI-ARIA 1.2 requires that treeitem elements have an accessible name as part of the tree widget pattern. Screen readers convey position within the tree using: name + level (aria-level or DOM nesting depth) + set size (aria-setsize) + position in set (aria-posinset) + expanded state (aria-expanded). The name is the only user-facing identifier — without it, a user navigating by arrow keys hears only 'treeitem, level 2' with no way to know which node they are on.

## Code Review

Review the rendered markup and interactive states that affect Provide accessible names for tree items. Flag exact elements, roles, labels, focus behavior, or keyboard interactions that violate the rule, and note how to verify the fix with browser accessibility tooling or assistive tech.

---

For full implementation details, code examples, and framework-specific guidance,
see `references/rule.md`.

Rule page: https://frontendchecklist.io/rules/accessibility/aria-treeitem-name
