---
name: product
description: "Use when auditing e-commerce product pages or implementing structured data for a shop. Applies to any page selling or describing a specific product."
metadata:
  category: seo
  priority: medium
  difficulty: intermediate
  estimatedTime: "20"
  source: frontendchecklist.io
  url: https://frontendchecklist.io/rules/seo/product
---

# Add Product schema markup

Product schema enables Google to show price, availability, ratings, and review count directly in search results—rich results have significantly higher click-through rates than standard blue links.

## Quick Reference

- Add Product JSON-LD schema to every product page for rich result eligibility
- Required for rich results: name, image, description, and offers (with price and priceCurrency)
- Include aggregateRating for star ratings in search results
- Prices in schema must match the prices displayed on the page

## Check

Check each product page for a JSON-LD script block with @type 'Product'. Verify it includes: name, image, description, and an offers property with price, priceCurrency, and availability. Check that prices in schema match the visible page prices. Validate with Google's Rich Results Test.

## Fix

Add a Product JSON-LD block to each product page. Required: name, image (array of URLs), description, offers.price, offers.priceCurrency, offers.availability. Recommended: aggregateRating (ratingValue, reviewCount), brand, sku, gtin13/gtin8/mpn.

## Explain

Product structured data enables Google Shopping-style rich results in organic search, showing price, star ratings, and stock status directly in the SERP. These rich results have higher visual prominence and click-through rates. Without schema, Google can only show a plain blue link for your product pages.

## Code Review

Find JSON-LD blocks with @type 'Product'. Verify required fields: name, image (must be absolute URL array), description, offers.price (numeric), offers.priceCurrency (ISO 4217 code), offers.availability (schema.org URL). Check that offers.price matches the visible price on the page. Validate that aggregateRating.reviewCount > 0 if rating is present. Run through Google's Rich Results Test.

---

For full implementation details, code examples, and framework-specific guidance,
see `references/rule.md`.

Rule page: https://frontendchecklist.io/rules/seo/product
