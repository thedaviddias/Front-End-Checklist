---
name: right-to-erasure
description: "Use when auditing account settings pages, privacy dashboards, or API routes to verify that a complete data deletion path exists for users."
metadata:
  category: privacy
  priority: medium
  difficulty: intermediate
  estimatedTime: "60"
  source: frontendchecklist.io
  url: https://frontendchecklist.io/rules/privacy/right-to-erasure
---

# Implement a user-facing data deletion mechanism

GDPR Article 17 gives EU residents the right to have their personal data erased when it is no longer necessary for the purpose it was collected, or when they withdraw consent. Failing to honour this right can result in regulatory fines of up to €20 million or 4% of global annual turnover. Providing a clear deletion flow also builds trust with users who value control over their data.

## Quick Reference

- Provide a visible "Delete my account / data" option in account settings
- Clear all client-side storage: localStorage, sessionStorage, IndexedDB, and cookies
- Send a deletion request to the server and confirm receipt to the user
- Complete deletion within 30 days as required by GDPR Article 17

## Check

Check whether this application provides a user-facing data deletion mechanism that clears all client-side storage and triggers a server-side deletion request.

## Fix

Implement a data deletion flow that clears localStorage, sessionStorage, IndexedDB, and cookies, then sends a deletion request to the server and shows confirmation to the user.

## Explain

Explain GDPR Article 17 (right to erasure) and what a compliant data deletion flow must cover, including both client-side and server-side data.

## Code Review

Review account settings, privacy pages, and API routes for a data deletion endpoint. Flag missing client-side storage clearance, absent confirmation UI, or missing server-side deletion calls.

---

For full implementation details, code examples, and framework-specific guidance,
see `references/rule.md`.

Rule page: https://frontendchecklist.io/rules/privacy/right-to-erasure
