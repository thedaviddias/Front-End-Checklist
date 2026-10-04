---
name: import-on-interaction
description: "Use when reviewing slow initial loads caused by optional features. Prioritize code that is expensive to download or execute and not required for the first viewport, first input, or core task completion."
metadata:
  category: performance
  priority: high
  difficulty: intermediate
  estimatedTime: "20"
  source: frontendchecklist.io
  url: https://frontendchecklist.io/rules/performance/import-on-interaction
---

# Load non-critical code on user interaction

Users should not pay the download, parse, and execution cost for features they may never use. Import-on-interaction shrinks initial JavaScript, reduces main-thread work during page load, and keeps the first view focused on content that matters immediately.

## Quick Reference

- Move non-essential code behind clicks, focus, hovers, or explicit user actions
- Use dynamic import() so the code is absent from the initial route bundle
- Show immediate UI feedback while the deferred chunk loads
- Use this for chat widgets, editors, maps, filters, and export flows that are not needed on first paint

## Check

Inspect this route or component for heavy modules, widgets, or third-party scripts that load on first render but are only needed after a user clicks, focuses, hovers, or opens a panel.

## Fix

Move the non-critical dependency behind a user-triggered dynamic import(), add immediate loading feedback, and ensure the initial render still works without the deferred feature.

## Explain

Explain import-on-interaction, why it improves initial performance, and which features are safe to defer until the user shows intent.

## Code Review

Inspect event handlers, modal triggers, drawers, editors, maps, export actions, and third-party widgets. Flag code that is included in the initial bundle even though it is only needed after a user interaction, and verify the fix keeps the initial path lighter without degrading the triggered flow.

---

For full implementation details, code examples, and framework-specific guidance,
see `references/rule.md`.

Rule page: https://frontendchecklist.io/rules/performance/import-on-interaction
