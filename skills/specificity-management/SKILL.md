---
name: specificity-management
description: "Use when reviewing stylesheets, component styles, and responsive behavior related to Keep CSS specificity low and flat. Check the rendered layout across breakpoints and interaction states before proposing a fix."
metadata:
  category: css
  priority: high
  difficulty: intermediate
  estimatedTime: "20"
  source: frontendchecklist.io
  url: https://frontendchecklist.io/rules/css/specificity-management
---

# Keep CSS specificity low and flat

High specificity creates an escalation problem — once you use an ID selector, you need another ID to override it. Developers respond with !important, which escalates further. Flat, low-specificity CSS is predictable: later rules and more-specific selectors win cleanly, and the cascade works as intended.

## Quick Reference

- Prefer class selectors over ID selectors for styling
- Avoid nesting selectors more than 3 levels deep
- Never use !important except as a last resort for utility overrides
- Use :where() to apply styles with zero specificity

## Check

Analyze the selectors in this CSS file for specificity issues: ID selectors used for styling, overly nested selectors, and unnecessary !important.

## Fix

Flatten high-specificity selectors to use classes instead of IDs, reduce nesting depth, and remove unnecessary !important declarations.

## Explain

Explain CSS specificity scoring, why high specificity causes maintenance problems, and how to keep specificity flat using classes and BEM.

## Code Review

Review stylesheets, component styles, and responsive states related to Keep CSS specificity low and flat. Flag exact selectors, declarations, or breakpoints that violate the rule in the rendered UI.

---

For full implementation details, code examples, and framework-specific guidance,
see `references/rule.md`.

Rule page: https://frontendchecklist.io/rules/css/specificity-management
