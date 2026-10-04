---
name: autoplay-media
description: "Use when reviewing rendered HTML, interactive components, or design-system patterns related to Avoid autoplaying media. Check native semantics first, then inspect keyboard behavior, focus flow, accessible names, and screen-reader output where relevant."
metadata:
  category: accessibility
  priority: high
  difficulty: beginner
  estimatedTime: "10"
  source: frontendchecklist.io
  url: https://frontendchecklist.io/rules/accessibility/autoplay-media
---

# Avoid autoplaying media

Autoplaying audio drowns out screen reader speech, startles users, and wastes bandwidth—providing user control is essential for accessibility and good UX.

## Quick Reference

- Never autoplay audio—it interferes with screen readers
- If video must autoplay, ensure it's muted by default
- Provide immediately accessible pause/stop controls
- Autoplay should stop after 5 seconds or provide stop mechanism

## Check

Verify no audio or video autoplays on page load. If autoplay is essential, confirm media is muted by default and pause controls are immediately accessible via keyboard within the first few tab stops.

## Fix

Remove autoplay attributes from media elements. If autoplay is required, add muted attribute and provide prominent, keyboard-accessible pause controls. Consider adding a global pause button for pages with multiple media elements.

## Explain

Explain how autoplaying media interferes with screen readers, startles users with cognitive disabilities, and creates barriers for users in quiet environments or with limited bandwidth.

## Code Review

Review the rendered markup and interactive states that affect Avoid autoplaying media. Flag exact elements, roles, labels, focus behavior, or keyboard interactions that violate the rule, and note how to verify the fix with browser accessibility tooling or assistive tech.

---

For full implementation details, code examples, and framework-specific guidance,
see `references/rule.md`.

Rule page: https://frontendchecklist.io/rules/accessibility/autoplay-media
