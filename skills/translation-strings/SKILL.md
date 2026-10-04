---
name: translation-strings
description: "Use when reviewing a codebase for internationalisation readiness, setting up an i18n library, or preparing strings for a new locale."
metadata:
  category: javascript
  priority: medium
  difficulty: intermediate
  estimatedTime: "30"
  source: frontendchecklist.io
  url: https://frontendchecklist.io/rules/javascript/translation-strings
---

# Write internationalisation-friendly translation strings

Naive string concatenation produces untranslatable sentences because word order varies dramatically across languages. A pattern like "Found " + count + " results" cannot be translated correctly into languages where the number appears in a different position or where the noun form changes depending on the count. Bad i18n strings force translators to work around developer mistakes — or simply leave content untranslated.

## Quick Reference

- Never concatenate translated strings with variables — use named placeholders
- Use ICU MessageFormat for pluralisation, gender, and select patterns
- Keep translation keys descriptive and scoped to their feature context
- Extract all user-visible strings — do not hardcode any copy in components

## Check

Check whether translation strings use proper message formatting with placeholders rather than string concatenation.

## Fix

Replace concatenated translation strings with ICU message format patterns and ensure pluralisation is handled via the library, not conditionals.

## Explain

Explain why string concatenation breaks translations and how ICU MessageFormat handles variable word order, pluralisation, and gender.

## Code Review

Review components and utility functions for hardcoded user-visible strings, string concatenation involving translated text, and missing plural forms.

---

For full implementation details, code examples, and framework-specific guidance,
see `references/rule.md`.

Rule page: https://frontendchecklist.io/rules/javascript/translation-strings
