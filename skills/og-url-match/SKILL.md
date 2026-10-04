---
name: og-url-match
description: "Use when auditing Open Graph tags or investigating why social share counts appear low. Applies to any page with both canonical-url and og:url tags."
metadata:
  category: seo
  priority: medium
  difficulty: beginner
  estimatedTime: "10"
  source: frontendchecklist.io
  url: https://frontendchecklist.io/rules/seo/og-url-match
---

# OG URL Match

When og:url doesn't match the canonical URL, social platforms track share counts separately for each URL variant—published share counts get split across multiple URLs and appear lower than they actually are.

## Quick Reference

- og:url must exactly match the <link rel='canonical-url'> URL
- Use absolute HTTPS URLs for both og:url and canonical-url
- Mismatched URLs cause social platforms to aggregate share counts on the wrong URL
- og:url should be the clean canonical URL without tracking parameters

## Check

Compare the og:url meta tag value with the <link rel='canonical'> href value. Both must be identical absolute HTTPS URLs. Flag any page where they differ, either in protocol, domain, path, or query string.

## Fix

Set og:url to exactly the same absolute HTTPS URL as the canonical tag. Remove any UTM parameters, session IDs, or tracking tokens from og:url. If no canonical tag exists, add one and set og:url to match it.

## Explain

Social platforms use og:url as the canonical identifier for aggregating share counts and comments. If og:url differs from the canonical tag, shares on the page URL and shares of the og:url accumulate separately, making your content appear less popular than it is and creating attribution confusion.

## Code Review

Compare the value of <meta property='og:url' content='...'> with the value of <link rel='canonical' href='...'>. They must be identical character-for-character. Check for: different protocols (http vs https), www vs non-www mismatch, query string differences, trailing slash inconsistencies. Flag any page where the two values differ.

---

For full implementation details, code examples, and framework-specific guidance,
see `references/rule.md`.

Rule page: https://frontendchecklist.io/rules/seo/og-url-match
