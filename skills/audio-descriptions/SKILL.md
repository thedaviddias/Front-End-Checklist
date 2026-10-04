---
name: audio-descriptions
description: "Use when reviewing rendered HTML, interactive components, or design-system patterns related to Provide audio descriptions for video. Check native semantics first, then inspect keyboard behavior, focus flow, accessible names, and screen-reader output where relevant."
metadata:
  category: accessibility
  priority: medium
  difficulty: intermediate
  estimatedTime: "30"
  source: frontendchecklist.io
  url: https://frontendchecklist.io/rules/accessibility/audio-descriptions
---

# Provide audio descriptions for video

Blind users miss critical plot points, product demos, and on-screen information that's only shown visually—audio descriptions provide equal access to the complete experience.

## Quick Reference

- Add audio descriptions for visual-only content (actions, expressions, text)
- Use track element with kind='descriptions' for separate description track
- Provide extended description version if gaps between dialogue are too short
- Integrate visual descriptions into main narration when possible

## Check

Identify videos where visual content conveys information not available in the audio track (actions, expressions, scene changes, on-screen text). Verify audio descriptions are available or visual content is described in dialogue.

## Fix

Add a separate audio description track using the track element with kind='descriptions'. Alternatively, provide an extended version with pauses for descriptions, or include visual descriptions in the main narration.

## Explain

Explain how blind and low-vision users miss visual-only information in videos, and why audio descriptions provide equal access to the complete content experience.

## Code Review

Review the rendered markup and interactive states that affect Provide audio descriptions for video. Flag exact elements, roles, labels, focus behavior, or keyboard interactions that violate the rule, and note how to verify the fix with browser accessibility tooling or assistive tech.

---

For full implementation details, code examples, and framework-specific guidance,
see `references/rule.md`.

Rule page: https://frontendchecklist.io/rules/accessibility/audio-descriptions
