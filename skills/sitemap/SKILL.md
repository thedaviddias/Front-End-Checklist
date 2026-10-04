---
name: sitemap
description: "Use when auditing metadata, crawlability, structured data, or indexability related to Create and submit an XML sitemap. Verify the rendered HTML and HTTP response rather than relying only on source files."
metadata:
  category: seo
  priority: high
  difficulty: beginner
  estimatedTime: "15"
  source: frontendchecklist.io
  url: https://frontendchecklist.io/rules/seo/sitemap
---

# Create and submit an XML sitemap

Search engines may not discover all your pages through links alone—a sitemap ensures every important page gets indexed, especially for large or newly launched sites.

## Quick Reference

- XML sitemaps help search engines discover all your pages
- Include priority and lastmod for important pages
- Submit to Google Search Console and Bing Webmaster Tools
- Reference sitemap in robots.txt

## Check

Verify that this website has a valid XML sitemap accessible at /sitemap.xml and that it's properly formatted.

## Fix

Generate or update the XML sitemap for this website including all important pages with proper priority and changefreq values.

## Explain

Explain how XML sitemaps help search engines discover and index website pages more efficiently.

## Code Review

Review metadata generation, rendered HTML, structured data, and response headers related to Create and submit an XML sitemap. Flag exact routes or templates where search-facing output violates the rule, and describe how to verify the final page output.

---

For full implementation details, code examples, and framework-specific guidance,
see `references/rule.md`.

Rule page: https://frontendchecklist.io/rules/seo/sitemap
