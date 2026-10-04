---
name: canonical-chain
description: "Use when auditing metadata, crawlability, structured data, or indexability related to Avoid redirect chains on canonical URLs. Verify the rendered HTML and HTTP response rather than relying only on source files."
metadata:
  category: seo
  priority: medium
  difficulty: intermediate
  estimatedTime: "10"
  source: frontendchecklist.io
  url: https://frontendchecklist.io/rules/seo/canonical-chain
---

# Avoid redirect chains on canonical URLs

Canonical chains confuse search engines and can result in the wrong version of a page being indexed, while also adding unnecessary latency for crawlers.

## Quick Reference

- Ensure that the URL in your `rel="canonical"` tag returns a 200 OK status
- Never point a canonical tag to a URL that then redirects to another location
- Verify that the canonical URL is the final, intended version of the content

## Check

Verify that the canonical URL of the page does not result in any redirects.

## Fix

Update the `&lt;link rel="canonical"&gt;` tag to point directly to the final, non-redirecting URL.

## Explain

Explain why pointing a canonical tag to a redirecting URL weakens the canonical-url signal and impacts SEO.

## Code Review

Review metadata generation, rendered HTML, structured data, and response headers related to Avoid redirect chains on canonical URLs. Flag exact routes or templates where search-facing output violates the rule, and describe how to verify the final page output.

---

For full implementation details, code examples, and framework-specific guidance,
see `references/rule.md`.

Rule page: https://frontendchecklist.io/rules/seo/canonical-chain
