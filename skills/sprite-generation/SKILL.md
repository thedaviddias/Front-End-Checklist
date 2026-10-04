---
name: sprite-generation
description: "Use when reviewing image assets, markup, and CDN or build transforms related to Use image sprites where appropriate. Check encoded size, rendered size, loading strategy, and above-the-fold impact together."
metadata:
  category: images
  priority: low
  difficulty: intermediate
  estimatedTime: "20"
  source: frontendchecklist.io
  url: https://frontendchecklist.io/rules/images/sprite-generation
---

# Use image sprites where appropriate

Each image is an HTTP request—combining many small images into one sprite reduces requests, though modern HTTP/2 and SVG icons have reduced this need.

## Quick Reference

- Sprites combine multiple images into one to reduce HTTP requests
- Modern alternative: SVG icon systems (more flexible)
- HTTP/2 makes sprites less critical but still useful for small icons
- Consider inline SVG or icon fonts for most icon use cases

## Check

Check if small images and icons are combined into sprites to reduce HTTP requests.

## Fix

Create CSS sprites for icons and small images, or migrate to SVG icons.

## Explain

Explain how sprites reduce HTTP requests but consider modern alternatives like SVG icons.

## Code Review

Review image assets, markup, and delivery configuration related to Use image sprites where appropriate. Flag exact files or components where format choice, sizing, or loading behavior violates the rule, and describe how to confirm the fix in DevTools.

---

For full implementation details, code examples, and framework-specific guidance,
see `references/rule.md`.

Rule page: https://frontendchecklist.io/rules/images/sprite-generation
