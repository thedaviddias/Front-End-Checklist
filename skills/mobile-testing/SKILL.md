---
name: mobile-testing
description: "Use when reviewing CI coverage, automated checks, or test strategy related to Test on real mobile devices and viewports. Focus on whether the rule is continuously verified, not just documented."
metadata:
  category: testing
  priority: high
  difficulty: intermediate
  estimatedTime: "20"
  source: frontendchecklist.io
  url: https://frontendchecklist.io/rules/testing/mobile-testing
---

# Test on real mobile devices and viewports

More than 55% of global web traffic comes from mobile devices. Mobile browsers have different rendering engines, different font rendering, limited memory, real touch events that differ from mouse events, and system UI (notch, home indicator, keyboard) that intrudes on your layout. Issues like sticky hover states, touch target sizes, and keyboard layout shifts only appear on real devices.

## Quick Reference

- Desktop DevTools device emulation catches layout issues but not real touch behavior
- Test on at least one Android (Chrome) and one iOS (Safari) real device
- Test common viewport breakpoints: 375px (iPhone SE), 390px (iPhone 14), 768px (iPad)
- Use BrowserStack or similar services for testing on devices you don't own

## Check

Does this project have any mobile-specific test configurations? Check for Playwright device emulation, mobile viewport tests, or notes about mobile testing.

## Fix

Add Playwright tests using mobile device presets to cover key user flows on mobile viewports.

## Explain

Explain the difference between DevTools emulation and real device testing, common mobile-specific issues to test for, and how to use Playwright's device emulation.

## Code Review

Review tests, CI workflows, and enforcement points related to Test on real mobile devices and viewports. Flag exact gaps where the rule is not automatically verified or where failures do not block regressions.

---

For full implementation details, code examples, and framework-specific guidance,
see `references/rule.md`.

Rule page: https://frontendchecklist.io/rules/testing/mobile-testing
