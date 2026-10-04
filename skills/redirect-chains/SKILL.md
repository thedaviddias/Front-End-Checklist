---
name: redirect-chains
description: "Use when auditing internal link structure after a URL migration, domain change, or site rebuild. Applies to any site that has had redirects in place for more than a month."
metadata:
  category: seo
  priority: medium
  difficulty: intermediate
  estimatedTime: "15"
  source: frontendchecklist.io
  url: https://frontendchecklist.io/rules/seo/redirect-chains
---

# Link directly to final destination URLs

Internal links that point to redirect URLs add latency, waste crawl budget, and pass less PageRank to the destination than a direct link would—reducing the ranking potential of linked pages.

## Quick Reference

- Internal links should point directly to the final destination URL, not to a URL that redirects
- Each redirect in a chain dilutes the PageRank passed through it
- Update internal links after URL migrations to point to the new URLs
- Use 301 redirects for permanent moves, but then update source links

## Check

Crawl internal links across the site. For each <a href='...'> tag, follow the URL and check the HTTP response code. Flag any internal link that resolves to a 301 or 302 redirect rather than a direct 200 response. Report the source page, linked URL, and the final destination URL after following the redirect.

## Fix

For each internal link pointing to a redirect URL: update the href attribute to point directly to the final destination URL (the 200-status URL after following all redirects). Keep the redirect in place for external links, but update all internal links to point directly to the canonical-url destination.

## Explain

When Googlebot follows a link to a URL that then redirects to another URL, PageRank is partially lost at each hop. Google has stated that redirects dilute PageRank. Additionally, linking to redirect URLs wastes crawl budget since Googlebot must make multiple requests to reach the final content. Updating internal links to point directly to destination URLs passes full PageRank and improves crawl efficiency.

## Code Review

For each internal <a href='...'> link, follow the URL and check the HTTP response code. If the response is 301 or 302, record the Location header and continue following. Report all internal links that resolve via one or more redirects before reaching a 200 response. Include: source page, link href, each redirect URL in the chain, and final destination URL.

---

For full implementation details, code examples, and framework-specific guidance,
see `references/rule.md`.

Rule page: https://frontendchecklist.io/rules/seo/redirect-chains
