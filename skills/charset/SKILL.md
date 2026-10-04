---
name: charset
description: "Use when reviewing templates, rendered HTML, or shared components related to Declare UTF-8 character encoding. Validate the final browser-facing markup, not just the source framework abstraction."
metadata:
  category: html
  priority: critical
  difficulty: beginner
  estimatedTime: "5"
  source: frontendchecklist.io
  url: https://frontendchecklist.io/rules/html/charset
---

# Declare UTF-8 character encoding

Missing or incorrect charset causes mojibake (garbled text), broken special characters, and security vulnerabilities from character encoding attacks.

## Quick Reference

- Add `<meta charset="UTF-8">` as the first element in <head>
- Must appear within the first 1024 bytes of the document
- UTF-8 supports all languages and special characters

## Check

Verify that this HTML document declares UTF-8 character encoding in the head section and that it's positioned early in the document.

## Fix

Add <meta charset="UTF-8"> as the first meta tag in the head section of the HTML document.

## Explain

Explain why UTF-8 character encoding is essential for international content support and preventing character display issues.

## Code Review

Review templates, server-rendered HTML, and shared components that output markup related to Declare UTF-8 character encoding. Flag exact elements, attributes, and routes where the rendered HTML violates the rule.

---

For full implementation details, code examples, and framework-specific guidance,
see `references/rule.md`.

Rule page: https://frontendchecklist.io/rules/html/charset
