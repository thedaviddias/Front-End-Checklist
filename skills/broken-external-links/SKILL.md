---
name: broken-external-links
description: "Use when auditing metadata, crawlability, structured data, or indexability related to Fix or remove broken external links. Verify the rendered HTML and HTTP response rather than relying only on source files."
metadata:
  category: seo
  priority: medium
  difficulty: intermediate
  estimatedTime: "10"
  source: frontendchecklist.io
  url: https://frontendchecklist.io/rules/seo/broken-external-links
---

# Fix or remove broken external links

Broken links provide a poor user experience and can signal to search engines that your content is outdated or poorly maintained.

## Quick Reference

- Regularly scan for external links returning 4xx or 5xx error codes
- Update broken links to the new correct URL or remove them entirely
- Avoid linking to expired domains that may have been repurposed

## Check

Scan the page for any external links that lead to 404 pages or other error states.

## Fix

Update the broken external link to a working URL or remove the link if the resource no longer exists.

## Explain

Explain the impact of 'link rot' on a website's perceived quality and user trust.

## Code Review

Review metadata generation, rendered HTML, structured data, and response headers related to Fix or remove broken external links. Flag exact routes or templates where search-facing output violates the rule, and describe how to verify the final page output.

---

For full implementation details, code examples, and framework-specific guidance,
see `references/rule.md`.

Rule page: https://frontendchecklist.io/rules/seo/broken-external-links
