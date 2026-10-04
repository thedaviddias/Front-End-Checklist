---
name: meta-title
description: "Use when auditing page metadata or generating SEO-optimized titles. Applies to every HTML page that should appear in search results."
metadata:
  category: seo
  priority: high
  difficulty: beginner
  estimatedTime: "10"
  source: frontendchecklist.io
  url: https://frontendchecklist.io/rules/seo/meta-title
---

# Write a descriptive page title

The &lt;title&gt; tag is the most prominent element in search result listings and browser tabs—it directly influences click-through rates and is a confirmed Google ranking signal.

## Quick Reference

- Every page must have a unique &lt;title&gt; tag inside &lt;head&gt;
- Target 50–60 characters to avoid truncation in SERPs
- Put the primary keyword near the beginning of the title
- Avoid duplicate titles across pages

## Check

Check the &lt;head&gt; section for a &lt;title&gt; tag. Verify it is unique (not duplicated on other pages), between 10 and 60 characters, and contains the page's primary keyword.

## Fix

Add or update the &lt;title&gt; tag in &lt;head&gt;. Write a descriptive title of 50–60 characters that includes the primary keyword near the start and is unique across the site. Do not stuff keywords.

## Explain

The &lt;title&gt; tag appears as the clickable headline in search results and browser tabs. It is a primary on-page SEO factor—Google uses it to understand what the page is about and displays it to users deciding whether to click.

## Code Review

Check the &lt;head&gt; for a &lt;title&gt; element. Verify: (1) exactly one &lt;title&gt; tag exists, (2) text content is between 10 and 60 characters, (3) the title is not identical to other pages' titles, (4) the primary keyword appears in the first half of the title, (5) the title is not empty or contains only a brand name.

---

For full implementation details, code examples, and framework-specific guidance,
see `references/rule.md`.

Rule page: https://frontendchecklist.io/rules/seo/meta-title
