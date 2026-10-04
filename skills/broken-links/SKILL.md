---
name: broken-links
description: "Use when auditing metadata, crawlability, structured data, or indexability related to Resolve internal broken links. Verify the rendered HTML and HTTP response rather than relying only on source files."
metadata:
  category: seo
  priority: high
  difficulty: beginner
  estimatedTime: "10"
  source: frontendchecklist.io
  url: https://frontendchecklist.io/rules/seo/broken-links
---

# Resolve internal broken links

Internal broken links frustrate users and waste crawl budget by sending search engine bots to non-existent pages, potentially harming your site's SEO.

## Quick Reference

- Identify and fix all internal links that return 404 (Not Found) or 5xx (Server Error) codes
- Ensure all navigation elements and inline links point to live, valid URLs
- Regularly audit your site after moving or deleting content to prevent dead links

## Check

Scan the website for any internal links that lead to 404 pages or server errors.

## Fix

Update the broken link to the correct URL or remove it if the destination page no longer exists.

## Explain

Explain the concept of 'crawl budget' and how broken links can negatively affect a site's indexing efficiency.

## Code Review

Review metadata generation, rendered HTML, structured data, and response headers related to Resolve internal broken links. Flag exact routes or templates where search-facing output violates the rule, and describe how to verify the final page output.

---

For full implementation details, code examples, and framework-specific guidance,
see `references/rule.md`.

Rule page: https://frontendchecklist.io/rules/seo/broken-links
