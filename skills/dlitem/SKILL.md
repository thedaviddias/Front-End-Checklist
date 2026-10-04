---
name: dlitem
description: "Use when reviewing rendered HTML, interactive components, or design-system patterns related to Wrap definition items in a definition list. Check native semantics first, then inspect keyboard behavior, focus flow, accessible names, and screen-reader output where relevant."
metadata:
  category: accessibility
  priority: medium
  difficulty: beginner
  estimatedTime: "5"
  source: frontendchecklist.io
  url: https://frontendchecklist.io/rules/accessibility/dlitem
---

# Wrap definition items in a definition list

Standalone &lt;dt&gt; or &lt;dd&gt; elements lose their semantic meaning and fail to provide the context needed for assistive technologies to link terms with definitions.

## Quick Reference

- Place all &lt;dt&gt; (terms) and &lt;dd&gt; (descriptions) within a &lt;dl&gt;
- Avoid using description list items as standalone elements
- Ensure proper grouping of related metadata or glossary terms

## Check

Locate any &lt;dt&gt; or &lt;dd&gt; elements that are not children of a &lt;dl&gt; element.

## Fix

Wrap orphaned &lt;dt&gt; and &lt;dd&gt; elements in a parent &lt;dl&gt; container.

## Explain

Explain why &lt;dt&gt; and &lt;dd&gt; must be contained within a &lt;dl&gt; for correct semantic association.

## Code Review

Review the rendered markup and interactive states that affect Wrap definition items in a definition list. Flag exact elements, roles, labels, focus behavior, or keyboard interactions that violate the rule, and note how to verify the fix with browser accessibility tooling or assistive tech.

---

For full implementation details, code examples, and framework-specific guidance,
see `references/rule.md`.

Rule page: https://frontendchecklist.io/rules/accessibility/dlitem
