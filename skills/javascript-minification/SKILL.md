---
name: javascript-minification
description: "Use when reviewing scripts, client components, bundles, or runtime behavior related to Minify all JavaScript files. Inspect both source code and the browser execution path so fixes target the real bottleneck or bug."
metadata:
  category: javascript
  priority: high
  difficulty: beginner
  estimatedTime: "15"
  source: frontendchecklist.io
  url: https://frontendchecklist.io/rules/javascript/javascript-minification
---

# Minify all JavaScript files

Unminified JavaScript adds hundreds of KB to page weight, slowing down load times especially on mobile networks where every byte counts.

## Quick Reference

- Enable minification in your build tool (Vite, webpack, etc.)
- Use Terser for modern JavaScript minification
- Enable tree-shaking to remove unused code
- Typical reduction: 50-70% file size savings

## Check

Verify that all JavaScript files are minified in production to reduce file size, remove comments, and optimize code for faster loading and execution.

## Fix

Configure your build system to minify JavaScript files using tools like Terser, UglifyJS, or built-in framework minification for production deployment.

## Explain

Explain how JavaScript minification improves website performance by reducing bundle sizes, eliminating dead code, and optimizing parsing speed.

## Code Review

Review scripts, client components, and browser execution paths related to Minify all JavaScript files. Flag exact imports, event handlers, runtime side effects, or blocking operations that violate the rule, and state how the change should be verified in the browser.

---

For full implementation details, code examples, and framework-specific guidance,
see `references/rule.md`.

Rule page: https://frontendchecklist.io/rules/javascript/javascript-minification
