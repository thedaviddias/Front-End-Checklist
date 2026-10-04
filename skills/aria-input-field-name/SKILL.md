---
name: aria-input-field-name
description: "Use when applies to all `<input>` (except type=hidden), `<textarea>`, `<select>`, and custom form widgets using role=textbox, role=combobox, role=spinbutton, role=searchbox, or role=listbox."
metadata:
  category: accessibility
  priority: critical
  difficulty: beginner
  estimatedTime: "10"
  source: frontendchecklist.io
  url: https://frontendchecklist.io/rules/accessibility/aria-input-field-name
---

# Ensure all input fields have accessible names

Screen readers announce the accessible name of a focused input before the user types. Without a name, VoiceOver reads 'text field' and NVDA reads 'edit' with no context, making it impossible for blind users to fill out forms correctly. Voice control users (Dragon NaturallySpeaking) also need the visible label text to match the accessible name so they can say 'click Email Address' to move focus to the field.

## Quick Reference

- Every `<input>`, `<textarea>`, and `<select>` must have a programmatically associated accessible name
- Preferred: associate a `<label>` via matching `for`/`id` attributes
- Alternatives: `aria-label` (inline string) or `aria-labelledby` (references another element's `id`)
- Placeholder text is not an accessible name — it disappears on input and is not reliably announced
- Applies to WCAG 2.1 SC 1.3.1 (Info and Relationships) and SC 4.1.2 (Name, Role, Value)

## Check

Find all `<input>` (excluding type='hidden'), `<textarea>`, and `<select>` elements. For each, check that one of these is true: (1) a `<label>` element with a `for` attribute matching the input's `id` exists, (2) the input has a non-empty `aria-label` attribute, or (3) the input has an `aria-labelledby` attribute pointing to a visible element. Flag any that use only `placeholder` as their label. Also check custom widgets using role=textbox, role=combobox, etc.

## Fix

For each unlabeled input: (1) Add a `<label for='input-id'>Label text</label>` and matching `id` on the input — this is the most robust method. (2) If a visible label is impractical (e.g., search bar), add `aria-label='Search'` directly on the input. (3) If the label text already exists elsewhere in the DOM, add `aria-labelledby='label-element-id'` to the input. Remove `placeholder` as a substitute for a label; keep placeholder only as a hint for expected format.

## Explain

WCAG 2.1 SC 4.1.2 (Name, Role, Value) requires that all user interface components have an accessible name. For form inputs, the accessible name is computed from: (1) `aria-labelledby` → (2) `aria-label` → (3) associated `<label>` → (4) `title` attribute (last resort). Screen readers announce this name when the input receives focus. Without it, a blind user hears only the input type ('text field') with no indication of what to type. Dragon NaturallySpeaking users need the accessible name to match visible text so voice commands work.

## Code Review

Review the rendered markup and interactive states that affect Ensure all input fields have accessible names. Flag exact elements, roles, labels, focus behavior, or keyboard interactions that violate the rule, and note how to verify the fix with browser accessibility tooling or assistive tech.

---

For full implementation details, code examples, and framework-specific guidance,
see `references/rule.md`.

Rule page: https://frontendchecklist.io/rules/accessibility/aria-input-field-name
