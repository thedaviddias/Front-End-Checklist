---
name: share-buttons
description: "Use when applies to blog posts, news articles, tutorials, and other long-form content. Less relevant for product pages, service pages, or home pages. Use when optimizing content distribution."
metadata:
  category: seo
  priority: low
  difficulty: beginner
  estimatedTime: "10"
  source: frontendchecklist.io
  url: https://frontendchecklist.io/rules/seo/share-buttons
---

# Add share buttons to content pages

Social sharing extends content reach organically — shared articles gain traffic, which can attract backlinks that do contribute to search rankings over time.

## Quick Reference

- Add sharing buttons to article and blog post pages to lower the friction for social distribution
- Use privacy-friendly share buttons (no third-party scripts): construct share URLs manually
- X (Twitter), LinkedIn, and Facebook share the vast majority of B2B and B2C content
- Share buttons do not directly affect Google ranking but drive traffic that can result in backlinks

## Check

On article and blog post pages, check for social sharing buttons or links. Verify they use the correct share URL format for each platform (X, LinkedIn, Facebook, WhatsApp). Check that share URLs pre-populate the article title and URL. Verify no heavy third-party share scripts are loaded.

## Fix

Add share links constructed with platform share URLs (no third-party SDKs required). Use `window.location.href` or the page's canonical URL as the shared link. Include `og:title` and `og:image` so the shared link renders a rich preview.

## Explain

Explain how social sharing contributes to content distribution and indirect SEO through traffic and backlinks, why privacy-friendly share links (no tracking scripts) are preferred, and which platforms matter most for a given content type.

## Code Review

Review metadata generation, rendered HTML, structured data, and response headers related to Add share buttons to content pages. Flag exact routes or templates where search-facing output violates the rule, and describe how to verify the final page output.

---

For full implementation details, code examples, and framework-specific guidance,
see `references/rule.md`.

Rule page: https://frontendchecklist.io/rules/seo/share-buttons
