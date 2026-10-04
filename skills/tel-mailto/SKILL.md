---
name: tel-mailto
description: "Use when applies to contact pages, business listing pages, headers/footers, and any page displaying a phone number or email address. Use when auditing contact UX or schema-marked LocalBusiness pages."
metadata:
  category: seo
  priority: medium
  difficulty: beginner
  estimatedTime: "10"
  source: frontendchecklist.io
  url: https://frontendchecklist.io/rules/seo/tel-mailto
---

# Tel & Mailto Links

On mobile devices, tel: and mailto: links trigger the native phone dialer and email client with one tap; plain-text contact info forces copy-paste and measurably reduces contact conversion rates.

## Quick Reference

- Wrap phone numbers in `<a href="tel:+15551234567">` for click-to-call on mobile devices
- Wrap email addresses in `<a href="mailto:contact@example.com">` for one-click email compose
- Use E.164 format for `tel:` links: `+` followed by country code and number, no spaces or dashes
- Plain text phone numbers and emails require users to copy-paste — a UX and conversion friction point

## Check

Scan the HTML for phone numbers (patterns like `\+?[0-9\s\-().]{7,}`) and email addresses (`[\w.-]+@[\w.-]+\.[a-z]{2,}`). Verify that phone numbers are wrapped in `<a href="tel:...">` and emails in `<a href="mailto:...">`. Flag any that appear as plain text.

## Fix

Wrap each phone number in an anchor tag: `<a href="tel:+15551234567">+1 (555) 123-4567</a>`. Wrap each email in: `<a href="mailto:contact@example.com">contact@example.com</a>`. Format tel: values using E.164 (+[country][number]) without spaces.

## Explain

Explain how tel: and mailto: URI schemes work in HTML, why E.164 format is required for international compatibility, and how these links improve mobile UX and contact conversion rates.

## Code Review

Review metadata generation, rendered HTML, structured data, and response headers related to Tel & Mailto Links. Flag exact routes or templates where search-facing output violates the rule, and describe how to verify the final page output.

---

For full implementation details, code examples, and framework-specific guidance,
see `references/rule.md`.

Rule page: https://frontendchecklist.io/rules/seo/tel-mailto
