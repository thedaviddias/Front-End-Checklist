---
name: pdf-size
description: "Use when auditing a site that publishes downloadable PDFs (reports, white papers, legal documents, manuals). Applies to any site where PDFs are linked as indexable content resources."
metadata:
  category: seo
  priority: medium
  difficulty: intermediate
  estimatedTime: "15"
  source: frontendchecklist.io
  url: https://frontendchecklist.io/rules/seo/pdf-size
---

# Keep linked PDFs under 60 MB

PDFs larger than Googlebot's download threshold are partially crawled or skipped, meaning their content may not appear in search results even when linked from well-indexed pages.

## Quick Reference

- Googlebot truncates files larger than 15 MB for crawling; 60 MB is a documented upper limit
- Large PDFs may be partially indexed or skipped entirely
- Compress PDFs before publishing: use PDF optimisation tools to reduce file size
- Add HTML landing pages alongside PDFs to ensure content is indexable

## Check

Find all <a href='*.pdf'> links on the site. For each linked PDF, perform a HEAD request and check the Content-Length header. Flag any PDF exceeding 10 MB (recommend compression) or 15 MB (likely to be truncated by Googlebot).

## Fix

Compress large PDFs using a PDF optimisation tool (Adobe Acrobat, Ghostscript, or Smallpdf). Remove embedded high-resolution images, fonts, and metadata not required for reading. If compression is insufficient, create an HTML page with the same content as the primary indexable version, and offer the PDF as a download.

## Explain

Googlebot downloads and indexes the content of PDFs linked from your site. However, it has a file size limit for downloads — files beyond this limit are partially indexed or skipped. Large PDFs also slow down crawling and consume crawl budget. Keeping PDFs small ensures their full content appears in search results.

## Code Review

Find all <a href> links with .pdf extension. For each PDF URL, perform a HEAD request and check Content-Length header value. Flag PDFs exceeding 10,485,760 bytes (10 MB) for compression review. Flag PDFs exceeding 15,728,640 bytes (15 MB) as at-risk for partial indexing. Verify PDF URLs return 200 status and appropriate Content-Type: application/pdf header.

---

For full implementation details, code examples, and framework-specific guidance,
see `references/rule.md`.

Rule page: https://frontendchecklist.io/rules/seo/pdf-size
