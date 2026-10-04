---
name: reading-level
description: "Use when reviewing content pages for user experience and SEO. Applies to blog posts, landing pages, how-to guides, and any long-form content intended for a broad audience."
metadata:
  category: seo
  priority: medium
  difficulty: intermediate
  estimatedTime: "15"
  source: frontendchecklist.io
  url: https://frontendchecklist.io/rules/seo/reading-level
---

# Write at a clear reading level

Content written beyond the reading level of the target audience increases bounce rates and reduces time-on-page—both engagement signals that correlate with search rankings.

## Quick Reference

- Target a Flesch Reading Ease score of 60–70 for general audiences (Grade 8–10)
- Use short sentences (15–20 words average) and common vocabulary
- Passive voice, jargon, and long paragraphs reduce readability
- Simple writing increases dwell time and reduces bounce rate

## Check

Analyse this page's content for readability. Calculate or estimate the Flesch-Kincaid Grade Level. Identify sentences longer than 25 words, paragraphs longer than 4 sentences, instances of passive voice, and domain jargon that could be simplified. Report the estimated reading grade level.

## Fix

Simplify the identified sentences and paragraphs: break long sentences at conjunctions, replace passive voice with active voice, substitute jargon with plain-language equivalents. Target a Flesch Reading Ease score of 60+ (Grade 8 or below for general audiences). Use subheadings to break up text every 200–300 words.

## Explain

Readability measures how easy content is to understand. When content is written above the typical reading level of the audience, users leave faster (higher bounce rate) and spend less time reading (lower dwell time). These engagement signals influence search rankings indirectly. Clear writing also improves conversion rates and user satisfaction.

## Code Review

Extract the text content from the page body (excluding navigation, headers, footers). Calculate or estimate the Flesch-Kincaid Grade Level. Count: sentences longer than 25 words, paragraphs with more than 4 sentences, passive voice instances, and words with more than 3 syllables that could be simplified. Report the grade level and top 5 most complex sentences.

---

For full implementation details, code examples, and framework-specific guidance,
see `references/rule.md`.

Rule page: https://frontendchecklist.io/rules/seo/reading-level
