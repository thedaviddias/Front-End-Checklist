---
name: 404-page
description: "Use when reviewing templates, rendered HTML, or shared components related to Create a custom 404 error page. Validate the final browser-facing markup, not just the source framework abstraction."
metadata:
  category: html
  priority: medium
  difficulty: beginner
  estimatedTime: "20"
  source: frontendchecklist.io
  url: https://frontendchecklist.io/rules/html/404-page
---

# Create a custom 404 error page

A generic browser 404 page causes users to leave immediately—a well-designed custom page provides recovery paths and keeps users engaged with your site.

## Quick Reference

- Custom 404 pages retain users who encounter broken or moved links
- Include search, navigation, and links to popular content
- Maintain consistent branding and site design
- Track 404 errors to identify and fix broken links
- Return a real HTTP 404 so the page is not treated as a soft 404

## Check

Verify that this website has a custom 404 error page with helpful navigation options. Confirm the route returns HTTP 404 and not a branded page with a 200 response.

## Fix

Create a user-friendly 404 page with search functionality and links to important pages. Ensure the server or framework returns status code 404 so the page does not become a soft 404.

## Explain

Explain how custom 404 pages help retain users who encounter broken links and why returning 200 for missing pages creates soft-404 indexing problems.

## Code Review

Review templates, server-rendered HTML, and shared components that output markup related to Create a custom 404 error page. Flag exact elements, attributes, and routes where the rendered HTML violates the rule.

---

For full implementation details, code examples, and framework-specific guidance,
see `references/rule.md`.

Rule page: https://frontendchecklist.io/rules/html/404-page
