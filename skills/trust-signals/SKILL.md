---
name: trust-signals
description: "Use when applies especially to e-commerce checkouts, contact/lead forms, pricing pages, and YMYL (Your Money or Your Life) content. Use when auditing E-E-A-T or conversion optimization."
metadata:
  category: seo
  priority: medium
  difficulty: intermediate
  estimatedTime: "10"
  source: frontendchecklist.io
  url: https://frontendchecklist.io/rules/seo/trust-signals
---

# Show trust signals on key pages

Google's Quality Rater Guidelines explicitly evaluate trustworthiness as a core page quality signal; pages lacking visible trust evidence score lower in manual quality assessments that influence ranking systems.

## Quick Reference

- Display trust signals (reviews, certifications, security badges, client logos) near calls-to-action on key pages
- Trust signals are a core component of Google's E-E-A-T (Experience, Expertise, Authoritativeness, Trustworthiness)
- For YMYL pages (health, finance, legal), trust signals are a critical quality signal in Google's Quality Rater Guidelines
- Fake or unverifiable trust badges actively harm credibility — only display genuine, verifiable credentials

## Check

On key conversion pages (checkout, contact, pricing, landing pages), check for: security/SSL badges near forms, third-party review platform ratings (Google, Trustpilot), industry certifications, client/partner logos, testimonials with names and photos, money-back guarantee language. Verify all badges are genuine (not just images).

## Fix

Add appropriate trust signals to each key page: embed real review widgets from Google/Trustpilot, display relevant certifications with verifiable links, add named testimonials with photos, include security badges near form submission areas. Ensure all trust elements are current and accurate.

## Explain

Explain how trust signals affect both user conversion rates and Google's quality assessments, what E-E-A-T means for content quality, and why YMYL pages face higher trust scrutiny from Google's Quality Rater Guidelines.

## Code Review

Review metadata generation, rendered HTML, structured data, and response headers related to Show trust signals on key pages. Flag exact routes or templates where search-facing output violates the rule, and describe how to verify the final page output.

---

For full implementation details, code examples, and framework-specific guidance,
see `references/rule.md`.

Rule page: https://frontendchecklist.io/rules/seo/trust-signals
