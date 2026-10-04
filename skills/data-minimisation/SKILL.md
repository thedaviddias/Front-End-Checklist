---
name: data-minimisation
description: "Use when reviewing form components, API payloads, or client-side storage to identify fields that are collected but not consumed by a stated feature."
metadata:
  category: privacy
  priority: medium
  difficulty: intermediate
  estimatedTime: "30"
  source: frontendchecklist.io
  url: https://frontendchecklist.io/rules/privacy/data-minimisation
---

# Collect only the minimum personal data necessary

Collecting more data than necessary increases the blast radius of a breach, exposes your organisation to regulatory fines, and erodes user trust. GDPR Article 5(1)(c) makes data minimisation a legal obligation for any controller processing EU residents' data — but it is also sound engineering practice regardless of jurisdiction.

## Quick Reference

- Collect only fields your application actually needs to function
- Document the purpose for every piece of personal data you store
- Prefer anonymous or pseudonymous data over identifiable data where possible
- Clear client-side storage (localStorage, sessionStorage, cookies) on logout or after a defined retention window
- Never send raw PII to analytics, monitoring, or client-side logs

## Check

Audit the form fields, API request bodies, and client-side storage keys in this codebase to identify any personal data collected beyond what the stated feature requires. Also inspect analytics and logging payloads for raw email addresses, names, phone numbers, or full query strings that leak PII.

## Fix

Remove or anonymise form fields, storage keys, and API parameters that collect personal data not consumed by a specific, documented feature purpose. Replace raw personal identifiers in analytics and logs with pseudonymous IDs and define a retention window for each stored value.

## Explain

Explain the GDPR data minimisation principle and how over-collection of personal data increases breach impact and regulatory risk.

## Code Review

Review form components, fetch/axios calls, and storage utilities for personal data fields. Flag any field or key that is collected but not read by an active feature, and suggest anonymisation or removal. Flag analytics and monitoring payloads that include raw PII or have no stated retention.

---

For full implementation details, code examples, and framework-specific guidance,
see `references/rule.md`.

Rule page: https://frontendchecklist.io/rules/privacy/data-minimisation
