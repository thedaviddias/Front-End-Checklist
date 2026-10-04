---
name: geo-meta
description: "Use when auditing locally-focused or regionally-targeted pages for geo targeting signals, particularly on sites targeting audiences through Bing or regional search engines. Note that these meta tags have no documented effect on Google's ranking."
metadata:
  category: seo
  priority: medium
  difficulty: intermediate
  estimatedTime: "10"
  source: frontendchecklist.io
  url: https://frontendchecklist.io/rules/seo/geo-meta
---

# Geo Meta Tags

While Google does not officially support geo meta tags, Bing and other search engines may use them for geographic targeting. For sites with clear regional focus, they provide a low-effort supplementary signal alongside the primary approaches (hreflang, LocalBusiness schema, NAP consistency).

## Quick Reference

- Geo meta tags (`geo.region`, `geo.placename`, `geo.position`) are not used by Google, but may be read by Bing and minor engines
- Prefer hreflang for multi-region/language targeting and LocalBusiness JSON-LD for local business signals
- Include geo meta tags only as a supplementary signal alongside, not instead of, structured data and hreflang

## Check

In the page `<head>`, check for `<meta name="geo.region">`, `<meta name="geo.placename">`, and `<meta name="geo.position">` tags. Verify: (1) `geo.region` uses a valid ISO 3166-1/3166-2 code (e.g., `US-CA` for California, `GB-ENG` for England). (2) `geo.position` uses latitude;longitude format (e.g., `37.7749;-122.4194`). (3) ICBM meta tag matches geo.position if present.

## Fix

1. Add geo meta tags to region-specific pages in the `<head>`:
   ```html
   <meta name="geo.region" content="US-CA">
   <meta name="geo.placename" content="San Francisco">
   <meta name="geo.position" content="37.7749;-122.4194">
   <meta name="ICBM" content="37.7749, -122.4194">
   ```
2. Use ISO 3166-2 codes for `geo.region`: country code + region code.
3. Ensure `geo.position` and `ICBM` use consistent coordinates.
4. For Google targeting, prioritise: hreflang (multilingual), LocalBusiness JSON-LD (local businesses), and Google Search Console's International Targeting settings.


## Explain

Geo meta tags signal a page's geographic focus to search engines. While Google does not use them as a ranking factor, Bing's guidelines reference them for geo-targeting. They are most useful for regional or local sites wanting to signal geographic relevance without significant development effort. They should supplement, not replace, hreflang and LocalBusiness structured data.

## Code Review

Check `<meta name='geo.region'>` for a valid ISO 3166-2 value (e.g., 'US-CA', 'GB-LND'). Verify `geo.position` format as `lat;lon` (semicolon separator). Flag if geo tags are present but contradict the site's actual target region. Note if geo tags are used without accompanying hreflang or LocalBusiness schema, which are more impactful.

---

For full implementation details, code examples, and framework-specific guidance,
see `references/rule.md`.

Rule page: https://frontendchecklist.io/rules/seo/geo-meta
