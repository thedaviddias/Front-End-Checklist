# Optimize and compress web videos

> Videos are compressed, resized per device, and served in efficient codecs (H.264, HEVC, VP9/AV1) to reduce page weight and bandwidth use.

**Priority:** high · **Difficulty:** intermediate · **Time:** 20 min

---
Video is often the heaviest single asset on a page. A source file straight off a camera or screen recorder is typically encoded for archival quality, not for the size and bitrate a browser actually needs—re-encoding it for the web can cut file size dramatically with no visible difference at normal playback sizes.

## Code Example

Serve the smallest codec/resolution combination the browser supports, with a fallback for older browsers.

```html
<video poster="hero-poster.jpg" preload="metadata" muted playsinline controls>
  <source src="hero-1080p.av1.webm" type="video/webm; codecs=av01.0.05M.08" />
  <source src="hero-1080p.vp9.webm" type="video/webm; codecs=vp9" />
  <source src="hero-1080p.h264.mp4" type="video/mp4" />
  Your browser does not support the video tag.
</video>
```

```bash
# FFmpeg: re-encode to H.264 at a reasonable quality/size tradeoff
ffmpeg -i input.mov -c:v libx264 -crf 23 -preset slow -c:a aac -b:a 128k output.mp4

# FFmpeg: VP9/WebM, smaller than H.264 at the same visual quality
ffmpeg -i input.mov -c:v libvpx-vp9 -crf 32 -b:v 0 -an output.webm

# Strip audio entirely from a silent background/looping video
ffmpeg -i input.mp4 -c copy -an output-no-audio.mp4
```

## Why It Matters

Unoptimized video is frequently the single heaviest asset on a page—an uncompressed or oversized video can dwarf every image and script combined, delaying Largest Contentful Paint and burning mobile data budgets.

## Resolution and Bitrate

Match the delivered resolution to how large the video will actually render, not the resolution it was captured at.

| Player size | Reasonable source resolution |
|-------------|-------------------------------|
| Full-bleed hero (desktop) | 1080p |
| Inline article video | 720p |
| Thumbnail/preview | 480p or a static poster image |

Serving a 4K background video behind a 400px-tall hero section wastes bandwidth the same way an oversized `<img>` does.

## Codec Choice

| Codec | Container | Compression | Browser Support |
|-------|-----------|-------------|------------------|
| AV1 | WebM/MP4 | Best | Modern browsers, slow to encode |
| VP9 | WebM | Very good | Broad modern support |
| HEVC (H.265) | MP4 | Very good | Safari, licensing constraints elsewhere |
| H.264 | MP4 | Good (baseline) | Universal fallback |

Provide multiple `<source>` elements ordered from most to least efficient codec—the browser picks the first one it can play, so list AV1/VP9 before the H.264 fallback.

## Framework Examples

Codec fallback via `<source>` solves format negotiation, but the native `<video>` element still has no way to pick a *resolution* per breakpoint the way `<picture>` does for images with `media` queries on `<source>`. A naive fix either ships every resolution in one hidden-by-CSS `<video>` per size (the browser downloads all of them regardless of `display: none`) or requires manual JS to swap sources after the fact.

```jsx

function ResponsiveHero() {
  return (
    
  )
}
```

This component renders an SSR-safe `<picture>` placeholder first, then swaps in the `<video>` for the resolution matching the resolved media query once it's running in the browser—so only one poster/video pair downloads instead of one per breakpoint.

## Common Mistakes

- **Shipping the raw capture file** — Camera and screen-recorder output is rarely encoded for web delivery
- **One resolution for every device** — Forces mobile to download the same file as a 4K desktop monitor
- **Keeping audio on muted background video** — The audio track still adds bytes even if the browser never plays it
- **`preload="auto"` on below-the-fold video** — Downloads the whole file before the user may ever see it
- **No poster image** — The player shows a blank or black box until the first frame decodes

- **Short, silent looping clips** (e.g. UI micro-interactions) may be small enough that further compression isn't worth the added encode complexity
- **User-generated or on-demand uploads** often need a server-side transcoding pipeline rather than build-time encoding
- **Live streams** have different constraints (adaptive bitrate via HLS/DASH) than the static-file guidance above

## Verification

### Automated Checks

- Check transferred file size in DevTools' Network tab, filtered to Media
- Run Lighthouse and review any "Efficiently encode video" or LCP-related flags

### Manual Checks

- Confirm the player-rendered size roughly matches the delivered resolution (no visible downscaling of a much larger source)
- Play the video on a throttled mobile network profile to confirm reasonable start time