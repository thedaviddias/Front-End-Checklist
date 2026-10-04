---
name: subresource-integrity
description: "Use when reviewing templates, rendered HTML, or shared components related to Add Subresource Integrity to external scripts. Validate the final browser-facing markup, not just the source framework abstraction."
metadata:
  category: html
  priority: high
  difficulty: intermediate
  estimatedTime: "15"
  source: frontendchecklist.io
  url: https://frontendchecklist.io/rules/html/subresource-integrity
---

# Add Subresource Integrity to external scripts

When you load JavaScript from a CDN, you're trusting that CDN completely — if it's compromised, attackers can serve malicious JavaScript to all your users. SRI adds a cryptographic hash to the tag; the browser refuses to execute the script if the hash doesn't match the downloaded content, protecting users even if the CDN is compromised or the URL is hijacked.

## Quick Reference

- Add integrity="sha384-..." to <script> and <link> tags loading from CDNs
- Always pair integrity with crossorigin="anonymous"
- Generate hashes with openssl or online tools — CDN providers usually supply them
- SRI blocks execution if the file hash doesn't match, preventing CDN compromise attacks

## Check

Find all external <script> and <link rel=stylesheet> tags in this HTML that load from CDNs and don't have integrity attributes. List each one.

## Fix

Add appropriate integrity and crossorigin attributes to external CDN resources. Generate the SHA-384 hashes for each resource.

## Explain

Explain Subresource Integrity, how it protects against CDN compromise, how to generate SRI hashes, and its limitations.

## Code Review

Review templates, server-rendered HTML, and shared components that output markup related to Add Subresource Integrity to external scripts. Flag exact elements, attributes, and routes where the rendered HTML violates the rule.

---

For full implementation details, code examples, and framework-specific guidance,
see `references/rule.md`.

Rule page: https://frontendchecklist.io/rules/html/subresource-integrity
