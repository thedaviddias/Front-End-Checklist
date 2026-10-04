---
name: meta-description
description: "Use when auditing page metadata or generating descriptions for new pages. Applies to every page that should receive organic search traffic."
metadata:
  category: seo
  priority: high
  difficulty: beginner
  estimatedTime: "10"
  source: frontendchecklist.io
  url: https://frontendchecklist.io/rules/seo/meta-description
---

# Write a meta description for each page

A compelling meta description acts as organic ad copy in search results—well-written descriptions improve click-through rates even though they are not a direct ranking signal.

## Quick Reference

- Every page should have a unique meta description between 120–160 characters
- Meta descriptions are not a ranking factor but strongly influence click-through rates
- Write descriptions as a call to action that summarises the page value
- Google may override your description with content from the page

## Check

Check the <head> for a <meta name='description'> tag. Verify it is present, unique, and between 120 and 160 characters. Flag pages where it is missing, duplicated, or outside the recommended length.

## Fix

Add or update the <meta name='description' content='...'> tag in <head>. Write a unique summary of 120–160 characters that accurately describes the page content and includes a natural call to action or value proposition.

## Explain

The meta description appears as the short paragraph below the title in search results. Although not a ranking factor, a compelling description improves click-through rate, which can indirectly benefit rankings.

## Code Review

Check the <head> for <meta name='description' content='...'> element. Verify: (1) the element exists, (2) content attribute is non-empty, (3) length is between 70 and 160 characters, (4) no HTML tags inside content, (5) the description is unique (not the same as other pages).

---

For full implementation details, code examples, and framework-specific guidance,
see `references/rule.md`.

Rule page: https://frontendchecklist.io/rules/seo/meta-description
