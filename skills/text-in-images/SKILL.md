---
name: text-in-images
description: "Use when reviewing rendered HTML, interactive components, or design-system patterns related to Avoid images of text. Check native semantics first, then inspect keyboard behavior, focus flow, accessible names, and screen-reader output where relevant."
metadata:
  category: accessibility
  priority: low
  difficulty: beginner
  estimatedTime: "15"
  source: frontendchecklist.io
  url: https://frontendchecklist.io/rules/accessibility/text-in-images
---

# Avoid images of text

Text in images can't be resized by users with low vision, translated automatically, read by screen readers without alt text, or reflowed when zoomed—real text is always more accessible.

## Quick Reference

- Use real HTML text instead of text in images
- Images of text can't be resized, translated, or read by screen readers
- Logos and decorative typography are acceptable exceptions
- Use CSS and web fonts for stylized text effects

## Check

Identify images that contain text content. Verify the text could not be presented as real HTML text. Exceptions include logos, decorative typography, and cases where exact visual rendering is essential.

## Fix

Replace text images with real HTML text styled with CSS. If images of text are necessary, provide equivalent text in alt attributes. Consider using SVG with embedded text for scalable typography.

## Explain

Explain how images of text cannot be resized by users, are not readable by screen readers without alt text, cannot reflow on zoom, and create barriers for translation and text customization.

## Code Review

Review the rendered markup and interactive states that affect Avoid images of text. Flag exact elements, roles, labels, focus behavior, or keyboard interactions that violate the rule, and note how to verify the fix with browser accessibility tooling or assistive tech.

---

For full implementation details, code examples, and framework-specific guidance,
see `references/rule.md`.

Rule page: https://frontendchecklist.io/rules/accessibility/text-in-images
