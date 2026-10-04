---
name: consent-mode
description: "Use when auditing slow page loads, heavy assets, or rendering delays related to Implement Google Consent Mode v2. Verify the actual bottleneck in DevTools, Lighthouse, or field data before recommending changes."
metadata:
  category: performance
  priority: high
  difficulty: intermediate
  estimatedTime: "10"
  source: frontendchecklist.io
  url: https://frontendchecklist.io/rules/performance/consent-mode
---

# Implement Google Consent Mode v2

Consent Mode v2 is essential for adhering to privacy regulations (like GDPR) while maintaining the ability to measure conversion and analytics data in a privacy-safe way.

## Quick Reference

- Adjust tag behavior based on user consent for privacy compliance
- Maintain data insights through modeling for non-consenting users
- Ensure the `gcd` parameter is present in pings to Google services

## Check

Verify that Google Consent Mode v2 is correctly implemented and sending the appropriate consent states.

## Fix

Update your GTM or gtag.js implementation to support the new `ad_user_data` and `ad_personalization` consent types.

## Explain

Explain the transition to Consent Mode v2 and why it's required for digital advertising in certain regions.

## Code Review

Review the routes, assets, and loading behavior that affect Implement Google Consent Mode v2. Flag exact files, requests, or rendering steps that add unnecessary network, CPU, or layout cost, and describe the measurement method used to confirm the issue.

---

For full implementation details, code examples, and framework-specific guidance,
see `references/rule.md`.

Rule page: https://frontendchecklist.io/rules/performance/consent-mode
