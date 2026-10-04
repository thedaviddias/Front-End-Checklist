---
name: screen-reader-testing
description: "Use when performing accessibility audits of web pages, components, or full user flows. Applies to all web content accessed via assistive technology. Particularly important for custom JavaScript widgets, single-page applications, dynamically updated content, modal dialogs, and forms with validation."
metadata:
  category: accessibility
  priority: high
  difficulty: intermediate
  estimatedTime: "60"
  source: frontendchecklist.io
  url: https://frontendchecklist.io/rules/accessibility/screen-reader-testing
---

# Test with screen readers

Screen readers are the primary interface for blind users and many users with severe low vision or motor disabilities. Automated accessibility scanners cannot detect incorrect announcements, wrong reading order, missing context, focus traps, or broken keyboard interactions. A page that passes automated checks can still be completely unusable by a screen reader user. Manual screen reader testing with representative tasks is the only way to verify real usability for this population.

## Quick Reference

- Automated tools catch ~30-40% of accessibility issues — screen reader testing finds the rest
- Test with NVDA + Chrome or Firefox on Windows; JAWS + Chrome on Windows; VoiceOver + Safari on macOS/iOS; TalkBack + Chrome on Android
- Verify: all interactive elements are reachable by keyboard, announced correctly, and operable
- Check dynamic content: live regions (`aria-live`), modal dialogs (focus trap), and custom widgets (menus, tabs, trees)
- Test real user flows: form completion, navigation to a destination, error correction

## Check

Test the page with at least two screen reader / browser combinations: (1) NVDA + Chrome (Windows) or VoiceOver + Safari (macOS). Navigate using only the keyboard: Tab for focusable elements, arrow keys for widgets, heading navigation (H key in NVDA/JAWS), landmark navigation (D/R keys), and links list (NVDA: Insert+F7). Verify: all interactive elements are reachable and announced with name + role + state; custom widgets (menus, tabs, dialogs) follow ARIA Authoring Practices Guide keyboard patterns; dynamic updates are announced via live regions; focus is managed correctly when modals open and close.

## Fix

Common issues and fixes: (1) Missing accessible names — add aria-label or associate <label> elements. (2) Wrong reading order — reorder DOM structure to match visual order; use CSS for visual reordering only. (3) Focus lost after modal closes — return focus to the trigger element. (4) Dynamic content not announced — add aria-live='polite' (non-critical) or aria-live='assertive' (critical alerts) to containers. (5) Custom widget not keyboard operable — implement ARIA APG keyboard patterns (roving tabindex for menus, arrow keys for tabs). (6) Form errors not announced — associate error messages via aria-describedby or use aria-live regions.

## Explain

Screen readers convert web content to audio or braille output. They build their understanding of a page from the accessibility tree — a parallel representation of the DOM constructed from HTML semantics and ARIA attributes. Automated tools check the tree structure for known violations, but cannot verify whether a blind user can actually complete a task. Screen reader testing requires navigating with real screen reader commands: reading mode (virtual cursor) for browsing content, forms/application mode for interacting with widgets, and shortcut keys for headings, landmarks, and links. Each screen reader + browser combination has unique behavior quirks.

## Code Review

Review the rendered markup and interactive states that affect Test with screen readers. Flag exact elements, roles, labels, focus behavior, or keyboard interactions that violate the rule, and note how to verify the fix with browser accessibility tooling or assistive tech.

---

For full implementation details, code examples, and framework-specific guidance,
see `references/rule.md`.

Rule page: https://frontendchecklist.io/rules/accessibility/screen-reader-testing
