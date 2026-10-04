---
name: animation-performance
description: "Use when reviewing stylesheets, component styles, and responsive behavior related to Use transform and opacity for animations. Check the rendered layout across breakpoints and interaction states before proposing a fix."
metadata:
  category: css
  priority: high
  difficulty: intermediate
  estimatedTime: "20"
  source: frontendchecklist.io
  url: https://frontendchecklist.io/rules/css/animation-performance
---

# Use transform and opacity for animations

Animating layout properties (width, height, top, margin) triggers the full browser rendering pipeline on every frame — style recalculation, layout, paint, and composite. This runs on the main thread and competes with JavaScript. Animating transform and opacity skips layout and paint entirely and runs on a dedicated GPU thread, achieving smooth 60fps even when the main thread is busy.

## Quick Reference

- Only transform and opacity can be composited on the GPU without triggering layout
- Use will-change: transform sparingly to promote an element to its own compositor layer
- Prefer CSS transitions and animations over JavaScript animation libraries for simple effects
- Respect prefers-reduced-motion to disable animations for users who need it

## Check

Find CSS animations or transitions in this file that animate layout-triggering properties like top, left, width, height, or margin. Flag them for optimization.

## Fix

Convert layout-triggering animations to use transform equivalents: position changes to translate(), size changes to scale().

## Explain

Explain the browser rendering pipeline, why transform and opacity are performant for animation, and how the GPU compositor works.

## Code Review

Review stylesheets, component styles, and responsive states related to Use transform and opacity for animations. Flag exact selectors, declarations, or breakpoints that violate the rule in the rendered UI.

---

For full implementation details, code examples, and framework-specific guidance,
see `references/rule.md`.

Rule page: https://frontendchecklist.io/rules/css/animation-performance
