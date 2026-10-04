---
name: has-selector
description: "Use when reviewing stylesheets or components that use JavaScript to toggle classes on parent elements based on child state, form input values, or content presence — :has() may replace the JavaScript entirely."
metadata:
  category: css
  priority: low
  difficulty: intermediate
  estimatedTime: "20"
  source: frontendchecklist.io
  url: https://frontendchecklist.io/rules/css/has-selector
---

# Use :has() to style parent elements based on their descendants

Before :has(), styling a parent based on its children required JavaScript: detecting state, toggling classes, and keeping DOM and styles in sync. This created coupling between styling logic and application logic. :has() moves that relationship back into CSS where it belongs, reducing JavaScript complexity, eliminating class-toggling boilerplate, and making styling intent readable in the stylesheet itself.

## Quick Reference

- :has() selects an element when a matching descendant exists inside it
- It is the parent selector CSS has needed for decades
- Baseline support since late 2023 — all major browsers include it
- Avoid complex :has() selectors in hot reflow paths — they can affect layout performance

## Check

Look for patterns in this code where JavaScript toggles a class on a parent element based on the state or content of a child element. These are candidates for replacement with :has().

## Fix

Replace the JavaScript class-toggling logic with a CSS :has() selector. Show the selector that targets the parent element when the relevant child condition is met.

## Explain

Explain how the :has() pseudo-class works, how it differs from :is() and :not(), what descendant vs child combinators mean inside :has(), and how browser support stands today.

## Code Review

Review the stylesheets and component JavaScript in this file. Flag any locations where a parent element's style is controlled by toggling a class from JavaScript based on child state — and show the equivalent :has() rule.

---

For full implementation details, code examples, and framework-specific guidance,
see `references/rule.md`.

Rule page: https://frontendchecklist.io/rules/css/has-selector
