---
name: css-critical
description: "Use when reviewing stylesheets, component styles, and responsive behavior related to Inline critical CSS for faster rendering. Check the rendered layout across breakpoints and interaction states before proposing a fix."
metadata:
  category: css
  priority: high
  difficulty: advanced
  estimatedTime: "30"
  source: frontendchecklist.io
  url: https://frontendchecklist.io/rules/css/css-critical
---

# Inline critical CSS for faster rendering

Critical CSS eliminates render-blocking resources, enabling browsers to paint content immediately—directly improving LCP and FCP scores.

## Quick Reference

- Inline ~14KB of critical above-the-fold CSS in <head>
- Use tools: critical, critters, or Lighthouse to extract
- Load remaining CSS asynchronously after page load
- Automate in build process—don't manually maintain

## Check

Analyze this page's CSS loading strategy to identify critical above-the-fold styles that should be inlined and non-critical styles that can be loaded asynchronously.

## Fix

Extract and inline critical CSS for above-the-fold content, then load remaining CSS asynchronously to improve initial page render performance.

## Explain

Explain how critical CSS improves Core Web Vitals by reducing render-blocking resources and enabling faster First Contentful Paint and Largest Contentful Paint.

## Code Review

Review stylesheets, component styles, and responsive states related to Inline critical CSS for faster rendering. Flag exact selectors, declarations, or breakpoints that violate the rule in the rendered UI.

---

For full implementation details, code examples, and framework-specific guidance,
see `references/rule.md`.

Rule page: https://frontendchecklist.io/rules/css/css-critical
