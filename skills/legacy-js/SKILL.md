---
name: legacy-js
description: "Use when auditing slow page loads, heavy assets, or rendering delays related to Avoid serving legacy JavaScript to modern browsers. Verify the actual bottleneck in DevTools, Lighthouse, or field data before recommending changes."
metadata:
  category: performance
  priority: medium
  difficulty: intermediate
  estimatedTime: "10"
  source: frontendchecklist.io
  url: https://frontendchecklist.io/rules/performance/legacy-js
---

# Avoid serving legacy JavaScript to modern browsers

Modern browsers can execute ES6+ code faster and more efficiently; serving them transpiled ES5 with polyfills adds unnecessary weight.

## Quick Reference

- Use differential serving (module/nomodule) to target modern and legacy browsers
- Avoid heavy ES5 polyfills for browsers that support ES6+
- Compile code to modern targets to reduce bundle size and improve execution speed

## Check

Analyze the project's JavaScript output to see if modern browsers are being served unnecessary ES5 code and polyfills.

## Fix

Update the build configuration to use differential serving and set a modern target for your primary JavaScript output.

## Explain

Explain how serving ES6+ code to modern browsers improves performance and why transpiling everything to ES5 is no longer recommended.

## Code Review

Review the routes, assets, and loading behavior that affect Avoid serving legacy JavaScript to modern browsers. Flag exact files, requests, or rendering steps that add unnecessary network, CPU, or layout cost, and describe the measurement method used to confirm the issue.

---

For full implementation details, code examples, and framework-specific guidance,
see `references/rule.md`.

Rule page: https://frontendchecklist.io/rules/performance/legacy-js
