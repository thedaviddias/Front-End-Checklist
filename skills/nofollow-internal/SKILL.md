---
name: nofollow-internal
description: "Use when auditing internal link structure or reviewing link attributes. Applies to any site using rel=nofollow on links pointing to pages within the same domain."
metadata:
  category: seo
  priority: medium
  difficulty: intermediate
  estimatedTime: "10"
  source: frontendchecklist.io
  url: https://frontendchecklist.io/rules/seo/nofollow-internal
---

# Avoid nofollow on internal links

Adding rel=nofollow to internal links prevents PageRank from flowing to those pages—reducing their ability to rank—while providing no benefit over simply omitting the attribute.

## Quick Reference

- rel=nofollow on internal links blocks PageRank flow to your own pages
- Internal nofollow was once used for 'PageRank sculpting' but is no longer effective
- Use nofollow only on outbound links to untrusted or sponsored content
- If you don't want a page crawled or indexed, use noindex on the target page instead

## Check

Scan all internal links (<a href> tags pointing to the same domain) for the presence of rel='nofollow' or rel containing 'nofollow'. List each instance with its source page, anchor text, and target URL.

## Fix

Remove rel='nofollow' from internal links. If the goal was to prevent indexing of the target page, add <meta name='robots' content='noindex'> to the target page instead. If the goal was to prevent crawling, use robots.txt Disallow for that path.

## Explain

The rel=nofollow attribute was originally designed for untrusted external links. When applied to internal links, it blocks PageRank from flowing to your own pages without any benefit. Google has stated that PageRank sculpting via nofollow does not work—the PageRank that would have passed is simply lost, not redistributed.

## Code Review

Query all <a href='...'> elements. For each link, check if rel contains 'nofollow'. Determine if the link is internal (same domain) or external. Flag every internal link with rel='nofollow'. Check if the flagged links are in navigation, header, footer, or body content. Look for rel='nofollow new-tab' patterns that may have been applied blanket to all links.

---

For full implementation details, code examples, and framework-specific guidance,
see `references/rule.md`.

Rule page: https://frontendchecklist.io/rules/seo/nofollow-internal
