---
name: doctype
description: "Use when applies to all HTML documents. Always check the very first line of the raw HTML source (view-source: or DevTools > Network > Response). In SSR frameworks, check the root HTML template (e.g., _document.tsx in Next.js, index.html in Vite/Vue, application.html.erb in Rails). The doctype is not a tag — it is a declaration and does not need a closing tag."
metadata:
  category: html
  priority: critical
  difficulty: beginner
  estimatedTime: "5"
  source: frontendchecklist.io
  url: https://frontendchecklist.io/rules/html/doctype
---

# Use the HTML5 doctype

Without the HTML5 doctype, browsers fall back to Quirks Mode, which emulates the rendering behavior of pre-standards browsers from the late 1990s. In Quirks Mode, the CSS box model changes (padding adds to element width), vertical centering breaks, and many modern HTML5 APIs may behave unexpectedly. This causes cross-browser rendering inconsistencies that are difficult to debug and may produce inaccessible layouts.

## Quick Reference

- Every HTML document must begin with `<!DOCTYPE html>` as its very first line
- Without a doctype, browsers enter Quirks Mode — a legacy compatibility mode with inconsistent CSS and JavaScript behavior
- The HTML5 doctype is case-insensitive but `<!DOCTYPE html>` (uppercase DOCTYPE) is the conventional form
- No other content, not even whitespace or BOM characters, should appear before the doctype
- Frameworks like Next.js, Nuxt, and Remix automatically include the doctype — verify in rendered HTML, not source templates

## Check

Check the very first line of the HTML document source (not the DOM — the raw HTTP response). The document must begin with `<!DOCTYPE html>` (case-insensitive). Flag if: (1) the doctype is missing entirely; (2) an old HTML4 or XHTML doctype is used (contains PUBLIC and a DTD URL); (3) the doctype is not the absolute first content (whitespace or BOM before it triggers some browsers to enter Quirks Mode); (4) the doctype has incorrect syntax.

## Fix

Add `<!DOCTYPE html>` as the absolute first line of the HTML document, before the `<html>` tag. Remove any old HTML4 or XHTML doctypes. Ensure no whitespace, comments, or BOM markers precede the doctype. For framework projects: verify in the root HTML template file, and confirm in the rendered HTML by viewing page source in the browser.

## Explain

The DOCTYPE declaration tells the browser which version of HTML the document uses. `<!DOCTYPE html>` activates Standards Mode (also called Full Standards Mode) in all modern browsers, ensuring consistent rendering behavior. Without it, browsers enter Quirks Mode to emulate old IE behavior — a compatibility mode that changes the box model, float clearing, table rendering, and other CSS behaviors. The HTML5 doctype was intentionally made simple (just `<!DOCTYPE html>`) to replace the verbose HTML4/XHTML doctypes that required a full DTD URL.

## Code Review

Review templates, server-rendered HTML, and shared components that output markup related to Use the HTML5 doctype. Flag exact elements, attributes, and routes where the rendered HTML violates the rule.

---

For full implementation details, code examples, and framework-specific guidance,
see `references/rule.md`.

Rule page: https://frontendchecklist.io/rules/html/doctype
