---
name: local-business
description: "Use when auditing a local business website's structured data. Applies to any business that serves customers at a physical location or specific geographic area."
metadata:
  category: seo
  priority: medium
  difficulty: intermediate
  estimatedTime: "20"
  source: frontendchecklist.io
  url: https://frontendchecklist.io/rules/seo/local-business
---

# Add LocalBusiness schema markup

LocalBusiness schema enables Google to show your business details (hours, address, phone, rating) directly in search results and Google Maps, improving local visibility without requiring a click.

## Quick Reference

- Add LocalBusiness JSON-LD schema to your homepage and contact page
- Required properties: @type, name, address (PostalAddress), telephone
- Include openingHours, geo coordinates, and image for richer results
- Use a more specific sub-type when available (Restaurant, DentalClinic, etc.)

## Check

Check the page source for a JSON-LD script block with @type matching 'LocalBusiness' or a sub-type (Restaurant, Store, etc.). Verify the required properties are present: name, address with PostalAddress, telephone, and url. Validate with Google's Rich Results Test.

## Fix

Add a <script type='application/ld+json'> block to the homepage with LocalBusiness schema. Include: @context, @type, name, address (with streetAddress, addressLocality, addressRegion, postalCode, addressCountry), telephone, url, openingHours, and geo. Use a specific sub-type if applicable.

## Explain

LocalBusiness structured data tells Google the essential details about a physical business. This data powers the Knowledge Panel in search results, the local pack ('map pack'), and integrations with Google Maps. Without it, Google has to guess business details from unstructured page content.

## Code Review

Find JSON-LD script blocks with @type 'LocalBusiness' or a sub-type. Verify required fields: name, address.streetAddress, address.addressLocality, address.addressRegion, address.postalCode, address.addressCountry, telephone, url. Check that address values match the visible on-page address text. Validate with Google's Rich Results Test API.

---

For full implementation details, code examples, and framework-specific guidance,
see `references/rule.md`.

Rule page: https://frontendchecklist.io/rules/seo/local-business
