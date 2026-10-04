---
name: https
description: "Use when auditing whether a website or web application serves content exclusively over HTTPS with a valid certificate."
metadata:
  category: security
  priority: critical
  difficulty: beginner
  estimatedTime: "30"
  source: frontendchecklist.io
  url: https://frontendchecklist.io/rules/security/https
---

# Serve all pages over HTTPS

Plain HTTP exposes every request and response to anyone on the network path — ISPs, Wi-Fi operators, and MITM attackers can read passwords, session tokens, and personal data without any warning to the user.

## Quick Reference

- All HTTP traffic must redirect to HTTPS with a 301 (permanent) redirect
- TLS certificates must be valid, not expired, and cover all hostnames (including `www`)
- HTTPS is a prerequisite for HSTS, HTTP/2, Service Workers, geolocation, and other modern APIs
- Use a free certificate from Let's Encrypt or your hosting provider's managed TLS
- Verify the certificate chain with SSL Labs (ssllabs.com/ssltest) — aim for A or A+

## Check

Check whether all pages of this website are served over HTTPS. Verify the TLS certificate is valid, not expired, and covers all hostnames. Confirm HTTP requests redirect to HTTPS with a 301 status code.

## Fix

Configure the web server to obtain a TLS certificate (e.g., via Let's Encrypt/Certbot), redirect all HTTP requests to HTTPS with a 301 redirect, and ensure all internal links and resources use HTTPS URLs.

## Explain

Explain why serving pages over HTTPS is essential for security, what happens when plain HTTP is used, and how to obtain and configure a TLS certificate.

## Code Review

Review server config, headers, forms, and integration points related to Serve all pages over HTTPS. Flag exact responses, cookies, or browser behaviors that violate the rule, and verify them against the effective production-like response.

---

For full implementation details, code examples, and framework-specific guidance,
see `references/rule.md`.

Rule page: https://frontendchecklist.io/rules/security/https
