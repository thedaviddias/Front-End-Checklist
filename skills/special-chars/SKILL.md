---
name: special-chars
description: "Use when applies to any site with user-generated slugs, CMS-generated URLs, or content in non-English languages. Use when auditing URLs for crawl errors or canonicalization issues."
metadata:
  category: seo
  priority: medium
  difficulty: beginner
  estimatedTime: "10"
  source: frontendchecklist.io
  url: https://frontendchecklist.io/rules/seo/special-chars
---

# URL Special Characters

Special characters in URL paths cause inconsistent crawling, broken links when shared, and canonicalization failures when different systems encode them differently.

## Quick Reference

- URL paths should contain only unreserved characters: A-Z, a-z, 0-9, `-`, `_`, `.`, `~`
- Spaces must be encoded as `%20` (not `+`, which is query-string syntax)
- Characters like `#`, `?`, `&`, `=` have reserved meaning in URLs and must be percent-encoded in path segments
- Non-ASCII characters (accented letters, CJK) should be percent-encoded in URLs, though modern browsers decode them for display

## Check

Scan all crawled URL paths for characters outside `[A-Za-z0-9\-_./~]`. Flag URLs containing spaces (`%20` or literal), special symbols (`#`, `?`, `&`, `=`, `+` in paths), or unencoded non-ASCII characters. Check if different encodings of the same URL return separate 200 responses.

## Fix

Update the URL generation logic in your CMS or framework to strip or replace special characters. Replace spaces with hyphens. Percent-encode any reserved characters that must appear in paths. Set up redirects from problematic old URLs to clean new slugs.

## Explain

Explain the difference between reserved and unreserved characters in RFC 3986, how browsers and crawlers handle inconsistent percent-encoding, and why special characters in paths create duplicate content risks.

## Code Review

Review metadata generation, rendered HTML, structured data, and response headers related to URL Special Characters. Flag exact routes or templates where search-facing output violates the rule, and describe how to verify the final page output.

---

For full implementation details, code examples, and framework-specific guidance,
see `references/rule.md`.

Rule page: https://frontendchecklist.io/rules/seo/special-chars
