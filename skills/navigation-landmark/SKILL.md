---
name: navigation-landmark
description: "Use when reviewing templates, rendered HTML, or shared components related to Use navigation landmark regions. Validate the final browser-facing markup, not just the source framework abstraction."
metadata:
  category: html
  priority: high
  difficulty: beginner
  estimatedTime: "15"
  source: frontendchecklist.io
  url: https://frontendchecklist.io/rules/html/navigation-landmark
---

# Use navigation landmark regions

Navigation landmarks allow screen reader users to quickly jump to and identify different navigation areas—without them, users must tab through every link to find what they need.

## Quick Reference

- Wrap navigation links in nav elements
- Use aria-label to distinguish multiple nav regions
- Provide skip links to bypass repetitive navigation
- Screen reader users navigate by landmarks

## Check

Verify navigation areas use nav elements with aria-label or aria-labelledby to distinguish primary, secondary, and footer navigation.

## Fix

Wrap navigation links in nav elements with descriptive aria-labels like 'Main navigation' or 'Footer navigation'.

## Explain

Explain how navigation landmarks help screen reader users quickly identify and jump to different navigation areas.

## Code Review

Review templates, server-rendered HTML, and shared components that output markup related to Use navigation landmark regions. Flag exact elements, attributes, and routes where the rendered HTML violates the rule.

---

For full implementation details, code examples, and framework-specific guidance,
see `references/rule.md`.

Rule page: https://frontendchecklist.io/rules/html/navigation-landmark
