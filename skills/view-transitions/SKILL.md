---
name: view-transitions
description: "Use when adding page transition animations, image expand/contract effects, shared-element transitions, or improving navigation UX in a single-page or multi-page application."
metadata:
  category: css
  priority: low
  difficulty: intermediate
  estimatedTime: "30"
  source: frontendchecklist.io
  url: https://frontendchecklist.io/rules/css/view-transitions
---

# Use the View Transitions API for smooth page and component transitions

Jarring instant page changes are one of the most noticeable perceived- performance problems in web applications. Smooth transitions help users maintain context during navigation — they understand where they came from and where they are going. Previously, achieving this required complex JavaScript animation libraries; the View Transitions API delivers it natively at a fraction of the code cost.

## Quick Reference

- Wrap DOM mutations in document.startViewTransition() for same-page transitions
- Add view-transition-name to elements that should animate individually (not the whole page)
- Use @starting-style and ::view-transition-* pseudo-elements to customise animations
- Enable cross-document transitions in CSS with @view-transition { navigation: auto }

## Check

Check whether the site uses the View Transitions API or a JavaScript animation library for page and component transitions.

## Fix

Implement view transitions using document.startViewTransition() for SPA route changes or @view-transition for MPA cross-document navigation.

## Explain

Explain how the View Transitions API captures before/after snapshots and animates between them, and how view-transition-name enables shared-element transitions.

## Code Review

Review transition implementation for missing prefers-reduced-motion guards, duplicate view-transition-name values (must be unique per snapshot), and transitions that may cause layout thrash in the old/new state.

---

For full implementation details, code examples, and framework-specific guidance,
see `references/rule.md`.

Rule page: https://frontendchecklist.io/rules/css/view-transitions
