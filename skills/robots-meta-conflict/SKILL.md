---
name: robots-meta-conflict
description: "Use when applies to sites that use both robots.txt disallow rules and meta robots noindex tags. Use when investigating why deindexed pages still appear in search results."
metadata:
  category: seo
  priority: high
  difficulty: intermediate
  estimatedTime: "10"
  source: frontendchecklist.io
  url: https://frontendchecklist.io/rules/seo/robots-meta-conflict
---

# Robots Meta Conflict

Pages that appear in search results despite your intention to deindex them are usually blocked in robots.txt — Google cannot read the noindex directive it cannot fetch.

## Quick Reference

- If a page is blocked in robots.txt, crawlers never fetch it and therefore never read its `noindex` meta tag
- To properly deindex a page, use `<meta name="robots" content="noindex">` without blocking it in robots.txt
- If you block a URL in robots.txt, Google may still show it in results using anchor text from backlinks
- Audit pages that need to be deindexed by confirming they are crawlable but carry `noindex`

## Check

Cross-reference the site's robots.txt disallow paths against pages carrying `<meta name="robots" content="noindex">`. Flag any page where the URL matches a Disallow rule AND has a noindex tag — the noindex will never be seen by crawlers.

## Fix

For pages that must be deindexed: remove the robots.txt Disallow rule for that URL and keep the `noindex` meta tag. For pages that must simply be uncrawled without appearing: keep the Disallow rule and remove the noindex tag (understanding Google may still show the URL).

## Explain

Explain why a page blocked by robots.txt can still appear in Google search results, why the noindex meta tag inside a blocked page is never processed, and how to correctly deindex a page.

## Code Review

Review metadata generation, rendered HTML, structured data, and response headers related to Robots Meta Conflict. Flag exact routes or templates where search-facing output violates the rule, and describe how to verify the final page output.

---

For full implementation details, code examples, and framework-specific guidance,
see `references/rule.md`.

Rule page: https://frontendchecklist.io/rules/seo/robots-meta-conflict
