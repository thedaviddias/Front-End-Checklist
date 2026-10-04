---
name: nosnippet
description: "Use when auditing robots meta tags. Applies to any important landing page, article, or product page that should appear with a description in search results."
metadata:
  category: seo
  priority: medium
  difficulty: intermediate
  estimatedTime: "10"
  source: frontendchecklist.io
  url: https://frontendchecklist.io/rules/seo/nosnippet
---

# Avoid nosnippet on important pages

Pages with nosnippet display without a description in search results, reducing click-through rates and making it harder for users to understand whether the result is relevant to their query.

## Quick Reference

- nosnippet prevents Google from showing a description under your title in search results
- Pages without snippets have significantly lower click-through rates
- Use max-snippet:-1 to explicitly allow unlimited snippet length instead
- Only use nosnippet deliberately on legally sensitive content

## Check

Check the <meta name='robots'> tag and X-Robots-Tag response header for each important page. Flag any that contain 'nosnippet' or 'max-snippet:0'. Confirm these pages intentionally suppress snippets.

## Fix

Remove 'nosnippet' from the <meta name='robots'> content attribute on important pages. Replace with 'max-snippet:-1' to explicitly allow full-length snippets, or simply omit snippet directives to use the default (allowed).

## Explain

The nosnippet directive tells Google not to display a text snippet (description) for your page in search results. Without a snippet, users see only the page title and URL—this reduces click-through rates and is rarely the intended behaviour for content pages.

## Code Review

Check all pages for <meta name='robots' content='...'> tags. Parse the content value and flag any that include 'nosnippet' or 'max-snippet:0'. Generate a report of affected URLs, their page type, and whether the nosnippet directive is intentional. Also check X-Robots-Tag response headers.

---

For full implementation details, code examples, and framework-specific guidance,
see `references/rule.md`.

Rule page: https://frontendchecklist.io/rules/seo/nosnippet
