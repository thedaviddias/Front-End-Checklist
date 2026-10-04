---
name: cross-origin-isolation
description: "Use when reviewing security-sensitive web apps, SharedArrayBuffer usage, worker-heavy apps, editors, or measurement features that require cross-origin isolation. Check both headers and real browser behavior."
metadata:
  category: security
  priority: medium
  difficulty: advanced
  estimatedTime: "30"
  source: frontendchecklist.io
  url: https://frontendchecklist.io/rules/security/cross-origin-isolation
---

# Use COOP, COEP, and CORP for cross-origin isolation when needed

Cross-origin isolation reduces opener-based attacks and XS-Leak risk, and it is required for powerful browser features such as SharedArrayBuffer in modern browsers. It also breaks integrations if deployed carelessly, so it needs a deliberate rollout rather than a copy-pasted header block.

## Quick Reference

- Use `Cross-Origin-Opener-Policy` and `Cross-Origin-Embedder-Policy` together when you need cross-origin isolation
- Audit every cross-origin script, iframe, image, worker, and font before enforcing COEP
- Serve embeddable resources with CORS or `Cross-Origin-Resource-Policy` as appropriate
- Verify `self.crossOriginIsolated === true` before depending on isolated-only features

## Check

Review security headers and embedded resources for cross-origin isolation. Check whether the app needs COOP/COEP, whether resources are compatible with COEP, and whether the runtime actually becomes crossOriginIsolated.

## Fix

Add COOP and COEP only after auditing dependencies, ensure subresources use CORP or CORS as required, and verify the final document becomes crossOriginIsolated in the browser.

## Explain

Explain how COOP, COEP, and CORP work together, what they protect against, and why third-party embeds often block a successful rollout.

## Code Review

Review server headers, third-party integrations, popups, workers, and asset responses related to Use COOP, COEP, and CORP for cross-origin isolation when needed. Flag exact responses or integrations that would block isolation or break once isolation is enforced.

---

For full implementation details, code examples, and framework-specific guidance,
see `references/rule.md`.

Rule page: https://frontendchecklist.io/rules/security/cross-origin-isolation
