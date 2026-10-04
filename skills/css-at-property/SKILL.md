---
name: css-at-property
description: "Use when implementing animated gradients, complex CSS transitions that involve custom property values, or building a typed design token system where custom property misuse should produce visible errors."
metadata:
  category: css
  priority: low
  difficulty: advanced
  estimatedTime: "30"
  source: frontendchecklist.io
  url: https://frontendchecklist.io/rules/css/css-at-property
---

# Register CSS custom properties with @property for animation and type safety

CSS custom properties are powerful but limited by default: they are untyped string substitutions that the browser cannot interpolate during transitions or animations. Registering a property with @property gives the browser the information it needs to animate between values, validate token assignments, and scope inheritance — turning custom properties from string macros into first-class typed values. This unlocks gradient animations, typed design tokens, and scoped component theming that are impossible with unregistered properties.

## Quick Reference

- Unregistered custom properties cannot be animated — they transition as discrete strings
- @property specifies syntax (color, length, number), initial-value, and inherits
- Registered properties enable smooth interpolation for gradients and complex values
- inherits: false creates scoped tokens that do not cascade to children

## Check

Review the CSS custom properties in this file. Identify any properties that are used in transitions or animations — these require @property registration to animate correctly.

## Fix

Add @property registrations for the custom properties used in transitions or animations in this CSS. Include the correct syntax descriptor, an initial-value, and the appropriate inherits value.

## Explain

Explain how @property works, why unregistered custom properties cannot be animated, what the syntax descriptor values mean, and how inherits controls cascade behaviour.

## Code Review

Inspect all CSS transitions and animations that reference custom properties. Flag any custom property used in a transition or animation that is not registered with @property, and flag any @property registration that is missing initial-value.

---

For full implementation details, code examples, and framework-specific guidance,
see `references/rule.md`.

Rule page: https://frontendchecklist.io/rules/css/css-at-property
