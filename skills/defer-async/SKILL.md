---
name: defer-async
description: "Use when reviewing templates, rendered HTML, or shared components related to Load scripts with defer, async, or type=module. Validate the final browser-facing markup, not just the source framework abstraction."
metadata:
  category: html
  priority: high
  difficulty: beginner
  estimatedTime: "15"
  source: frontendchecklist.io
  url: https://frontendchecklist.io/rules/html/defer-async
---

# Load scripts with defer, async, or type=module

A plain &lt;script&gt; tag in the document head blocks all HTML parsing until the script downloads, parses, and executes. On a slow network this can add seconds of white-screen time before any content renders. defer and async allow the browser to continue parsing HTML while the script downloads, reducing Time to First Contentful Paint dramatically.

## Quick Reference

- defer downloads in parallel and executes after HTML parsing, in order — use for most scripts
- async downloads in parallel and executes immediately when ready — use for independent scripts
- type=module always defers and enables ES module syntax
- Never place scripts in <head> without defer or async

## Check

Find all script tags in this HTML file. Flag any in the <head> without defer or async, and any at the bottom of <body> that could be in <head> with defer.

## Fix

Add defer or async to script tags in the document head, or convert to type=module where ES modules are used.

## Explain

Explain the difference between defer, async, and type=module script loading, and when to use each.

## Code Review

Review templates, server-rendered HTML, and shared components that output markup related to Load scripts with defer, async, or type=module. Flag exact elements, attributes, and routes where the rendered HTML violates the rule.

---

For full implementation details, code examples, and framework-specific guidance,
see `references/rule.md`.

Rule page: https://frontendchecklist.io/rules/html/defer-async
