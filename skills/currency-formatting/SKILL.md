---
name: currency-formatting
description: "Use when reviewing utility functions, component props, or template strings that format numbers, prices, or dates to check whether Intl APIs are used correctly."
metadata:
  category: i18n
  priority: medium
  difficulty: beginner
  estimatedTime: "20"
  source: frontendchecklist.io
  url: https://frontendchecklist.io/rules/i18n/currency-formatting
---

# Use Intl APIs for currency, number, and date formatting

Number and currency formatting rules differ significantly across locales — a value formatted as "$1,234.56" in the US is written "1.234,56 $" in Germany and "¥1,235" in Japan. Hardcoded formatting causes incorrect display for international users and is expensive to maintain manually as you add locales.

## Quick Reference

- Never hardcode currency symbols or thousand separators like $ or comma
- Use Intl.NumberFormat with the currency style for monetary values
- Use Intl.DateTimeFormat for locale-aware date and time display
- Pass the user locale explicitly rather than relying on the browser default
- Use Intl.Collator and locale fallback chains for sorting and searching

## Check

Identify all places in this codebase where numbers, currencies, or dates are formatted manually instead of using Intl.NumberFormat or Intl.DateTimeFormat. Also flag locale-sensitive sorting that uses plain string comparison instead of Intl.Collator and any formatter that lacks a fallback locale.

## Fix

Replace manual number and currency formatting with Intl.NumberFormat and replace manual date formatting with Intl.DateTimeFormat, passing the user locale explicitly. Use Intl.Collator for locale-aware sorting and resolve a supported fallback locale when the requested locale is unavailable.

## Explain

Explain why locale-aware formatting with Intl APIs is required for international applications, what goes wrong when formatting is hardcoded, and why sorting/searching should also use locale-aware comparison.

## Code Review

Review utility functions and components that render numbers, prices, percentages, or dates. Flag any hardcoded currency symbols, separators, or date format strings, and show Intl-based alternatives.

---

For full implementation details, code examples, and framework-specific guidance,
see `references/rule.md`.

Rule page: https://frontendchecklist.io/rules/i18n/currency-formatting
