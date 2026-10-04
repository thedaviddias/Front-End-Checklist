---
name: new-tab
description: "Use when reviewing HTML or JSX for anchor elements with target='_blank' to verify rel='noopener noreferrer' is present."
metadata:
  category: security
  priority: medium
  difficulty: beginner
  estimatedTime: "10"
  source: frontendchecklist.io
  url: https://frontendchecklist.io/rules/security/new-tab
---

# External Link Security

A malicious site opened via target='_blank' can use window.opener.location to silently redirect your original tab to a phishing page — the user switches back and sees a fake login screen on what appears to be your domain.

## Quick Reference

- Always add `rel="noopener noreferrer"` to any `<a target="_blank">` link
- `noopener` prevents the new tab from accessing `window.opener` and redirecting your page
- `noreferrer` additionally suppresses the `Referer` header sent to the destination site
- Modern browsers (Chrome 88+, Firefox 79+) implicitly add `noopener` for cross-origin `_blank` links, but explicit markup is required for older browsers and same-origin links
- ESLint rule `jsx-a11y/anchor-is-valid` and `eslint-plugin-security` can enforce this automatically

## Check

Find all anchor elements with target='_blank' in the HTML and JSX source. Verify each one includes rel='noopener noreferrer' (or at minimum rel='noopener'). Flag any external links opening in a new tab that are missing this attribute.

## Fix

Add rel='noopener noreferrer' to all <a target='_blank'> elements. In React/JSX this is rel="noopener noreferrer". Configure an ESLint rule to prevent this from recurring.

## Explain

Explain the reverse tabnapping attack enabled by window.opener, how rel='noopener' and rel='noreferrer' prevent it, and the difference between the two values.

## Code Review

Review server config, headers, forms, and integration points related to External Link Security. Flag exact responses, cookies, or browser behaviors that violate the rule, and verify them against the effective production-like response.

---

For full implementation details, code examples, and framework-specific guidance,
see `references/rule.md`.

Rule page: https://frontendchecklist.io/rules/security/new-tab
