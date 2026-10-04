---
name: loading-indicators
description: "Use when auditing slow page loads, heavy assets, or rendering delays related to Show loading indicators. Verify the actual bottleneck in DevTools, Lighthouse, or field data before recommending changes."
metadata:
  category: performance
  priority: high
  difficulty: beginner
  estimatedTime: "15"
  source: frontendchecklist.io
  url: https://frontendchecklist.io/rules/performance/loading-indicators
---

# Show loading indicators

Loading indicators reassure users that something is happening—without feedback, users may think the page is broken or click repeatedly, degrading experience and causing duplicate actions.

## Quick Reference

- Show immediate feedback for all async operations
- Use skeletons for content, spinners for actions
- Include ARIA attributes for screen reader accessibility
- Avoid content jumps when loading completes

## Check

Verify that loading states are displayed during async operations with appropriate ARIA attributes for screen readers.

## Fix

Implement loading spinners/progress bars with aria-busy, aria-live, and clear visual feedback for ongoing operations.

## Explain

Explain how loading indicators improve perceived performance and accessibility by communicating system status to users.

## Code Review

Review the routes, assets, and loading behavior that affect Show loading indicators. Flag exact files, requests, or rendering steps that add unnecessary network, CPU, or layout cost, and describe the measurement method used to confirm the issue.

---

For full implementation details, code examples, and framework-specific guidance,
see `references/rule.md`.

Rule page: https://frontendchecklist.io/rules/performance/loading-indicators
