---
name: html-xml-lang-mismatch
description: "Use when applies to XHTML documents and polyglot HTML documents that must parse correctly as both HTML5 and XML. For modern HTML5-only documents, only `lang` is needed and `xml:lang` is not required. Check when auditing documents served as application/xhtml+xml or documents that include both attributes."
metadata:
  category: accessibility
  priority: medium
  difficulty: beginner
  estimatedTime: "5"
  source: frontendchecklist.io
  url: https://frontendchecklist.io/rules/accessibility/html-xml-lang-mismatch
---

# Match lang and xml:lang attributes

Screen readers use the `lang` attribute to select the correct voice profile and pronunciation engine. If `lang` and `xml:lang` disagree, XML-based processors (including some EPUB readers and older assistive technologies) may use `xml:lang` and get a different language than intended — causing text to be read aloud in the wrong language. For example, French text read with an English voice profile produces unintelligible output for French-speaking blind users.

## Quick Reference

- If both `lang` and `xml:lang` are present on `<html>`, their values must be identical
- `xml:lang` is only needed for XHTML or polyglot documents (valid as both HTML and XML)
- For standard HTML5 documents, only `lang` is required — `xml:lang` is redundant
- The primary language tag must be a valid BCP 47 language code (e.g., `en`, `en-US`, `fr`, `zh-Hant`)
- Relates to WCAG 2.1 SC 3.1.1 (Language of Page)

## Check

Inspect the `<html>` element for both `lang` and `xml:lang` attributes. If both are present, verify their values are identical (including subtags — `en` vs `en-US` is a mismatch). Also verify that the value is a valid BCP 47 language tag. Flag if the values differ in any way.

## Fix

If `lang` and `xml:lang` are present but differ: update both to the same valid BCP 47 language code matching the primary language of the document content. If this is a standard HTML5 document (served as text/html), remove `xml:lang` — it is unnecessary. If this is XHTML or a polyglot document, keep both and ensure they are identical.

## Explain

WCAG 2.1 SC 3.1.1 requires that the default human language of each web page can be programmatically determined. The `lang` attribute on `<html>` serves this purpose for HTML parsers. The `xml:lang` attribute serves the same purpose for XML parsers. When a document must be valid as both HTML and XML (polyglot), both attributes must be present and identical. A mismatch means the document claims different languages depending on which parser reads it, which can cause screen readers, translation tools, and spell checkers to use wrong language rules.

## Code Review

Review the rendered markup and interactive states that affect Match lang and xml:lang attributes. Flag exact elements, roles, labels, focus behavior, or keyboard interactions that violate the rule, and note how to verify the fix with browser accessibility tooling or assistive tech.

---

For full implementation details, code examples, and framework-specific guidance,
see `references/rule.md`.

Rule page: https://frontendchecklist.io/rules/accessibility/html-xml-lang-mismatch
