---
name: decorative-elements
description: "Use when reviewing rendered HTML, interactive components, or design-system patterns related to Hide decorative elements from assistive technology. Check native semantics first, then inspect keyboard behavior, focus flow, accessible names, and screen-reader output where relevant. If an image is clearly decorative, default to no finding unless the snippet shows an actual issue such as broken semantics, focusability, or visible layout instability."
metadata:
  category: accessibility
  priority: medium
  difficulty: beginner
  estimatedTime: "10"
  source: frontendchecklist.io
  url: https://frontendchecklist.io/rules/accessibility/decorative-elements
---

# Hide decorative elements from assistive technology

Screen readers announce every image and icon—decorative elements clutter the experience with meaningless 'image, decorative border, image, bullet' announcements.

## Quick Reference

- Use alt='' (empty) for decorative images—not alt='image' or missing alt
- Add aria-hidden='true' to decorative SVGs and icons
- Use CSS background-image for purely decorative visuals
- Role='presentation' removes semantic meaning from elements
- Do not automatically raise performance findings on decorative micro-assets unless the snippet shows real layout instability
- Example safe pattern: `<img src="/divider.svg" alt="" aria-hidden="true">` is usually a decorative no-op, not a finding by itself

## Check

Verify decorative images have empty alt attributes (alt=''), decorative icons use aria-hidden='true', and background images used for decoration are not announced by screen readers. Do not report decorative images as accessibility or performance failures unless the code shows a concrete problem rather than a hypothetical optimization.

## Fix

Add alt='' to decorative img elements. Add aria-hidden='true' to decorative SVGs and icon fonts. Use CSS background-image for purely decorative visuals instead of img elements.

## Explain

Explain how screen readers announce every image and element unless explicitly hidden, and why decorative content clutters the experience for users navigating with assistive technology.

## Code Review

Review the rendered markup and interactive states that affect Hide decorative elements from assistive technology. Flag exact elements, roles, labels, focus behavior, or keyboard interactions that violate the rule, and note how to verify the fix with browser accessibility tooling or assistive tech.

---

For full implementation details, code examples, and framework-specific guidance,
see `references/rule.md`.

Rule page: https://frontendchecklist.io/rules/accessibility/decorative-elements
