# Open Graph Tags

> Validates Open Graph meta tags for social sharing

**Priority:** medium · **Difficulty:** intermediate · **Time:** 10 min

---
Open Graph tags let social platforms and messaging apps construct rich link previews when a URL is shared. Without them, platforms guess—usually poorly.

## Code Examples

```html
<!-- ✅ Good: All required tags present with absolute URLs -->
<head>
  <meta property="og:title" content="How to Bake Sourdough Bread" />
  <meta property="og:description" content="A step-by-step guide to making sourdough bread at home, from starter to scoring." />
  <meta property="og:image" content="https://example.com/images/sourdough-og.jpg" />
  <meta property="og:url" content="https://example.com/blog/sourdough-bread" />
  <meta property="og:type" content="article" />
</head>
```

```html
<!-- ❌ Bad: Missing og:image and og:url, relative path -->
<head>
  <meta property="og:title" content="Sourdough" />
  <meta property="og:image" content="/images/bread.jpg" />
</head>
```

## Why It Matters

Open Graph tags control how your pages appear when shared on Facebook, LinkedIn, Slack, and other platforms—missing or incorrect tags result in unappealing link previews that reduce click-through rates.

## Required Tags

| Tag | Purpose | Max Length |
|-----|---------|-----------|
| `og:title` | Title shown in the card | ~95 characters |
| `og:description` | Description shown in the card | ~200 characters |
| `og:image` | Preview image (absolute URL) | — |
| `og:url` | Canonical URL of the page | — |
| `og:type` | Content type (`website`, `article`, etc.) | — |

## Next.js Implementation

```tsx
// app/blog/[slug]/page.tsx

  const post = await getPost(params.slug)
  return {
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `https://example.com/blog/${params.slug}`,
      images: [
        {
          url: `https://example.com/og/${params.slug}.jpg`,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
      type: 'article',
    },
  }
}
```

## Common Mistakes

```html
<!-- ❌ Bad: Relative image URL — won't work on most platforms -->
<meta property="og:image" content="/images/og.png" />

<!-- ✅ Good: Absolute HTTPS URL -->
<meta property="og:image" content="https://example.com/images/og.png" />

<!-- ❌ Bad: og:url doesn't match canonical-url -->
<meta property="og:url" content="https://example.com/blog/post?utm_source=share" />

<!-- ✅ Good: og:url matches the canonical URL -->
<meta property="og:url" content="https://example.com/blog/post" />
```

## Validation

- Use the [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/) to inspect and refresh cached OG data
- Use the [LinkedIn Post Inspector](https://www.linkedin.com/post-inspector/) for LinkedIn previews
- Check that og:url exactly matches the `<link rel="canonical">` tag
- After a release, check a representative URL from each page template, such as the homepage, a product page and a blog post. [ShareScan](https://sharescan.io/scan) checks Open Graph tags and image URLs across up to 10 public pages at once, for free and without an account.

Social platforms cache OG data aggressively. After fixing tags, use each platform's debugger tool to force a cache refresh.

## Exceptions

- Utility or intentionally noindex pages may keep minimal metadata when richer search presentation is not a goal.
- Template-driven pages can look repetitive in isolation; confirm the fully rendered production output before flagging duplication or omission.
- If a page is intentionally redirected or excluded from indexation, resolve that crawlability decision before treating metadata polish as the primary issue.

## Standards

- Use these references as the standard for the final search-facing HTML, metadata, and crawl behavior.
- Check the implementation against The Open Graph Protocol before treating the rule as satisfied.
- Check the implementation against Facebook: Sharing Debugger & OG tags before treating the rule as satisfied.

## Verification

### Automated Checks

- Inspect rendered HTML and HTTP headers to confirm the expected metadata or crawlability signal is present.
- Test the affected URL with Google Search Console or equivalent tooling where relevant.
- Re-crawl a representative page set after deployment.

### Manual Checks

- Confirm the change does not create conflicting canonical-url, robots, or structured-data signals.