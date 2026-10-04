---
name: pwa-installability
description: "Use when auditing PWA readiness, adding an install prompt, or preparing a web app for submission to Microsoft Store or Google Play via PWA Builder."
metadata:
  category: html
  priority: low
  difficulty: intermediate
  estimatedTime: "30"
  source: frontendchecklist.io
  url: https://frontendchecklist.io/rules/html/pwa-installability
---

# Meet PWA installability criteria

Installable PWAs appear in the browser's address bar install prompt and in app stores, giving users a native-app experience without an app store listing. Studies consistently show that installed PWAs have higher engagement and retention than browser-only equivalents — users who install spend 3× more time in the app on average.

## Quick Reference

- Serve the app over HTTPS (required by browsers)
- Link a valid web app manifest with name, icons, start_url, and display
- Provide a 192×192 and 512×512 icon; add a maskable variant for Android
- Register a service worker that responds with 200 when offline

## Check

Check whether this site meets the PWA installability criteria: HTTPS, valid manifest, service worker, and appropriate icons.

## Fix

Add or fix the web app manifest, ensure a service worker is registered, and provide correctly sized maskable icons.

## Explain

Explain what makes a web app installable as a PWA and what the manifest display modes mean for the user experience.

## Code Review

Review the manifest.json and icon assets. Flag missing required fields, incorrect icon sizes, absent maskable icons, and any mismatch between start_url and the actual app root.

---

For full implementation details, code examples, and framework-specific guidance,
see `references/rule.md`.

Rule page: https://frontendchecklist.io/rules/html/pwa-installability
