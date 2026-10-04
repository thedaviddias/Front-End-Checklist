---
name: form-field-multiple-labels
description: "Use when reviewing rendered HTML, interactive components, or design-system patterns related to Use a single label for each form field. Check native semantics first, then inspect keyboard behavior, focus flow, accessible names, and screen-reader output where relevant."
metadata:
  category: accessibility
  priority: medium
  difficulty: beginner
  estimatedTime: "5"
  source: frontendchecklist.io
  url: https://frontendchecklist.io/rules/accessibility/form-field-multiple-labels
---

# Use a single label for each form field

Multiple labels for a single field can cause screen readers to announce redundant information or fail to correctly associate the input with its purpose.

## Quick Reference

- Associate each form input with exactly one <label> element
- Use aria-labelledby if multiple pieces of text must label a single field
- Avoid duplicate labels that can confuse screen readers and voice control

## Check

Search for form inputs that are associated with more than one <label> element.

## Fix

Consolidate multiple labels into a single <label> or use aria-labelledby to reference multiple sources of text.

## Explain

Explain how a 1:1 relationship between labels and inputs ensures clarity for assistive technology users.

## Code Review

Review the rendered markup and interactive states that affect Use a single label for each form field. Flag exact elements, roles, labels, focus behavior, or keyboard interactions that violate the rule, and note how to verify the fix with browser accessibility tooling or assistive tech.

---

For full implementation details, code examples, and framework-specific guidance,
see `references/rule.md`.

Rule page: https://frontendchecklist.io/rules/accessibility/form-field-multiple-labels
