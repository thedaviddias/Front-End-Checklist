---
name: dimensions
description: "Use when reviewing image assets, markup, and CDN or build transforms related to Set explicit width and height on images. Check encoded size, rendered size, loading strategy, and above-the-fold impact together. Separate real CLS risks from tiny decorative SVGs or ornament-only assets that are unlikely to move surrounding content."
metadata:
  category: images
  priority: high
  difficulty: beginner
  estimatedTime: "10"
  source: frontendchecklist.io
  url: https://frontendchecklist.io/rules/images/dimensions
---

# Set explicit width and height on images

Images without explicit dimensions are the most common cause of Cumulative Layout Shift (CLS), a Core Web Vitals metric. When images load and cause layout jumps, users accidentally click the wrong element—a frustrating experience that Google penalises in search rankings. A CLS score above 0.1 is considered 'needs improvement'; above 0.25 is 'poor'.

## Quick Reference

- Reserve findings for meaningful content images; decorative micro-SVGs or ornament-only assets are low-priority exceptions when CSS already reserves stable space
- Example low-risk exception: `<img src="/divider.svg" alt="" aria-hidden="true">` should not be flagged on its own without evidence of visible layout shift
- Always set `width` and `height` attributes on `<img>` matching the image's intrinsic dimensions
- Pair with `height: auto` in CSS to keep the image fluid while preserving the aspect ratio
- Missing dimensions are the leading cause of Cumulative Layout Shift (CLS) from images
- Browsers derive `aspect-ratio` from these attributes—do not set arbitrary placeholder values

## Check

Scan all <img> elements in the codebase. Identify any that are missing either the width or height attribute. Also check <source> elements inside <picture>—dimensions should be on the <img> fallback. Report each image missing dimensions with its file path and line number. Note: SVG icons under 32px, tiny decorative SVG ornaments with stable CSS sizing, and images loaded as CSS backgrounds are exempt.

## Fix

For each <img> missing width/height: 1) Add the intrinsic pixel dimensions as attributes (e.g., width="800" height="450"). 2) Use CSS max-width: 100% and height: auto on the element to keep it responsive. 3) The attribute values must match the image's intrinsic aspect ratio—do not set arbitrary numbers. 4) For dynamically sized images, calculate the aspect ratio and use the CSS aspect-ratio property as a fallback. 5) Skip purely decorative micro assets when the snippet already shows stable sizing and there is no evidence of layout shift risk. Show the before and after HTML for each fixed image.

## Explain

Explain why width and height attributes on <img> prevent Cumulative Layout Shift (CLS). When a browser parses HTML, it does not yet know an image's dimensions—without explicit attributes, the browser initially renders a 0-height placeholder, then jumps the layout when the image loads. With width and height set, the browser calculates the aspect ratio from the attributes and reserves space immediately, eliminating the shift. This became especially important as modern browsers use the aspect-ratio CSS property derived from these HTML attributes.

## Code Review

Review image assets, markup, and delivery configuration related to Set explicit width and height on images. Flag exact files or components where format choice, sizing, or loading behavior violates the rule, and describe how to confirm the fix in DevTools.

---

For full implementation details, code examples, and framework-specific guidance,
see `references/rule.md`.

Rule page: https://frontendchecklist.io/rules/images/dimensions
