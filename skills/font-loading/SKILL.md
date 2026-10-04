---
name: font-loading
description: "Use when auditing slow page loads, heavy assets, or rendering delays related to Optimize web font loading. Verify the actual bottleneck in DevTools, Lighthouse, or field data before recommending changes."
metadata:
  category: performance
  priority: high
  difficulty: intermediate
  estimatedTime: "15"
  source: frontendchecklist.io
  url: https://frontendchecklist.io/rules/performance/font-loading
---

# Optimize web font loading

Slow font loading can cause 'Flash of Invisible Text' (FOIT) or significant layout shifts, negatively impacting both user experience and Core Web Vitals.

## Quick Reference

- Use `font-display: swap` to prevent invisible text during load
- Preload critical fonts to discover them earlier
- Use modern formats like WOFF2 for better compression

## Check

Check font loading strategies and verify that `font-display` is used and critical fonts are preloaded.

## Fix

Add `font-display: swap` to `@font-face` declarations and use `<link rel='preload'>` for the most important fonts.

## Explain

Explain how font loading affects perceived performance and layout stability.

## Code Review

Review the routes, assets, and loading behavior that affect Optimize web font loading. Flag exact files, requests, or rendering steps that add unnecessary network, CPU, or layout cost, and describe the measurement method used to confirm the issue.

---

For full implementation details, code examples, and framework-specific guidance,
see `references/rule.md`.

Rule page: https://frontendchecklist.io/rules/performance/font-loading
