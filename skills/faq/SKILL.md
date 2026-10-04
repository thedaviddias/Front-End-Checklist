---
name: faq
description: "Use when adding FAQ sections to landing pages or blog posts, generating FAQPage JSON-LD from existing Q&A content, or validating that structured data on pages with FAQ sections is syntactically and semantically correct."
metadata:
  category: seo
  priority: medium
  difficulty: intermediate
  estimatedTime: "10"
  source: frontendchecklist.io
  url: https://frontendchecklist.io/rules/seo/faq
---

# Add FAQPage schema markup

Valid FAQPage structured data can generate rich results in Google Search, displaying expandable question-and-answer pairs directly in the SERP. This increases click-through rate and SERP real estate without requiring a higher ranking position.

## Quick Reference

- Add `FAQPage` JSON-LD with `mainEntity` question/answer pairs to pages that contain FAQ sections
- Each `Question` must include `acceptedAnswer` with an `Answer` type containing the `text` property
- Only use FAQPage schema when the page actually contains FAQ-style question-and-answer content visible to users

## Check

Check pages that contain FAQ or Q&A sections. For each: (1) Is there a `<script type="application/ld+json">` block with `"@type": "FAQPage"`? (2) Does it include a `mainEntity` array of `Question` objects? (3) Does each `Question` have a `name` (the question text) and an `acceptedAnswer` with `"@type": "Answer"` and a `text` property? (4) Does the schema content match what is visible on the page?

## Fix

1. Identify pages with FAQ-style content (a section of questions and answers visible to users).
2. Add a JSON-LD script to the page `<head>` or `<body>`:
```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How do I reset my password?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Click 'Forgot password' on the login page and enter your email address. You will receive a reset link within 5 minutes."
      }
    }
  ]
}
```
3. Validate the markup using Google's Rich Results Test at https://search.google.com/test/rich-results.
4. Ensure every question in the schema has a corresponding visible answer on the page.


## Explain

FAQPage structured data enables Google to display expandable Q&A pairs directly in search results as a rich result. This increases the page's visible footprint in the SERP and can improve click-through rate. Invalid or mismatched schema (questions in markup not visible on page) will cause Google to ignore it and may trigger a manual action.

## Code Review

Parse all `<script type="application/ld+json">` blocks. Find any with `"@type": "FAQPage"`. Validate that `mainEntity` is an array, each item has `"@type": "Question"`, `name` is a non-empty string, and `acceptedAnswer` is an object with `"@type": "Answer"` and a non-empty `text`. Cross-reference each question in the schema against visible question elements on the page.

---

For full implementation details, code examples, and framework-specific guidance,
see `references/rule.md`.

Rule page: https://frontendchecklist.io/rules/seo/faq
