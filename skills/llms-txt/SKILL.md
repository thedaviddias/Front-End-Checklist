---
name: llms-txt
description: "Use when auditing public documentation portals, API references, help centers, SDK docs, or large knowledge bases. Check the final file served at `/llms.txt` and verify that the linked pages are stable, high-value, and accessible without relying on a JavaScript-only interface."
metadata:
  category: seo
  priority: medium
  difficulty: intermediate
  estimatedTime: "20"
  source: frontendchecklist.io
  url: https://frontendchecklist.io/rules/seo/llms-txt
---

# Publish llms.txt for documentation-heavy sites

Documentation portals often bury the most important pages behind dense navigation, search UIs, or framework-specific layouts. A curated `llms.txt` gives AI tools a cleaner entry point without replacing the normal crawl and indexing mechanisms of the web described by the [llms.txt convention](https://llmstxt.org/).

## Quick Reference

- Serve `llms.txt` at the root (`/llms.txt` on the production domain) if you run a docs-heavy site
- Curate a short list of stable, high-signal docs pages instead of dumping every URL
- Use `llms-full.txt` only as an optional companion when you can keep it current
- Keep crawl and indexing controls in `robots.txt`; `llms.txt` does not replace them

## Check

Check whether this documentation-heavy site publishes `llms.txt` at the root and whether it contains a curated set of stable, high-value links such as getting-started guides, API references, concepts, and examples. Confirm that linked URLs return HTTP 200 and that `llms.txt` is not being treated as a replacement for `robots.txt` or XML sitemaps.

## Fix

Add `llms.txt` at the site root with a short description of the project and a curated list of the most useful documentation URLs. If the docs set is large and you can maintain it, add an optional `llms-full.txt` companion and link to it from `llms.txt`. Keep crawl directives in `robots.txt`.

## Explain

Explain what `llms.txt` is, why it can help documentation-heavy sites give AI tools a cleaner starting point, why `llms-full.txt` is optional, and why traditional crawl controls still belong in `robots.txt`.

## Code Review

Review route handlers, static files, or framework metadata output related to `llms.txt`. Flag sites that publish the file outside the root path, link to low-value or unstable pages, expose private/auth-only docs, or imply that `llms.txt` replaces crawl/indexing controls like `robots.txt` or sitemaps.

---

For full implementation details, code examples, and framework-specific guidance,
see `references/rule.md`.

Rule page: https://frontendchecklist.io/rules/seo/llms-txt
