---
name: video-accessibility
description: "Use when reviewing templates, rendered HTML, or shared components related to Make videos accessible with captions. Validate the final browser-facing markup, not just the source framework abstraction."
metadata:
  category: html
  priority: high
  difficulty: intermediate
  estimatedTime: "30"
  source: frontendchecklist.io
  url: https://frontendchecklist.io/rules/html/video-accessibility
---

# Make videos accessible with captions

Videos without captions exclude deaf and hard-of-hearing users, while videos without audio descriptions exclude blind users from understanding visual content.

## Quick Reference

- Always provide accurate closed captions (not auto-generated)
- Include audio descriptions for visual content
- Provide text transcripts as an alternative
- Never autoplay videos with sound

## Check

Verify videos have accurate closed captions (not auto-generated), audio descriptions for visual content, transcripts, keyboard-accessible pause controls, and no autoplay. Confirm spacebar pauses video without scrolling the page.

## Fix

Add track elements for captions and audio descriptions, provide text transcripts, implement global pause controls, disable autoplay, and ensure media controls are keyboard accessible with proper focus management.

## Explain

Explain how captions help deaf and hard-of-hearing users, audio descriptions help blind users understand visual content, and pause controls help users with cognitive disabilities who find autoplay disorienting.

## Code Review

Review templates, server-rendered HTML, and shared components that output markup related to Make videos accessible with captions. Flag exact elements, attributes, and routes where the rendered HTML violates the rule.

---

For full implementation details, code examples, and framework-specific guidance,
see `references/rule.md`.

Rule page: https://frontendchecklist.io/rules/html/video-accessibility
