---
name: html-size
description: "Use when auditing page weight for crawl efficiency, investigating why certain page content is not appearing in Google's index, or reviewing server-rendered pages that embed large JSON payloads in HTML."
metadata:
  category: seo
  priority: medium
  difficulty: intermediate
  estimatedTime: "10"
  source: frontendchecklist.io
  url: https://frontendchecklist.io/rules/seo/html-size
---

# Keep HTML documents under crawl limits

Googlebot has a documented crawl size limit of approximately 15MB per HTML document. Content beyond this threshold is not parsed or indexed. Excessively large HTML also slows Googlebot crawls, reducing how many of your pages are crawled per budget period.

## Quick Reference

- Googlebot stops parsing HTML beyond approximately 15MB; content after that point is not indexed
- Large HTML is usually caused by inline JSON data dumps, excessive inline SVG, or unminified JavaScript in `<script>` tags
- Target HTML document size under 2MB for optimal crawl efficiency; investigate anything over 5MB

## Check

Measure the raw HTML response size (before compression) for each page. Flag pages over 2MB (investigate) and over 5MB (critical). Identify the cause of oversized HTML: (1) Large inline JSON (`<script id='__NEXT_DATA__'>` or similar). (2) Inline SVG files. (3) Base64-encoded images in HTML. (4) Inline CSS with large amounts of utility classes. (5) Unminified scripts in `<script>` tags.

## Fix

1. Measure: `curl -so /dev/null -w '%{size_download}' https://yoursite.com/page | awk '{print $1/1024 " KB"}'`
2. If large inline JSON is the cause (common in Next.js `__NEXT_DATA__`):
   - Reduce data passed to `getServerSideProps`/`getStaticProps` — only pass what the page renders
   - Use React Server Components (Next.js 13+) to avoid client hydration payloads
3. If inline SVG is the cause: move SVGs to external files and load with `<img>` or `<use>`.
4. If base64 images are the cause: serve images from a CDN and reference via URL.
5. Enable gzip/Brotli compression on the server — Googlebot fetches the compressed response.
6. Minify HTML output in production (remove whitespace and comments).


## Explain

Google's crawl infrastructure parses only the first ~15MB of an HTML document. Pages that exceed this limit have their tail content silently omitted from Google's index. Beyond the hard limit, large HTML documents consume more crawl budget, meaning fewer of your pages are crawled per day. This particularly affects large e-commerce sites or pages that server-render large datasets into HTML.

## Code Review

Check the response `Content-Length` header or measure the raw HTML byte count. Inspect `<script type='application/json'>` or `<script id='__NEXT_DATA__'>` blocks — count their size in bytes. Flag any single block over 500KB. Check for inline SVG elements (look for `<svg>` in body HTML) that should be external files. Verify HTML is served with gzip or Brotli encoding.

---

For full implementation details, code examples, and framework-specific guidance,
see `references/rule.md`.

Rule page: https://frontendchecklist.io/rules/seo/html-size
