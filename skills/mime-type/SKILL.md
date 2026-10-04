---
name: mime-type
description: "Use when auditing server configuration or diagnosing broken resources. Applies to any web server serving HTML, CSS, JS, images, fonts, or other static assets."
metadata:
  category: seo
  priority: medium
  difficulty: intermediate
  estimatedTime: "15"
  source: frontendchecklist.io
  url: https://frontendchecklist.io/rules/seo/mime-type
---

# MIME Type Validation

Incorrect MIME types cause browsers to block stylesheets and scripts (MIME sniffing is disabled by X-Content-Type-Options: nosniff), breaking page rendering and signalling poor site quality to crawlers.

## Quick Reference

- The Content-Type header must match the actual file type being served
- HTML pages must be served as text/html; charset=utf-8
- CSS files must be served as text/css and JavaScript as text/javascript
- Incorrect MIME types cause browsers to block or mishandle resources

## Check

For key pages and their linked resources, inspect the HTTP Content-Type response header. Verify HTML responses use text/html; charset=utf-8, CSS uses text/css, JS uses text/javascript, and images use image/jpeg, image/png, etc.

## Fix

Update your server configuration to serve each file type with its correct MIME type. Set X-Content-Type-Options: nosniff to prevent browsers from guessing content types. In Next.js and similar frameworks, configure headers in next.config.js.

## Explain

The Content-Type header tells browsers and crawlers what kind of content is being sent. When it mismatches the actual file type, browsers either block the resource or render it incorrectly—CSS served as text/plain won't be applied, and JavaScript served as text/html may be blocked by strict MIME checking.

## Code Review

For HTML, CSS, and JS assets, check the Content-Type response header. Verify HTML responses include 'charset=utf-8'. Check that X-Content-Type-Options: nosniff is set. Flag any resource returning Content-Type: text/html that is not an HTML page. Check for missing charset declarations on text responses.

---

For full implementation details, code examples, and framework-specific guidance,
see `references/rule.md`.

Rule page: https://frontendchecklist.io/rules/seo/mime-type
