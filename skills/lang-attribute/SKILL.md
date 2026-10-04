---
name: lang-attribute
description: "Use when applies to all HTML documents. Check the `<html>` opening tag for a `lang` attribute with a non-empty, valid BCP 47 language code. Also check for `lang` attribute changes on individual elements when the document contains content in multiple languages (inline quotes, foreign terms, multilingual sections). The `lang` attribute is inherited — child elements inherit the language from their nearest ancestor with `lang`."
metadata:
  category: html
  priority: high
  difficulty: beginner
  estimatedTime: "5"
  source: frontendchecklist.io
  url: https://frontendchecklist.io/rules/html/lang-attribute
---

# Set the page lang attribute

Screen readers select the correct text-to-speech voice and pronunciation engine based on the `lang` attribute. Without it, VoiceOver defaults to the user's system language, and NVDA uses its default voice — both may mispronounce words in other languages, making content unintelligible. French text read with an English voice profile is incomprehensible. The `lang` attribute also enables browser translation features (Chrome's Translate), hyphenation algorithms (CSS `hyphens: auto`), and correct spell checking. This is a WCAG Level A requirement — the most fundamental accessibility baseline.

## Quick Reference

- The `<html>` element must have a `lang` attribute — WCAG 2.1 SC 3.1.1 (Language of Page, Level A)
- The value must be a valid BCP 47 language tag: `en`, `en-US`, `fr`, `zh-Hant`, `ar`, etc.
- Use `lang` on individual elements to indicate language changes within the page — WCAG 2.1 SC 3.1.2 (Level AA)
- The `lang` attribute affects screen reader pronunciation, spell checking, hyphenation, and browser translation
- An empty `lang=''` is treated as unknown language — equivalent to having no `lang` attribute

## Check

Inspect the `<html>` element in the page source. Verify: (1) a `lang` attribute is present; (2) its value is non-empty; (3) its value is a valid BCP 47 language code matching the primary language of the page content (e.g., `en` for English, `fr` for French, `zh-Hant` for Traditional Chinese). Flag: missing `lang`, empty `lang=''`, language codes using full names instead of codes (e.g., `lang='english'` is invalid), and mismatches where the declared language does not match the actual content language. For multilingual pages, also check for `lang` changes on block-level elements containing content in a different language.

## Fix

Add or correct the `lang` attribute on the `<html>` element: `<html lang='en'>` for English, `<html lang='fr'>` for French, `<html lang='es'>` for Spanish, `<html lang='de'>` for German, `<html lang='ja'>` for Japanese, `<html lang='zh-Hans'>` for Simplified Chinese, `<html lang='zh-Hant'>` for Traditional Chinese, `<html lang='ar'>` for Arabic. For content sections in different languages, add `lang` to the containing block element. Validate language codes against the IANA Language Subtag Registry.

## Explain

WCAG 2.1 SC 3.1.1 (Language of Page, Level A) requires that the default human language of each web page can be programmatically determined. The `lang` attribute on `<html>` fulfills this requirement. The value must be a BCP 47 language tag — a standardized system of subtags that identifies language, script, and region. The primary language subtag (e.g., `en`, `fr`) is required; region subtags (e.g., `en-US`, `fr-CA`) are optional but useful for dialect-specific pronunciation and spell checking. SC 3.1.2 (Language of Parts, Level AA) extends this to inline language changes within a page.

## Code Review

Review templates, server-rendered HTML, and shared components that output markup related to Set the page lang attribute. Flag exact elements, attributes, and routes where the rendered HTML violates the rule.

---

For full implementation details, code examples, and framework-specific guidance,
see `references/rule.md`.

Rule page: https://frontendchecklist.io/rules/html/lang-attribute
