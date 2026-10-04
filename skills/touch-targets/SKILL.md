---
name: touch-targets
description: "Use when applies to all interactive elements on touchscreen interfaces: buttons, links, checkboxes, radio buttons, form inputs, icon buttons, and menu items. Check CSS for min-width, min-height, width, height, and padding on interactive elements. Particularly important for icon-only buttons (close, delete, share) which are often made too small."
metadata:
  category: accessibility
  priority: medium
  difficulty: intermediate
  estimatedTime: "10"
  source: frontendchecklist.io
  url: https://frontendchecklist.io/rules/accessibility/touch-targets
---

# Provide sufficient touch target size

Motor disabilities such as essential tremor, Parkinson's disease, hemiplegia, and spasticity make it difficult to tap small targets with precision. A 24×24px icon button with no padding requires a fine-motor action that many users simply cannot perform. Insufficient tap target size is one of the most common barriers for users with mobility impairments on mobile and tablet devices. Even users without disabilities benefit from larger targets, reducing accidental activations.

## Quick Reference

- WCAG 2.2 SC 2.5.5 (AAA): touch targets must be at least 44×44 CSS pixels
- WCAG 2.2 SC 2.5.8 (AA, new in WCAG 2.2): targets must be at least 24×24 CSS pixels OR have 24px of spacing from other targets
- Apple HIG recommends 44×44 pt minimum; Google Material Design recommends 48×48 dp minimum
- Use `padding` to enlarge the interactive area without changing the visual size
- Inline text links are exempt from SC 2.5.8

## Check

Find all interactive elements: `<button>`, `<a>`, `<input>`, `<select>`, `<textarea>`, and elements with click/touch event handlers or `role='button'`. For each, compute the rendered bounding box size (including padding). Flag elements whose width or height is less than 24px (WCAG 2.2 AA threshold) or less than 44px (AAA / platform guidelines). Also check spacing: elements smaller than 44px should have at least 24px of clear space from adjacent interactive elements.

## Fix

To increase touch target size without changing visual appearance: (1) Add `padding` to the element — e.g., `padding: 12px` on a button adds 12px to each side of the visual content. (2) Use `min-width` and `min-height` to enforce a floor: `min-width: 44px; min-height: 44px`. (3) For icon-only buttons, use a transparent pseudo-element to extend the hit area: `.icon-btn::before { content: ''; position: absolute; inset: -12px; }` with `position: relative` on the button. (4) Ensure adequate spacing between small targets so users do not accidentally activate the wrong element.

## Explain

WCAG 2.2 introduced SC 2.5.8 (Target Size, Minimum) at Level AA, requiring touch targets to be at least 24×24 CSS pixels or have 24px of offset spacing from neighboring targets. The older SC 2.5.5 (Target Size) at Level AAA recommends 44×44px. These thresholds are based on average human fingertip size (approximately 10mm) and the precision required for touchscreen interaction. Users with tremors or limited dexterity need larger targets because their touch point can deviate by 20–30px from where they intend. The 44px recommendation aligns with Apple's Human Interface Guidelines and Google's Material Design system.

## Code Review

Review the rendered markup and interactive states that affect Provide sufficient touch target size. Flag exact elements, roles, labels, focus behavior, or keyboard interactions that violate the rule, and note how to verify the fix with browser accessibility tooling or assistive tech.

---

For full implementation details, code examples, and framework-specific guidance,
see `references/rule.md`.

Rule page: https://frontendchecklist.io/rules/accessibility/touch-targets
