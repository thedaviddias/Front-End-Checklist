---
name: llm-parsability
description: "Use when auditing content pages for AI discoverability. Applies to any informational page intended to appear in AI-generated answers, search snippets, or knowledge base extraction."
metadata:
  category: seo
  priority: medium
  difficulty: intermediate
  estimatedTime: "15"
  source: frontendchecklist.io
  url: https://frontendchecklist.io/rules/seo/llm-parsability
---

# Make content easy for LLMs to parse

AI assistants and answer engines (including Google's AI Overviews) extract and cite content from web pages—pages with clear structure and explicit context are more likely to be accurately cited and surfaced in AI-generated responses.

## Quick Reference

- Use semantic HTML headings, paragraphs, and lists — LLMs prefer structured markup
- Avoid content locked behind JavaScript rendering or requiring user interaction
- Write clear, self-contained sections that make sense out of full-page context
- Structured data (JSON-LD) provides machine-readable context alongside human-readable text

## Check

Evaluate whether the page content is parseable by an LLM. Check: (1) Is content in semantic HTML tags (<h1>–<h6>, <p>, <ul>, <ol>, <table>)? (2) Is key content accessible without JavaScript? (3) Are section headings descriptive enough to stand alone? (4) Does the page have JSON-LD structured data? (5) Are there FAQ sections or explicit Q&A patterns that match common search queries?

## Fix

Restructure content into explicit HTML sections with descriptive headings. Replace JavaScript-rendered content with server-side rendered HTML. Add JSON-LD schema (Article, FAQPage, HowTo) to annotate the content type. Write headings and lead sentences that work as standalone answers—assume the reader only sees one paragraph.

## Explain

Large language models and answer engines process web content by extracting text from HTML. Pages that use semantic markup, clear headings, and server-rendered content are parsed more accurately than JavaScript-heavy or visually-structured pages. As AI-generated answers increasingly cite specific web sources, well-structured content is more likely to be accurately quoted and linked.

## Code Review

Check the page's rendered HTML for: (1) proper heading hierarchy (h1→h2→h3), (2) content wrapped in semantic elements (<article>, <section>, <main>), (3) key content visible in initial HTML response (not injected by JS), (4) presence of FAQPage, HowTo, or Article JSON-LD schema, (5) absence of content hidden behind modals, tabs, or accordions that require JS interaction.

---

For full implementation details, code examples, and framework-specific guidance,
see `references/rule.md`.

Rule page: https://frontendchecklist.io/rules/seo/llm-parsability
