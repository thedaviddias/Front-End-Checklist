---
name: empty-links
description: "Use when reviewing rendered HTML, interactive components, or design-system patterns related to Fix empty and broken links. Check native semantics first, then inspect keyboard behavior, focus flow, accessible names, and screen-reader output where relevant."
metadata:
  category: accessibility
  priority: medium
  difficulty: beginner
  estimatedTime: "15"
  source: frontendchecklist.io
  url: https://frontendchecklist.io/rules/accessibility/empty-links
---

# Fix empty and broken links

Screen readers announce empty links as just 'link' with no context—users have no idea where they lead or what they do, making navigation impossible.

## Quick Reference

- Every link must have accessible text (visible or via aria-label)
- Icon-only links need aria-label describing the destination
- Empty anchor tags are completely inaccessible—always add content
- Use visually-hidden text when visual labels aren't desired

## Check

Scan for links with no text content (empty anchor tags, icon-only links without labels). Verify all links have accessible names via text content, aria-label, or aria-labelledby. Check for broken link destinations.

## Fix

Add descriptive text to empty links. For icon-only links, add aria-label describing the destination. Use visually-hidden text if visible labels are not desired. Remove or fix broken links.

## Explain

Explain how screen readers announce empty links as just 'link' with no context, leaving users unable to understand where the link leads or what action it performs.

## Code Review

Review the rendered markup and interactive states that affect Fix empty and broken links. Flag exact elements, roles, labels, focus behavior, or keyboard interactions that violate the rule, and note how to verify the fix with browser accessibility tooling or assistive tech.

---

For full implementation details, code examples, and framework-specific guidance,
see `references/rule.md`.

Rule page: https://frontendchecklist.io/rules/accessibility/empty-links
