---
name: code-splitting
description: "Use when reviewing large SPA bundles, new dependency additions, or routes that feel slow to hydrate. Focus on code that is not required for the initial view and can move behind route transitions, user interaction, or viewport-based loading."
metadata:
  category: javascript
  priority: high
  difficulty: intermediate
  estimatedTime: "25"
  source: frontendchecklist.io
  url: https://frontendchecklist.io/rules/javascript/code-splitting
---

# Split large JavaScript bundles

A 500 KB JavaScript bundle blocks page interactivity for 3–5 seconds on a mid-range mobile device even after the bytes arrive — JS must be parsed and compiled before execution. Code splitting means users only download and parse the code they actually need for the current page, dramatically improving Time to Interactive.

## Quick Reference

- Use dynamic import() to load code only when it's actually needed
- Split routes in SPAs so each page loads only its own code
- Lazy-load heavy third-party libraries (chart libraries, rich text editors)
- Analyze your bundle with a visualizer to find what to split

## Check

Identify any large third-party imports or feature modules in this file that could be loaded lazily with dynamic import() instead of statically.

## Fix

Convert the identified static imports to dynamic imports using import() and add appropriate loading states.

## Explain

Explain JavaScript code splitting, how dynamic import() works, and how to implement route-based splitting in a SPA.

## Code Review

Inspect route modules, heavy feature imports, and third-party libraries loaded on initial render. Flag dependencies that can move behind `import()`, route boundaries, or user-triggered flows without breaking the first meaningful paint.

---

For full implementation details, code examples, and framework-specific guidance,
see `references/rule.md`.

Rule page: https://frontendchecklist.io/rules/javascript/code-splitting
