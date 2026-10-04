---
name: alt-text
description: "Use when reviewing image assets, markup, and CDN or build transforms related to Provide meaningful alt text for images. Check encoded size, rendered size, loading strategy, and above-the-fold impact together."
metadata:
  category: images
  priority: critical
  difficulty: beginner
  estimatedTime: "15"
  source: frontendchecklist.io
  url: https://frontendchecklist.io/rules/images/alt-text
---

# Provide meaningful alt text for images

Approximately 2.2 billion people worldwide have vision impairment. Screen readers read the alt attribute aloud—without meaningful alt text, users who are blind receive no information about image content. Missing alt text also fails WCAG 2.1 Success Criterion 1.1.1, which is a Level A (minimum) requirement. Search engines also rely on alt text to index image content.

## Quick Reference

- Every `<img>` must have an `alt` attribute—omitting it entirely violates WCAG 2.1 SC 1.1.1
- Decorative images use `alt=""` so screen readers ignore them
- Alt text should describe the image's *purpose*, not just its appearance
- Linked images: alt describes the link destination, not the visual

## Check

Scan all <img> elements in the codebase. Verify: 1) Every <img> has an alt attribute (missing alt is an error). 2) Decorative images use alt="". 3) Informative images have descriptive text that conveys the image's meaning—not just its file name. 4) Images that are links describe the destination. 5) Images of text reproduce the text in alt. Flag any <img> without alt, with alt matching the filename (e.g., alt="photo1.jpg"), or with generic values like alt="image" or alt="photo".

## Fix

For each image missing or with poor alt text: 1) Informative images—describe what the image conveys, not just what it shows (e.g., alt="Bar chart showing 40% increase in sales Q3 2024" not alt="chart"). 2) Decorative images—add alt="" so screen readers skip them. 3) Linked images—describe the link destination (e.g., alt="Visit our Twitter profile"). 4) Images of text—copy the text verbatim into alt. 5) Complex images (charts, infographics)—provide a short alt plus a longer description via aria-describedby or a visible caption.

## Explain

Explain WCAG 2.1 Success Criterion 1.1.1 Non-text Content: every image must have a text alternative. Screen readers announce the alt attribute aloud—without it, users who are blind or have low vision cannot understand the page. Bad alt text (like alt="image") is no better than no alt text. Decorative images must use alt="" explicitly so screen readers skip them entirely—omitting alt causes some screen readers to announce the filename.

## Code Review

Review image assets, markup, and delivery configuration related to Provide meaningful alt text for images. Flag exact files or components where format choice, sizing, or loading behavior violates the rule, and describe how to confirm the fix in DevTools.

---

For full implementation details, code examples, and framework-specific guidance,
see `references/rule.md`.

Rule page: https://frontendchecklist.io/rules/images/alt-text
