---
name: freshness
description: "Use when auditing content pages for freshness signals, setting up HTTP Last-Modified headers in a web server config, or ensuring Article JSON-LD dateModified is updated when CMS content changes."
metadata:
  category: seo
  priority: medium
  difficulty: intermediate
  estimatedTime: "10"
  source: frontendchecklist.io
  url: https://frontendchecklist.io/rules/seo/freshness
---

# Show content freshness signals

Google's Query Deserves Freshness (QDF) algorithm boosts recent or recently updated content for time-sensitive queries. Missing or stale freshness signals mean your updated content competes without the freshness advantage it deserves.

## Quick Reference

- Set the `Last-Modified` HTTP response header and include `dateModified` in Article JSON-LD on all content pages
- Update `dateModified` only when content substantively changes — trivial edits should not alter the date
- For time-sensitive topics (news, tutorials, product reviews), freshness directly influences Google's ranking of your content

## Check

For each article or blog page: (1) Check the HTTP response `Last-Modified` header — is it set and recent? (2) Check the JSON-LD for a `dateModified` property in ISO 8601 format. (3) Is a visible 'Last updated' date shown to users? (4) Is the `dateModified` in JSON-LD consistent with the visible date and the `Last-Modified` header?

## Fix

1. Configure your web server to send `Last-Modified` headers based on the file modification time:
   - Nginx: `add_header Last-Modified $date_gmt;`
   - Apache: ensure `mod_headers` is enabled; static files serve Last-Modified automatically.
2. Update Article JSON-LD to include `dateModified`:
   ```json
   { "@type": "Article", "dateModified": "2024-11-20T14:30:00Z" }
   ```
3. Add a visible "Last updated" date to the article template.
4. Hook your CMS to update `dateModified` only when content is substantively changed (not on metadata-only saves).
5. If using a static site generator (Next.js, Astro), pass the frontmatter `updatedAt` field through to the JSON-LD and `<time>` elements.


## Explain

Google's freshness algorithm (QDF — Query Deserves Freshness) actively boosts recently published or updated content for searches where recency matters. If your `dateModified` is stale or absent, Google may not credit your content with the freshness it deserves, ranking older competitors above you even after you have updated the article.

## Code Review

Check that the `Last-Modified` response header is present on article pages. Verify Article JSON-LD includes `dateModified` in ISO 8601 format. Confirm that the build or deployment system updates `dateModified` only for content files that actually changed — not a blanket timestamp update on all pages during deploy.

---

For full implementation details, code examples, and framework-specific guidance,
see `references/rule.md`.

Rule page: https://frontendchecklist.io/rules/seo/freshness
