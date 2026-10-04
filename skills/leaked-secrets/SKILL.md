---
name: leaked-secrets
description: "Use when reviewing client-side JavaScript, HTML source, or git history for exposed credentials, API keys, or tokens."
metadata:
  category: security
  priority: critical
  difficulty: intermediate
  estimatedTime: "20"
  source: frontendchecklist.io
  url: https://frontendchecklist.io/rules/security/leaked-secrets
---

# Leaked Environment Variables

An API key embedded in client-side JavaScript gives anyone with a browser devtools tab full access to your cloud services, databases, or third-party APIs — leading to data breaches, unexpected charges, or account takeover.

## Quick Reference

- Any secret in client-side JavaScript is publicly readable — treat all front-end code as public
- In Next.js, only variables prefixed with `NEXT_PUBLIC_` are exposed to the browser — never put secrets in these
- Common leak locations: `.env` files committed to git, hardcoded API keys in JS bundles, service account credentials in `window.__INITIAL_STATE__`
- Use `git log -S 'keyword'` to search git history for previously committed secrets; rotate any found secrets immediately
- Tools: GitLeaks, TruffleHog, GitHub Secret Scanning can detect leaks in repositories automatically

## Check

Scan the page HTML source and JavaScript bundles for patterns that look like secrets: API keys, tokens, passwords, private keys, connection strings, or credentials. Check for common patterns like sk_, pk_, AIza, ghp_, AKIA, and base64-encoded strings in unusual contexts.

## Fix

Move all secrets server-side. Replace client-exposed credentials with server-side API proxies. Rotate any leaked credentials immediately — treat them as compromised. Implement git-secrets or a pre-commit hook to prevent future leaks.

## Explain

Explain why client-side JavaScript is public code, how secrets leak into bundles, what the impact of a leaked API key is, and how to architect applications to keep secrets server-side.

## Code Review

Review server config, headers, forms, and integration points related to Leaked Environment Variables. Flag exact responses, cookies, or browser behaviors that violate the rule, and verify them against the effective production-like response.

---

For full implementation details, code examples, and framework-specific guidance,
see `references/rule.md`.

Rule page: https://frontendchecklist.io/rules/security/leaked-secrets
