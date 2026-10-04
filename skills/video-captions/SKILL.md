---
name: video-captions
description: "Use when applies to all `<video>` elements and third-party video embeds (YouTube, Vimeo) where the page owner controls the content. Prerecorded videos require `.vtt` caption files via `<track>`. For videos embedded via `<iframe>`, check that the video platform captions are enabled. Audio-only content requires transcripts instead (SC 1.2.1). Video-only content (no audio) requires a text alternative or audio description instead (SC 1.2.3)."
metadata:
  category: accessibility
  priority: high
  difficulty: intermediate
  estimatedTime: "30"
  source: frontendchecklist.io
  url: https://frontendchecklist.io/rules/accessibility/video-captions
---

# Provide captions for video content

Approximately 15% of adults have some degree of hearing loss. Captions are essential for deaf and hard-of-hearing users who cannot access audio content. They also benefit users in sound-sensitive environments (libraries, open offices), users watching without headphones in public, non-native speakers, and users with auditory processing disorders. WCAG SC 1.2.2 is a Level AA requirement — its absence is a legal compliance failure under the ADA, EN 301 549, and similar regulations worldwide.

## Quick Reference

- Prerecorded video with audio: synchronized captions required — WCAG 2.1 SC 1.2.2 (Level AA)
- Live video with audio: real-time captions required — WCAG 2.1 SC 1.2.4 (Level AA)
- Use `<track kind='captions'>` with a `.vtt` (WebVTT) file for HTML5 `<video>` elements
- Captions must include all spoken dialogue, speaker identification, and relevant non-speech audio (music, sound effects)
- Subtitles and captions are different: captions include non-speech audio; subtitles translate dialogue only

## Check

Find all `<video>` elements and video embeds (`<iframe>` from YouTube, Vimeo, etc.). For each `<video>` with audio: check for a `<track>` child element with `kind='captions'` and a valid `src` pointing to a `.vtt` file. Verify the `default` attribute is present on at least one track so captions are on by default (or document the UX reason they are off by default). For YouTube/Vimeo embeds: check that the platform's caption toggle is accessible. Also check that the `.vtt` file exists and is valid (not empty, not just music notes).

## Fix

For `<video>` elements without captions: (1) Create a WebVTT (`.vtt`) file containing synchronized caption text — include all spoken words, speaker IDs for multi-speaker content, and descriptions of relevant sounds (e.g., '[applause]', '[upbeat music]'). (2) Add `<track kind='captions' srclang='en' label='English' src='captions-en.vtt' default>` inside the `<video>` element. (3) For auto-generated captions (YouTube, AI tools): review and correct errors — auto-captions average 80% accuracy and often fail on proper nouns, technical terms, and accented speech. (4) For live streams: implement real-time captioning via a third-party captioning service or CART (Communication Access Realtime Translation).

## Explain

WCAG 2.1 SC 1.2.2 (Captions — Prerecorded, Level AA) requires synchronized text alternatives for all audio in prerecorded video content. Captions differ from subtitles: captions are intended for deaf/hard-of-hearing viewers and must include non-speech information (sound effects, music), while subtitles translate dialogue for viewers who can hear but do not understand the language. The HTML `<track>` element with `kind='captions'` delivers WebVTT files that browsers render as synchronized on-screen text. The `kind='subtitles'` value is for translation only and does not satisfy SC 1.2.2 because browsers may omit non-speech annotations.

## Code Review

Review the rendered markup and interactive states that affect Provide captions for video content. Flag exact elements, roles, labels, focus behavior, or keyboard interactions that violate the rule, and note how to verify the fix with browser accessibility tooling or assistive tech.

---

For full implementation details, code examples, and framework-specific guidance,
see `references/rule.md`.

Rule page: https://frontendchecklist.io/rules/accessibility/video-captions
