---
name: broken-html
description: "Use when auditing metadata, crawlability, structured data, or indexability related to Fix malformed HTML structure. Verify the rendered HTML and HTTP response rather than relying only on source files."
metadata:
  category: seo
  priority: medium
  difficulty: intermediate
  estimatedTime: "10"
  source: frontendchecklist.io
  url: https://frontendchecklist.io/rules/seo/broken-html
---

# Fix malformed HTML structure

Malformed HTML can cause rendering issues across browsers and may prevent search engine crawlers from accurately parsing and indexing your content.

## Quick Reference

- Ensure all HTML tags are properly closed and nested according to specifications
- Remove stray tags or unescaped characters from the source code
- Verify the document structure follows a logical hierarchy with valid head and body sections

## Check

Validate the HTML structure of the page to identify any unclosed tags, incorrect nesting, or structural errors.

## Fix

Correct the malformed HTML by properly closing tags and ensuring all elements are nested according to the HTML5 specification.

## Explain

Explain how significant HTML errors can impact search engine bot crawling and the accessibility of a website.

## Code Review

Review metadata generation, rendered HTML, structured data, and response headers related to Fix malformed HTML structure. Flag exact routes or templates where search-facing output violates the rule, and describe how to verify the final page output.

---

For full implementation details, code examples, and framework-specific guidance,
see `references/rule.md`.

Rule page: https://frontendchecklist.io/rules/seo/broken-html
