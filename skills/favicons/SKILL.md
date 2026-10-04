---
name: favicons
description: "Use when reviewing templates, rendered HTML, or shared components related to Implement favicons for all devices. Validate the final browser-facing markup, not just the source framework abstraction."
metadata:
  category: html
  priority: medium
  difficulty: intermediate
  estimatedTime: "20"
  source: frontendchecklist.io
  url: https://frontendchecklist.io/rules/html/favicons
---

# Implement favicons for all devices

Missing or low-quality favicons make sites look unprofessional in browser tabs, bookmarks, and home screens—damaging brand recognition and user trust.

## Quick Reference

- Minimum: favicon.ico (32x32) + apple-touch-icon.png (180x180)
- Modern: SVG favicon with dark mode support
- PWA: Include in manifest.json with multiple sizes
- Use RealFaviconGenerator or favicons npm package

## Check

Verify that all necessary favicon formats and sizes are implemented correctly for optimal display across different browsers, devices, and platforms.

## Fix

Generate and implement a complete favicon set including ICO, PNG, SVG, and mobile/PWA icons with proper HTML declarations.

## Explain

Explain how proper favicon implementation improves brand recognition, user experience, and ensures consistent display across all browsers and devices.

## Code Review

Review templates, server-rendered HTML, and shared components that output markup related to Implement favicons for all devices. Flag exact elements, attributes, and routes where the rendered HTML violates the rule.

---

For full implementation details, code examples, and framework-specific guidance,
see `references/rule.md`.

Rule page: https://frontendchecklist.io/rules/html/favicons
