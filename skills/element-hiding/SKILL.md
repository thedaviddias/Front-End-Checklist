---
name: element-hiding
description: "Use when reviewing a website for layout and functionality issues caused by adblocker filter rules targeting common ad-related class names and IDs."
metadata:
  category: security
  priority: low
  difficulty: intermediate
  estimatedTime: "15"
  source: frontendchecklist.io
  url: https://frontendchecklist.io/rules/security/element-hiding
---

# Adblock Element Hiding

If your cookie consent banner has class `.cookie-banner` or ID `#consent-popup`, adblockers may hide it — users never see the consent notice, which can cause GDPR compliance issues and broken UX for ~30-40% of desktop users.

## Quick Reference

- Adblockers use EasyList filter rules to hide elements with class names, IDs, or patterns associated with ads
- Common blocked names: `.ad`, `.ads`, `.advertisement`, `.banner`, `#ad`, `#ads`, `#banner`, `.sponsor`
- Affected elements: legitimate banners, notification bars, promotional sections, and cookie consent notices
- Test your site with uBlock Origin enabled — check for missing content, broken layouts, or hidden consent banners
- Rename affected elements using semantic, content-specific class names to avoid false-positive blocking

## Check

Review the HTML source for element IDs and class names that match common adblocker patterns: .ad, .ads, .advertisement, .banner, .sponsor, #ad, #banner, .cookie-notice, .consent. Test the page with uBlock Origin enabled in a browser to identify elements that are hidden.

## Fix

Rename affected elements using specific, content-focused class names that do not match adblocker patterns. For cookie consent banners specifically, use class names like .privacy-controls or .cookie-preferences instead of .cookie-banner or .gdpr-notice.

## Explain

Explain how adblocker filter lists work, which HTML class names and IDs are commonly blocked, and how to rename elements to avoid false-positive blocking while maintaining their function.

## Code Review

Review server config, headers, forms, and integration points related to Adblock Element Hiding. Flag exact responses, cookies, or browser behaviors that violate the rule, and verify them against the effective production-like response.

---

For full implementation details, code examples, and framework-specific guidance,
see `references/rule.md`.

Rule page: https://frontendchecklist.io/rules/security/element-hiding
