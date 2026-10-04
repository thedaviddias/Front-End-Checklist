---
name: https-downgrade
description: "Use when auditing a site's internal and external links for protocol consistency, migrating a site from HTTP to HTTPS, or reviewing hardcoded URLs in a codebase that may use `http://` instead of `https://`."
metadata:
  category: seo
  priority: medium
  difficulty: intermediate
  estimatedTime: "10"
  source: frontendchecklist.io
  url: https://frontendchecklist.io/rules/seo/https-downgrade
---

# Do not link from HTTPS to HTTP

Linking from a secure HTTPS page to an HTTP destination creates a mixed content situation that browsers warn users about or block entirely. It also means the linked page does not receive the ranking signal passed through the HTTPS referrer. For internal links, it can cause redirect loops or broken navigation.

## Quick Reference

- All internal links on an HTTPS page must point to HTTPS URLs — HTTP links trigger mixed content warnings
- External links to HTTP destinations break the security chain and may be blocked by browsers
- Use protocol-relative URLs (`//example.com`) or absolute HTTPS URLs — never hardcode `http://` for internal links

## Check

On pages served over HTTPS, scan all `<a href>` attributes for URLs starting with `http://` (not `https://`). Flag: (1) Internal links using `http://` that should use `https://` or a relative path. (2) External links to third-party sites still on HTTP (flag for review — the destination may not support HTTPS). (3) Resource links (`<img src>`, `<script src>`, `<link href>`) pointing to HTTP URLs — these cause active mixed content warnings.

## Fix

1. Audit all `<a href>` values in templates and content for `http://` links.
2. For internal links: change `http://yourdomain.com/path` to `/path` (relative) or `https://yourdomain.com/path`.
3. For external links: check if the destination supports HTTPS; update to `https://` if so.
4. For resource links (scripts, styles, images): always use `https://` or protocol-relative `//`.
5. In your CMS or database: run a search-and-replace to update stored HTTP URLs to HTTPS.
6. Set up a server-level redirect from HTTP to HTTPS to catch any remaining HTTP URLs in user-generated content.
7. Verify with: `grep -r 'href="http://' ./templates/` or use a link auditing tool.


## Explain

HTTPS is a confirmed Google ranking factor. When an HTTPS page links to HTTP resources or destinations, it downgrades the secure context, triggering browser warnings and potentially blocking content. For internal links, HTTP destinations mean an extra redirect (HTTP→HTTPS) on every navigation, slowing page loads. The ranking signal passed via the link's referrer is also diminished when crossing from HTTPS to HTTP.

## Code Review

Parse all `<a href>`, `<img src>`, `<script src>`, and `<link href>` attributes. Flag any value starting with `http://` (not `https://` or a relative path). In JavaScript frameworks, also check for `http://` in `fetch()`, `axios`, or router navigation calls. Report the count of HTTP links by category (internal, external, resource).

---

For full implementation details, code examples, and framework-specific guidance,
see `references/rule.md`.

Rule page: https://frontendchecklist.io/rules/seo/https-downgrade
