---
name: redirect-chain
description: "Use when auditing site redirects after URL migrations, domain changes, or CMS upgrades. Applies to any site that has had multiple rounds of structural changes over time."
metadata:
  category: seo
  priority: high
  difficulty: intermediate
  estimatedTime: "15"
  source: frontendchecklist.io
  url: https://frontendchecklist.io/rules/seo/redirect-chain
---

# Avoid multi-hop redirect chains

Redirect chains waste crawl budget, reduce PageRank flow to destination pages, and add latency that harms user experience—Googlebot may abandon long chains entirely, leaving destination pages undiscovered.

## Quick Reference

- A redirect chain is A→B→C — Googlebot may stop following after 5 hops
- Each hop loses PageRank and adds page load latency
- Flatten chains by pointing A directly to C with a single 301
- Audit after every URL migration to catch newly created chains

## Check

Follow all redirect rules configured on the site. Identify any URL where the redirect target itself also redirects (chain of 2+ hops). Report the full chain (URL A → URL B → URL C → final), the number of hops, and the HTTP response code at each step.

## Fix

For each redirect chain, update the first redirect to point directly to the final destination URL. Example: if A→B→C, update A's redirect to point directly to C, eliminating the B hop. Verify the chain is gone by following the URL and confirming a single 301 or 302 followed by a 200.

## Explain

A redirect chain occurs when page A redirects to page B, which also redirects to page C. Googlebot follows redirect chains up to a certain number of hops (reportedly 5), then stops—meaning the final destination may not be crawled. Each redirect also loses a portion of the PageRank that would have passed through a direct link.

## Code Review

Test each redirect rule configured on the server. For each source URL, follow all redirect hops and record the full chain. Flag any chain with 2 or more hops (source → intermediate → final). Check for redirect loops (A→B→A). Verify that the final destination returns 200. Report: source URL, intermediate URLs, number of hops, final URL, and HTTP status at each step.

---

For full implementation details, code examples, and framework-specific guidance,
see `references/rule.md`.

Rule page: https://frontendchecklist.io/rules/seo/redirect-chain
