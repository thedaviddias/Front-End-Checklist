---
name: filename-quality
description: "Use when reviewing image assets, markup, and CDN or build transforms related to Use descriptive image filenames. Check encoded size, rendered size, loading strategy, and above-the-fold impact together."
metadata:
  category: images
  priority: low
  difficulty: beginner
  estimatedTime: "10"
  source: frontendchecklist.io
  url: https://frontendchecklist.io/rules/images/filename-quality
---

# Use descriptive image filenames

Google explicitly recommends descriptive filenames in its Image SEO best practices. A file named red-leather-wallet.jpg gives search engines context about the image content, improving discoverability in image search. Generic filenames waste this SEO signal. Descriptive names also help developers maintain large asset libraries without opening every file to identify its content.

## Quick Reference

- Use descriptive, hyphen-separated filenames: `hero-homepage-team-collaboration.jpg`
- Avoid generic names like `image1.jpg`, `photo.png`, or camera defaults like `IMG_4532.jpg`
- Use lowercase only—avoid uppercase letters and spaces which can cause URL encoding issues
- Google uses filenames as a relevance signal for image search results

## Check

Scan all image file references in this codebase (<img src>, CSS url(), import statements, and public/assets directories). Identify filenames that: 1) Use auto-generated names (e.g., IMG_1234.jpg, DSC_0056.png, screenshot-2024-01-01.png). 2) Use meaningless names (e.g., image1.jpg, photo.png, pic.jpg). 3) Contain spaces (e.g., 'my photo.jpg'). 4) Use underscores as word separators (e.g., hero_image.jpg instead of hero-image.jpg). 5) Mix uppercase and lowercase letters. Report each problematic filename with its path.

## Fix

Rename image files with descriptive, SEO-friendly names: 1) Replace generic names with descriptive ones reflecting the content (e.g., rename IMG_1234.jpg to blue-running-shoes-side-view.jpg). 2) Use lowercase letters only. 3) Replace spaces and underscores with hyphens. 4) Keep names concise but meaningful—3 to 5 words is ideal. 5) Update all references to the renamed file in HTML, CSS, and JavaScript. For large-scale renames, provide a migration script that reads old paths, generates new names, and updates all references.

## Explain

Explain why descriptive filenames matter for image SEO. Google explicitly states it uses filename as a signal for image search ranking. A filename like product-red-leather-wallet.jpg gives Google context about the image before it even analyses the pixels. Generic filenames (image1.jpg, photo.png) provide no signal. Additionally, descriptive filenames improve developer experience—team members can understand what an asset is without opening it.

## Code Review

Review image assets, markup, and delivery configuration related to Use descriptive image filenames. Flag exact files or components where format choice, sizing, or loading behavior violates the rule, and describe how to confirm the fix in DevTools.

---

For full implementation details, code examples, and framework-specific guidance,
see `references/rule.md`.

Rule page: https://frontendchecklist.io/rules/images/filename-quality
