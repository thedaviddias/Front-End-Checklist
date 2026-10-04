---
name: pluralization
description: "Use when reviewing string concatenation involving counts, translation key lookups, or i18n library configurations to check whether plural forms are handled correctly for all target locales."
metadata:
  category: i18n
  priority: medium
  difficulty: intermediate
  estimatedTime: "25"
  source: frontendchecklist.io
  url: https://frontendchecklist.io/rules/i18n/pluralization
---

# Handle plural forms with Intl.PluralRules or ICU MessageFormat

Pluralization rules vary dramatically across languages — what works as a simple singular/plural branch in English produces grammatically wrong output in Arabic, Russian, Polish, and dozens of other languages. Shipping incorrect plurals signals low translation quality and breaks trust with native speakers in target markets.

## Quick Reference

- English has 2 plural forms but Arabic has 6 and Russian has 3
- Never concatenate a count with a string like '"You have " + count + " items"'
- Use Intl.PluralRules to select the right message key per locale
- ICU MessageFormat in react-intl or i18next handles plural selection automatically

## Check

Find all places in this codebase where a count value is concatenated with a string or where only singular/plural branching is used, without Intl.PluralRules or ICU plural syntax.

## Fix

Replace count string concatenation and binary singular/plural logic with Intl.PluralRules-based key selection or ICU MessageFormat plural syntax so that all CLDR plural categories are covered for every target locale.

## Explain

Explain why languages have different numbers of plural forms, what CLDR plural categories are, and how Intl.PluralRules and ICU MessageFormat solve pluralization correctly across locales.

## Code Review

Review translation files and components that render counts. Flag any strings that concatenate a number with text, any ternary that picks only between "singular" and "plural", and any i18next or react-intl message that is missing plural keys required by the target locale.

---

For full implementation details, code examples, and framework-specific guidance,
see `references/rule.md`.

Rule page: https://frontendchecklist.io/rules/i18n/pluralization
