---
name: text-resizing
description: "Use when reviewing rendered HTML, interactive components, or design-system patterns related to Support text resizing to 200%. Check native semantics first, then inspect keyboard behavior, focus flow, accessible names, and screen-reader output where relevant."
metadata:
  category: accessibility
  priority: high
  difficulty: intermediate
  estimatedTime: "20"
  source: frontendchecklist.io
  url: https://frontendchecklist.io/rules/accessibility/text-resizing
---

# Support text resizing to 200%

Users with low vision need larger text—if your layout breaks at 200% zoom or clips text in fixed containers, they can't read your content.

## Quick Reference

- Use rem/em units for font sizes instead of fixed px
- Avoid fixed-height containers that clip text
- Ensure containers grow when text size increases
- Test at 200% zoom—all content should remain visible

## Check

Resize text to 200% using browser text-only zoom settings and verify no content is clipped, truncated, or overlaps. Confirm all functionality remains accessible and text containers expand appropriately.

## Fix

Use relative units (rem, em) for font sizes instead of fixed pixels. Ensure containers can grow with text content. Avoid fixed-height containers that clip overflowing text. Test with browser text-size preferences.

## Explain

Explain how users with low vision adjust text size through browser settings, and why fixed pixel sizes or clipping containers prevent users from accessing content at their preferred reading size.

## Code Review

Review the rendered markup and interactive states that affect Support text resizing to 200%. Flag exact elements, roles, labels, focus behavior, or keyboard interactions that violate the rule, and note how to verify the fix with browser accessibility tooling or assistive tech.

---

For full implementation details, code examples, and framework-specific guidance,
see `references/rule.md`.

Rule page: https://frontendchecklist.io/rules/accessibility/text-resizing
