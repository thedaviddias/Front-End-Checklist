---
name: event-delegation
description: "Use when reviewing scripts, client components, bundles, or runtime behavior related to Use event delegation for dynamic content. Inspect both source code and the browser execution path so fixes target the real bottleneck or bug."
metadata:
  category: javascript
  priority: medium
  difficulty: intermediate
  estimatedTime: "15"
  source: frontendchecklist.io
  url: https://frontendchecklist.io/rules/javascript/event-delegation
---

# Use event delegation for dynamic content

Adding hundreds of individual event listeners for list items or table rows consumes significant memory and creates performance overhead. Dynamic content (items loaded via AJAX or rendered after user actions) won't have event listeners unless you re-attach them after each update — event delegation solves both problems at once.

## Quick Reference

- Attach one listener to a parent instead of many to individual children
- Use event.target.closest() to identify the intended target element
- Event delegation automatically works for elements added dynamically
- Clean up listeners on the parent when the container is removed

## Check

Find any code in this file that attaches the same event handler to multiple elements in a loop. Suggest event delegation as an alternative.

## Fix

Refactor these per-element event listeners to use event delegation on the common parent container.

## Explain

Explain event delegation, how event bubbling enables it, and when to use closest() vs target.

## Code Review

Review scripts, client components, and browser execution paths related to Use event delegation for dynamic content. Flag exact imports, event handlers, runtime side effects, or blocking operations that violate the rule, and state how the change should be verified in the browser.

---

For full implementation details, code examples, and framework-specific guidance,
see `references/rule.md`.

Rule page: https://frontendchecklist.io/rules/javascript/event-delegation
