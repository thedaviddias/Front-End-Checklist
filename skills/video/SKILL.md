---
name: video
description: "Use when applies to any page embedding or hosting video content (YouTube, Vimeo, self-hosted). Use when adding video content to a site or auditing structured data coverage."
metadata:
  category: seo
  priority: medium
  difficulty: intermediate
  estimatedTime: "10"
  source: frontendchecklist.io
  url: https://frontendchecklist.io/rules/seo/video
---

# Add VideoObject schema to video pages

Pages with valid VideoObject schema are eligible for video-specific rich results and carousels in Google Search — a visibility advantage that pages without schema cannot access.

## Quick Reference

- Add `VideoObject` JSON-LD schema to every page with embedded video content
- Required properties: `name`, `description`, `thumbnailUrl`, `uploadDate`
- Recommended: `contentUrl` (direct video file) or `embedUrl` (iframe embed URL)
- Valid VideoObject schema can earn video carousels and rich results in Google Search and Google Discover

## Check

Find pages with embedded `<video>` elements, YouTube iframes, or Vimeo players. Check for a `<script type='application/ld+json'>` block containing `"@type": "VideoObject"`. Verify required properties are present: `name`, `description`, `thumbnailUrl`, `uploadDate`. Run through Google's Rich Results Test.

## Fix

Add a `VideoObject` JSON-LD block to each page with video. Populate `name` (video title), `description` (video description), `thumbnailUrl` (absolute URL to thumbnail image), `uploadDate` (ISO 8601 format), and either `contentUrl` or `embedUrl`. Validate with the Rich Results Test.

## Explain

Explain how VideoObject schema enables video-specific rich results, which properties are required vs. recommended by Google, and the difference between `contentUrl` (direct file) and `embedUrl` (embed iframe URL).

## Code Review

Review metadata generation, rendered HTML, structured data, and response headers related to Add VideoObject schema to video pages. Flag exact routes or templates where search-facing output violates the rule, and describe how to verify the final page output.

---

For full implementation details, code examples, and framework-specific guidance,
see `references/rule.md`.

Rule page: https://frontendchecklist.io/rules/seo/video
