---
name: nap-consistency
description: "Use when auditing a local business website for local SEO. Applies to any business that has a physical address and wants to appear in local search results or Google Maps."
metadata:
  category: seo
  priority: medium
  difficulty: intermediate
  estimatedTime: "15"
  source: frontendchecklist.io
  url: https://frontendchecklist.io/rules/seo/nap-consistency
---

# Keep NAP details consistent

Inconsistent NAP information across a website signals to search engines that the business details are unreliable, which can suppress local rankings and prevent the Knowledge Panel from showing accurate information.

## Quick Reference

- NAP = Name, Address, Phone — must be identical everywhere they appear on the site
- Inconsistencies confuse search engines and hurt local ranking
- Use identical formatting: same abbreviations, same phone format, same suite notation
- Reinforce NAP consistency in LocalBusiness schema markup

## Check

Search the site for all instances of the business name, street address, and phone number. Compare each occurrence for exact consistency in spelling, formatting, and abbreviation (e.g., 'St.' vs 'Street', '555-1234' vs '(555) 123-4567'). Also check JSON-LD LocalBusiness schema against the visible text.

## Fix

Standardise all NAP occurrences to a single canonical-url format. Choose one format for each field: full street name vs abbreviation, phone number formatting, suite/unit notation. Update all pages, footer, contact page, about page, and structured data to match exactly.

## Explain

NAP consistency is a local SEO ranking factor. Google cross-references a business's Name, Address, and Phone across the site and external citations (Google Business Profile, directories). When these differ even slightly, Google's confidence in the data decreases, which can lower local rankings and show incorrect information in search results.

## Code Review

Extract all instances of the business name, street address, and phone number from the site. Compare each instance for exact formatting consistency: same abbreviations (St. vs Street), same phone format, same suite notation. Extract the address from any LocalBusiness JSON-LD and compare against visible HTML text. Report any differences.

---

For full implementation details, code examples, and framework-specific guidance,
see `references/rule.md`.

Rule page: https://frontendchecklist.io/rules/seo/nap-consistency
