---
name: import-on-visibility
description: "Use when reviewing long pages, dashboards, or content feeds with expensive offscreen modules. Balance early enough loading for smooth scrolling against keeping the initial route light."
metadata:
  category: performance
  priority: high
  difficulty: intermediate
  estimatedTime: "20"
  source: frontendchecklist.io
  url: https://frontendchecklist.io/rules/performance/import-on-visibility
---

# Load non-critical code when content approaches the viewport

Many pages ship JavaScript for offscreen sections that a user may never reach. Import-on-visibility keeps the initial route lighter while still loading content early enough to feel ready when users scroll to it.

## Quick Reference

- Use Intersection Observer to start loading code before an offscreen section becomes visible
- Reserve space with placeholders or skeletons so deferred sections do not cause layout shift
- Tune `rootMargin` so heavy content loads early enough without competing with above-the-fold work
- Use this for charts, reviews, related products, embeds, and offscreen dashboards

## Check

Identify components, widgets, or modules that load on first render even though they only appear after the user scrolls. Flag which ones can switch to visibility-based loading.

## Fix

Use Intersection Observer or an equivalent framework primitive to load the offscreen component or dependency when it approaches the viewport, while preserving layout stability and a clear placeholder.

## Explain

Explain import-on-visibility, how it differs from import-on-interaction, and how viewport-based loading helps large pages stay fast.

## Code Review

Inspect scroll-triggered sections, embeds, charts, recommendation modules, and long landing pages. Flag code that is bundled eagerly even though the corresponding UI stays offscreen until later, and verify the deferred version still loads before the user reaches it.

---

For full implementation details, code examples, and framework-specific guidance,
see `references/rule.md`.

Rule page: https://frontendchecklist.io/rules/performance/import-on-visibility
