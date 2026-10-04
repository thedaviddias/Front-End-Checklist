---
name: html5-semantic-elements
description: "Use when reviewing templates, rendered HTML, or shared components related to Use semantic HTML elements. Validate the final browser-facing markup, not just the source framework abstraction."
metadata:
  category: html
  priority: high
  difficulty: beginner
  estimatedTime: "15"
  source: frontendchecklist.io
  url: https://frontendchecklist.io/rules/html/html5-semantic-elements
---

# Use semantic HTML elements

Screen readers use semantic elements to navigate pages—users can jump directly to &lt;main&gt; content or &lt;nav&gt;. Search engines also use semantics to understand content hierarchy.

## Quick Reference

- Use <header>, <main>, <footer> for page structure
- Use <article> for self-contained content, <section> for grouped content
- Use <nav> for navigation, <aside> for related/sidebar content
- Only one <main> per page, but multiple <header>/<footer> allowed

## Check

Review this HTML structure to ensure it uses appropriate semantic elements like header, main, section, article, aside, and footer instead of generic div elements.

## Fix

Replace generic div elements with semantic HTML5 elements that accurately describe the content structure and purpose.

## Explain

Explain how semantic HTML elements improve accessibility, SEO, and code maintainability by providing meaningful structure to web content.

## Code Review

Review templates, server-rendered HTML, and shared components that output markup related to Use semantic HTML elements. Flag exact elements, attributes, and routes where the rendered HTML violates the rule.

---

For full implementation details, code examples, and framework-specific guidance,
see `references/rule.md`.

Rule page: https://frontendchecklist.io/rules/html/html5-semantic-elements
