---
name: og-image-size
description: "Use when auditing Open Graph tags or generating og:image assets. Applies to any page that may be shared on social networks or messaging platforms."
metadata:
  category: seo
  priority: medium
  difficulty: beginner
  estimatedTime: "10"
  source: frontendchecklist.io
  url: https://frontendchecklist.io/rules/seo/og-image-size
---

# OG Image Size

An incorrectly sized og:image is displayed poorly or not at all on social platforms—Facebook, Twitter/X, LinkedIn each crop or skip images that don't meet their requirements, resulting in blank or distorted link previews.

## Quick Reference

- og:image should be 1200×630 pixels (1.91:1 aspect ratio)
- Minimum size is 600×315 pixels; smaller images may not display
- File size should stay under 5 MB; under 1 MB is preferred
- Use JPEG or PNG; WebP has limited support on older platforms

## Check

Find the og:image meta tag in <head> and fetch the image URL. Check the image dimensions and file size. Flag if width < 1200px, height < 630px, aspect ratio differs significantly from 1.91:1, or file size exceeds 5 MB.

## Fix

Generate or resize the og:image to exactly 1200×630 pixels. Export as JPEG at 80–85% quality to balance visual quality and file size. Reference the absolute HTTPS URL in the og:image meta tag. Add og:image:width and og:image:height tags to help platforms render the image without downloading it first.

## Explain

Social platforms use og:image to construct the visual card shown when a URL is shared. An image too small may be skipped or shown as a thumbnail. An image with the wrong aspect ratio gets cropped, often cutting off important content. The recommended 1200×630 size ensures optimal display across Facebook, LinkedIn, Slack, and iMessage.

## Code Review

Check the og:image meta tag value. Fetch the image and verify: (1) dimensions are at least 1200×630 px, (2) aspect ratio is approximately 1.91:1, (3) file size is under 5 MB, (4) URL is absolute HTTPS, (5) og:image:width and og:image:height tags match actual dimensions. Flag relative URLs or images smaller than 600×315 px.

---

For full implementation details, code examples, and framework-specific guidance,
see `references/rule.md`.

Rule page: https://frontendchecklist.io/rules/seo/og-image-size
