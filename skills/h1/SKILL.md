---
name: h1
description: "Use when auditing a page's heading structure, generating H1 text for landing pages or blog posts, or reviewing a CMS template that may produce empty or missing H1 elements."
metadata:
  category: seo
  priority: medium
  difficulty: intermediate
  estimatedTime: "10"
  source: frontendchecklist.io
  url: https://frontendchecklist.io/rules/seo/h1
---

# Use a single descriptive H1

The H1 is the most prominent heading on a page and a strong on-page ranking signal. Google uses it to understand the page's primary topic. Missing, duplicate, or keyword-free H1 tags reduce topical clarity, hurting rankings for the page's target terms.

## Quick Reference

- Each page should have exactly one `<h1>` tag that describes the page's primary topic with relevant keywords
- The H1 does not need to be identical to the `<title>` tag, but they should be topically consistent
- Empty `<h1>` tags, multiple `<h1>` tags on one page, or H1s containing only the brand name are all issues to fix

## Check

Parse the rendered DOM of each page. Count all `<h1>` elements. Flag: (1) Pages with zero `<h1>` tags. (2) Pages with more than one `<h1>` tag. (3) `<h1>` elements whose text content is empty or contains only whitespace. (4) `<h1>` elements that contain only the brand name with no page-specific topic. (5) `<h1>` text that does not reflect the page's primary content topic.

## Fix

1. Ensure every page template outputs exactly one `<h1>`.
2. The H1 text should describe the page's specific topic, not just the site name.
3. Include the primary target keyword naturally in the H1 — do not force it awkwardly.
4. If the page has multiple sections with separate H1 candidates, choose one main topic and demote others to H2.
5. Verify the H1 is visible in the rendered DOM (not hidden via CSS `display:none` or `visibility:hidden`).
6. In Next.js/React: ensure the H1 is in the page component, not in the shared layout.
Before: `<h1>Acme Corp</h1>` (brand only)
After: `<h1>Project Management Software for Enterprise Teams</h1>`


## Explain

Google's John Mueller has confirmed that H1 tags help Google understand page structure. While H1 is not the strongest ranking factor in isolation, it contributes to on-page topical relevance signals. Multiple H1 tags on one page dilute the primary topic signal; a missing H1 leaves a structural gap that reduces confidence in what the page is about.

## Code Review

Query the DOM for all `<h1>` elements. Assert exactly one exists per page. Check that `innerText.trim()` is non-empty. Compare H1 text to the page `<title>` — they should share core topic keywords. Flag if H1 is inside a `<header>` element shared across all pages (often the site logo alt text) rather than specific to the page content.

---

For full implementation details, code examples, and framework-specific guidance,
see `references/rule.md`.

Rule page: https://frontendchecklist.io/rules/seo/h1
