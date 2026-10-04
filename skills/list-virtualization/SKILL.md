---
name: list-virtualization
description: "Use when reviewing dashboards, admin tables, search results, or feeds with many repeated items. Confirm the bottleneck is DOM or rendering cost before introducing virtualization because small lists usually do not need the added complexity."
metadata:
  category: performance
  priority: high
  difficulty: intermediate
  estimatedTime: "25"
  source: frontendchecklist.io
  url: https://frontendchecklist.io/rules/performance/list-virtualization
---

# Virtualize long lists and tables

Rendering hundreds or thousands of rows at once wastes memory and makes style calculation, layout, and painting more expensive. Virtualization keeps large collections responsive by limiting the number of mounted nodes.

## Quick Reference

- Render only what is visible plus a small overscan buffer instead of the entire list
- Use virtualization when repeated rows or cards push DOM size and layout cost too high
- Preserve item sizing, keyboard access, and screen-reader semantics when windowing content
- Measure scroll smoothness, memory use, and DOM node count before and after the change

## Check

Inspect long lists, tables, grids, and feeds for places where the UI renders every item at once. Flag views where the number of mounted rows or cards is large enough to create DOM, memory, or scroll-performance issues.

## Fix

Introduce list or table virtualization so only the visible rows plus overscan render, while preserving sizing, keyboard navigation, and any required sticky headers or selection behavior.

## Explain

Explain list virtualization, why it improves performance for large collections, and the tradeoffs engineers need to watch for around measurement and accessibility.

## Code Review

Inspect collection components, data tables, infinite feeds, and dashboards. Flag places where rendering the full dataset creates excessive DOM nodes or scroll jank, and verify the virtualization strategy still preserves item identity, semantics, and expected interactions.

---

For full implementation details, code examples, and framework-specific guidance,
see `references/rule.md`.

Rule page: https://frontendchecklist.io/rules/performance/list-virtualization
