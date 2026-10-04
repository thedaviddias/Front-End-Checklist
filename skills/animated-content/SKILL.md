---
name: animated-content
description: "Use when auditing slow page loads, heavy assets, or rendering delays related to Convert animated GIFs to video. Verify the actual bottleneck in DevTools, Lighthouse, or field data before recommending changes."
metadata:
  category: performance
  priority: medium
  difficulty: intermediate
  estimatedTime: "10"
  source: frontendchecklist.io
  url: https://frontendchecklist.io/rules/performance/animated-content
---

# Convert animated GIFs to video

Large animated GIFs can significantly increase page weight and consume excessive CPU/memory, leading to slower page loads and poor scrolling performance.

## Quick Reference

- Use `<video>` instead of large GIFs for animations
- GIFs are significantly larger than MP4/WebM
- Videos allow for better control and performance

## Check

Check for large animated GIFs that could be replaced with more efficient video formats like MP4 or WebM.

## Fix

Convert animated GIFs to MP4 or WebM and use the `<video>` tag with `autoplay`, `loop`, `muted`, and `playsinline` attributes.

## Explain

Explain why video formats are more efficient than GIFs for animated content and how they improve performance.

## Code Review

Review the routes, assets, and loading behavior that affect Convert animated GIFs to video. Flag exact files, requests, or rendering steps that add unnecessary network, CPU, or layout cost, and describe the measurement method used to confirm the issue.

---

For full implementation details, code examples, and framework-specific guidance,
see `references/rule.md`.

Rule page: https://frontendchecklist.io/rules/performance/animated-content
