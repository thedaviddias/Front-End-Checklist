---
name: inclusive-language
description: "Use when reviewing rendered HTML, interactive components, or design-system patterns related to Use inclusive language. Check native semantics first, then inspect keyboard behavior, focus flow, accessible names, and screen-reader output where relevant."
metadata:
  category: accessibility
  priority: medium
  difficulty: beginner
  estimatedTime: "20"
  source: frontendchecklist.io
  url: https://frontendchecklist.io/rules/accessibility/inclusive-language
---

# Use inclusive language

Language shapes experience—ableist, gendered, or exclusionary terminology creates unwelcoming experiences and reinforces harmful stereotypes, even unintentionally.

## Quick Reference

- Replace ableist terms (crazy, lame, blind to) with neutral alternatives
- Use gender-neutral language (they, users, people) by default
- Write error messages that guide rather than blame users
- Avoid idioms and cultural references that don't translate globally

## Check

Review content for ableist language (crazy, lame, blind to), gendered assumptions (he/she defaults), cultural bias, and exclusionary terminology. Verify error messages and instructions are respectful and constructive.

## Fix

Replace ableist terms with neutral alternatives. Use gender-neutral language (they, users, people). Avoid idioms that may not translate across cultures. Write error messages that guide rather than blame.

## Explain

Explain how language shapes experience and can unintentionally exclude or harm users, and why inclusive language creates welcoming digital spaces for everyone.

## Code Review

Review the rendered markup and interactive states that affect Use inclusive language. Flag exact elements, roles, labels, focus behavior, or keyboard interactions that violate the rule, and note how to verify the fix with browser accessibility tooling or assistive tech.

---

For full implementation details, code examples, and framework-specific guidance,
see `references/rule.md`.

Rule page: https://frontendchecklist.io/rules/accessibility/inclusive-language
