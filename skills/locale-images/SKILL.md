---
name: locale-images
description: "Use when reviewing image assets, icon libraries, or components that render illustrations to identify culture-specific content that may need locale overrides or replacement with neutral alternatives."
metadata:
  category: i18n
  priority: low
  difficulty: beginner
  estimatedTime: "20"
  source: frontendchecklist.io
  url: https://frontendchecklist.io/rules/i18n/locale-images
---

# Use locale-neutral images and provide cultural overrides when needed

Images that feel natural in one culture can be confusing or offensive in another — a thumbs-up is a vulgar gesture in parts of the Middle East and West Africa, and a checkmark means "wrong" in Japan. Choosing neutral visuals by default and providing targeted overrides avoids unintentional offence and keeps the image management surface small.

## Quick Reference

- Hand gestures, colors, and common symbols carry different meanings across cultures
- Prefer abstract or universally understood icons as the default
- When locale-specific images are required use a lookup map with a neutral fallback
- Never embed text inside images — it cannot be translated or resized

## Check

Identify image assets, SVG icons, and illustration components that use hand gestures, color symbolism, animals, or religious imagery that may carry different meanings across cultures or locales.

## Fix

Replace culturally specific images with locale-neutral alternatives where possible, and implement a locale-aware image lookup with a neutral fallback for images that must vary by region.

## Explain

Explain why culturally specific imagery causes problems for international audiences and how a locale-image lookup pattern provides targeted overrides without requiring a separate asset for every locale.

## Code Review

Review React components and asset pipelines for hardcoded image paths, hand gesture icons, flag icons used to represent languages, and any image that contains embedded text. Flag each as a potential localization concern.

---

For full implementation details, code examples, and framework-specific guidance,
see `references/rule.md`.

Rule page: https://frontendchecklist.io/rules/i18n/locale-images
