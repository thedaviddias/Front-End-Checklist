---
name: orientation
description: "Use when reviewing mobile-first layouts, tablet experiences, fullscreen flows, forms, dashboards, or media interfaces. Check rendered behavior in both portrait and landscape and separate genuine layout constraints from unnecessary orientation assumptions."
metadata:
  category: accessibility
  priority: high
  difficulty: intermediate
  estimatedTime: "20"
  source: frontendchecklist.io
  url: https://frontendchecklist.io/rules/accessibility/orientation
---

# Support both portrait and landscape orientation

Many users mount devices to wheelchairs, use tablets on stands, or cannot easily rotate a device. If a site only works in one orientation, these users may lose access to content or critical actions entirely.

## Quick Reference

- Do not lock the interface to portrait-only or landscape-only unless the task truly requires it
- Ensure all core content and controls remain usable after device rotation
- Use responsive layouts that adapt instead of hiding functionality in one orientation
- If a specific orientation is essential, explain why and provide the best available alternative

## Check

Rotate the page between portrait and landscape on mobile and tablet viewports. Verify all primary content, navigation, forms, and interactive controls remain available and usable in both orientations. Flag any use of orientation locks, rotate-device overlays that block content, or layouts that hide essential functionality in one orientation.

## Fix

Remove orientation locks and redesign the layout to work in both portrait and landscape. Use responsive CSS, wrapping layouts, and adaptive spacing instead of blocking content behind a rotate-device message. Only keep an orientation requirement if the task is genuinely orientation-essential.

## Explain

Explain why WCAG requires content to support both portrait and landscape unless orientation is essential to the activity, and how orientation locks can block users who cannot rotate their devices.

## Code Review

Review responsive layouts, viewport handling, overlays, and any JavaScript related to device rotation. Flag exact selectors, components, or route states that require one orientation, hide essential content after rotation, or show blocking rotate-device messages instead of adapting the layout.

---

For full implementation details, code examples, and framework-specific guidance,
see `references/rule.md`.

Rule page: https://frontendchecklist.io/rules/accessibility/orientation
