---
name: blocked-links
description: "Use when reviewing HTML source and JavaScript for links or resource URLs pointing to domains listed in common adblocker filter lists."
metadata:
  category: security
  priority: low
  difficulty: intermediate
  estimatedTime: "15"
  source: frontendchecklist.io
  url: https://frontendchecklist.io/rules/security/blocked-links
---

# Blocked Tracking Links

When a navigation link's URL matches a tracking domain pattern, the adblocker may block the request entirely — the user clicks the link and nothing happens, breaking core site functionality.

## Quick Reference

- Adblockers block URLs matching domain-level filter lists like EasyList and EasyPrivacy
- Affected resources include external scripts, images, fonts, and API endpoints hosted on blocked domains
- Analytics and tag management scripts (Google Analytics, GTM, Hotjar, Heap) are commonly blocked
- Self-hosting or proxying external scripts through your own domain bypasses most domain-level blocks
- 20–40% of desktop users have an adblocker installed — blocked analytics skews your data significantly

## Check

Identify external script sources, image src URLs, iframe src URLs, and anchor href values that point to known tracking domains (googletagmanager.com, hotjar.com, facebook.net, doubleclick.net, etc.). Test whether these resources load successfully with uBlock Origin enabled.

## Fix

Self-host critical external scripts on your own domain. Use a reverse proxy or server-side route to forward requests to third-party analytics APIs. For navigation links, avoid using tracking redirect URLs — use direct destination URLs with UTM parameters appended instead.

## Explain

Explain how domain-level adblocker filter lists work, which domains are commonly blocked, how blocked resources affect site functionality and analytics accuracy, and the self-hosting approach to bypass domain blocks.

## Code Review

Review server config, headers, forms, and integration points related to Blocked Tracking Links. Flag exact responses, cookies, or browser behaviors that violate the rule, and verify them against the effective production-like response.

---

For full implementation details, code examples, and framework-specific guidance,
see `references/rule.md`.

Rule page: https://frontendchecklist.io/rules/security/blocked-links
