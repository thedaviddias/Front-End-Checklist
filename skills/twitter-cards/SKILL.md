---
name: twitter-cards
description: "Use when applies to any page intended to be shared on X (Twitter). Use when auditing social sharing previews or adding social meta tags to a new site."
metadata:
  category: seo
  priority: medium
  difficulty: beginner
  estimatedTime: "10"
  source: frontendchecklist.io
  url: https://frontendchecklist.io/rules/seo/twitter-cards
---

# Add Twitter Card meta tags

Pages shared on X without Twitter Cards show only a bare link; Cards add an image and description that significantly increase click-through rates from social traffic.

## Quick Reference

- Add `<meta name="twitter:card" content="summary_large_image">` to enable rich previews when shared on X (Twitter)
- Minimum required tags: `twitter:card`, `twitter:title`, `twitter:description`
- X falls back to Open Graph tags (`og:title`, `og:image`) if Twitter-specific tags are absent
- Recommended image size for `summary_large_image`: 1200×630 px, max 5 MB, JPG/PNG/WebP

## Check

Inspect `<head>` for `<meta name="twitter:card">`, `<meta name="twitter:title">`, `<meta name="twitter:description">`, and `<meta name="twitter:image">`. Verify the card type is valid (`summary` or `summary_large_image`). Test the URL in the X Card Validator.

## Fix

Add the required Twitter Card meta tags to the `<head>`. For article/blog pages use `summary_large_image`. Ensure `twitter:image` points to an absolute URL of an image at least 300×157 px (ideally 1200×630 px) under 5 MB.

## Explain

Explain how Twitter Cards enhance shared links, the difference between `summary` and `summary_large_image` card types, and how X falls back to Open Graph tags.

## Code Review

Review metadata generation, rendered HTML, structured data, and response headers related to Add Twitter Card meta tags. Flag exact routes or templates where search-facing output violates the rule, and describe how to verify the final page output.

---

For full implementation details, code examples, and framework-specific guidance,
see `references/rule.md`.

Rule page: https://frontendchecklist.io/rules/seo/twitter-cards
