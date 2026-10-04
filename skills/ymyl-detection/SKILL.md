---
name: ymyl-detection
description: "Use when applies to any site in health, medicine, finance, law, safety, news, or similar fields. Use when auditing content quality for sites in YMYL categories or investigating why high-quality-seeming content underperforms."
metadata:
  category: seo
  priority: high
  difficulty: intermediate
  estimatedTime: "10"
  source: frontendchecklist.io
  url: https://frontendchecklist.io/rules/seo/ymyl-detection
---

# Identify YMYL content on your site

Google's Quality Rater Guidelines require YMYL pages to meet higher E-E-A-T standards than general content — a YMYL page without visible expertise and trust signals will be rated low quality regardless of technical SEO.

## Quick Reference

- YMYL pages cover topics where inaccurate information could harm a user's health, safety, finances, or wellbeing
- Google applies its highest quality standards to YMYL content — E-E-A-T must be demonstrably high
- YMYL pages must display author credentials, cite authoritative sources, and be reviewed by qualified experts
- Missing trust signals on YMYL pages can cause poor manual quality ratings that suppress rankings

## Check

Identify pages covering medical, financial, legal, safety, or civic topics. For each YMYL page, check: Does it display author name and credentials? Is the author qualified in the topic area? Are claims supported by cited, authoritative sources? Was the content reviewed by a relevant expert? When was it last updated?

## Fix

Add author bylines with credentials to YMYL pages. Link author names to bio pages that describe their qualifications. Add citations to primary sources (peer-reviewed research, government data, official guidelines). Add a 'reviewed by' note with the reviewer's credentials. Update outdated YMYL content with a visible last-reviewed date.

## Explain

Explain what YMYL content is, why Google applies stricter quality standards to it, how Quality Raters assess E-E-A-T on YMYL pages, and what steps content teams should take to meet those standards.

## Code Review

Review metadata generation, rendered HTML, structured data, and response headers related to Identify YMYL content on your site. Flag exact routes or templates where search-facing output violates the rule, and describe how to verify the final page output.

---

For full implementation details, code examples, and framework-specific guidance,
see `references/rule.md`.

Rule page: https://frontendchecklist.io/rules/seo/ymyl-detection
