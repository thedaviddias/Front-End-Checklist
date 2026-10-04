---
name: third-party-cookies
description: "Use when reviewing a website for privacy compliance, third-party resource loading, or cookie consent implementation."
metadata:
  category: privacy
  priority: medium
  difficulty: intermediate
  estimatedTime: "20"
  source: frontendchecklist.io
  url: https://frontendchecklist.io/rules/privacy/third-party-cookies
---

# Avoid third-party cookies

Third-party cookies enable advertising networks to build detailed behavioral profiles of users across every site they visit — without users being aware. Regulatory penalties for non-compliance with GDPR reach up to 4% of global annual turnover.

## Quick Reference

- Third-party cookies are set by a domain other than the one the user is visiting — typically by ad networks, analytics, or embedded widgets
- Chrome is removing third-party cookie support and all major browsers now block or restrict them
- Use the Network DevTools panel to identify `Set-Cookie` headers from third-party domains
- GDPR (EU), CCPA (California), and PECR (UK) require informed consent before setting non-essential cookies
- Alternatives: first-party data collection, privacy-preserving analytics (Plausible, Fathom), server-side tracking

## Check

Open the browser DevTools Network panel and Application panel (Cookies section). Identify all cookies set by domains other than the current domain. Check for tracking pixels, analytics scripts, and advertising tags that set cross-site cookies.

## Fix

Audit and remove unnecessary third-party scripts. Replace cross-site tracking with privacy-preserving first-party analytics. Ensure any remaining third-party cookies are gated behind explicit user consent via a cookie consent mechanism.

## Explain

Explain what third-party cookies are, how they enable cross-site tracking, why browsers are blocking them, and how GDPR/CCPA regulate their use.

## Code Review

Review server config, headers, forms, and integration points related to Avoid third-party cookies. Flag exact responses, cookies, or browser behaviors that violate the rule, and verify them against the effective production-like response.

---

For full implementation details, code examples, and framework-specific guidance,
see `references/rule.md`.

Rule page: https://frontendchecklist.io/rules/privacy/third-party-cookies
