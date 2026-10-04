---
name: web-app-manifest
description: "Use when reviewing templates, rendered HTML, or shared components related to Link a Web App Manifest for installability. Validate the final browser-facing markup, not just the source framework abstraction."
metadata:
  category: html
  priority: medium
  difficulty: beginner
  estimatedTime: "20"
  source: frontendchecklist.io
  url: https://frontendchecklist.io/rules/html/web-app-manifest
---

# Link a Web App Manifest for installability

A Web App Manifest is the minimum requirement for a site to be installable as a Progressive Web App. Installed PWAs launch in their own window, appear in app switchers, and can receive push notifications. Even for non-PWA sites, the manifest improves the experience when users bookmark to their home screen and provides metadata for browser share dialogs.

## Quick Reference

- Link manifest.json with <link rel="manifest" href="/manifest.json">
- Include name, short_name, icons (192px and 512px minimum), and start_url
- Set display: standalone to hide browser chrome when launched from home screen
- Set theme_color to control the browser address bar and OS taskbar color

## Check

Check if this HTML file has a Web App Manifest linked. If so, verify the manifest has all required fields for installability.

## Fix

Create a minimal Web App Manifest with the required fields and link it from the HTML head.

## Explain

Explain the Web App Manifest format, which fields are required for installability, and how icons work across different platforms.

## Code Review

Review templates, server-rendered HTML, and shared components that output markup related to Link a Web App Manifest for installability. Flag exact elements, attributes, and routes where the rendered HTML violates the rule.

---

For full implementation details, code examples, and framework-specific guidance,
see `references/rule.md`.

Rule page: https://frontendchecklist.io/rules/html/web-app-manifest
