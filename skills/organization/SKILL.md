---
name: organization
description: "Use when auditing structured data on a business or brand website homepage. Applies to organisations, companies, non-profits, and publishers that want accurate Knowledge Panel information in Google Search."
metadata:
  category: seo
  priority: medium
  difficulty: intermediate
  estimatedTime: "15"
  source: frontendchecklist.io
  url: https://frontendchecklist.io/rules/seo/organization
---

# Add Organization schema markup

Organization schema helps Google understand your brand, populate your Knowledge Panel with accurate information (logo, social links, contact details), and improve brand-related search appearance.

## Quick Reference

- Add Organization JSON-LD schema to your homepage (and only the homepage)
- Required: name, url, logo — all other properties strengthen your Knowledge Panel
- sameAs links to social profiles help Google confirm your brand identity
- Use a persistent logo URL that won't change; it appears in Google's Knowledge Panel

## Check

Check the homepage for a JSON-LD script block with @type 'Organization' or 'Corporation'. Verify it includes: name, url, logo (with @type ImageObject), and sameAs array with social profile URLs. Validate with Google's Rich Results Test.

## Fix

Add an Organization schema JSON-LD block to the homepage <head>. Include name, url, logo (ImageObject with url, width, height), contactPoint, and sameAs array pointing to your official social media profiles and Wikipedia/Wikidata entries if available.

## Explain

Organization structured data tells Google who you are as a brand. Google uses it to populate the Knowledge Panel in search results—the box showing your logo, social profiles, and contact info that appears for branded queries. Without it, Google has to guess this information from unstructured content.

## Code Review

Check the homepage for a JSON-LD script with @type 'Organization' or 'Corporation'. Verify: name matches the site's official brand name, url matches the site's canonical-url homepage URL, logo.url is an absolute HTTPS URL pointing to an actual image, sameAs array contains at least 2 verified social profiles. Validate with Google's Rich Results Test. Confirm Organization schema is NOT duplicated on interior pages.

---

For full implementation details, code examples, and framework-specific guidance,
see `references/rule.md`.

Rule page: https://frontendchecklist.io/rules/seo/organization
