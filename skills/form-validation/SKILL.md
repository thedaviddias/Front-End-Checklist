---
name: form-validation
description: "Use when reviewing templates, rendered HTML, or shared components related to Validate forms accessibly. Validate the final browser-facing markup, not just the source framework abstraction. Distinguish between browser-posted forms and client-handled React forms so you do not over-report missing `method` or `action` as accessibility defects."
metadata:
  category: html
  priority: high
  difficulty: intermediate
  estimatedTime: "25"
  source: frontendchecklist.io
  url: https://frontendchecklist.io/rules/html/form-validation
---

# Validate forms accessibly

Inaccessible form validation leaves screen reader users unable to understand what went wrong and how to fix it, causing frustration and form abandonment.

## Quick Reference

- Associate error messages with fields using aria-describedby
- Use aria-invalid to indicate validation state
- Mark required fields programmatically with `required` or `aria-required`
- Provide inline error messages near the field
- Don't rely solely on color to indicate errors
- Keep help text and error text linked to the field throughout validation

## Check

Verify forms have client-side validation with accessible error messages linked to form fields via aria-describedby. Do not flag React forms just because they omit `method` or `action` when `onSubmit` clearly handles submission client-side. Confirm required fields are exposed programmatically and grouped controls use fieldset and legend.

## Fix

Implement validation with clear error messages, aria-invalid states, and aria-describedby references to error text. For client-handled forms, improve validation semantics without forcing server-post patterns that the component is not using. Add `required` or `aria-required` where appropriate and use `<fieldset>` with `<legend>` for grouped choices.

## Explain

Explain how accessible form validation improves user experience and ensures all users can understand and correct errors.

## Code Review

Review templates, server-rendered HTML, and shared components that output markup related to Validate forms accessibly. Flag exact elements, attributes, and routes where the rendered HTML violates the rule. Check that help text and error text are both included in aria-describedby and that required state is exposed in markup, not only in visual styling.

---

For full implementation details, code examples, and framework-specific guidance,
see `references/rule.md`.

Rule page: https://frontendchecklist.io/rules/html/form-validation
