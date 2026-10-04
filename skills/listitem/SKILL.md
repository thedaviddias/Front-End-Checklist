---
name: listitem
description: "Use when applies to HTML documents with `<li>` elements. Also applies to custom ARIA lists where `role='listitem'` must be owned by `role='list'`. Common violations occur in templating systems where list markup is split across components or in CSS resets where developers use `<li>` for layout without proper list parents."
metadata:
  category: accessibility
  priority: medium
  difficulty: beginner
  estimatedTime: "5"
  source: frontendchecklist.io
  url: https://frontendchecklist.io/rules/accessibility/listitem
---

# Place list items within list containers

When a `<li>` element exists outside a list container, screen readers lose the ability to announce critical context: NVDA and JAWS will not say 'list of 5 items' or 'item 2 of 5' because there is no list context. VoiceOver may announce the orphan `<li>` as plain text without any group context, stripping users of the structural information that helps them understand how many items exist and where they are in the list.

## Quick Reference

- Every `<li>` element must have a direct parent of `<ul>`, `<ol>`, or `<menu>`
- Orphan `<li>` elements are invalid HTML per the HTML Living Standard
- Screen readers announce list type and item count (e.g., 'list, 3 items') only when `<li>` is inside a valid list container
- Similarly, `role='listitem'` must be owned by a `role='list'` element per WAI-ARIA requirements

## Check

Find all `<li>` elements in the DOM. For each, check that its direct parent element is `<ul>`, `<ol>`, or `<menu>`. Flag any `<li>` whose parent is `<div>`, `<section>`, `<nav>`, `<span>`, or any element other than those three. Also check `role='listitem'` elements to ensure their closest ancestor with a list-related role is `role='list'`.

## Fix

For each orphan `<li>`: (1) Wrap it and any sibling `<li>` elements in the appropriate list container — use `<ul>` for unordered items or `<ol>` for sequentially ordered items. (2) If the `<li>` was being used purely for styling (e.g., a bullet point visual), replace it with a `<div>` or `<p>` and apply the visual style via CSS. (3) If inside a navigation element, ensure `<nav><ul><li>` nesting is maintained.

## Explain

The HTML Living Standard specifies that `<li>` elements are only valid as children of `<ul>`, `<ol>`, or `<menu>`. This is a structural requirement, not a style preference. Screen readers use the list container to announce the list type ('bullet list' vs 'numbered list') and the total item count. Without the container, this context is lost entirely. Additionally, when `list-style: none` is applied to a `<ul>`, some browsers strip the list semantics — if this is intentional (e.g., a navigation menu), add `role='list'` to the `<ul>` to restore list semantics for screen readers.

## Code Review

Review the rendered markup and interactive states that affect Place list items within list containers. Flag exact elements, roles, labels, focus behavior, or keyboard interactions that violate the rule, and note how to verify the fix with browser accessibility tooling or assistive tech.

---

For full implementation details, code examples, and framework-specific guidance,
see `references/rule.md`.

Rule page: https://frontendchecklist.io/rules/accessibility/listitem
