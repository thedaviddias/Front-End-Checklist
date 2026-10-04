---
name: cross-browser-testing
description: "Use when reviewing CI coverage, automated checks, or test strategy related to Test across all major browsers. Focus on whether the rule is continuously verified, not just documented."
metadata:
  category: testing
  priority: high
  difficulty: intermediate
  estimatedTime: "60"
  source: frontendchecklist.io
  url: https://frontendchecklist.io/rules/testing/cross-browser-testing
---

# Test across all major browsers

Users access your site from different browsers, each with unique rendering engines. Without cross-browser testing, a significant portion of users may experience broken layouts, missing features, or complete failures.

## Quick Reference

- Test on Chrome, Firefox, Safari, and Edge at minimum
- Use automated tools like Playwright or BrowserStack for CI testing
- Check CSS features with caniuse.com before using
- Test on both desktop and mobile versions of browsers
- Document and gracefully handle unsupported features

## Check

Verify that this website works correctly across major browsers (Chrome, Firefox, Safari, Edge).

## Fix

Fix browser-specific issues and ensure consistent experience across different browsers.

## Explain

Explain the importance of testing across browsers to ensure all users have a good experience.

## Code Review

Review tests, CI workflows, and enforcement points related to Test across all major browsers. Flag exact gaps where the rule is not automatically verified or where failures do not block regressions.

---

For full implementation details, code examples, and framework-specific guidance,
see `references/rule.md`.

Rule page: https://frontendchecklist.io/rules/testing/cross-browser-testing
