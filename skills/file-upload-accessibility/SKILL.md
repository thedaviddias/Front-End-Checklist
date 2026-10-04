---
name: file-upload-accessibility
description: "Use when reviewing templates, rendered HTML, or shared components related to Make file uploads accessible. Validate the final browser-facing markup, not just the source framework abstraction."
metadata:
  category: html
  priority: medium
  difficulty: intermediate
  estimatedTime: "25"
  source: frontendchecklist.io
  url: https://frontendchecklist.io/rules/html/file-upload-accessibility
---

# Make file uploads accessible

Unlabeled file inputs and inaccessible drag zones exclude screen reader and keyboard users from completing file upload tasks.

## Quick Reference

- Always associate labels with file inputs
- Clearly communicate accepted file types and size limits
- Provide accessible progress feedback during uploads
- Make drag-and-drop zones keyboard accessible

## Check

Verify file inputs have proper labels, accept attributes for file types, and accessible feedback for upload progress and errors.

## Fix

Implement file uploads with visible labels, accept attribute restrictions, drag-and-drop alternatives, and ARIA live region feedback.

## Explain

Explain how accessible file uploads provide clear instructions, feedback, and work for users relying on assistive technologies.

## Code Review

Review templates, server-rendered HTML, and shared components that output markup related to Make file uploads accessible. Flag exact elements, attributes, and routes where the rendered HTML violates the rule.

---

For full implementation details, code examples, and framework-specific guidance,
see `references/rule.md`.

Rule page: https://frontendchecklist.io/rules/html/file-upload-accessibility
