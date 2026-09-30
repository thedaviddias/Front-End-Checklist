---
name: video-optimization
description: "Use when reviewing <video> elements, background/hero video, or embedded media assets. Check encoded bitrate, resolution relative to the rendered player size, codec/container choice, and whether a poster/thumbnail avoids blocking on the first frame."
metadata:
  category: performance
  priority: high
  difficulty: intermediate
  estimatedTime: "20"
  source: frontendchecklist.io
  url: https://frontendchecklist.io/en/rules/performance/video-optimization
---

# Optimize and compress web videos

Unoptimized video is frequently the single heaviest asset on a page—an uncompressed or oversized video can dwarf every image and script combined, delaying Largest Contentful Paint and burning mobile data budgets.

## Quick Reference

- Re-encode source video instead of shipping raw camera/screen-recorder output
- Serve multiple resolutions so mobile doesn't download a 4K file
- Prefer modern codecs: AV1/VP9/HEVC over baseline H.264 where supported
- Strip audio tracks from silent background/looping videos

## Check

Scan this codebase for <video> elements and video asset references. For each one, verify: 1) The served resolution is appropriate for the rendered player size and device (no 4K video in a 400px player). 2) The codec/container is efficient (H.264 baseline is acceptable but VP9/AV1/HEVC is preferred when available). 3) Audio is stripped from silent background/looping videos. 4) A poster attribute or lightweight thumbnail is present. 5) File size is reasonable for its duration and placement (hero/background videos under a few MB). Report issues grouped by severity with file paths.

## Fix

For each video optimization issue found: 1) Re-encode to multiple resolutions (e.g. 480p/720p/1080p) and serve the smallest one that fits the player via <source> or JS-based selection. 2) Convert to an efficient codec (VP9 or AV1 in WebM, or HEVC/H.264 in MP4) with a reasonable CRF/ quality setting rather than default encoder settings. 3) Remove the audio track from muted background/looping videos. 4) Add a poster attribute pointing to a compressed thumbnail. 5) Add preload="metadata" (or "none") instead of "auto" for below-the-fold videos. Show the corrected <video> markup and encoding command.

## Explain

Explain why video is often the largest asset on a page and how it affects Largest Contentful Paint and mobile data usage. Cover the tradeoffs between H.264, HEVC, VP9, and AV1 (compression efficiency vs browser/ device support and encode time), how resolution and bitrate should scale to the rendered player size and viewport, and why muted background video should have its audio track stripped entirely rather than just muted in markup.

## Code Review

Review video assets, <video>/<source> markup, and any encoding or CDN transform pipeline related to Optimize and compress web videos. Flag exact files or components where resolution, codec, bitrate, or loading behavior violates the rule, and describe how to confirm the fix in DevTools' Network and Media panels.

---

For full implementation details, code examples, and framework-specific guidance,
see `references/rule.md`.

Rule page: https://frontendchecklist.io/en/rules/performance/video-optimization
