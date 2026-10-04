---
name: duplicate-description
description: "Use when auditing a site's meta tag uniqueness, generating page-specific meta descriptions, or reviewing CMS templates that inject the same description globally."
metadata:
  category: seo
  priority: medium
  difficulty: intermediate
  estimatedTime: "10"
  source: frontendchecklist.io
  url: https://frontendchecklist.io/rules/seo/duplicate-description
---

# Avoid duplicate meta descriptions

When multiple pages share the same meta description, Google ignores them and generates its own snippet, often pulling unrelated text. Unique descriptions improve click-through rates from search results and help users quickly understand what a page offers.

## Quick Reference

- Each page must have a unique `<meta name="description">` — never reuse the same text across multiple pages
- Google may auto-generate snippets when descriptions are duplicated or missing, often producing worse results
- Target 50–160 characters; craft descriptions that describe the specific page, not the site

## Check

Scan the HTML of every page for `<meta name="description" content="...">`. Identify any description value that appears on more than one URL. Flag pages using the same description as another page, and flag pages where the description matches the site tagline or homepage description.

## Fix

1. List every page with a duplicate meta description.
2. For each page, write a unique description that summarises that page's specific content (50–160 characters).
3. In Next.js/React, pass a dynamic `description` prop through your SEO component instead of a static string.
4. In WordPress/CMS, disable site-wide description fallback in your SEO plugin (Yoast, RankMath) and set per-post descriptions.
Example of a unique description per page:
- Homepage: "Front-End Checklist helps developers build faster, more accessible, and better-ranked websites."
- Blog post: "Learn how canonical tags prevent duplicate-content penalties and consolidate PageRank across URL variants."


## Explain

Duplicate meta descriptions tell Google the pages are interchangeable, diluting search visibility. Each page competes in search for different queries, so the description must match the page's unique intent and content to earn a relevant snippet and a higher click-through rate.

## Code Review

Check that no two `<meta name="description">` tags in the rendered HTML across different routes share identical `content` values. Confirm the description is set dynamically per route in the framework's head management (e.g., Next.js `metadata` export, Nuxt `useHead`).

---

For full implementation details, code examples, and framework-specific guidance,
see `references/rule.md`.

Rule page: https://frontendchecklist.io/rules/seo/duplicate-description
