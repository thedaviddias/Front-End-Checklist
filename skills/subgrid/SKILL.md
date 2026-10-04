---
name: subgrid
description: "Use when reviewing card grid layouts with misaligned content areas, or any nested grid where child items need to align with sibling cards' corresponding sections without JavaScript intervention."
metadata:
  category: css
  priority: low
  difficulty: intermediate
  estimatedTime: "25"
  source: frontendchecklist.io
  url: https://frontendchecklist.io/rules/css/subgrid
---

# Use CSS subgrid to align nested grid items to parent tracks

Card grids are one of the most common UI patterns, but aligning content across cards — matching title heights, content areas, and footers — has historically required JavaScript height measurement or CSS hacks. Subgrid solves this at the layout engine level: nested items participate directly in the parent grid's tracks, so alignment is automatic, performant, and CSS-only.

## Quick Reference

- subgrid lets a nested grid inherit its parent grid tracks instead of creating new ones
- Solves misaligned card titles, content, and footers across rows of cards
- No JavaScript height matching needed — the browser handles track alignment
- Universal support: Safari 16+, Chrome/Edge 117+, Firefox 71+

## Check

Look for card grid layouts in this CSS where card content areas (titles, body text, footers) might not align across cards of different content lengths. These are candidates for subgrid.

## Fix

Convert this card grid to use subgrid. Show how to set grid-template-rows on the parent grid, then apply grid-row: span N and grid-template-rows: subgrid on each card to inherit the parent tracks.

## Explain

Explain how CSS subgrid works, how it differs from a nested grid, what problem it solves with card alignment, and when to use subgrid on columns versus rows.

## Code Review

Review card grid and nested grid layouts in this stylesheet. Flag any layout that uses JavaScript height matching, fixed heights, or display: contents workarounds to achieve cross-card alignment — and show the subgrid equivalent.

---

For full implementation details, code examples, and framework-specific guidance,
see `references/rule.md`.

Rule page: https://frontendchecklist.io/rules/css/subgrid
