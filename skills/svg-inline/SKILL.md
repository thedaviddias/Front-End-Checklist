---
name: svg-inline
description: "Use when reviewing image assets, markup, and CDN or build transforms related to Manage inline SVG size and complexity. Check encoded size, rendered size, loading strategy, and above-the-fold impact together."
metadata:
  category: images
  priority: medium
  difficulty: intermediate
  estimatedTime: "15"
  source: frontendchecklist.io
  url: https://frontendchecklist.io/rules/images/svg-inline
---

# Manage inline SVG size and complexity

A complex illustration exported from Figma can easily be 50-200KB of SVG markup. Inlined in HTML, it blocks the HTML parser until it is processed, cannot be cached independently, and balloons every page response. Extracting it to an external file allows browser caching and deferred loading. For icon systems, SVG sprites or component libraries avoid duplicating path data across every page.

## Quick Reference

- Only inline SVG when you need CSS hover/animation on individual paths—static SVGs belong in `<img>` tags
- Keep inline SVGs under 1KB (ideally under 500 bytes) after SVGO optimisation
- Reused icons should be SVG sprites or framework components—not copied inline multiple times
- Run all SVGs through SVGO before inlining to strip editor artefacts

## Check

Scan HTML files and React/Vue components for inline <svg> elements. For each inline SVG: 1) Measure its character count—flag any over 1KB (approximately 1000 characters). 2) Check if it is reused in multiple places (should be a component or sprite). 3) Check if SVGO has been run (look for redundant attributes, inline styles that could be CSS classes, or editor comments). 4) Check if the SVG needs to be inline for CSS styling/animation, or if <img src="file.svg"> would suffice. Report each large inline SVG with its size and location.

## Fix

For each problematic inline SVG: 1) Large, non-interactive SVG (e.g., illustration): extract to .svg file and reference with <img src="illustration.svg" alt="...">. 2) Reused icon: create an SVG sprite or React component. 3) SVG needing CSS interactivity (hover, animation): keep inline but run through SVGO first—remove editor artefacts, merge paths, remove redundant attributes. 4) For React projects, use SVGR to import SVGs as components—they tree-shake unused SVGs. 5) Show before/after size comparison.

## Explain

Explain the trade-offs of inline SVG. Inline SVG allows CSS styling (fill, stroke) and JavaScript animation on individual paths, which external SVG files or <img> elements cannot support. However, large inline SVGs bloat the HTML, delay HTML parser completion, cannot be cached separately from the page, and duplicate markup when used in multiple places. The guidance is: use inline SVG only when you need CSS/JS interactivity; use <img src="file.svg"> or CSS background for static SVGs; use SVG sprites or React components for reused icons.

## Code Review

Review image assets, markup, and delivery configuration related to Manage inline SVG size and complexity. Flag exact files or components where format choice, sizing, or loading behavior violates the rule, and describe how to confirm the fix in DevTools.

---

For full implementation details, code examples, and framework-specific guidance,
see `references/rule.md`.

Rule page: https://frontendchecklist.io/rules/images/svg-inline
