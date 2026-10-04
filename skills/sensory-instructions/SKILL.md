---
name: sensory-instructions
description: "Use when reviewing rendered HTML, interactive components, or design-system patterns related to Avoid sensory-only instructions. Check native semantics first, then inspect keyboard behavior, focus flow, accessible names, and screen-reader output where relevant."
metadata:
  category: accessibility
  priority: high
  difficulty: beginner
  estimatedTime: "15"
  source: frontendchecklist.io
  url: https://frontendchecklist.io/rules/accessibility/sensory-instructions
---

# Avoid sensory-only instructions

Color-blind users can't see 'click the red button,' screen reader users can't perceive 'the menu on the right,' and deaf users miss audio cues—multi-modal instructions include everyone.

## Quick Reference

- Don't use color alone to convey information (red=error)
- Add text labels to shape and location references
- Provide visual alternatives for audio cues
- Combine multiple cues so all users can understand

## Check

Review instructions and verify they don't rely only on color ('click the red button'), shape ('the circular icon'), location ('the menu on the right'), or sound ('when you hear the beep'). Ensure text labels supplement visual cues.

## Fix

Add text labels to visual instructions. Instead of 'click the green button', use 'click the Submit button (green)'. Combine multiple cues so users who cannot perceive one can still understand via another.

## Explain

Explain how color-blind users cannot distinguish color-only cues, screen reader users cannot perceive location or shape, and deaf users miss audio-only signals, making multi-modal instructions essential.

## Code Review

Review the rendered markup and interactive states that affect Avoid sensory-only instructions. Flag exact elements, roles, labels, focus behavior, or keyboard interactions that violate the rule, and note how to verify the fix with browser accessibility tooling or assistive tech.

---

For full implementation details, code examples, and framework-specific guidance,
see `references/rule.md`.

Rule page: https://frontendchecklist.io/rules/accessibility/sensory-instructions
