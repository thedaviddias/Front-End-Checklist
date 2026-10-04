---
name: terms-of-service
description: "Use when reviewing whether a website or web application has a visible Terms of Service link accessible from every page."
metadata:
  category: security
  priority: medium
  difficulty: beginner
  estimatedTime: "10"
  source: frontendchecklist.io
  url: https://frontendchecklist.io/rules/security/terms-of-service
---

# Link to your terms of service in the footer

Terms of Service protect your business by limiting liability, establishing jurisdiction, setting rules for user conduct, and specifying your rights to user-generated content — but only if users could reasonably discover and read them.

## Quick Reference

- Link to Terms of Service from the site footer on every page
- Terms of Service (ToS) are not legally required in most jurisdictions, but they are best practice for any service with user accounts
- Courts have found ToS unenforceable when they were not clearly presented or linked before the user took action
- For enforceable acceptance, require users to check a checkbox 'I agree to the Terms of Service' during signup
- Keep terms up to date — outdated terms that contradict current practices can create legal liability

## Check

Check whether the website footer contains a link to a Terms of Service page. Verify the link is present on all pages including interior pages. Check that during user registration there is a checkbox or explicit acceptance step for the terms.

## Fix

Add a 'Terms of Service' link to the site footer on every page. For services with user accounts, add an explicit acceptance checkbox during registration that links to the terms. Ensure the terms page has a stable URL.

## Explain

Explain what Terms of Service are for, why they need to be discoverable before a user takes action, and the difference between browsewrap (just a link) and clickwrap (explicit acceptance) agreements.

## Code Review

Review server config, headers, forms, and integration points related to Link to your terms of service in the footer. Flag exact responses, cookies, or browser behaviors that violate the rule, and verify them against the effective production-like response.

---

For full implementation details, code examples, and framework-specific guidance,
see `references/rule.md`.

Rule page: https://frontendchecklist.io/rules/security/terms-of-service
