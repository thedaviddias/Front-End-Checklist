---
name: color-oklch
description: "Use when building a design token system, creating accessible colour palettes, generating colour ramps programmatically, or migrating a design system to support wide-gamut displays."
metadata:
  category: css
  priority: low
  difficulty: intermediate
  estimatedTime: "20"
  source: frontendchecklist.io
  url: https://frontendchecklist.io/rules/css/color-oklch
---

# Use oklch() and oklab() for perceptually uniform colour palettes

HSL and hex colours are defined in the sRGB colour space, which is not perceptually uniform — a 10 % lightness change looks dramatically different depending on the hue. This makes creating accessible, harmonious palettes by hand extremely difficult. oklch corrects this: adjusting the L channel produces the same perceived brightness change regardless of hue or chroma, making it far easier to build accessible colour ramps, dark-mode palettes, and consistent hover/active states.

## Quick Reference

- oklch(L C H) — Lightness, Chroma, Hue — is the most practical perceptually uniform colour space for design systems
- Equal lightness steps in oklch look equal to the human eye; equal steps in hsl do not
- Define your colour palette tokens in oklch custom properties
- Use @media (color-gamut: p3) to serve wide-gamut colours to capable displays

## Check

Check whether the CSS colour tokens use oklch() or a perceptually uniform colour space, or whether they use hsl/hex which may produce inconsistent perceived lightness across hues.

## Fix

Convert the colour token palette from hsl/hex to oklch, ensuring the lightness (L) axis is consistent across all hues in the same shade step.

## Explain

Explain what perceptual uniformity means in colour spaces, why oklch is better than hsl for design systems, and how the L, C, H channels map to human colour perception.

## Code Review

Review CSS custom properties for colour tokens. Flag palette definitions in hsl or hex that use hardcoded values without a systematic lightness ramp, especially if they are intended to be interchangeable shade steps.

---

For full implementation details, code examples, and framework-specific guidance,
see `references/rule.md`.

Rule page: https://frontendchecklist.io/rules/css/color-oklch
