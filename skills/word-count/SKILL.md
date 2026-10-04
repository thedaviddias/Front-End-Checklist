---
name: word-count
description: "Use when applies to key landing pages, blog posts, product pages, and any page targeting competitive queries. Use when diagnosing poor rankings or after a Google Helpful Content update."
metadata:
  category: seo
  priority: medium
  difficulty: beginner
  estimatedTime: "10"
  source: frontendchecklist.io
  url: https://frontendchecklist.io/rules/seo/word-count
---

# Avoid thin content on key pages

Google's quality systems penalise pages that provide little original value — thin pages on important topics lose rankings to competitors with more comprehensive, useful content.

## Quick Reference

- Thin content is not defined by word count alone — a 200-word page that fully answers a query is not thin
- Pages with very little unique content (under ~200 words) that don't satisfy user intent risk being considered low-quality
- Google's Helpful Content guidance emphasizes depth, accuracy, and usefulness over raw word count
- Compare content depth to top-ranking competitors for the target query rather than applying a fixed word count

## Check

For key pages, count visible body text words (excluding navigation, headers, footers). Flag pages under 200 words of unique body content. For content pages targeting informational queries, compare depth to the top 3 ranking pages. Identify pages with boilerplate text or thin CMS templates.

## Fix

Expand thin pages by addressing topics users are actually looking for: add FAQs, examples, comparisons, how-to steps, or data. Remove or consolidate thin pages that cannot be meaningfully expanded. Add `noindex` to thin utility pages that should not compete in search.

## Explain

Explain what thin content means in Google's quality systems, why word count alone is not a valid metric, and how to evaluate content depth relative to user intent and competitive content.

## Code Review

Review metadata generation, rendered HTML, structured data, and response headers related to Avoid thin content on key pages. Flag exact routes or templates where search-facing output violates the rule, and describe how to verify the final page output.

---

For full implementation details, code examples, and framework-specific guidance,
see `references/rule.md`.

Rule page: https://frontendchecklist.io/rules/seo/word-count
