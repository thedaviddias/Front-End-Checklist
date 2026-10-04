---
name: plain-language
description: "Use when reviewing rendered HTML, interactive components, or design-system patterns related to Write in plain language. Check native semantics first, then inspect keyboard behavior, focus flow, accessible names, and screen-reader output where relevant."
metadata:
  category: accessibility
  priority: medium
  difficulty: beginner
  estimatedTime: "20"
  source: frontendchecklist.io
  url: https://frontendchecklist.io/rules/accessibility/plain-language
---

# Write in plain language

Plain language helps users with cognitive disabilities, learning differences, attention disorders, non-native speakers, and anyone reading quickly or under stress.

## Quick Reference

- Use short sentences and common words
- Define technical terms when first used
- Write in active voice, not passive
- Target reading level appropriate for your audience (often 8th grade)

## Check

Review content for jargon, complex sentences, and unnecessary technical terms. Verify reading level is appropriate for the audience. Check that instructions are clear and actions are obvious.

## Fix

Simplify complex sentences. Define technical terms when first used. Use short paragraphs and bullet points. Write in active voice. Target a reading level appropriate for your broadest audience.

## Explain

Explain how plain language benefits users with cognitive disabilities, learning differences, attention disorders, non-native speakers, and anyone in a hurry or under stress.

## Code Review

Review the rendered markup and interactive states that affect Write in plain language. Flag exact elements, roles, labels, focus behavior, or keyboard interactions that violate the rule, and note how to verify the fix with browser accessibility tooling or assistive tech.

---

For full implementation details, code examples, and framework-specific guidance,
see `references/rule.md`.

Rule page: https://frontendchecklist.io/rules/accessibility/plain-language
