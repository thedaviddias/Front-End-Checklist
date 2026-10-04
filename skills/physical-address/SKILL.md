---
name: physical-address
description: "Use when auditing local business websites, e-commerce sites, or any site where a physical presence affects trust or local search visibility."
metadata:
  category: seo
  priority: medium
  difficulty: beginner
  estimatedTime: "10"
  source: frontendchecklist.io
  url: https://frontendchecklist.io/rules/seo/physical-address
---

# Display a physical business address

A visible physical address builds user trust (especially for e-commerce and YMYL sites), supports local SEO rankings, and is a requirement for compliance in many jurisdictions.

## Quick Reference

- Display a complete physical address on the contact page and footer
- Mark up the address with LocalBusiness schema or HTML microdata
- Consistent address format builds trust and supports local SEO
- Use <address> HTML element for semantic correctness

## Check

Check the contact page and footer for a visible physical address. Verify the address is complete (street, city, state/region, postal code, country). Check whether the address uses the <address> HTML element and whether it is backed by LocalBusiness or PostalAddress schema markup.

## Fix

Add the complete physical address to the footer and contact page. Wrap it in an <address> HTML element. Ensure the address exactly matches the address in your LocalBusiness JSON-LD schema and your Google Business Profile.

## Explain

Displaying a physical address confirms to users and search engines that a business exists at a real location. For local SEO, the on-page address must match the address in Google Business Profile and LocalBusiness schema — inconsistencies reduce Google's confidence in the data and suppress local rankings.

## Code Review

Check the contact page and footer for visible address text. Verify the address includes: street number and name, city, state/region, postal code, and country. Check for <address> HTML element semantic wrapper. Cross-reference the visible address against any LocalBusiness JSON-LD schema address fields — they must match exactly. Flag if no address is found on either contact page or footer.

---

For full implementation details, code examples, and framework-specific guidance,
see `references/rule.md`.

Rule page: https://frontendchecklist.io/rules/seo/physical-address
