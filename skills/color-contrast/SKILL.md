---
name: color-contrast
description: "Use when applies to all visible text and text images, UI component borders (input fields, buttons), focus indicators, icons that convey meaning, and graphical objects required to understand content. Does not apply to inactive/disabled UI components or purely decorative elements."
metadata:
  category: accessibility
  priority: high
  difficulty: intermediate
  estimatedTime: "15"
  source: frontendchecklist.io
  url: https://frontendchecklist.io/rules/accessibility/color-contrast
---

# Meet minimum color contrast ratios

Approximately 1 in 12 men and 1 in 200 women have some form of color vision deficiency. Low contrast text is also difficult for users with low vision, aging eyesight, or those reading in bright sunlight. Insufficient contrast is one of the most common WCAG failures and directly prevents users from reading content they need.

## Quick Reference

- Normal text (< 18pt or < 14pt bold): minimum contrast ratio of 4.5:1 — WCAG 2.1 SC 1.4.3 Level AA
- Large text (≥ 18pt / 24px, or ≥ 14pt bold / ~18.67px bold): minimum 3:1 contrast ratio
- Non-text UI components (icons, focus indicators, input borders): minimum 3:1 against adjacent color — WCAG 2.1 SC 1.4.11 Level AA
- WCAG 2.1 SC 1.4.6 (Level AAA) requires 7:1 for normal text and 4.5:1 for large text
- Decorative text and logotypes are exempt from contrast requirements

## Check

Evaluate the contrast ratio between text color and its background for all text on the page. Use the WCAG relative luminance formula: for normal text (< 18pt or < 14pt bold), the ratio must be ≥ 4.5:1; for large text (≥ 18pt or ≥ 14pt bold), the ratio must be ≥ 3:1. Also check non-text UI components (input borders, button outlines, icons) for ≥ 3:1 ratio against adjacent colors per WCAG 2.1 SC 1.4.11. Check all interactive states: default, hover, focus, active, and visited.

## Fix

Darken the foreground color or lighten/darken the background color until the ratio meets the minimum. For normal text failing 4.5:1: increase text darkness or background lightness. For large text failing 3:1: apply same approach with a lower threshold. Use a contrast checker tool (WebAIM, browser DevTools accessibility panel) to verify the exact ratio. Do not use opacity to lighten text — compute the effective blended color and check that ratio instead.

## Explain

WCAG 2.1 SC 1.4.3 (Contrast Minimum, Level AA) requires a contrast ratio of at least 4.5:1 for normal text and 3:1 for large text (≥ 18pt regular or ≥ 14pt bold). Contrast ratio is calculated from the relative luminance of the foreground and background colors using the formula (L1 + 0.05) / (L2 + 0.05), where L1 is the lighter and L2 is the darker color. A ratio of 1:1 means no contrast (same color); 21:1 is maximum (black on white). Users with low vision, cataracts, or color blindness rely on high contrast to distinguish text from its background.

## Code Review

Review the rendered markup and interactive states that affect Meet minimum color contrast ratios. Flag exact elements, roles, labels, focus behavior, or keyboard interactions that violate the rule, and note how to verify the fix with browser accessibility tooling or assistive tech.

---

For full implementation details, code examples, and framework-specific guidance,
see `references/rule.md`.

Rule page: https://frontendchecklist.io/rules/accessibility/color-contrast
