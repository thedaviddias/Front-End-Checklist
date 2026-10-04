---
name: back-forward-cache
description: "Use when reviewing navigation performance, browser lifecycle events, or resume-from-memory behavior. Check the actual browser lifecycle and restore path, not only static code patterns."
metadata:
  category: performance
  priority: high
  difficulty: advanced
  estimatedTime: "25"
  source: frontendchecklist.io
  url: https://frontendchecklist.io/rules/performance/back-forward-cache
---

# Optimize pages for back/forward cache

Back/forward cache turns many browser back and forward navigations into near-instant restores because the entire page is resumed from memory instead of being rebuilt from the network. Losing bfcache eligibility makes common navigations feel far slower than they need to.

## Quick Reference

- Never add an `unload` listener - it is the most common bfcache blocker
- Use `pagehide` and `pageshow` instead of assuming every navigation reloads
- Refresh time-sensitive state when `pageshow.persisted` is `true`
- Keep `beforeunload` conditional and remove it when there are no unsaved changes
- Verify eligibility in DevTools instead of assuming a page is cacheable

## Check

Review this route for back/forward cache blockers. Search for unload or unconditional beforeunload listeners, state that assumes every navigation is a full reload, and resource lifecycles that break when the page is resumed from memory.

## Fix

Replace unload logic with pagehide and pageshow handlers, remove unnecessary blockers, and refresh only the time-sensitive state that must change after a bfcache restore.

## Explain

Explain how the back/forward cache differs from HTTP caching, why unload blocks it, and how pageshow/pagehide should be used instead.

## Code Review

Review route code, global listeners, analytics hooks, and data-refresh logic related to Optimize pages for back/forward cache. Flag exact listeners, APIs, or lifecycle assumptions that prevent a restore or leave stale state after a restore.

---

For full implementation details, code examples, and framework-specific guidance,
see `references/rule.md`.

Rule page: https://frontendchecklist.io/rules/performance/back-forward-cache
