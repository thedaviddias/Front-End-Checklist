---
name: keyword-stuffing
description: "Use when auditing content pages for over-optimisation, reviewing AI-generated content that may repeat target phrases excessively, or checking meta tags and alt text for unnatural keyword accumulation."
metadata:
  category: seo
  priority: medium
  difficulty: intermediate
  estimatedTime: "10"
  source: frontendchecklist.io
  url: https://frontendchecklist.io/rules/seo/keyword-stuffing
---

# Avoid keyword stuffing

Google's spam detection algorithms penalise pages that unnaturally repeat keywords to manipulate rankings. Keyword-stuffed pages are demoted in search results or removed from the index entirely. Natural, reader-focused writing with topical variation outperforms keyword-dense content.

## Quick Reference

- Keyword density above ~2–3% for any single term is a signal of keyword stuffing — write for readers, not keyword counters
- Repeating keywords unnaturally in titles, headers, alt text, or meta descriptions triggers Google's spam filters
- Google's algorithms (Panda, SpamBrain) penalise pages with manipulative keyword density; natural language variation is rewarded

## Check

Analyse the page's main content body, `<title>`, `<meta name='description'>`, heading elements (H1–H6), and `<img alt>` attributes. Flag: (1) Any single keyword or phrase appearing more than 3× in the title tag. (2) Any keyword with a density above 3% of total word count. (3) Lists of keywords with no context (e.g., 'cheap flights, affordable flights, discount flights, best flight deals'). (4) Alt text that is a comma-separated list of keywords instead of a description. (5) Hidden text (white text on white background, or `display:none` containing keywords).

## Fix

1. Rewrite keyword-dense passages using natural language variation:
   - Instead of repeating "SEO best practices" 8 times, use: "search engine optimisation", "ranking strategies", "organic search tips", "on-page SEO"
2. Remove keyword lists from meta descriptions — write a single natural sentence.
3. Fix keyword-stuffed alt text: replace "cheap flights london paris affordable flights" with "Passenger cabin view on London to Paris flight"
4. If AI-generated content was used, review for repetitive phrasing and rewrite with varied terminology.
5. Check for hidden text using browser DevTools CSS computed styles — remove any keyword content in hidden elements.
6. Test the page's readability with the Flesch Reading Ease score — awkward keyword insertion lowers readability scores.


## Explain

Google's Panda algorithm (now core to its main ranking system) and SpamBrain spam detection specifically target content with unnatural keyword density. Pages that appear to manipulate keyword frequency are demoted or removed from results. Google's documentation explicitly cites 'stuffing keywords into your content' as a violation of its quality guidelines. Natural writing that covers a topic comprehensively, using synonyms and related terms, outperforms keyword-dense content.

## Code Review

Extract text content from the page body (strip HTML tags). Tokenise into words. Compute frequency of each unique word and common phrases (bigrams, trigrams). Flag any word/phrase appearing more than 3% of total word count. Also check `<title>`, `<meta name='description'>`, and `alt` attributes for repeated keywords. Report top 5 most frequent terms and their density percentages.

---

For full implementation details, code examples, and framework-specific guidance,
see `references/rule.md`.

Rule page: https://frontendchecklist.io/rules/seo/keyword-stuffing
