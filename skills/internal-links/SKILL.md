---
name: internal-links
description: "Use when auditing a site's internal link structure, identifying pages that need more incoming links, generating contextual linking opportunities between related content, or reviewing a CMS template's internal linking patterns."
metadata:
  category: seo
  priority: medium
  difficulty: intermediate
  estimatedTime: "10"
  source: frontendchecklist.io
  url: https://frontendchecklist.io/rules/seo/internal-links
---

# Add internal links to key pages

Internal links are how PageRank flows through your site. A key page with few internal links receives less PageRank signal, ranking lower than its content quality would otherwise allow. Googlebot also discovers pages through internal links — a page with zero incoming links is likely an orphan page.

## Quick Reference

- Important pages should receive multiple internal links with descriptive, keyword-relevant anchor text
- Internal links distribute PageRank; pages receiving few internal links rank lower regardless of content quality
- Use contextual inline links in body content — these carry more weight than navigation or footer links

## Check

Using a site crawl, build a map of internal links. For each important page (key landing pages, top blog posts, product pages): (1) Count the number of unique internal pages linking to it. (2) Check if the anchor text of those links includes relevant keywords for the target page. (3) Identify pages with 0–2 incoming internal links (likely orphans or under-linked). (4) Verify links are in body content, not only in global navigation or footer.

## Fix

1. List your top 10–20 most important pages by business value.
2. For each, identify pages on the site with topically related content.
3. Add contextual inline links to those important pages from related content.
4. Use descriptive anchor text that includes target keywords: instead of "click here", use "our guide to CSS Grid".
5. Add a "Related articles" or "See also" section to articles, linking to relevant high-value pages.
6. Ensure your site's top navigation links to your 5–10 most important commercial pages.
7. Check that pillar pages link to their supporting cluster pages and vice versa.


## Explain

PageRank, Google's foundational ranking algorithm, flows from page to page through internal links. A page with many high-quality internal links pointing to it receives more PageRank signal and ranks more competitively. Anchor text of internal links also provides keyword context signals to Google about the target page's topic.

## Code Review

Build an internal link graph from crawl data. Compute in-degree (number of pages linking in) for each page. Flag pages with in-degree < 2 that are in the sitemap and not excluded by robots/noindex. Check anchor text of internal links for generic text ('here', 'click', 'read more') that could be replaced with descriptive keyword-rich text.

---

For full implementation details, code examples, and framework-specific guidance,
see `references/rule.md`.

Rule page: https://frontendchecklist.io/rules/seo/internal-links
