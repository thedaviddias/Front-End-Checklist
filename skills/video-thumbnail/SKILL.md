---
name: video-thumbnail
description: "Use when applies to all `<video>` elements in HTML. The `poster` attribute specifies the URL of an image to show as a placeholder before the video is loaded or played. This is distinct from captions or audio descriptions, which are accessibility requirements. The poster is primarily a UX and performance enhancement, though the lack of a poster can indirectly create a CLS (Cumulative Layout Shift) issue if video dimensions are not declared."
metadata:
  category: html
  priority: medium
  difficulty: beginner
  estimatedTime: "10"
  source: frontendchecklist.io
  url: https://frontendchecklist.io/rules/html/video-thumbnail
---

# Add thumbnail images to videos

Without a poster image, a `<video>` element displays as a blank black rectangle until the first frame is loaded. This is visually jarring, provides no context about the video content, and can cause layout shift (CLS) if the video dimensions are not specified separately. A good thumbnail image communicates the video topic at a glance, allows users to decide whether to play, and improves the page's visual quality — especially on slow connections where video preloading is delayed.

## Quick Reference

- Add a `poster` attribute to `<video>` elements with a URL to a representative thumbnail image
- The poster image displays before the video loads and while the user decides whether to play
- Poster images improve perceived performance by showing meaningful content before video data arrives
- The poster should accurately represent the video content — deceptive thumbnails violate user trust
- Use an image ratio matching the video's aspect ratio (typically 16:9) and a resolution of at least 1280×720

## Check

Find all `<video>` elements. For each, check that: (1) a `poster` attribute is present with a non-empty URL; (2) the URL resolves to a valid image (no 404s); (3) the `width` and `height` attributes or CSS dimensions are set to prevent layout shift while the poster loads; (4) the poster image accurately represents the video content (not a clickbait or unrelated image).

## Fix

(1) Add a `poster` attribute to each `<video>` element: `<video poster='thumbnail.jpg' controls>`. (2) Use an image that represents the video content — typically a frame from the video, a title card, or a branded thumbnail. (3) Ensure the poster image has the same aspect ratio as the video (usually 16:9). (4) Recommended poster dimensions: 1280×720px minimum for HD video; 640×360px is acceptable for smaller embeds. (5) Host the poster image at a CDN-cached URL to ensure fast loading. (6) Also set `width` and `height` on the `<video>` element to prevent CLS.

## Explain

The HTML `poster` attribute on `<video>` specifies a URL for an image to display before video playback begins. When `preload='none'` or `preload='metadata'` is set (recommended for performance — avoids downloading video data on page load), no video frame is available for display, making the poster image the only visual content visible to the user before play. Without a poster, users see either a black rectangle or a browser-rendered blank video frame, which provides no context. The poster also plays a role in perceived performance — users on slow connections see meaningful content immediately rather than waiting for even the first video frame to load.

## Code Review

Review templates, server-rendered HTML, and shared components that output markup related to Add thumbnail images to videos. Flag exact elements, attributes, and routes where the rendered HTML violates the rule.

---

For full implementation details, code examples, and framework-specific guidance,
see `references/rule.md`.

Rule page: https://frontendchecklist.io/rules/html/video-thumbnail
