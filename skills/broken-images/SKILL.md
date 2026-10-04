---
name: broken-images
description: "Use when reviewing image assets, markup, and CDN or build transforms related to Fix broken images. Check encoded size, rendered size, loading strategy, and above-the-fold impact together."
metadata:
  category: images
  priority: high
  difficulty: beginner
  estimatedTime: "15"
  source: frontendchecklist.io
  url: https://frontendchecklist.io/rules/images/broken-images
---

# Fix broken images

A broken image shows an ugly placeholder icon, breaks visual layouts, and communicates that the site is poorly maintained. If the broken image is the Largest Contentful Paint element, it also harms LCP scores. On e-commerce sites, a missing product image can directly reduce purchase intent.

## Quick Reference

- Broken images show an icon and console error—validate all `<img src>` paths at build time
- Use `onerror` handlers to swap broken `<img>` elements to fallback images
- Set `this.onerror=null` inside the handler to prevent infinite error loops
- Test with DevTools Network tab blocked requests to verify fallback behaviour

## Check

Scan all <img> src attributes and CSS background-image URLs in this codebase. Identify: 1) Any relative or absolute paths that point to files not present in the project. 2) Any <img> elements without an onerror handler or fallback mechanism. 3) Hardcoded external image URLs that may become unavailable. 4) Dynamic image paths constructed from user data without existence checks. Report each broken or potentially broken image with its file path and line number.

## Fix

For each broken image: 1) Correct the file path if the image exists but the path is wrong. 2) Add the missing image asset if it was omitted. 3) For images that may fail at runtime, add an onerror handler: onerror="this.src='/images/fallback.png'; this.onerror=null;". 4) For React/Vue components, implement an onError callback that swaps the src to a placeholder. 5) For external images, consider downloading and self-hosting or using a CDN with fallback. Always set this.onerror=null to prevent infinite error loops.

## Explain

Explain why broken images degrade user experience and how browsers handle them. A 404 response for an image shows the browser's broken-image icon, causes a console error, and—if the image is the LCP element—delays Core Web Vitals metrics. Search engines cannot index missing images, affecting image SEO. Monitoring image errors proactively prevents broken experiences from reaching users.

## Code Review

Review image assets, markup, and delivery configuration related to Fix broken images. Flag exact files or components where format choice, sizing, or loading behavior violates the rule, and describe how to confirm the fix in DevTools.

---

For full implementation details, code examples, and framework-specific guidance,
see `references/rule.md`.

Rule page: https://frontendchecklist.io/rules/images/broken-images
