---
name: js-libraries
description: "Use when auditing slow page loads, heavy assets, or rendering delays related to Use secure and up-to-date JS libraries. Verify the actual bottleneck in DevTools, Lighthouse, or field data before recommending changes."
metadata:
  category: performance
  priority: medium
  difficulty: intermediate
  estimatedTime: "10"
  source: frontendchecklist.io
  url: https://frontendchecklist.io/rules/performance/js-libraries
---

# Use secure and up-to-date JS libraries

Outdated or vulnerable libraries pose security risks and often include unnecessary bloat that degrades performance.

## Quick Reference

- Regularly audit dependencies for known security vulnerabilities
- Replace heavy libraries with lightweight alternatives (e.g., date-fns vs moment)
- Ensure libraries are properly versioned and served via reliable CDNs or self-hosted

## Check

Check the project's JavaScript dependencies for known vulnerabilities and outdated versions.

## Fix

Update vulnerable libraries to secure versions and replace bloated dependencies with modern, lightweight alternatives.

## Explain

Explain the risks of using outdated JavaScript libraries and the benefits of using lightweight alternatives.

## Code Review

Review the routes, assets, and loading behavior that affect Use secure and up-to-date JS libraries. Flag exact files, requests, or rendering steps that add unnecessary network, CPU, or layout cost, and describe the measurement method used to confirm the issue.

---

For full implementation details, code examples, and framework-specific guidance,
see `references/rule.md`.

Rule page: https://frontendchecklist.io/rules/performance/js-libraries
