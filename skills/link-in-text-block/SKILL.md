---
name: link-in-text-block
description: "Use when applies to hyperlinks (`<a>` elements) that appear inline within paragraphs or text blocks. Does not apply to navigation menus, button-style links, or standalone links that are visually isolated from body text. Use when reviewing CSS that removes text-decoration from inline body copy links."
metadata:
  category: accessibility
  priority: medium
  difficulty: intermediate
  estimatedTime: "10"
  source: frontendchecklist.io
  url: https://frontendchecklist.io/rules/accessibility/link-in-text-block
---

# Make links in text blocks visually distinguishable

Approximately 8% of men and 0.5% of women have color vision deficiency (red-green being most common). If links are distinguished only by a color like blue or red, these users may not identify them as links and miss critical navigation or reference information. The underline is a universal, color-independent signal understood across cultures and vision abilities. Removing underlines is a common design trend that disproportionately affects users with low vision and cognitive disabilities.

## Quick Reference

- Color must not be the only visual means of distinguishing links from surrounding text — WCAG 2.1 SC 1.4.1 (Use of Color)
- Option 1: Underline links (the browser default and most robust approach)
- Option 2: If no underline, the link color must have ≥ 3:1 contrast ratio against surrounding body text AND ≥ 4.5:1 against the background
- Focus and hover states must also maintain distinguishability
- Applies only to links embedded within paragraphs/text blocks; standalone navigation links have different requirements

## Check

Find all `<a>` elements within text-heavy containers (paragraphs, article body, list items containing prose). Check the CSS applied: if `text-decoration: none` or `text-decoration: underline` is removed, verify that the link color has at least 3:1 contrast ratio against the surrounding non-link text color AND at least 4.5:1 against the background. Also check `:hover` and `:focus` states for a non-color visual change (underline appearing, outline, background change).

## Fix

The simplest fix is to restore `text-decoration: underline` on inline text links within body copy — this is the most widely understood and color-independent link indicator. If the design requires no underline: calculate the contrast between link color and body text color using the WCAG relative luminance formula; it must be ≥ 3:1. Add a non-color visual change on `:hover` and `:focus` (e.g., underline appears, font-weight changes, or background-color is added).

## Explain

WCAG 2.1 SC 1.4.1 (Use of Color, Level A) states that color must not be the sole visual means of conveying information, indicating an action, prompting a response, or distinguishing a visual element. For links within text, this means a user who cannot perceive the link color must still be able to identify the link. The WCAG technique G183 specifies that a 3:1 contrast ratio between link and surrounding text, combined with a non-color hover/focus cue, is a sufficient technique. The browser default underline satisfies SC 1.4.1 on its own.

## Code Review

Review the rendered markup and interactive states that affect Make links in text blocks visually distinguishable. Flag exact elements, roles, labels, focus behavior, or keyboard interactions that violate the rule, and note how to verify the fix with browser accessibility tooling or assistive tech.

---

For full implementation details, code examples, and framework-specific guidance,
see `references/rule.md`.

Rule page: https://frontendchecklist.io/rules/accessibility/link-in-text-block
