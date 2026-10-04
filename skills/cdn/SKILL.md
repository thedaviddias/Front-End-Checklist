---
name: cdn
description: "Use when auditing slow page loads, heavy assets, or rendering delays related to Use a content delivery network. Verify the actual bottleneck in DevTools, Lighthouse, or field data before recommending changes."
metadata:
  category: performance
  priority: high
  difficulty: intermediate
  estimatedTime: "30"
  source: frontendchecklist.io
  url: https://frontendchecklist.io/rules/performance/cdn
---

# Use a content delivery network

A CDN serves static assets from geographically distributed servers—users download from the nearest location, dramatically reducing latency and improving load times.

## Quick Reference

- CDNs serve content from edge servers closest to users
- Reduces latency by 50-70% for global users
- Handles traffic spikes and provides DDoS protection
- Popular options: Cloudflare, Vercel, AWS CloudFront, Fastly

## Check

Check if static assets are served from a CDN and if the CDN is properly configured.

## Fix

Configure a CDN to serve static assets with proper caching headers and geographic distribution.

## Explain

Explain how CDNs reduce latency by serving content from geographically distributed servers.

## Code Review

Review the routes, assets, and loading behavior that affect Use a content delivery network. Flag exact files, requests, or rendering steps that add unnecessary network, CPU, or layout cost, and describe the measurement method used to confirm the issue.

---

For full implementation details, code examples, and framework-specific guidance,
see `references/rule.md`.

Rule page: https://frontendchecklist.io/rules/performance/cdn
