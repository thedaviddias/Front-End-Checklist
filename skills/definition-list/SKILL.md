---
name: definition-list
description: "Use when reviewing rendered HTML, interactive components, or design-system patterns related to Use correct definition list structure. Check native semantics first, then inspect keyboard behavior, focus flow, accessible names, and screen-reader output where relevant."
metadata:
  category: accessibility
  priority: medium
  difficulty: intermediate
  estimatedTime: "5"
  source: frontendchecklist.io
  url: https://frontendchecklist.io/rules/accessibility/definition-list
---

# Use correct definition list structure

Broken list structures confuse assistive technologies, preventing users from understanding the relationship between terms and their definitions.

## Quick Reference

- Ensure &lt;dl&gt; contains only &lt;dt&gt;, &lt;dd&gt;, or <script>/<template> tags
- Avoid wrapping list items in invalid container elements like <div>
- Maintain semantic relationships between terms and descriptions

## Check

Verify that all &lt;dl&gt; elements contain only valid child elements (dt, dd, or allowed wrappers).

## Fix

Remove any invalid elements from within the &lt;dl&gt; or wrap them appropriately to maintain semantic integrity.

## Explain

Explain how proper definition list structure helps screen readers navigate and group related information.

## Code Review

Review the rendered markup and interactive states that affect Use correct definition list structure. Flag exact elements, roles, labels, focus behavior, or keyboard interactions that violate the rule, and note how to verify the fix with browser accessibility tooling or assistive tech.

---

For full implementation details, code examples, and framework-specific guidance,
see `references/rule.md`.

Rule page: https://frontendchecklist.io/rules/accessibility/definition-list
