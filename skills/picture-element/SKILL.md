---
name: picture-element
description: "Use when reviewing image assets, markup, and CDN or build transforms related to Use <picture> with an <img> fallback. Check encoded size, rendered size, loading strategy, and above-the-fold impact together."
metadata:
  category: images
  priority: high
  difficulty: beginner
  estimatedTime: "10"
  source: frontendchecklist.io
  url: https://frontendchecklist.io/rules/images/picture-element
---

# Use <picture> with an <img> fallback

A `<picture>` without an `<img>` fallback renders nothing in browsers that don't support `<picture>` (IE11) or don't support any of the `<source>` formats. The `<img>` child is also where `alt`, `width`, `height`, `loading`, and `fetchpriority` attributes live—these apply regardless of which source the browser selects.

## Quick Reference

- Every `<picture>` must end with an `<img>` element—it is the required fallback and carries `alt`
- `<source>` elements are evaluated top-to-bottom; the first match wins
- Use `type="image/avif"` and `type="image/webp"` on `<source>` for format selection
- The `<img src>` should point to a JPEG or PNG—the universal fallback for all browsers

## Check

Scan all <picture> elements in this codebase. Verify: 1) Every <picture> has an <img> as its last child (required fallback). 2) The <img> has an alt attribute. 3) The <img> has width and height attributes. 4) <source> elements appear before the <img> child. 5) Each <source> has either a srcset attribute or a media attribute. 6) format-selecting <source> elements have a type attribute (type="image/avif", type="image/webp"). Flag any <picture> missing an <img> child or with <img> not as the last child.

## Fix

For each <picture> element with issues: 1) If missing <img>: add <img src="{fallback-url}" alt="{description}" width="{w}" height="{h}"> as the last child. 2) If <img> is not last: move it to after all <source> elements. 3) If <source> elements lack type attributes for format selection: add type="image/avif" or type="image/webp". 4) Verify the <img src> points to a universally supported format (JPEG or PNG) as the ultimate fallback. Show the corrected <picture> markup.

## Explain

Explain how the <picture> element works. Browsers evaluate <source> elements in document order and use the first one whose conditions match (type, media, srcset). The <img> element is the fallback for browsers that don't support <picture> (IE11) or don't support the source format. Without an <img> child, <picture> is invalid HTML and produces no output. The alt attribute must be on the <img>, not the <source> elements—it applies regardless of which source is selected.

## Code Review

Review image assets, markup, and delivery configuration related to Use <picture> with an <img> fallback. Flag exact files or components where format choice, sizing, or loading behavior violates the rule, and describe how to confirm the fix in DevTools.

---

For full implementation details, code examples, and framework-specific guidance,
see `references/rule.md`.

Rule page: https://frontendchecklist.io/rules/images/picture-element
