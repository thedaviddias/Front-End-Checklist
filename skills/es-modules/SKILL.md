---
name: es-modules
description: "Use when reviewing scripts, client components, bundles, or runtime behavior related to Use ES modules (import/export). Inspect both source code and the browser execution path so fixes target the real bottleneck or bug."
metadata:
  category: javascript
  priority: high
  difficulty: beginner
  estimatedTime: "15"
  source: frontendchecklist.io
  url: https://frontendchecklist.io/rules/javascript/es-modules
---

# Use ES modules (import/export)

ES modules are statically analyzable — bundlers can determine at build time what code is actually used and eliminate the rest (tree-shaking). CommonJS require() is dynamic and prevents this optimization. ES modules are also the browser-native standard, reducing the need for build-time transformation.

## Quick Reference

- Use import/export syntax instead of require()/module.exports
- Named exports improve IDE autocompletion and enable tree-shaking
- Add type="module" to script tags or use a bundler to load ES modules in browsers
- Default exports are fine but named exports scale better in large codebases

## Check

Identify any use of require(), module.exports, or exports in this JavaScript file that should be converted to ES module syntax.

## Fix

Convert all require() and module.exports statements to ES module import/export syntax.

## Explain

Explain the benefits of ES modules over CommonJS, including tree-shaking, static analysis, and browser support.

## Code Review

Review scripts, client components, and browser execution paths related to Use ES modules (import/export). Flag exact imports, event handlers, runtime side effects, or blocking operations that violate the rule, and state how the change should be verified in the browser.

---

For full implementation details, code examples, and framework-specific guidance,
see `references/rule.md`.

Rule page: https://frontendchecklist.io/rules/javascript/es-modules
