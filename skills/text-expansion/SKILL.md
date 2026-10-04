---
name: text-expansion
description: "Use when reviewing CSS for fixed dimensions, truncation, or overflow rules on elements that render translatable strings."
metadata:
  category: i18n
  priority: medium
  difficulty: intermediate
  estimatedTime: "30"
  source: frontendchecklist.io
  url: https://frontendchecklist.io/rules/i18n/text-expansion
---

# Design UI components to accommodate text expansion from translation

Layouts designed only with English copy routinely break when translated: buttons overflow their containers, labels truncate, and navigation items wrap unexpectedly. Catching these issues early with pseudo-locale testing is far cheaper than fixing them after translations are delivered.

## Quick Reference

- German translations are typically 30% longer than English; Finnish 50% longer
- Avoid fixed-width containers for text-bearing elements like buttons and labels
- Use min-inline-size instead of inline-size to allow natural growth
- Test with a pseudo-locale that inflates strings before committing translations
- Include pseudolocalization in CI or preview testing, not just manual QA

## Check

Identify CSS rules and component styles that use fixed widths or hard truncation on elements containing translatable text, which would break when content expands in other languages. Check that the team can test a pseudolocalized build or preview.

## Fix

Replace fixed inline-size with min-inline-size on text containers, remove overflow: hidden from interactive elements, and add a pseudo-locale build step for visual testing in local development and CI.

## Explain

Explain how text expansion during translation breaks fixed layouts and what CSS patterns prevent overflow and clipping across locales.

## Code Review

Review CSS files and component styles for fixed widths, overflow: hidden, white-space: nowrap, and text-overflow: ellipsis on buttons, labels, navigation items, and headings that contain translatable text.

---

For full implementation details, code examples, and framework-specific guidance,
see `references/rule.md`.

Rule page: https://frontendchecklist.io/rules/i18n/text-expansion
