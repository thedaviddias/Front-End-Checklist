---
name: zoom-reflow
description: "Use when reviewing rendered HTML, interactive components, or design-system patterns related to Support content reflow at 400% zoom. Check native semantics first, then inspect keyboard behavior, focus flow, accessible names, and screen-reader output where relevant."
metadata:
  category: accessibility
  priority: critical
  difficulty: intermediate
  estimatedTime: "30"
  source: frontendchecklist.io
  url: https://frontendchecklist.io/rules/accessibility/zoom-reflow
---

# Support content reflow at 400% zoom

Users with low vision zoom to 400% to read content—horizontal scrolling at that level makes it impossible to track lines of text and navigate effectively.

## Quick Reference

- Content must reflow to single column at 400% zoom (1280px width at 320px equivalent)
- No horizontal scrolling required to read content
- All functionality must remain accessible at high zoom levels
- Use relative units and fluid layouts that adapt to viewport

## Check

Zoom the browser to 400% and verify content reflows to a single column without horizontal scrolling, truncation, or overlapping elements. Test all interactive features remain functional at this zoom level.

## Fix

Use responsive CSS with relative units (rem, em, %) instead of fixed pixels. Implement fluid layouts that adapt to viewport width. Test with CSS media queries to ensure layouts reflow gracefully.

## Explain

Explain how users with low vision rely on browser zoom up to 400% to read content, and why horizontal scrolling creates significant barriers for users who can only see a small portion of the screen at once.

## Code Review

Review the rendered markup and interactive states that affect Support content reflow at 400% zoom. Flag exact elements, roles, labels, focus behavior, or keyboard interactions that violate the rule, and note how to verify the fix with browser accessibility tooling or assistive tech.

---

For full implementation details, code examples, and framework-specific guidance,
see `references/rule.md`.

Rule page: https://frontendchecklist.io/rules/accessibility/zoom-reflow
