---
name: disclaimers
description: "Use when auditing YMYL content pages for trust signals, generating disclaimer copy for medical or financial content, or reviewing affiliate disclosure requirements under FTC or ASA guidelines."
metadata:
  category: seo
  priority: medium
  difficulty: intermediate
  estimatedTime: "10"
  source: frontendchecklist.io
  url: https://frontendchecklist.io/rules/seo/disclaimers
---

# Add disclaimers to sensitive content

Google's Search Quality Rater Guidelines classify health, finance, and legal topics as 'Your Money or Your Life' (YMYL) pages that are held to the highest trust standards. Pages lacking appropriate disclaimers score low on Trustworthiness within the E-E-A-T framework, suppressing their rankings.

## Quick Reference

- YMYL pages (medical, legal, financial, safety topics) require visible, accurate disclaimers to demonstrate trustworthiness
- Google's quality raters assess E-E-A-T; missing disclaimers on sensitive topics signal low trust
- Disclaimers must be accurate and specific — generic 'consult a professional' text with no context is insufficient

## Check

Identify pages covering medical, legal, financial, safety, or affiliate content. For each, check: (1) Is there a visible disclaimer stating the content does not constitute professional advice? (2) For affiliate content, is there an FTC-compliant disclosure before the first affiliate link? (3) Is the disclaimer placed prominently — not hidden in footers or after lengthy content?

## Fix

1. Identify pages in YMYL categories (health, law, finance, safety) and affiliate pages.
2. Add a disclaimer block near the top of the content, before readers engage with the sensitive material.
3. For medical content: "This content is for informational purposes only and does not constitute medical advice. Consult a qualified healthcare professional before making health decisions."
4. For financial content: "This article is for educational purposes only and is not financial advice. Past performance is not indicative of future results."
5. For legal content: "This information is general in nature and not legal advice. Consult a licensed attorney for advice specific to your situation."
6. For affiliate content: "This post contains affiliate links. We may earn a commission if you purchase through these links at no extra cost to you."
7. Mark the disclaimer with an appropriate ARIA role or visually distinctive style so users can identify it.


## Explain

Google evaluates YMYL pages under its E-E-A-T (Experience, Expertise, Authoritativeness, Trustworthiness) framework. Missing disclaimers on sensitive topics reduce the Trustworthiness score, which quality raters assign and which influences how Google ranks those pages. Disclaimers also reduce legal risk and meet regulatory requirements (FTC in the US, ASA in the UK for affiliates).

## Code Review

Scan page content for YMYL topic keywords (medical symptoms, drug names, investment advice, legal rights, etc.). If found, check for a disclaimer element near the top of `<main>` or `<article>`. Verify affiliate pages include FTC-compliant disclosure text before the first `<a>` with a referral parameter or affiliate domain.

---

For full implementation details, code examples, and framework-specific guidance,
see `references/rule.md`.

Rule page: https://frontendchecklist.io/rules/seo/disclaimers
