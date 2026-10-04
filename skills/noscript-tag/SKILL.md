---
name: noscript-tag
description: "Use when reviewing templates, rendered HTML, or shared components related to Provide noscript fallback content. Validate the final browser-facing markup, not just the source framework abstraction."
metadata:
  category: html
  priority: medium
  difficulty: beginner
  estimatedTime: "10"
  source: frontendchecklist.io
  url: https://frontendchecklist.io/rules/html/noscript-tag
---

# Provide noscript fallback content

Users with JavaScript disabled, blocked by corporate firewalls, or with failed script loads see blank pages without proper noscript fallbacks.

## Quick Reference

- Add <noscript> with helpful message for JS-dependent features
- Provide alternative content, not just 'Enable JavaScript'
- Use for critical features: analytics fallback, lazy-loaded images
- Consider progressive enhancement: content works without JS
- Important content should be present in the initial HTML, not fetched only after hydration

## Check

Verify that this page provides appropriate noscript fallbacks for users with JavaScript disabled or unavailable, ensuring core functionality remains accessible. Confirm important content exists in the initial HTML and is not blocked on hydration.

## Fix

Add noscript elements with alternative content or functionality for critical features that depend on JavaScript. Replace UA-sniffed behavior with feature detection and make sure the server-rendered HTML already contains the important content and pagination paths.

## Explain

Explain why noscript fallbacks are important for accessibility, progressive enhancement, and ensuring your site works for all users regardless of their JavaScript support. Explain why feature detection is safer than UA sniffing and why hydration mismatches can break progressive enhancement.

## Code Review

Review templates, server-rendered HTML, and shared components that output markup related to Provide noscript fallback content. Flag exact elements, attributes, and routes where the rendered HTML violates the rule.

---

For full implementation details, code examples, and framework-specific guidance,
see `references/rule.md`.

Rule page: https://frontendchecklist.io/rules/html/noscript-tag
