---
name: content-dates
description: "Use when auditing article or blog pages for date markup, generating Article JSON-LD with datePublished/dateModified, or checking whether a CMS template surfaces dates correctly."
metadata:
  category: seo
  priority: medium
  difficulty: intermediate
  estimatedTime: "10"
  source: frontendchecklist.io
  url: https://frontendchecklist.io/rules/seo/content-dates
---

# Show published and updated dates

Google uses publication and modification dates to assess content freshness, which influences rankings for time-sensitive queries. Visible dates also build user trust by signalling that content is current and maintained.

## Quick Reference

- Include a visible published date and a `dateModified` in JSON-LD for every article or blog post
- Use ISO 8601 format (`2024-03-15T10:00:00Z`) in structured data; human-readable in the visible UI
- Update `dateModified` only when content meaningfully changes — not on trivial edits

## Check

On each article or blog page, check: (1) Is there a visible published date in the page body or byline? (2) Does the JSON-LD `Article` or `BlogPosting` block include `datePublished` and `dateModified` properties in ISO 8601 format? (3) Does the `<head>` include `<meta property="article:published_time">` and `<meta property="article:modified_time">` Open Graph tags?

## Fix

1. Add a visible publication date in the page byline: `<time datetime="2024-03-15">March 15, 2024</time>`.
2. Add `datePublished` and `dateModified` to the Article JSON-LD block:
   ```json
   {
     "@type": "Article",
     "datePublished": "2024-03-15T10:00:00Z",
     "dateModified": "2024-11-20T14:30:00Z"
   }
   ```
3. Add Open Graph article time tags to `<head>`:
   ```html
   <meta property="article:published_time" content="2024-03-15T10:00:00Z">
   <meta property="article:modified_time" content="2024-11-20T14:30:00Z">
   ```
4. Ensure your CMS or build system updates `dateModified` automatically on content saves.


## Explain

Google's freshness algorithm rewards recently published or updated content for time-sensitive queries. Structured date markup lets Google confidently surface the correct date in search snippets; without it, Google must guess from page text or HTTP headers, often producing wrong or missing dates.

## Code Review

Verify that Article or BlogPosting JSON-LD includes both `datePublished` and `dateModified` in ISO 8601 format. Check that `<time datetime='...'>` elements in the body use machine-readable dates. Confirm `dateModified` updates when content changes, not just on every deploy.

---

For full implementation details, code examples, and framework-specific guidance,
see `references/rule.md`.

Rule page: https://frontendchecklist.io/rules/seo/content-dates
