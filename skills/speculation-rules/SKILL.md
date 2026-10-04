---
name: speculation-rules
description: "Use when optimising multi-page navigation performance, reducing INP on page transitions, or implementing progressive enhancement for fast page loads."
metadata:
  category: performance
  priority: low
  difficulty: intermediate
  estimatedTime: "20"
  source: frontendchecklist.io
  url: https://frontendchecklist.io/rules/performance/speculation-rules
---

# Use the Speculation Rules API to prefetch and prerender navigations

Navigation latency is one of the biggest contributors to poor Interaction to Next Paint (INP) and overall perceived performance. Prerendering the most likely next page eliminates all network and rendering latency — the user sees the new page in under 100 ms regardless of server response time. Google Search has used this API to deliver its "instant" results page experience.

## Quick Reference

- Use prefetch rules to load the next page's HTML ahead of time
- Use prerender rules to fully render the next page in the background (instant navigation)
- Scope rules with href-matches or CSS selector patterns to avoid wasting bandwidth
- Prefer document rules (CSS selectors) over URL list rules for dynamic sites

## Check

Check whether the site uses the Speculation Rules API or equivalent prefetch/prerender techniques for likely navigation targets.

## Fix

Add a Speculation Rules JSON block targeting the most likely next-page links, starting with prefetch and graduating to prerender.

## Explain

Explain how the Speculation Rules API differs from rel=prefetch and rel=prerender, and how prerendering achieves near-zero navigation latency.

## Code Review

Review speculation rule selectors for over-eagerness — flag patterns that would prerender unrelated pages, third-party URLs, or pages with personalised/authenticated content that should not be pre-fetched.

---

For full implementation details, code examples, and framework-specific guidance,
see `references/rule.md`.

Rule page: https://frontendchecklist.io/rules/performance/speculation-rules
