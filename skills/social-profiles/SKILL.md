---
name: social-profiles
description: "Use when applies to business websites, personal brand sites, and publisher sites. Use when setting up Organization schema or auditing E-E-A-T signals for sites in competitive or YMYL categories."
metadata:
  category: seo
  priority: low
  difficulty: beginner
  estimatedTime: "10"
  source: frontendchecklist.io
  url: https://frontendchecklist.io/rules/seo/social-profiles
---

# Link to active social profiles

Google uses social profile links and `sameAs` schema to verify an organization's identity and build entity associations that strengthen E-E-A-T — especially important for YMYL topics.

## Quick Reference

- Link to your official social media profiles from the site footer or About page
- Use `Organization` or `Person` schema with `sameAs` to explicitly connect your site to social profiles
- Only link to active profiles — a link to an abandoned account can harm trust
- Social profile links contribute to E-E-A-T (Experience, Expertise, Authoritativeness, Trustworthiness) signals

## Check

Check the site's footer, header, and About page for links to social media profiles. Verify the links go to the correct, active official profiles. Check for `Organization` or `Person` JSON-LD schema with a `sameAs` array listing social profile URLs.

## Fix

Add links to active social profiles in the site footer using recognizable icons or text labels. Add or update `Organization` / `Person` schema with a `sameAs` array containing all official social profile URLs (LinkedIn, Twitter/X, Facebook, etc.).

## Explain

Explain how social profile links help search engines build an entity graph for the organization, how this contributes to E-E-A-T, and why linking to inactive profiles is counterproductive.

## Code Review

Review metadata generation, rendered HTML, structured data, and response headers related to Link to active social profiles. Flag exact routes or templates where search-facing output violates the rule, and describe how to verify the final page output.

---

For full implementation details, code examples, and framework-specific guidance,
see `references/rule.md`.

Rule page: https://frontendchecklist.io/rules/seo/social-profiles
