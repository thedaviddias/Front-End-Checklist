---
name: custom-element-accessibility
description: "Use when reviewing custom element class definitions or Web Component source code to check for missing ARIA reflection, keyboard handling, and form association."
metadata:
  category: html
  priority: medium
  difficulty: advanced
  estimatedTime: "60"
  source: frontendchecklist.io
  url: https://frontendchecklist.io/rules/html/custom-element-accessibility
---

# Make custom elements and Web Components accessible

Custom elements that lack ARIA reflection are invisible to screen readers — a button that looks correct visually may be announced as a generic "group" or not at all. ElementInternals provides the bridge between the shadow DOM and the accessibility tree, and it is also the only standards-compliant way to integrate custom inputs with native HTML forms.

## Quick Reference

- Prefer native `<button>`, `<input>`, `<select>`, and `<details>` before building a custom widget
- Use ElementInternals.ariaRole to expose ARIA semantics from the shadow DOM
- Implement form-associated custom elements with ElementInternals for native form participation
- Apply roving tabindex for compound widgets (listbox, toolbar, menu)
- The shadow DOM does not automatically expose ARIA to the accessibility tree without ElementInternals

## Check

Inspect these custom element definitions for missing ElementInternals setup, absent ARIA reflection, incomplete keyboard interaction patterns, and lack of form association for input-like components. First verify that the widget truly needs to be custom rather than a native control with styling.

## Fix

Add ElementInternals attachment in the constructor, implement ariaRole and ariaLabel reflection, add keyboard event handlers following ARIA authoring patterns, and use formAssociated for custom input elements. Replace the component with native HTML when the native control already supports the required interaction.

## Explain

Explain why the shadow DOM does not automatically expose ARIA semantics and how ElementInternals bridges the gap between custom elements and the accessibility tree.

## Code Review

Review custom element class files for ElementInternals attachment, ARIA property reflection, keyboard interaction (Tab, Enter, Space, Arrow keys), focus management, and formAssociated static property on input-like elements. Flag cases where a native control would remove the accessibility burden entirely.

---

For full implementation details, code examples, and framework-specific guidance,
see `references/rule.md`.

Rule page: https://frontendchecklist.io/rules/html/custom-element-accessibility
