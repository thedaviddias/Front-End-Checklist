---
name: label-content-name-mismatch
description: "Use when reviewing rendered HTML, interactive components, or design-system patterns related to Align visible labels with accessible names. Check native semantics first, then inspect keyboard behavior, focus flow, accessible names, and screen-reader output where relevant."
metadata:
  category: accessibility
  priority: medium
  difficulty: intermediate
  estimatedTime: "10"
  source: frontendchecklist.io
  url: https://frontendchecklist.io/rules/accessibility/label-content-name-mismatch
---

# Align visible labels with accessible names

When the visible label doesn't match the accessible name, voice control users may find it impossible to interact with the element by speaking its name.

## Quick Reference

- Visible text should be part of the accessible name (ARIA label)
- Ensure speech-to-text users can trigger controls by their visible name
- Maintain consistency between what is seen and what is read by tech

## Check

Compare the visible text of buttons and links with their 'aria-label' or 'aria-labelledby' attributes to ensure the visible text is included in the accessible name.

## Fix

Update the ARIA attribute to include the exact string of the visible label text at the beginning of the accessible name.

## Explain

Explain how a mismatch between visible labels and accessible names breaks the experience for users of voice recognition software.

## Code Review

Review the rendered markup and interactive states that affect Align visible labels with accessible names. Flag exact elements, roles, labels, focus behavior, or keyboard interactions that violate the rule, and note how to verify the fix with browser accessibility tooling or assistive tech.

---

For full implementation details, code examples, and framework-specific guidance,
see `references/rule.md`.

Rule page: https://frontendchecklist.io/rules/accessibility/label-content-name-mismatch
