---
name: editorial-policy
description: "Use when auditing a blog, news site, or YMYL content site for trust signals, drafting editorial policy page content, or evaluating whether a site meets Google's quality rater trustworthiness criteria."
metadata:
  category: seo
  priority: medium
  difficulty: intermediate
  estimatedTime: "10"
  source: frontendchecklist.io
  url: https://frontendchecklist.io/rules/seo/editorial-policy
---

# Publish an editorial policy page

Google's E-E-A-T framework rates sites on Expertise, Authoritativeness, and Trustworthiness. Quality raters look for editorial standards pages as evidence of a trustworthy publication. Sites without visible editorial policies — especially YMYL sites — receive lower trust ratings, which suppresses search rankings.

## Quick Reference

- Publish a dedicated editorial policy page explaining how content is researched, written, reviewed, and updated
- Link to the editorial policy from your About page and from individual articles (byline or footer)
- Include information on author qualifications, fact-checking processes, and correction policies

## Check

Check if the site has a publicly accessible editorial policy page (commonly at /editorial-policy, /about/editorial-standards, or linked from the About page). Verify it covers: (1) how topics are chosen, (2) author qualifications, (3) fact-checking or review process, (4) how corrections are handled, and (5) conflicts of interest or funding disclosures.

## Fix

1. Create a page at /editorial-policy (or /about/editorial-standards).
2. Include these sections:
   - Mission: what topics you cover and why
   - Author standards: credentials, expertise required of contributors
   - Research and fact-checking: sources used, review by subject matter experts
   - Update policy: how often content is reviewed, how errors are corrected
   - Conflict of interest: advertising, affiliate relationships, funding sources
3. Link to this page from your About page, site footer, and individual article bylines.
4. Name specific authors with credentials rather than using "Editorial Team" as a generic author.


## Explain

Google's Search Quality Rater Guidelines specifically look for editorial standards as part of evaluating a site's Trustworthiness. For YMYL topics especially, the absence of an editorial policy is a clear signal to quality raters that the site cannot be trusted to publish accurate, expert-reviewed content, leading to lower quality ratings and reduced search visibility.

## Code Review

Check the site's footer links, About page, and individual article templates for a link to an editorial policy page. Verify the editorial policy URL returns a 200 status code and that the page contains substantive content — not just a boilerplate paragraph — covering research methodology, author qualifications, and correction policies.

---

For full implementation details, code examples, and framework-specific guidance,
see `references/rule.md`.

Rule page: https://frontendchecklist.io/rules/seo/editorial-policy
