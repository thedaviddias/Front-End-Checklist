---
name: error-images
description: "Use when reviewing image assets, markup, and CDN or build transforms related to Handle image loading errors gracefully. Check encoded size, rendered size, loading strategy, and above-the-fold impact together."
metadata:
  category: images
  priority: low
  difficulty: beginner
  estimatedTime: "15"
  source: frontendchecklist.io
  url: https://frontendchecklist.io/rules/images/error-images
---

# Handle image loading errors gracefully

Broken image icons look unprofessional and confuse users—graceful fallbacks maintain visual consistency and user trust when images fail to load.

## Quick Reference

- Use onerror to replace broken images with fallbacks
- Provide meaningful placeholder content, not broken image icons
- Consider skeleton loaders while images load
- Log image errors for monitoring and debugging

## Check

Check if the website handles broken images gracefully with fallback images or error states.

## Fix

Implement fallback images or placeholder content for broken image scenarios.

## Explain

Explain how proper error handling for images improves user experience.

## Code Review

Review image assets, markup, and delivery configuration related to Handle image loading errors gracefully. Flag exact files or components where format choice, sizing, or loading behavior violates the rule, and describe how to confirm the fix in DevTools.

---

For full implementation details, code examples, and framework-specific guidance,
see `references/rule.md`.

Rule page: https://frontendchecklist.io/rules/images/error-images
