---
name: og-tags
description: "Use when auditing a web page's social sharing metadata. Applies to any page users might share on social networks or messaging apps."
metadata:
  category: seo
  priority: medium
  difficulty: intermediate
  estimatedTime: "10"
  source: frontendchecklist.io
  url: https://frontendchecklist.io/rules/seo/og-tags
---

# Open Graph Tags

Open Graph tags control how your pages appear when shared on Facebook, LinkedIn, Slack, and other platforms—missing or incorrect tags result in unappealing link previews that reduce click-through rates.

## Quick Reference

- Include og:title, og:description, og:image, and og:url on every page
- Use absolute URLs for og:image and og:url
- og:image should be at least 1200×630 px for optimal display
- og:type defaults to 'website' if omitted, but setting it explicitly is best practice

## Check

Check the <head> for Open Graph meta tags: og:title, og:description, og:image, og:url, and og:type. Verify all values are non-empty and og:image/og:url use absolute HTTPS URLs.

## Fix

Add the four required Open Graph meta tags to the <head>: og:title (≤95 chars), og:description (≤200 chars), og:image (absolute HTTPS URL, 1200×630), og:url (canonical absolute URL). Add og:type='website' for standard pages.

## Explain

Open Graph tags control how this page is displayed when shared on social platforms like Facebook, LinkedIn, and Slack. Without them, platforms fall back to guessing the title, description, and image, often with poor results.

## Code Review

Check the rendered <head> for all five core OG properties: og:title, og:description, og:image, og:url, og:type. Verify og:image and og:url values start with 'https://'. Flag any empty content attributes. Compare og:url against the canonical tag — they must match exactly.

---

For full implementation details, code examples, and framework-specific guidance,
see `references/rule.md`.

Rule page: https://frontendchecklist.io/rules/seo/og-tags
