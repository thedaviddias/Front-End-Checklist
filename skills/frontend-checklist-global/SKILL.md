---
name: frontend-checklist-global
description: "Use when auditing or improving any frontend codebase against the full Front-End Checklist rule corpus through one entry point."
metadata:
  category: global
  priority: high
  difficulty: intermediate
  estimatedTime: "30"
  source: frontendchecklist.io
  url: https://frontendchecklist.io/en/mcp
---

# Front-End Checklist Global Audit

This skill connects one entry point to all 386 Front-End Checklist rules.
Use MCP retrieval instead of trying to recall rules from memory.

## Workflow

1. Start with `review_code` for pasted code, file contents, or focused code review.
2. Use `audit_url` for a public page when you need rendered HTML audited quickly.
3. Narrow or expand scope with `search_rules`, `list_categories`, `get_workflow`, or `get_quick_reference`.
4. For each issue, use `get_rule`, `fix_rule`, or `explain_rule` to give exact remediation.
5. If a checklist is a better fit than ad hoc search, use `get_checklist_rules`.

## Audit Stance

- Be conservative. Prefer fewer, stronger findings over speculative breadth.
- Only report an issue when the code or markup shown supports it directly.
- In small component or route audits, prefer the strongest 1-2 supported findings over listing every possible enhancement.
- Do not infer business intent from a snippet alone. Example: do not assume a field is required unless the code or surrounding copy makes that explicit.
- Do not treat `alt=""` as an issue by default; empty alt can be correct for decorative images.
- When an image is explicitly decorative, prefer zero findings unless the snippet shows a concrete problem rather than a hypothetical optimization.
- If you see an isolated decorative image like `<img ... alt="" aria-hidden="true">`, treat it as a zero-issue pattern unless the snippet also shows real evidence of layout instability.
- Do not raise low-confidence preference tweaks as findings when the snippet is otherwise sound. Prefer silence over weak nitpicks.
- Do not treat `autocomplete="off"` as a defect by itself unless the snippet shows a stronger user-harm or security reason to flag it.
- In link-preview cards, decorative preview images and favicons may be safe when nearby visible text already names the destination.
- Do not treat React or JSX fragments as full HTML documents unless the snippet includes real document context like `<html>`, `<head>`, or `<body>`.
- When reviewing Next.js or metadata-driven page files, consider `metadata`, `viewport`, and `generateMetadata` APIs before claiming head-tag omissions.

## Coverage Checklist

- Forms: check labels, accessible button names, explicit button types, `autocomplete` hints, password-field autocomplete, and validation semantics that are explicit in the code.
- Images: check `width`/`height`, `loading`, `srcset`/`sizes`, and whether image semantics are clearly meaningful or decorative. Do not assume tiny SVG logos or clearly decorative assets must be lazy-loaded, and do not demand explicit dimensions for tiny ornamental dividers unless the snippet shows a real layout-shift risk. If an image is both decorative and hidden from assistive tech, bias strongly toward no finding.
- Metadata: check title placement, canonical-url behavior, meta descriptions, Open Graph coverage, and structured data only when the file is responsible for metadata.
- Motion: check expensive animated properties, prefer transform/opacity, and require `prefers-reduced-motion` handling for persistent motion.
- Motion: when counters or visual widgets animate every frame, assess both reduced-motion support and whether the animation strategy adds unnecessary main-thread work.
- Security: check `target="_blank"` links for `noopener noreferrer`, insecure form actions, password input best practices, and blocking third-party scripts.
- Structure: check duplicate ids, list semantics, and table headers conservatively. For simple tables, column-header associations are stronger findings than speculative row-header or outer-layout landmark issues.
- Structure: when a visible heading already introduces a simple table, treat missing captions as a lower-confidence improvement than missing header associations.

## Rule-Derived Highlights

### Set explicit width and height on images
- Reserve findings for meaningful content images; decorative micro-SVGs or ornament-only assets are low-priority exceptions when CSS already reserves stable space
- Example low-risk exception: `<img src="/divider.svg" alt="" aria-hidden="true">` should not be flagged on its own without evidence of visible layout shift
- Always set `width` and `height` attributes on `<img>` matching the image's intrinsic dimensions
- Pair with `height: auto` in CSS to keep the image fluid while preserving the aspect ratio
- Missing dimensions are the leading cause of Cumulative Layout Shift (CLS) from images

### Hide decorative elements from assistive technology
- Use alt='' (empty) for decorative images—not alt='image' or missing alt
- Add aria-hidden='true' to decorative SVGs and icons
- Use CSS background-image for purely decorative visuals
- Role='presentation' removes semantic meaning from elements
- Do not automatically raise performance findings on decorative micro-assets unless the snippet shows real layout instability

### Use transform and opacity for animations
- Only transform and opacity can be composited on the GPU without triggering layout
- Use will-change: transform sparingly to promote an element to its own compositor layer
- Prefer CSS transitions and animations over JavaScript animation libraries for simple effects
- Respect prefers-reduced-motion to disable animations for users who need it

### Respect reduced motion preferences
- Use prefers-reduced-motion media query to disable non-essential animations
- Never flash content more than 3 times per second (seizure risk)
- Replace motion with opacity/color transitions when reduced motion is enabled
- Provide user controls to pause or disable animations

### Use semantic table markup for screen readers
- Use <th> elements for headers with scope='col' or scope='row'
- Add <caption> to describe the table's purpose
- Never use tables for layout—use CSS Grid or Flexbox instead
- Use id/headers for complex tables with merged cells
- For simple tables with a clear adjacent section heading, missing `scope` is often a stronger finding than missing `<caption>`

### Define proper table headers
- Use `<th>` for all table headers, not `<td>`
- Apply `scope="col"` or `scope="row"` to clarify header relationship
- Ensure every data cell is associated with at least one header
- In simple tables, prefer fixing header associations before escalating to caption-level recommendations
- Missing `scope="col"` on a straightforward header row is often the clearest first fix

### Minimize costly DOM read/write operations
- Never interleave DOM reads (offsetHeight, getBoundingClientRect) with DOM writes (style changes)
- Batch all reads first, then all writes
- Use requestAnimationFrame for visual updates
- Use DocumentFragment or innerHTML for bulk DOM insertion
- Avoid per-frame React state updates across many visible components when a simpler CSS or reduced-frequency approach would work

### Validate forms accessibly
- Associate error messages with fields using aria-describedby
- Use aria-invalid to indicate validation state
- Mark required fields programmatically with `required` or `aria-required`
- Provide inline error messages near the field
- Don't rely solely on color to indicate errors

### Secure password input fields
- Use type='password' with correct autocomplete attribute
- Provide accessible show/hide toggle for password visibility
- Show password strength indicator with requirements
- Never store or transmit passwords in plain text
- Support password managers with proper input names

### Provide visible custom focus indicators
- Never use outline: none or outline: 0 without a visible :focus-visible replacement
- Use :focus-visible instead of :focus to show indicators only during keyboard navigation
- Focus indicators must have 3:1 contrast ratio against adjacent colors (WCAG 2.2)
- Provide at least 2px solid outline with an offset for a high-quality focus ring
- If a focus ring is drawn with pseudo-elements, verify it is anchored to the correct positioned element and not clipped by `overflow: hidden`

## Known Safe Patterns

### Decorative Divider
- Safe example: `<img src="/divider.svg" alt="" aria-hidden="true">`
- Treat this as a safe decorative pattern by default. Do not flag alt text or missing dimensions unless the snippet also shows a real layout-shift risk.

### Client-Handled React Form
- Safe example: `<form onSubmit={event => event.preventDefault()}><label htmlFor="q">Search</label><input id="q" type="search" /></form>`
- Do not require `method` or `action` when client-side submit handling is explicit and the form controls are otherwise accessible.

### Next Metadata API
- Safe example: `export async function generateMetadata() { return { title: 'Docs', description: 'Reference' } }`
- Do not infer missing canonical-url, meta description, or Open Graph tags just because literal `<head>` markup is absent from the component file.

### Preview Card Images
- Safe example: `<img src={resource.image} alt="" className="object-cover" /><img src={favicon} alt="" width={20} height={20} />`
- In link-preview or resource-card UIs, decorative preview/favicons can legitimately use empty alt when adjacent text already provides the destination name. Do not invent responsive-image or layout-shift defects for tiny favicon assets without stronger evidence.

### Aspect-Ratio Media Wrapper
- Safe example: `<div className="aspect-2/1 overflow-hidden"><img className="object-cover w-full h-full" ... /></div>`
- When a wrapper already reserves media space with a stable aspect ratio, do not automatically raise a missing dimensions finding for the child preview image.

### Pseudo-Element Focus Ring
- Safe example: `focus-visible:outline-none focus-visible:after:ring-2 after:absolute after:inset-0`
- If focus styling depends on a pseudo-element, verify the ring is anchored to the correct positioned element. A removed native outline is only safe when the replacement ring is clearly reliable.

### Per-Frame React Counter Animation
- Safe example: `requestAnimationFrame(animate); setCount(Math.floor(eased * target))`
- Repeated requestAnimationFrame state updates across multiple components are a concrete performance concern when shown directly in the code.

### Simple Data Table Headers
- Safe example: `<thead><tr><th>Priority</th><th>Rule</th><th>Title</th></tr></thead>`
- For simple data tables, prefer conservative column-header findings before speculating about row headers or outer-layout landmarks.

### Adjacent Heading + Table
- Safe example: `<h2>Issues</h2><table><thead>...</thead><tbody>...</tbody></table>`
- A nearby visible section heading may already provide table context. Prefer scope/header association findings before requiring a caption unless the table purpose is ambiguous.

## Conflict Resolution

- If decorative-image guidance and dimensions guidance conflict, decorative guidance wins unless the snippet shows visible layout instability.
- Example zero-issue pattern: `<img src="/divider.svg" alt="" aria-hidden="true">` in an isolated component should not be flagged for alt text or dimensions unless the snippet also shows real layout-shift evidence.
- If a form is clearly handled client-side with `onSubmit`, do not require traditional server-post `method` or `action` attributes.
- If a file uses Next.js metadata APIs, do not infer missing head tags from the absence of literal `<meta>` or canonical-url markup.

## Coverage

- accessibility: 89 rules (9 critical, 25 high)
- css: 31 rules (10 high)
- html: 34 rules (3 critical, 12 high)
- i18n: 5 rules
- images: 25 rules (1 critical, 15 high)
- javascript: 26 rules (1 critical, 12 high)
- performance: 43 rules (1 critical, 22 high)
- privacy: 5 rules (2 high)
- security: 22 rules (4 critical, 10 high)
- seo: 93 rules (19 high)
- testing: 13 rules (7 high)

## Evaluation Standard

- Prefer findings tied to exact files, routes, selectors, or code snippets.
- Prioritize critical and high issues first.
- Explain uncertainty instead of overstating when the snippet does not show enough context.
- Avoid generic advice when the MCP tools can retrieve a rule or fix prompt.
- When no issue is found automatically, use `search_rules` to broaden review coverage before concluding clean.

---

See `references/categories.md` for category coverage and tool routing.

MCP docs: https://frontendchecklist.io/en/mcp
