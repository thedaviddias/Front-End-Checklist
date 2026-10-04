---
name: link-checker
description: "Use when reviewing templates, rendered HTML, or shared components related to Check for broken links. Validate the final browser-facing markup, not just the source framework abstraction."
metadata:
  category: html
  priority: medium
  difficulty: beginner
  estimatedTime: "15"
  source: frontendchecklist.io
  url: https://frontendchecklist.io/rules/html/link-checker
---

# Check for broken links

Broken links frustrate users, hurt SEO rankings (Google penalizes 404s), and damage credibility—especially for documentation and e-commerce sites.

## Quick Reference

- Use lychee, linkchecker, or broken-link-checker npm packages
- Check internal, external, anchor, and mailto links
- Integrate into CI/CD for automatic detection
- Set up regular monitoring for external link rot

## Check

Verify that all internal and external links are working properly and don't return 404 errors or redirect to unintended destinations.

## Fix

Use automated link checking tools to identify and fix broken links, update redirected URLs, and remove or replace dead links.

## Explain

Explain why broken links hurt user experience, SEO rankings, and credibility, and how to implement ongoing link monitoring.

## Code Review

Review templates, server-rendered HTML, and shared components that output markup related to Check for broken links. Flag exact elements, attributes, and routes where the rendered HTML violates the rule.

---

For full implementation details, code examples, and framework-specific guidance,
see `references/rule.md`.

Rule page: https://frontendchecklist.io/rules/html/link-checker
