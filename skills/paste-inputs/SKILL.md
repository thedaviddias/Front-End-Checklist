---
name: paste-inputs
description: "Use when reviewing rendered HTML, interactive components, or design-system patterns related to Allow pasting into form inputs. Check native semantics first, then inspect keyboard behavior, focus flow, accessible names, and screen-reader output where relevant."
metadata:
  category: accessibility
  priority: medium
  difficulty: intermediate
  estimatedTime: "10"
  source: frontendchecklist.io
  url: https://frontendchecklist.io/rules/accessibility/paste-inputs
---

# Allow pasting into form inputs

Restricting pasting makes it difficult for users to use password managers or copy-paste long strings of data, which can lead to increased errors and a poor user experience.

## Quick Reference

- Do not block the 'paste' event on any form input
- Ensure password fields and credit card inputs allow pasting from managers
- Remove `onpaste="return false"` from all input elements

## Check

Check the codebase for any JavaScript or HTML attributes that prevent users from pasting into form fields.

## Fix

Remove any code (e.g., `onpaste="return false"`) that blocks the default paste behavior in inputs.

## Explain

Explain how allowing pasting into forms improves security and accessibility for users with physical or cognitive disabilities.

## Code Review

Review the rendered markup and interactive states that affect Allow pasting into form inputs. Flag exact elements, roles, labels, focus behavior, or keyboard interactions that violate the rule, and note how to verify the fix with browser accessibility tooling or assistive tech.

---

For full implementation details, code examples, and framework-specific guidance,
see `references/rule.md`.

Rule page: https://frontendchecklist.io/rules/accessibility/paste-inputs
