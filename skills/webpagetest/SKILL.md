---
name: webpagetest
description: "Use when reviewing templates, rendered HTML, or shared components related to Analyze performance with WebPageTest. Validate the final browser-facing markup, not just the source framework abstraction."
metadata:
  category: html
  priority: high
  difficulty: intermediate
  estimatedTime: "30"
  source: frontendchecklist.io
  url: https://frontendchecklist.io/rules/html/webpagetest
---

# Analyze performance with WebPageTest

WebPageTest reveals real-world performance issues that synthetic tools miss—like TTFB from actual locations, render-blocking patterns, and third-party script impact.

## Quick Reference

- Run 3+ tests to get consistent results
- Test from locations near your users
- Use filmstrip view to identify visual progress
- Check waterfall for blocking resources and slow third-parties

## Check

Use WebPageTest to analyze page performance, identify bottlenecks, and measure real-world loading metrics across different devices and connections.

## Fix

Implement recommended optimizations from WebPageTest results including resource compression, caching, and critical path improvements.

## Explain

Explain how WebPageTest provides insights into Core Web Vitals, loading waterfalls, and performance opportunities that synthetic testing can't reveal.

## Code Review

Review templates, server-rendered HTML, and shared components that output markup related to Analyze performance with WebPageTest. Flag exact elements, attributes, and routes where the rendered HTML violates the rule.

---

For full implementation details, code examples, and framework-specific guidance,
see `references/rule.md`.

Rule page: https://frontendchecklist.io/rules/html/webpagetest
