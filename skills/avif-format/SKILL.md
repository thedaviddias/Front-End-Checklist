---
name: avif-format
description: "Use when reviewing image assets, markup, and CDN or build transforms related to Use AVIF format for modern browsers. Check encoded size, rendered size, loading strategy, and above-the-fold impact together."
metadata:
  category: images
  priority: medium
  difficulty: intermediate
  estimatedTime: "20"
  source: frontendchecklist.io
  url: https://frontendchecklist.io/rules/images/avif-format
---

# Use AVIF format for modern browsers

AVIF provides the best compression available—50% smaller than JPEG and 20% smaller than WebP—dramatically reducing bandwidth and improving load times.

## Quick Reference

- AVIF offers 50% better compression than JPEG
- Even better than WebP for photographic images
- Use picture element with WebP and JPEG fallbacks
- Browser support: Chrome, Firefox, Safari 16+, Edge

## Check

Check if the website supports AVIF format for even better compression than WebP.

## Fix

Implement AVIF support with proper fallbacks for browsers that don't support it.

## Explain

Explain how AVIF provides 50% better compression than JPEG with superior quality.

## Code Review

Review image assets, markup, and delivery configuration related to Use AVIF format for modern browsers. Flag exact files or components where format choice, sizing, or loading behavior violates the rule, and describe how to confirm the fix in DevTools.

---

For full implementation details, code examples, and framework-specific guidance,
see `references/rule.md`.

Rule page: https://frontendchecklist.io/rules/images/avif-format
