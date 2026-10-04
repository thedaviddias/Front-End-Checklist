---
name: external-links
description: "Use when auditing content pages for citation quality, suggesting authoritative sources to link for factual claims, or reviewing whether a page's external link attributes (nofollow, noopener) are correctly set."
metadata:
  category: seo
  priority: medium
  difficulty: intermediate
  estimatedTime: "10"
  source: frontendchecklist.io
  url: https://frontendchecklist.io/rules/seo/external-links
---

# Add relevant external links

Outbound links to authoritative sources strengthen the credibility of your content and are considered a positive trust signal by Google. Pages that cite their sources rank better for informational queries than those that make unsupported claims.

## Quick Reference

- Link out to authoritative sources that support your claims — this demonstrates E-E-A-T and improves credibility
- External links to reputable sites do not hurt your SEO; Google treats them as a trust signal
- Use `rel="noopener noreferrer"` on external links; add `rel="nofollow"` only for untrusted or paid links

## Check

For each content page, count the number of external `<a href>` links pointing to domains other than the current site. Check: (1) Are factual claims backed by links to authoritative sources (government sites, peer-reviewed research, official documentation)? (2) Do all external links have `rel="noopener noreferrer"` for security? (3) Are paid or sponsored links marked with `rel="sponsored"` or `rel="nofollow"`?

## Fix

1. Identify factual claims in the content that cite statistics, research, or expert consensus without a source link.
2. Find the authoritative source (study, official documentation, government data) and add an inline link.
3. Add `rel="noopener noreferrer"` to all external links for security.
4. Add `rel="sponsored"` to paid or affiliate links; `rel="nofollow"` to links you cannot vouch for.
5. Avoid linking to competitor sites for their main commercial pages; prefer linking to neutral third parties.
Example: Replace "Studies show 60% of users abandon slow pages" with:
"According to <a href="https://web.dev/performance/" rel="noopener noreferrer">Google's web.dev research</a>, 60% of users abandon pages that take over 3 seconds to load."


## Explain

Google uses the context of your outbound links as a signal of content quality. Pages that cite reputable external sources are treated as more trustworthy than those making unsupported assertions. Properly attributed external links also demonstrate E-E-A-T by showing you have researched the topic from primary sources.

## Code Review

Parse all `<a href>` elements with external URLs (different domain than the site). Verify each external link has `rel="noopener noreferrer"`. Flag paid/affiliate links missing `rel="sponsored"`. Count external links per page — flag pages with zero external links in long-form content (>500 words) that contains factual claims.

---

For full implementation details, code examples, and framework-specific guidance,
see `references/rule.md`.

Rule page: https://frontendchecklist.io/rules/seo/external-links
