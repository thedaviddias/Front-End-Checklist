---
name: cookie-consent
description: "Use when reviewing a website for GDPR/CCPA compliance, specifically whether cookie consent is obtained before non-essential cookies are set."
metadata:
  category: privacy
  priority: high
  difficulty: intermediate
  estimatedTime: "30"
  source: frontendchecklist.io
  url: https://frontendchecklist.io/rules/privacy/cookie-consent
---

# Show a cookie consent notice

GDPR violations can result in fines up to €20 million or 4% of global annual turnover. Regulators across the EU have actively fined organizations for deploying tracking cookies without valid consent.

## Quick Reference

- GDPR requires consent before setting non-essential cookies (analytics, advertising, personalization)
- Essential/strictly necessary cookies (session, security, login) do not require consent
- Consent must be freely given, specific, informed, and unambiguous — pre-ticked boxes are invalid
- Users must be able to withdraw consent as easily as they gave it
- Scripts and pixels must not load until the user has actively accepted their category
- Non-essential trackers must stay blocked until consent and after revocation

## Check

Check whether the site displays a cookie consent notice before setting non-essential cookies. Verify that analytics, advertising, and tracking scripts do not load until the user has actively accepted. Check whether users can reject non-essential cookies without losing access to content.

## Fix

Implement a cookie consent management platform (CMP) that blocks non-essential scripts until consent is granted. Configure analytics and tracking tags to initialize only after explicit consent. Provide a mechanism for users to change their consent preferences at any time.

## Explain

Explain what GDPR requires for cookie consent, the difference between essential and non-essential cookies, why pre-ticked boxes are invalid consent, and what a technically compliant consent implementation looks like.

## Code Review

Review server config, headers, forms, and integration points related to Show a cookie consent notice. Flag exact responses, cookies, or browser behaviors that violate the rule, and verify them against the effective production-like response. Check that tracker initialization is gated on consent and that a persistent "change cookie settings" path exists after the banner is gone.

---

For full implementation details, code examples, and framework-specific guidance,
see `references/rule.md`.

Rule page: https://frontendchecklist.io/rules/privacy/cookie-consent
