---
name: js-redirects
description: "Use when auditing slow page loads, heavy assets, or rendering delays related to Avoid JavaScript-based redirects. Verify the actual bottleneck in DevTools, Lighthouse, or field data before recommending changes."
metadata:
  category: performance
  priority: medium
  difficulty: intermediate
  estimatedTime: "10"
  source: frontendchecklist.io
  url: https://frontendchecklist.io/rules/performance/js-redirects
---

# Avoid JavaScript-based redirects

JavaScript redirects force an additional round-trip after the initial page load, significantly increasing the time users spend waiting for content.

## Quick Reference

- Use 301 or 302 server-side redirects instead of `window.location`
- JS redirects delay page load as the browser must first download and execute the script
- Client-side redirects can negatively impact SEO and indexability

## Check

Check the project for instances where JavaScript is being used for page-level redirects (e.g., window.location).

## Fix

Replace JavaScript-based redirects with server-side 301 or 302 redirects in your web server or edge configuration.

## Explain

Explain why server-side redirects are faster and more SEO-friendly than client-side JavaScript redirects.

## Code Review

Review the routes, assets, and loading behavior that affect Avoid JavaScript-based redirects. Flag exact files, requests, or rendering steps that add unnecessary network, CPU, or layout cost, and describe the measurement method used to confirm the issue.

---

For full implementation details, code examples, and framework-specific guidance,
see `references/rule.md`.

Rule page: https://frontendchecklist.io/rules/performance/js-redirects
