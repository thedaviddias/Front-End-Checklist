---
name: critical-images
description: "Use when reviewing image assets, markup, and CDN or build transforms related to Prioritize loading critical images. Check encoded size, rendered size, loading strategy, and above-the-fold impact together."
metadata:
  category: images
  priority: high
  difficulty: beginner
  estimatedTime: "15"
  source: frontendchecklist.io
  url: https://frontendchecklist.io/rules/images/critical-images
---

# Prioritize loading critical images

The Largest Contentful Paint (LCP) is often an image—prioritizing its load can improve LCP by 20-40%, directly impacting Core Web Vitals and SEO.

## Quick Reference

- Use fetchpriority='high' on LCP images
- Preload hero images in document head
- Remove loading='lazy' from above-the-fold images
- Critical images directly impact LCP Core Web Vital

## Check

Identify which images are critical for initial render and ensure they load with high priority.

## Fix

Add fetchpriority='high' to critical images and use preload for hero images.

## Explain

Explain how prioritizing critical images improves Largest Contentful Paint (LCP).

## Code Review

Review image assets, markup, and delivery configuration related to Prioritize loading critical images. Flag exact files or components where format choice, sizing, or loading behavior violates the rule, and describe how to confirm the fix in DevTools.

---

For full implementation details, code examples, and framework-specific guidance,
see `references/rule.md`.

Rule page: https://frontendchecklist.io/rules/images/critical-images
