---
name: interstitials
description: "Use when applies to CSS and JavaScript implementations of modals, overlays, pop-ups, cookie banners, newsletter sign-up dialogs, and promotional overlays. Check for `position: fixed`, `position: absolute` with large z-index, backdrop overlays, and JavaScript that shows modals on page load or shortly after. Consider both SEO impact (Google) and accessibility (WCAG focus management)."
metadata:
  category: css
  priority: medium
  difficulty: intermediate
  estimatedTime: "10"
  source: frontendchecklist.io
  url: https://frontendchecklist.io/rules/css/interstitials
---

# Avoid intrusive interstitials

Intrusive interstitials are a barrier for screen reader users who may not know a modal is blocking the page — they hear content that appears interactive but cannot activate it. Keyboard users may find focus trapped behind an overlay with no way to dismiss it. Users on mobile are most affected visually, as full-screen pop-ups eliminate all access to content until dismissed. Additionally, Google Search penalizes mobile pages with intrusive interstitials in search rankings.

## Quick Reference

- Full-screen pop-ups that cover the main content immediately on mobile page load are penalized by Google Search (January 2017 Intrusive Interstitials Update)
- Acceptable interstitials: age verification, legally required notices (cookie consent where legally mandated), login walls for private content
- Unacceptable: pop-ups covering the main content area on mobile that are not easy to dismiss
- For accessibility: modal dialogs must trap focus, be dismissible by keyboard (Escape key), and return focus to the trigger element
- WCAG 2.1 SC 2.1.2 (No Keyboard Trap): users must be able to move focus away from any component using the keyboard

## Check

Identify elements using `position: fixed` or `position: absolute` with high `z-index` values that cover significant portions of the viewport. For each: (1) Does it appear on page load or within a few seconds? (2) Does it cover more than a small portion of the main content on mobile screens (< 600px width)? (3) Is it easily dismissible — is there a visible close button with an accessible name? (4) Can it be dismissed by pressing the Escape key? (5) Does focus move into the dialog when it opens and return to the trigger when it closes? Flag dialogs that fail any of these checks.

## Fix

(1) Replace full-screen page-load pop-ups with: (a) sticky banners at the top or bottom (max-height 10-15% of viewport), (b) inline content blocks within the page, or (c) slide-in panels that do not cover the main content. (2) For legally required notices, use small sticky banners rather than full-screen overlays. (3) For all modal dialogs that must be used: implement ARIA dialog pattern — add `role='dialog'`, `aria-modal='true'`, `aria-labelledby` pointing to the dialog title; trap focus within the dialog using a focus trap; move focus to the first focusable element inside the dialog on open; close on Escape key; return focus to the trigger element on close. (4) Delay non-critical pop-ups until user interaction rather than triggering on page load.

## Explain

Intrusive interstitials create two categories of problems: (1) SEO: Google's Intrusive Interstitials Update (2017) penalizes pages that show pop-ups covering the main content on mobile immediately after navigating from search results. Exempt are legally required notices, age verification, and login walls for gated content. (2) Accessibility: A modal dialog that does not manage focus is a WCAG failure. If a screen reader user cannot tell a dialog has appeared, or cannot navigate to it, or is trapped in it without being able to escape, the page fails WCAG 2.1 SC 2.1.2 (No Keyboard Trap) and SC 4.1.3 (Status Messages). The WAI-ARIA dialog pattern requires focus management as a baseline requirement.

## Code Review

Review stylesheets, component styles, and responsive states related to Avoid intrusive interstitials. Flag exact selectors, declarations, or breakpoints that violate the rule in the rendered UI.

---

For full implementation details, code examples, and framework-specific guidance,
see `references/rule.md`.

Rule page: https://frontendchecklist.io/rules/css/interstitials
