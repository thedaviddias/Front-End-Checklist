---
name: review
description: "Use when applies to product pages, local business pages, recipes, apps, books, and any page that aggregates user reviews. Use when auditing rich result eligibility for e-commerce or review sites."
metadata:
  category: seo
  priority: medium
  difficulty: intermediate
  estimatedTime: "10"
  source: frontendchecklist.io
  url: https://frontendchecklist.io/rules/seo/review
---

# Add Review schema markup

Star ratings in search results increase click-through rates by up to 35%; incorrect or missing schema means competitors with valid markup capture that visibility advantage.

## Quick Reference

- Use `Review` schema on individual review pages and `AggregateRating` on product/service pages to earn star-rating rich results
- `AggregateRating` requires `ratingValue`, `ratingCount` or `reviewCount`, and valid `bestRating` / `worstRating` values
- Ratings must reflect genuine user reviews — Google penalises self-serving or fabricated ratings
- Validate markup with Google's Rich Results Test before deploying

## Check

Inspect the page source or rendered DOM for JSON-LD blocks containing `"@type": "Review"` or `"@type": "AggregateRating"`. Verify required properties are present: `ratingValue`, `ratingCount`/`reviewCount`, `bestRating`. Run the URL through Google's Rich Results Test.

## Fix

Add a JSON-LD `<script>` block with `AggregateRating` nested inside the main entity (Product, LocalBusiness, etc.). Populate `ratingValue` and `ratingCount` from real review data. Remove any schema on pages with no genuine user reviews.

## Explain

Explain how Review and AggregateRating schema work, which page types are eligible for star-rating rich results in Google Search, and why fabricated ratings violate Google's structured data guidelines.

## Code Review

Review metadata generation, rendered HTML, structured data, and response headers related to Add Review schema markup. Flag exact routes or templates where search-facing output violates the rule, and describe how to verify the final page output.

---

For full implementation details, code examples, and framework-specific guidance,
see `references/rule.md`.

Rule page: https://frontendchecklist.io/rules/seo/review
