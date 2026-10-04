---
name: figure-figcaption
description: "Use when reviewing image assets, markup, and CDN or build transforms related to Use <figure> and <figcaption> for image captions. Check encoded size, rendered size, loading strategy, and above-the-fold impact together."
metadata:
  category: images
  priority: medium
  difficulty: beginner
  estimatedTime: "10"
  source: frontendchecklist.io
  url: https://frontendchecklist.io/rules/images/figure-figcaption
---

# Use <figure> and <figcaption> for image captions

Using a `<p>` tag as a caption is invisible to assistive technology as an image description. The `<figure>`/`<figcaption>` pattern creates a machine-readable relationship between an image and its caption, which screen readers surface to users. It also communicates to search engines that the caption describes the image, supporting image SEO.

## Quick Reference

- Wrap image + visible caption pairs in `<figure>` with `<figcaption>` as a direct child
- `<figcaption>` must be the first or last child of `<figure>`
- Do not duplicate alt text in figcaption—alt is the fallback, figcaption is the visible description
- `<figure>` is appropriate for images, code blocks, diagrams, and charts—not every image

## Check

Scan the codebase for images with adjacent visible text that acts as a caption (e.g., a <p> or <span> immediately below an <img> describing it). Verify: 1) Such image-caption pairs are wrapped in <figure>. 2) The caption text is inside a <figcaption> element. 3) <figcaption> is a direct child of <figure>. 4) The alt text on the <img> is not identical to the <figcaption> text—they serve different purposes. Flag any <img> followed by descriptive text that is not structured as figure/figcaption.

## Fix

For each image with an adjacent caption: 1) Wrap the <img> and its caption text in a <figure> element. 2) Move the caption text into a <figcaption> element inside <figure>. 3) Review the <img> alt attribute—if the figcaption already fully describes the image for sighted users, the alt can be shorter or empty (alt="") only if the figcaption alone is sufficient for screen readers too; otherwise keep a concise alt. 4) Position <figcaption> as the first or last child of <figure>. Show the corrected HTML.

## Explain

Explain the semantic meaning of <figure> and <figcaption>. The <figure> element represents self-contained content (an image, code sample, diagram) that is referenced from the main content but could be moved without affecting the document flow. <figcaption> provides a caption or legend for the figure. Screen readers announce the figcaption in association with the figure, giving users context. Without this markup, sighted users see a caption but screen reader users hear only the alt text with no indication that a visible caption exists.

## Code Review

Review image assets, markup, and delivery configuration related to Use <figure> and <figcaption> for image captions. Flag exact files or components where format choice, sizing, or loading behavior violates the rule, and describe how to confirm the fix in DevTools.

---

For full implementation details, code examples, and framework-specific guidance,
see `references/rule.md`.

Rule page: https://frontendchecklist.io/rules/images/figure-figcaption
