---
name: fetchpriority-attribute
description: "Use when optimising Largest Contentful Paint (LCP), reducing render-blocking resource contention, or fine-tuning resource loading order in the critical rendering path."
metadata:
  category: performance
  priority: medium
  difficulty: beginner
  estimatedTime: "15"
  source: frontendchecklist.io
  url: https://frontendchecklist.io/rules/performance/fetchpriority-attribute
---

# Use fetchpriority to hint resource loading priority

Browsers use internal heuristics to guess resource priority, but they cannot know which image is your LCP candidate. Adding fetchpriority="high" to the LCP image has been shown to reduce LCP by 5–30 % in real-world tests, directly improving Core Web Vitals scores and user-perceived load speed. The attribute costs nothing to add and is the lowest-effort high-impact performance optimisation available today.

## Quick Reference

- Add fetchpriority="high" to the LCP image to accelerate Largest Contentful Paint
- Add fetchpriority="low" to below-the-fold images that would otherwise compete with critical resources
- Use fetchpriority="high" on <link rel="preload"> for critical fonts and CSS
- Avoid marking more than one or two resources as high priority — it defeats the purpose

## Check

Check whether the LCP image or hero element has fetchpriority="high" and whether any high-priority preload links are missing the attribute.

## Fix

Add fetchpriority="high" to the LCP image element and any preloaded critical resources, and fetchpriority="low" to non-critical below-the-fold images.

## Explain

Explain how the browser's resource priority queue works and how fetchpriority hints change loading order to improve LCP.

## Code Review

Review the HTML for images above the fold. Flag the LCP candidate if it lacks fetchpriority="high", and flag any carousel or below-fold images that lack fetchpriority="low" (they compete with critical resources).

---

For full implementation details, code examples, and framework-specific guidance,
see `references/rule.md`.

Rule page: https://frontendchecklist.io/rules/performance/fetchpriority-attribute
