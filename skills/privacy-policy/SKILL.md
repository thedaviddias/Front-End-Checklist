---
name: privacy-policy
description: "Use when reviewing whether a website has a visible, accessible privacy policy link, particularly in the footer navigation."
metadata:
  category: privacy
  priority: high
  difficulty: beginner
  estimatedTime: "15"
  source: frontendchecklist.io
  url: https://frontendchecklist.io/rules/privacy/privacy-policy
---

# Link to your privacy policy in the footer

Collecting user data without a publicly accessible privacy policy violates GDPR (EU), CCPA (California), PIPEDA (Canada), and other regulations — even if the policy is technically published but not linked from the site.

## Quick Reference

- Link to a published privacy policy from the footer of every page
- The privacy policy must be written in plain language and accessible to all users
- Required when you collect any personal data: names, emails, IP addresses, cookies, analytics data
- GDPR requires the policy to be easily accessible — a footer link satisfies this requirement
- The link text should be 'Privacy Policy' (or locale equivalent) for SEO and accessibility
- Disclose retention periods and whether analytics, logs, or monitoring receive personal data

## Check

Check whether the website footer contains a link to a privacy policy page. Verify the linked page contains an actual privacy policy with contact information, what data is collected, and user rights. Check that the link is present on all pages, not just the homepage. Confirm the policy discloses retention periods and whether analytics, logging, or monitoring vendors receive user data.

## Fix

Add a 'Privacy Policy' link to the site footer that appears on every page. Ensure the linked page describes what personal data is collected, why, how it is used, who it is shared with, how long it is kept, and how users can exercise their rights.

## Explain

Explain why a publicly accessible privacy policy is legally required under GDPR and CCPA, what information it must contain, and how to make it genuinely accessible to users.

## Code Review

Review server config, headers, forms, and integration points related to Link to your privacy policy in the footer. Flag exact responses, cookies, or browser behaviors that violate the rule, and verify them against the effective production-like response.

---

For full implementation details, code examples, and framework-specific guidance,
see `references/rule.md`.

Rule page: https://frontendchecklist.io/rules/privacy/privacy-policy
