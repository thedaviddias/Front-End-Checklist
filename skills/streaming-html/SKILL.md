---
name: streaming-html
description: "Use when reviewing server-side rendering setup, Next.js App Router pages, or Node.js HTTP handlers to verify that HTML is streamed incrementally rather than buffered until completion."
metadata:
  category: performance
  priority: medium
  difficulty: advanced
  estimatedTime: "45"
  source: frontendchecklist.io
  url: https://frontendchecklist.io/rules/performance/streaming-html
---

# Stream HTML to the browser before the full response is ready

Traditional SSR waits for all data fetches to complete before sending a single byte of HTML, which means the browser cannot parse, discover subresources, or render anything until the slowest data query finishes. Streaming decouples the delivery of above-fold content from slow database queries and third-party API calls, dramatically improving perceived performance and LCP.

## Quick Reference

- Streaming sends HTML in chunks as it is generated instead of waiting for the full response
- React renderToPipeableStream and Next.js App Router stream by default when you use Suspense
- Place Suspense boundaries around slow data dependencies to flush above-fold HTML immediately
- Monitor TTFB in Lighthouse — values above 600ms are a sign that streaming is not being used

## Check

Examine this server-side rendering implementation to determine whether HTML is streamed in chunks or buffered until fully generated before sending to the client.

## Fix

Refactor the SSR implementation to use renderToPipeableStream with Suspense boundaries around slow data fetches, or use ReadableStream in a Node.js handler, so that above-fold HTML is flushed to the client immediately.

## Explain

Explain how streaming HTML improves TTFB and FCP by decoupling the delivery of fast content from slow server-side data dependencies.

## Code Review

Review server entry points and page components for renderToString calls, missing Suspense boundaries around data-fetching components, and use of await on slow queries before returning a response.

---

For full implementation details, code examples, and framework-specific guidance,
see `references/rule.md`.

Rule page: https://frontendchecklist.io/rules/performance/streaming-html
