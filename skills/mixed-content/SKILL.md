---
name: mixed-content
description: "Use when reviewing an HTTPS page for resources (scripts, images, stylesheets, iframes) that are loaded over plain HTTP."
metadata:
  category: security
  priority: high
  difficulty: intermediate
  estimatedTime: "20"
  source: frontendchecklist.io
  url: https://frontendchecklist.io/rules/security/mixed-content
---

# Avoid mixed content on HTTPS pages

Active mixed content (scripts loaded over HTTP into an HTTPS page) gives network attackers the ability to execute arbitrary JavaScript on your page — the same power as XSS, despite the page itself being served over HTTPS.

## Quick Reference

- Active mixed content (scripts, iframes, stylesheets) is blocked outright by all modern browsers
- Passive mixed content (images, audio, video) triggers a security warning and may be upgraded or blocked
- Use `upgrade-insecure-requests` CSP directive to automatically upgrade HTTP sub-resources to HTTPS
- Audit all hardcoded `http://` URLs in HTML, CSS, and JavaScript
- The `Content-Security-Policy: upgrade-insecure-requests` directive is the most practical fix for legacy content

## Check

Scan the page source and network requests for any HTTP resources loaded on an HTTPS page. Check <script src>, <img src>, <link href>, <iframe src>, and CSS url() values for http:// URLs. Also check the Content-Security-Policy header for the upgrade-insecure-requests directive.

## Fix

Replace all http:// resource URLs with https:// equivalents. If the resource provider does not support HTTPS, host the resource yourself or find an alternative. Add Content-Security-Policy: upgrade-insecure-requests as a safety net for any remaining HTTP URLs.

## Explain

Explain the difference between active and passive mixed content, why active mixed content is blocked by browsers, and how the upgrade-insecure-requests CSP directive works.

## Code Review

Review server config, headers, forms, and integration points related to Avoid mixed content on HTTPS pages. Flag exact responses, cookies, or browser behaviors that violate the rule, and verify them against the effective production-like response.

---

For full implementation details, code examples, and framework-specific guidance,
see `references/rule.md`.

Rule page: https://frontendchecklist.io/rules/security/mixed-content
