---
name: dead-end-pages
description: "Use when auditing a site's internal link graph for dead-end pages, suggesting related-content links to add to thin or standalone pages, or reviewing CMS templates that produce link-free content pages."
metadata:
  category: seo
  priority: medium
  difficulty: intermediate
  estimatedTime: "10"
  source: frontendchecklist.io
  url: https://frontendchecklist.io/rules/seo/dead-end-pages
---

# Add outgoing links to dead-end pages

Googlebot follows links to discover and re-crawl pages. A page with no outgoing internal links stops the crawler from reaching the rest of your site from that point and leaves users with nowhere logical to go, increasing bounce rate.

## Quick Reference

- Every page should link to at least 2–3 contextually relevant internal pages to aid navigation and crawling
- Pages with zero outgoing links trap crawlers and users, forming dead ends in your site's link graph
- Contextual inline links (within body content) pass more value than footer or navigation links alone

## Check

For each page, count the number of `<a href>` links pointing to other pages on the same domain (exclude navigation/header/footer if they are templated identically across all pages). Flag any page with zero or fewer than two unique internal links in the main content body (`<main>` or `<article>` element).

## Fix

1. Identify all pages flagged as dead ends (no or minimal outgoing internal links in body content).
2. For each dead-end page, identify 2–5 topically related pages on the site.
3. Add contextual inline links within the body content — not just in headers or footers.
4. Example: A blog post about CSS Grid should link to related posts on Flexbox and responsive design.
5. Add a "Related articles" or "See also" section at the bottom if inline links are not practical.
6. Re-crawl after changes to verify the links appear in the rendered DOM.


## Explain

Internal links are the edges of your site's graph. Crawlers navigate by following links; a page with no outgoing links is a node with no edges leading forward. This prevents Googlebot from discovering linked pages during a crawl initiated from that dead end, and it signals to users that there is nothing more to explore.

## Code Review

Parse the `<main>` or `<article>` element of each rendered page. Count `<a href>` tags pointing to same-domain URLs. Flag pages with fewer than 2 such links. Exclude navigation, header, and footer elements that are shared across all pages, as these do not count as contextual internal links.

---

For full implementation details, code examples, and framework-specific guidance,
see `references/rule.md`.

Rule page: https://frontendchecklist.io/rules/seo/dead-end-pages
