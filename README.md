# Front-End Checklist

[![Backers on Open Collective](https://opencollective.com/front-end-checklist/backers/badge.svg)](#backers)
[![Support via Open Collective](https://opencollective.com/front-end-checklist/sponsors/badge.svg)](https://opencollective.com/front-end-checklist)

Front-End Checklist is the open-source front-end quality system for humans and AI agents. It turns front-end best practices into a practical review workflow you can browse on the web, run through with MCP-compatible tools, or work through directly in this README.

- Website: [frontendchecklist.io](https://frontendchecklist.io)
- Rules: [frontendchecklist.io/rules](https://frontendchecklist.io/rules)
- MCP server: [mcp.frontendchecklist.io](https://mcp.frontendchecklist.io)

Companion project: [UX Patterns for Devs](https://uxpatterns.dev/) helps developers choose the right UI pattern before using Front-End Checklist to verify implementation quality.

> [!IMPORTANT]
> Use the website for browsing and filtering, the MCP server for agent workflows, and this README when you want the checklist in one place.

## What you get

- `385` English rules across `11` active categories
- `11` MCP tools exposed by the hosted server
- Rule pages with explanations, remediation guidance, and verification steps

## How to use this checklist

1. Start with the category navigator below and jump straight to the part of the checklist you need.
2. Work through the checkbox items that apply to your project, audit, or pull request.
3. Open the linked rule pages when you need the full guidance, examples, verification steps, and AI prompts.
4. Use [frontendchecklist.io](https://frontendchecklist.io) for interactive browsing, and [mcp.frontendchecklist.io](https://mcp.frontendchecklist.io) when you want agents to use the same rule corpus directly.

## Priority legend

- ![Critical][critical_img] means site-breaking, compliance-sensitive, or security-sensitive issues that should be fixed first.
- ![High][high_img] means issues with major impact on user experience, accessibility, performance, or discoverability.
- ![Medium][medium_img] means strong best practices that should be part of normal frontend quality review.
- ![Low][low_img] means useful improvements that are situational or lower urgency.

## Choose your workflow

### Browse online

- Explore all rules at [frontendchecklist.io/rules](https://frontendchecklist.io/rules)
- Use curated checklists at [frontendchecklist.io/checklists](https://frontendchecklist.io/checklists)
- Open a category page for focused audits and implementation guidance

### Choose the right pattern first

Front-End Checklist helps you review implementation quality. If you are still deciding what interface to build, use [UX Patterns for Devs](https://uxpatterns.dev/) to compare common UI patterns, understand tradeoffs, and find practical guidance for forms, navigation, data display, feedback states, authentication, and AI interfaces.

### Contribute to the checklist

- Install dependencies: `pnpm install`
- Run local development: `pnpm dev`
- Validate structure: `pnpm validate:rule-structure`
- Score the corpus: `pnpm score:rules`
- Regenerate derived artifacts: `pnpm generate:skills` and `pnpm generate:readme`

## Use with MCP

Connect an MCP-capable agent to Front-End Checklist for frontend code review, structured rule lookup, audits, and remediation workflows across React, Next.js, HTML, CSS, JavaScript, accessibility, performance, SEO, security, images, privacy, i18n, and testing.

> [!TIP]
> Best first use: point an MCP-capable agent at a real component, page, or public URL and explicitly ask it to use the Front-End Checklist MCP for the highest-confidence frontend findings first. Some clients discover installed MCP tools lazily, so naming the server in the prompt helps.

- Public endpoint: [mcp.frontendchecklist.io](https://mcp.frontendchecklist.io)
- Public docs: [frontendchecklist.io/mcp](https://frontendchecklist.io/mcp)
- Local/editor integration: stdio server at [`packages/mcp/src/cli.ts`](packages/mcp/src/cli.ts)

What you can do:

- Review pasted code or file contents against the checklist
- Audit a live public URL
- Fetch a specific rule with remediation guidance
- Search rules by keyword, category, or priority
- Get a workflow or quick reference for a focused audit

Agent usage guidance:

- Use `review_code` first for pasted HTML, CSS, JavaScript, React, or Next.js code
- Use `search_rules` before making frontend accessibility, performance, SEO, security, or image recommendations
- Use `get_workflow` or `get_checklist_rules` for launch, accessibility, SEO, security, and performance audits
- Use `audit_url` for public `https://` pages

Example prompts:

- `Use the Front-End Checklist MCP to review this React component and report the highest-confidence findings first.`
- `Use the Front-End Checklist MCP to audit https://example.com for accessibility, performance, and SEO issues.`
- `Use the Front-End Checklist MCP to explain the canonical URL rule and suggest a fix with code examples.`

## Use with skills

Install Front-End Checklist skills when you want reusable audit workflows or focused rule-specific guidance in tools that support them.

Install:

```bash
npx skills add frontendchecklist/skills
npx skills add frontendchecklist/skills --skill https
```

Useful entry points:

- Global audit entry point: [`skills/frontend-checklist-global/SKILL.md`](skills/frontend-checklist-global/SKILL.md)
- Focused rule skill example: [`skills/https/SKILL.md`](skills/https/SKILL.md)

Example uses:

- Run a broad frontend audit against the full Front-End Checklist corpus
- Use a focused skill like `https` for security review on one concern
- Use rule-specific skills to explain why a rule matters and how to fix it

## Checklist

<!-- rules-catalog:start -->

<!-- Generated from 385 English rules. This block is maintained by `pnpm generate:readme`. -->

### Jump to a category

- [HTML](#html) (25) · [Open on the site](https://frontendchecklist.io/rules/html)
- [CSS](#css) (32) · [Open on the site](https://frontendchecklist.io/rules/css)
- [JavaScript](#javascript) (26) · [Open on the site](https://frontendchecklist.io/rules/javascript)
- [Performance](#performance) (43) · [Open on the site](https://frontendchecklist.io/rules/performance)
- [Accessibility](#accessibility) (95) · [Open on the site](https://frontendchecklist.io/rules/accessibility)
- [SEO](#seo) (94) · [Open on the site](https://frontendchecklist.io/rules/seo)
- [Security](#security) (22) · [Open on the site](https://frontendchecklist.io/rules/security)
- [Images](#images) (25) · [Open on the site](https://frontendchecklist.io/rules/images)
- [Testing](#testing) (13) · [Open on the site](https://frontendchecklist.io/rules/testing)
- [Privacy](#privacy) (5) · [Open on the site](https://frontendchecklist.io/rules/privacy)
- [Internationalization](#internationalization) (5) · [Open on the site](https://frontendchecklist.io/rules/i18n)

### Categories

### HTML

*25 rules. Semantic markup, metadata, forms, and document structure rules.*

[Browse HTML on frontendchecklist.io](https://frontendchecklist.io/rules/html)

- [ ] [Add Subresource Integrity to external scripts](https://frontendchecklist.io/rules/html/subresource-integrity) ![High][high_img]: Use Subresource Integrity (SRI) hash attributes on external scripts and stylesheets loaded from CDNs to ensure the content hasn't been tampered with.
- [ ] [Add thumbnail images to videos](https://frontendchecklist.io/rules/html/video-thumbnail) ![Medium][medium_img]: HTML5 video elements should have a poster attribute providing a thumbnail image displayed before the video loads or is played.
- [ ] [Create a custom 404 error page](https://frontendchecklist.io/rules/html/404-page) ![Medium][medium_img]: A custom 404 error page is designed with helpful navigation options for lost users.
- [ ] [Declare UTF-8 character encoding](https://frontendchecklist.io/rules/html/charset) ![Critical][critical_img]: The charset (UTF-8) is declared correctly as the first element in the head.
- [ ] [Ensure all IDs are unique](https://frontendchecklist.io/rules/html/unique-id) ![High][high_img]: All ID attributes are unique within the document. No duplicate IDs exist on the page.
- [ ] [Implement accessible breadcrumb navigation](https://frontendchecklist.io/rules/html/breadcrumb-navigation) ![Medium][medium_img]: Breadcrumb navigation is implemented with proper semantic markup and ARIA attributes for accessibility.
- [ ] [Implement favicons for all devices](https://frontendchecklist.io/rules/html/favicons) ![Medium][medium_img]: All necessary favicon formats are implemented for browsers, devices, and PWA support.
- [ ] [Link a Web App Manifest for installability](https://frontendchecklist.io/rules/html/web-app-manifest) ![Medium][medium_img]: Include a Web App Manifest (manifest.json) linked from the HTML head to enable Progressive Web App features like home screen installation, standalone display, and splash screens.
- [ ] [Load scripts with defer, async, or type=module](https://frontendchecklist.io/rules/html/defer-async) ![High][high_img]: Prevent JavaScript from blocking HTML parsing by using defer, async, or type=module attributes on script tags so the browser can continue building the DOM while scripts download.
- [ ] [Make custom elements and Web Components accessible](https://frontendchecklist.io/rules/html/custom-element-accessibility) ![Medium][medium_img]: Custom elements must implement ARIA reflection via ElementInternals, keyboard interaction, and form association so that screen readers and assistive technologies can interpret them correctly.
- [ ] [Make file uploads accessible](https://frontendchecklist.io/rules/html/file-upload-accessibility) ![Medium][medium_img]: File upload components are accessible with proper labels, file type restrictions, and progress feedback.
- [ ] [Make pagination accessible](https://frontendchecklist.io/rules/html/pagination-accessibility) ![Medium][medium_img]: Pagination controls are accessible with proper ARIA labels, keyboard navigation, and current page indication.
- [ ] [Make search inputs accessible](https://frontendchecklist.io/rules/html/search-input) ![Medium][medium_img]: Search functionality is accessible with proper input type, label, role, and autocomplete suggestions.
- [ ] [Make videos accessible with captions](https://frontendchecklist.io/rules/html/video-accessibility) ![High][high_img]: Videos have captions, audio descriptions, transcripts, pause controls, and avoid autoplay for users with hearing, vision, or cognitive impairments.
- [ ] [Meet PWA installability criteria](https://frontendchecklist.io/rules/html/pwa-installability) ![Low][low_img]: The web app satisfies the browser's minimum PWA installability requirements: a valid web app manifest, a registered service worker, HTTPS, and maskable icons.
- [ ] [Provide noscript fallback content](https://frontendchecklist.io/rules/html/noscript-tag) ![Medium][medium_img]: A noscript tag provides fallback content for users with JavaScript disabled.
- [ ] [Remove comments and debug code in production](https://frontendchecklist.io/rules/html/clean-up-comments) ![Medium][medium_img]: Unnecessary code, comments, and debug elements are removed before deploying to production.
- [ ] [Set text direction for RTL languages](https://frontendchecklist.io/rules/html/direction-attribute) ![Medium][medium_img]: The dir attribute is used for languages that read right-to-left (RTL) or mixed content.
- [ ] [Set the page lang attribute](https://frontendchecklist.io/rules/html/lang-attribute) ![High][high_img]: The <html> element must have a lang attribute with a valid BCP 47 language code so screen readers, translation tools, and search engines know the primary language of the page.
- [ ] [Set the responsive viewport meta tag](https://frontendchecklist.io/rules/html/viewport) ![Critical][critical_img]: The viewport meta tag is declared correctly for responsive design.
- [ ] [Use semantic HTML elements](https://frontendchecklist.io/rules/html/html5-semantic-elements) ![High][high_img]: HTML5 Semantic Elements are used appropriately (header, section, footer, main, article, aside...).
- [ ] [Use semantic input type attributes](https://frontendchecklist.io/rules/html/input-types) ![High][high_img]: Set the correct type attribute on input elements to trigger the right mobile keyboard, enable browser validation, and improve autofill accuracy.
- [ ] [Use the HTML5 doctype](https://frontendchecklist.io/rules/html/doctype) ![Critical][critical_img]: The HTML5 doctype declaration must appear as the first line of every HTML document to trigger standards mode rendering in all browsers.
- [ ] [Validate forms accessibly](https://frontendchecklist.io/rules/html/form-validation) ![High][high_img]: Forms provide clear validation feedback with accessible error messages and proper ARIA attributes.
- [ ] [Validate HTML against W3C standards](https://frontendchecklist.io/rules/html/w3c-compliant) ![High][high_img]: HTML markup is validated against W3C standards for cross-browser compatibility.

**[Back to top](#front-end-checklist)**

### CSS

*32 rules. Layout, typography, responsive design, and styling rules.*

[Browse CSS on frontendchecklist.io](https://frontendchecklist.io/rules/css)

- [ ] [Apply Flexbox best practices](https://frontendchecklist.io/rules/css/flexbox-patterns) ![Medium][medium_img]: Use Flexbox for one-dimensional layouts with the right properties, avoiding common mistakes like overusing flex:1, ignoring min-width:0, and misunderstanding flex-basis.
- [ ] [Avoid embedded and inline CSS](https://frontendchecklist.io/rules/css/embedded-or-inline-css) ![High][high_img]: Embedded and inline CSS are avoided except for critical CSS and performance optimization.
- [ ] [Avoid intrusive interstitials](https://frontendchecklist.io/rules/css/interstitials) ![Medium][medium_img]: Full-screen interstitials (pop-ups, overlays, cookie banners) that block the main content on mobile are a ranking penalty signal and accessibility barrier. Use non-intrusive alternatives.
- [ ] [Do not disable pinch zoom](https://frontendchecklist.io/rules/css/viewport-zoom) ![High][high_img]: The viewport meta tag must not set user-scalable=no or maximum-scale=1 as these prevent users from zooming in to read content, violating WCAG 2.1 SC 1.4.4 (Resize Text).
- [ ] [Include a print stylesheet](https://frontendchecklist.io/rules/css/css-print) ![Medium][medium_img]: A print stylesheet is provided and correctly optimized for printed pages.
- [ ] [Inline critical CSS for faster rendering](https://frontendchecklist.io/rules/css/css-critical) ![High][high_img]: Critical CSS (above-the-fold content) is inlined in the head for faster initial render.
- [ ] [Keep CSS specificity low and flat](https://frontendchecklist.io/rules/css/specificity-management) ![High][high_img]: Write selectors at the lowest specificity that works, avoiding ID selectors and deep nesting, so styles can be overridden cleanly without resorting to !important.
- [ ] [Lint CSS and SCSS files](https://frontendchecklist.io/rules/css/styles-lint) ![Medium][medium_img]: All CSS/SCSS files are linted with Stylelint to detect errors and enforce standards.
- [ ] [Load CSS without blocking render](https://frontendchecklist.io/rules/css/css-non-blocking) ![High][high_img]: Non-critical CSS is loaded asynchronously to avoid blocking DOM rendering.
- [ ] [Minify all CSS files](https://frontendchecklist.io/rules/css/css-minification) ![High][high_img]: All CSS files are minified to reduce file size and improve page load performance.
- [ ] [Optimize web font formats](https://frontendchecklist.io/rules/css/webfont-format) ![Medium][medium_img]: Web fonts use modern formats (WOFF2, WOFF) with proper fallbacks and loading strategies.
- [ ] [Order CSS files correctly](https://frontendchecklist.io/rules/css/css-order) ![Medium][medium_img]: All CSS files are loaded before JavaScript files to prevent render blocking.
- [ ] [Prevent horizontal scrolling](https://frontendchecklist.io/rules/css/horizontal-scroll) ![Medium][medium_img]: Web pages must not require horizontal scrolling at standard viewport widths. Horizontal overflow breaks responsive layouts and makes content inaccessible to low-vision users who zoom in.
- [ ] [Provide visible custom focus indicators](https://frontendchecklist.io/rules/css/focus-styles) ![High][high_img]: Ensure all interactive elements have a clearly visible focus indicator for keyboard navigation — never just remove the default outline without providing a better alternative.
- [ ] [Register CSS custom properties with @property for animation and type safety](https://frontendchecklist.io/rules/css/css-at-property) ![Low][low_img]: Use @property to register CSS custom properties with a type, initial value, and inheritance control — enabling animation of custom properties and providing compile-time validation for design tokens.
- [ ] [Remove unused CSS rules](https://frontendchecklist.io/rules/css/unused-css) ![High][high_img]: Unused CSS is removed to reduce bundle size and improve performance.
- [ ] [Support dark mode with prefers-color-scheme](https://frontendchecklist.io/rules/css/dark-mode-css) ![Medium][medium_img]: Implement dark mode using the prefers-color-scheme media query and CSS custom properties so the site automatically adapts to the user's system preference.
- [ ] [Use :has() to style parent elements based on their descendants](https://frontendchecklist.io/rules/css/has-selector) ![Low][low_img]: Use the CSS :has() relational pseudo-class to select and style an element based on what it contains, replacing JavaScript DOM manipulation for many common styling scenarios.
- [ ] [Use @layer to manage CSS cascade order explicitly](https://frontendchecklist.io/rules/css/cascade-layers) ![Low][low_img]: CSS Cascade Layers (@layer) are used to give the codebase explicit, predictable control over specificity and cascade order, eliminating the need to fight specificity with !important.
- [ ] [Use a CSS reset or normalize stylesheet](https://frontendchecklist.io/rules/css/reset-css) ![Medium][medium_img]: A CSS reset or normalize is used to ensure consistent styling across browsers.
- [ ] [Use consistent CSS naming conventions](https://frontendchecklist.io/rules/css/naming-conventions) ![Medium][medium_img]: Adopt a consistent class naming methodology (BEM, CUBE CSS, or a team-agreed pattern) to make class names self-documenting and prevent style conflicts.
- [ ] [Use container queries for component-level responsiveness](https://frontendchecklist.io/rules/css/container-queries) ![Medium][medium_img]: Use CSS container queries to make components respond to their own container's size rather than the viewport, enabling truly reusable responsive components.
- [ ] [Use CSS containment to limit repaint scope](https://frontendchecklist.io/rules/css/css-containment) ![Medium][medium_img]: Apply the contain property to components to tell the browser they are independent from the rest of the page, enabling rendering optimizations that reduce repaint and reflow scope.
- [ ] [Use CSS custom properties for design tokens](https://frontendchecklist.io/rules/css/css-custom-properties) ![High][high_img]: Define design system values (colors, spacing, typography) as CSS custom properties on :root to enable consistent theming, dynamic updates, and dark mode support.
- [ ] [Use CSS Grid for two-dimensional layouts](https://frontendchecklist.io/rules/css/css-grid) ![Medium][medium_img]: Use CSS Grid when you need to control both rows and columns simultaneously, such as page layouts, card grids, and complex component arrangements.
- [ ] [Use CSS logical properties for i18n and RTL support](https://frontendchecklist.io/rules/css/logical-properties) ![Medium][medium_img]: Use CSS logical properties (margin-inline, padding-block, border-inline-start) instead of physical properties (margin-left, padding-top) to support right-to-left languages automatically.
- [ ] [Use CSS subgrid to align nested grid items to parent tracks](https://frontendchecklist.io/rules/css/subgrid) ![Low][low_img]: Use grid-template-columns: subgrid (or subgrid for rows) to make nested grid items participate in the parent grid's tracks, solving the card-content alignment problem without JavaScript height matching.
- [ ] [Use oklch() and oklab() for perceptually uniform colour palettes](https://frontendchecklist.io/rules/css/color-oklch) ![Low][low_img]: Colour values in the design system use oklch() or oklab() colour functions to produce perceptually uniform palettes where equal numeric steps produce equal perceived lightness changes.
- [ ] [Use readable font sizes on mobile](https://frontendchecklist.io/rules/css/font-size) ![Medium][medium_img]: Text must be large enough to read without zooming on mobile devices. Using relative units (rem/em) allows browser font size preferences to be respected.
- [ ] [Use relative units for responsive layouts](https://frontendchecklist.io/rules/css/responsive-units) ![High][high_img]: Use rem, em, %, vw, vh, and clamp() instead of fixed px values to build layouts that scale with user font size preferences and viewport dimensions.
- [ ] [Use the View Transitions API for smooth page and component transitions](https://frontendchecklist.io/rules/css/view-transitions) ![Low][low_img]: The View Transitions API is used to animate between page states or navigations with cross-fade or custom animations, providing a native-app quality transition without JavaScript animation libraries.
- [ ] [Use transform and opacity for animations](https://frontendchecklist.io/rules/css/animation-performance) ![High][high_img]: Animate with CSS transform and opacity properties to keep animations running on the GPU compositor thread at 60fps, avoiding layout-triggering properties like top, left, width, and height.

**[Back to top](#front-end-checklist)**

### JavaScript

*26 rules. Client-side behavior, async patterns, and runtime quality rules.*

[Browse JavaScript on frontendchecklist.io](https://frontendchecklist.io/rules/javascript)

- [ ] [Avoid implicit type coercion](https://frontendchecklist.io/rules/javascript/type-coercion) ![Medium][medium_img]: Use strict equality (===), explicit type conversion, and Number/String/Boolean constructors to avoid JavaScript's implicit type coercion producing unexpected results.
- [ ] [Avoid inline JavaScript](https://frontendchecklist.io/rules/javascript/javascript-inline) ![High][high_img]: Inline JavaScript is avoided. JavaScript is kept in external files for caching and maintainability.
- [ ] [Avoid the any type — use unknown, generics, or type guards instead](https://frontendchecklist.io/rules/javascript/no-explicit-any) ![Medium][medium_img]: Replace TypeScript's any type with unknown, proper generics, or narrowed type assertions to preserve type safety without sacrificing expressiveness.
- [ ] [Debounce and throttle event handlers](https://frontendchecklist.io/rules/javascript/debounce-throttle) ![High][high_img]: Use debounce or throttle for high-frequency events like scroll, resize, and input to improve performance.
- [ ] [Enable noUncheckedIndexedAccess to catch out-of-bounds array bugs](https://frontendchecklist.io/rules/javascript/no-unchecked-indexed-access) ![Medium][medium_img]: Enable noUncheckedIndexedAccess in tsconfig.json to make array and object index access return T | undefined, forcing explicit null checks that prevent out-of-bounds runtime errors.
- [ ] [Enable TypeScript strict mode in tsconfig.json](https://frontendchecklist.io/rules/javascript/typescript-strict-mode) ![High][high_img]: Enable "strict": true in tsconfig.json to activate the full suite of TypeScript type-checking flags and catch the most common runtime bugs at compile time.
- [ ] [Handle cross-origin requests securely](https://frontendchecklist.io/rules/javascript/cross-origin-security) ![High][high_img]: Use CORS correctly, validate message origins with postMessage, and understand the Same-Origin Policy to prevent cross-origin attacks.
- [ ] [Implement proper error handling](https://frontendchecklist.io/rules/javascript/error-handling) ![High][high_img]: Use try-catch blocks and error boundaries to gracefully handle errors in async operations and UI components.
- [ ] [Lint JavaScript code](https://frontendchecklist.io/rules/javascript/javascript-linter) ![Medium][medium_img]: JavaScript code is linted with ESLint to detect errors and enforce coding standards.
- [ ] [Minify all JavaScript files](https://frontendchecklist.io/rules/javascript/javascript-minification) ![High][high_img]: All JavaScript files are minified to reduce file size and improve loading performance.
- [ ] [Minimize costly DOM read/write operations](https://frontendchecklist.io/rules/javascript/dom-performance) ![High][high_img]: Batch DOM reads and writes separately to avoid layout thrashing — the performance problem caused by alternating between reading and writing layout properties.
- [ ] [Never use eval() or unsafe dynamic code execution](https://frontendchecklist.io/rules/javascript/avoid-eval) ![Critical][critical_img]: Avoid eval(), new Function(), setTimeout/setInterval with string arguments, and innerHTML with untrusted content — they execute arbitrary code and create critical XSS vulnerabilities.
- [ ] [Parse JSON safely with error handling](https://frontendchecklist.io/rules/javascript/json-safety) ![Medium][medium_img]: Always wrap JSON.parse() in try/catch and validate the parsed structure before use, as invalid JSON or unexpected data shapes cause runtime errors.
- [ ] [Prefer const and let over var](https://frontendchecklist.io/rules/javascript/const-let) ![High][high_img]: Use block-scoped const and let declarations instead of function-scoped var to avoid hoisting bugs and unintended variable mutations.
- [ ] [Prefer immutable data patterns](https://frontendchecklist.io/rules/javascript/immutable-patterns) ![Medium][medium_img]: Use spread operators, Object.assign, and array methods that return new values instead of mutating objects and arrays in place, to make data flow predictable and debugging easier.
- [ ] [Prevent common memory leak patterns](https://frontendchecklist.io/rules/javascript/memory-leaks) ![High][high_img]: Identify and avoid the most common JavaScript memory leak sources: forgotten event listeners, retained DOM references, closures holding large objects, and uncleared timers.
- [ ] [Remove console statements in production](https://frontendchecklist.io/rules/javascript/console-cleanup) ![Medium][medium_img]: Remove or disable console.log, console.debug, and other console statements before deploying to production.
- [ ] [Split large JavaScript bundles](https://frontendchecklist.io/rules/javascript/code-splitting) ![High][high_img]: Use dynamic imports and route-based code splitting to break large bundles into smaller chunks that load on demand, reducing initial page load time.
- [ ] [Use ES modules (import/export)](https://frontendchecklist.io/rules/javascript/es-modules) ![High][high_img]: Use native ES module syntax for imports and exports instead of CommonJS require() to enable static analysis, tree-shaking, and better tooling support.
- [ ] [Use event delegation for dynamic content](https://frontendchecklist.io/rules/javascript/event-delegation) ![Medium][medium_img]: Attach event listeners to stable parent elements rather than individual dynamic children to reduce memory usage and handle elements added to the DOM after page load.
- [ ] [Use import type for type-only imports](https://frontendchecklist.io/rules/javascript/type-only-imports) ![Low][low_img]: Use the import type syntax for imports that are only needed as TypeScript types, ensuring they are fully erased at compile time with zero runtime cost.
- [ ] [Use modern array and object methods](https://frontendchecklist.io/rules/javascript/modern-array-methods) ![Medium][medium_img]: Use ES2015+ array methods (map, filter, reduce, find, flatMap) and object methods (Object.entries, Object.fromEntries, structuredClone) for cleaner, more expressive code.
- [ ] [Use scheduler.yield() to keep the main thread responsive during long tasks](https://frontendchecklist.io/rules/javascript/scheduler-yield) ![Medium][medium_img]: Break up tasks longer than 50 ms by yielding to the browser with scheduler.yield() or a MessageChannel fallback so that user input is never blocked.
- [ ] [Use Web Storage API safely](https://frontendchecklist.io/rules/javascript/web-storage) ![Medium][medium_img]: Use localStorage and sessionStorage with proper serialization, error handling, and security awareness to avoid data corruption and storage quota errors.
- [ ] [Validate external data at runtime with a schema library](https://frontendchecklist.io/rules/javascript/runtime-validation) ![High][high_img]: Use Zod or Valibot to validate data from API responses, form inputs, localStorage, and environment variables — TypeScript types are erased at runtime and cannot protect against unexpected shapes.
- [ ] [Write internationalisation-friendly translation strings](https://frontendchecklist.io/rules/javascript/translation-strings) ![Medium][medium_img]: Translation strings use message format patterns (ICU or similar) rather than string concatenation, and correctly handle pluralisation, gender, and variable interpolation.

**[Back to top](#front-end-checklist)**

### Performance

*43 rules. Loading speed, rendering, optimization, and Core Web Vitals rules.*

[Browse Performance on frontendchecklist.io](https://frontendchecklist.io/rules/performance)

- [ ] [Analyze performance with WebPageTest](https://frontendchecklist.io/rules/performance/webpagetest) ![High][high_img]: Page performance is analyzed with WebPageTest to identify loading bottlenecks and optimization opportunities.
- [ ] [Avoid JavaScript-based redirects](https://frontendchecklist.io/rules/performance/js-redirects) ![Medium][medium_img]: Detects JavaScript resources that return 3XX redirects to reduce latency
- [ ] [Avoid serving legacy JavaScript to modern browsers](https://frontendchecklist.io/rules/performance/legacy-js) ![Medium][medium_img]: Detects ES5 polyfills and legacy JavaScript code to reduce bundle size and improve execution
- [ ] [Convert animated GIFs to video](https://frontendchecklist.io/rules/performance/animated-content) ![Medium][medium_img]: Large animated GIFs are replaced with more efficient video formats like MP4 or WebM to reduce page weight.
- [ ] [Disable lazy loading for above-the-fold content](https://frontendchecklist.io/rules/performance/lazy-above-fold) ![Medium][medium_img]: Detects lazy loading on likely above-fold images to improve Largest Contentful Paint (LCP)
- [ ] [Eliminate render-blocking resources](https://frontendchecklist.io/rules/performance/render-blocking) ![Medium][medium_img]: Checks for render-blocking CSS and JavaScript that prevent the initial page render
- [ ] [Enable browser caching](https://frontendchecklist.io/rules/performance/browser-caching) ![High][high_img]: Cache-Control and ETag headers are properly configured for static resources.
- [ ] [Enable HTTP/2 or HTTP/3](https://frontendchecklist.io/rules/performance/http2) ![High][high_img]: Use modern HTTP protocols to enable request multiplexing and reduce network latency.
- [ ] [Enable text-based compression](https://frontendchecklist.io/rules/performance/compression) ![High][high_img]: Compress text resources (HTML, CSS, JS) using Gzip or Brotli to reduce data transfer size.
- [ ] [Implement Google Consent Mode v2](https://frontendchecklist.io/rules/performance/consent-mode) ![High][high_img]: Adjust Google Tag behavior based on user consent to comply with privacy regulations and maintain data insights.
- [ ] [Implement lazy loading for offscreen content](https://frontendchecklist.io/rules/performance/lazy-loading) ![High][high_img]: Images and heavy resources below the fold are lazy loaded to improve initial performance.
- [ ] [Keep page load time under 3 seconds](https://frontendchecklist.io/rules/performance/page-load-time) ![High][high_img]: Page fully loads in under 3 seconds on a standard connection.
- [ ] [Keep page weight under 1500KB](https://frontendchecklist.io/rules/performance/page-weight) ![High][high_img]: Total page weight including all resources is under 1500KB (ideally under 500KB).
- [ ] [Load non-critical code on user interaction](https://frontendchecklist.io/rules/performance/import-on-interaction) ![High][high_img]: Defer JavaScript modules, widgets, and third-party code until the user signals intent through a click, focus, hover, or similar interaction.
- [ ] [Load non-critical code when content approaches the viewport](https://frontendchecklist.io/rules/performance/import-on-visibility) ![High][high_img]: Use viewport-aware loading to fetch components, embeds, and feature code shortly before they become visible instead of shipping them on first load.
- [ ] [Minimize critical request chains](https://frontendchecklist.io/rules/performance/critical-request-chains) ![High][high_img]: Reduce the number and depth of dependent resource requests that block the initial rendering of the page.
- [ ] [Minimize cumulative layout shift](https://frontendchecklist.io/rules/performance/cumulative-layout-shift) ![High][high_img]: Page maintains visual stability with a CLS score below 0.1, preventing unexpected content shifts during load.
- [ ] [Minimize HTTP requests](https://frontendchecklist.io/rules/performance/http-requests) ![High][high_img]: HTTP requests are minimized by combining files, using sprites, and HTTP/2.
- [ ] [Optimize CSS file size](https://frontendchecklist.io/rules/performance/css-file-size) ![Medium][medium_img]: Keep individual CSS files small and remove unused styles to accelerate the critical rendering path.
- [ ] [Optimize first contentful paint](https://frontendchecklist.io/rules/performance/first-contentful-paint) ![High][high_img]: First content renders within 1.8 seconds, providing quick visual feedback that the page is loading.
- [ ] [Optimize Google Tag Manager implementation](https://frontendchecklist.io/rules/performance/gtm-present) ![Medium][medium_img]: Configure Google Tag Manager efficiently to minimize its impact on page load speed and main-thread blocking.
- [ ] [Optimize interaction to next paint](https://frontendchecklist.io/rules/performance/interaction-to-next-paint) ![High][high_img]: Page responds to user interactions within 200ms, ensuring good responsiveness.
- [ ] [Optimize JavaScript bundle size](https://frontendchecklist.io/rules/performance/js-file-size) ![Medium][medium_img]: Checks for JavaScript files that exceed recommended size limits to ensure fast interaction
- [ ] [Optimize largest contentful paint](https://frontendchecklist.io/rules/performance/largest-contentful-paint) ![Critical][critical_img]: The largest content element loads within 2.5 seconds for a good user experience.
- [ ] [Optimize pages for back/forward cache](https://frontendchecklist.io/rules/performance/back-forward-cache) ![High][high_img]: Pages avoid back/forward cache blockers such as unload listeners and restore state correctly when a browser resumes them from memory.
- [ ] [Optimize third-party script loading](https://frontendchecklist.io/rules/performance/third-party-scripts) ![High][high_img]: Load third-party scripts asynchronously to prevent blocking the main thread and improve page performance.
- [ ] [Optimize web font loading](https://frontendchecklist.io/rules/performance/font-loading) ![High][high_img]: Use efficient font formats and loading strategies to prevent layout shifts and invisible text.
- [ ] [Perform browser-based performance audits](https://frontendchecklist.io/rules/performance/browser-required) ![Medium][medium_img]: Conduct performance audits in a full browser environment to capture accurate runtime metrics and layout shifts.
- [ ] [Provide an offline fallback page](https://frontendchecklist.io/rules/performance/offline-fallback) ![Low][low_img]: When the network is unavailable, users are shown a custom offline fallback page rather than the browser's generic error screen.
- [ ] [Provide source maps for production debugging](https://frontendchecklist.io/rules/performance/source-maps) ![Medium][medium_img]: Checks for source map availability and configuration to ensure easier debugging
- [ ] [Reduce DOM size and complexity](https://frontendchecklist.io/rules/performance/dom-size) ![Medium][medium_img]: Keep the DOM tree small and shallow to improve memory usage and rendering performance.
- [ ] [Reduce Time to First Byte (TTFB)](https://frontendchecklist.io/rules/performance/ttfb) ![Medium][medium_img]: Measures and optimizes server response time (TTFB) to ensure a fast initial response
- [ ] [Register a service worker for caching and offline support](https://frontendchecklist.io/rules/performance/service-worker) ![Medium][medium_img]: A service worker is registered to intercept network requests, cache critical assets, and enable offline functionality for your web application.
- [ ] [Remove duplicate JavaScript libraries](https://frontendchecklist.io/rules/performance/duplicate-js) ![Medium][medium_img]: Detect and consolidate duplicate JavaScript libraries to reduce bundle size and prevent version conflicts.
- [ ] [Show loading indicators](https://frontendchecklist.io/rules/performance/loading-indicators) ![High][high_img]: Loading indicators provide feedback during asynchronous operations to keep users informed of progress.
- [ ] [Stream HTML to the browser before the full response is ready](https://frontendchecklist.io/rules/performance/streaming-html) ![Medium][medium_img]: Use HTTP chunked transfer encoding and React renderToPipeableStream (or ReadableStream) to begin delivering HTML to the browser as soon as the first bytes are available, reducing Time to First Byte and First Contentful Paint.
- [ ] [Use a content delivery network](https://frontendchecklist.io/rules/performance/cdn) ![High][high_img]: Static assets are served from a CDN for reduced latency and faster delivery.
- [ ] [Use fetchpriority to hint resource loading priority](https://frontendchecklist.io/rules/performance/fetchpriority-attribute) ![Medium][medium_img]: The fetchpriority attribute is applied to critical images, scripts, and preload links to help the browser prioritise the most important resources and defer lower-priority ones.
- [ ] [Use preconnect for critical third-party origins](https://frontendchecklist.io/rules/performance/preconnect) ![Medium][medium_img]: Checks for preconnect hints to critical third-party origins to reduce connection latency
- [ ] [Use resource hints for faster loading](https://frontendchecklist.io/rules/performance/resource-hints) ![High][high_img]: Implement preload, prefetch, and preconnect hints to optimize resource loading priority.
- [ ] [Use secure and up-to-date JS libraries](https://frontendchecklist.io/rules/performance/js-libraries) ![Medium][medium_img]: Detects JavaScript libraries and checks for known vulnerabilities
- [ ] [Use the Speculation Rules API to prefetch and prerender navigations](https://frontendchecklist.io/rules/performance/speculation-rules) ![Low][low_img]: The Speculation Rules API is used to declaratively prefetch or prerender likely next pages, making navigation feel near-instant without the overhead of a full client-side router.
- [ ] [Virtualize long lists and tables](https://frontendchecklist.io/rules/performance/list-virtualization) ![High][high_img]: Render only the visible subset of rows or cards in large collections to reduce DOM size, memory usage, and scroll-time rendering work.

**[Back to top](#front-end-checklist)**

### Accessibility

*95 rules. Keyboard, screen reader, ARIA, and inclusive UX rules.*

[Browse Accessibility on frontendchecklist.io](https://frontendchecklist.io/rules/accessibility)

- [ ] [Align visible labels with accessible names](https://frontendchecklist.io/rules/accessibility/label-content-name-mismatch) ![Medium][medium_img]: The accessible name of a control should contain its visible label text.
- [ ] [Allow pasting into form inputs](https://frontendchecklist.io/rules/accessibility/paste-inputs) ![Medium][medium_img]: Users should be able to paste content into form fields to improve usability and reduce errors.
- [ ] [Announce dynamic content with ARIA live regions](https://frontendchecklist.io/rules/accessibility/aria-live-regions) ![High][high_img]: Dynamic content updates are announced to screen readers using appropriate ARIA live regions.
- [ ] [Associate labels with form controls](https://frontendchecklist.io/rules/accessibility/form-labels) ![Critical][critical_img]: Form inputs must have programmatically associated labels.
- [ ] [Avoid autofocus on form fields](https://frontendchecklist.io/rules/accessibility/autofocus-avoidance) ![Low][low_img]: Form fields do not use the autofocus attribute which can disorient screen reader users and cause unexpected page behavior.
- [ ] [Avoid autoplaying media](https://frontendchecklist.io/rules/accessibility/autoplay-media) ![High][high_img]: Audio and video content does not autoplay, or provides immediate controls to pause or stop playback.
- [ ] [Avoid focusable descendants in role="text" elements](https://frontendchecklist.io/rules/accessibility/aria-text) ![Medium][medium_img]: Checks that elements with role='text' have no focusable descendants
- [ ] [Avoid images of text](https://frontendchecklist.io/rules/accessibility/text-in-images) ![Low][low_img]: Real text is used instead of images containing text, except for logos or when specific visual presentation is essential.
- [ ] [Avoid meta refresh redirects](https://frontendchecklist.io/rules/accessibility/meta-refresh) ![Medium][medium_img]: Meta refresh redirects can disorient users and cause accessibility issues by refreshing the page unexpectedly.
- [ ] [Avoid redundant entry in the same process](https://frontendchecklist.io/rules/accessibility/redundant-entry) ![High][high_img]: Information already provided earlier in a multi-step flow is auto-populated or available for selection instead of being typed again.
- [ ] [Avoid redundant image alternative text](https://frontendchecklist.io/rules/accessibility/image-redundant-alt) ![Low][low_img]: Alternative text should not contain redundant words like 'image' or 'photo'.
- [ ] [Avoid scrolljacking and custom scroll behavior](https://frontendchecklist.io/rules/accessibility/scrolljacking) ![Medium][medium_img]: Natural scroll behavior is preserved without custom scroll speeds, directions, or hijacked scroll events.
- [ ] [Avoid sensory-only instructions](https://frontendchecklist.io/rules/accessibility/sensory-instructions) ![High][high_img]: Instructions do not rely solely on sensory characteristics like color, shape, size, location, or sound.
- [ ] [Avoid using deprecated ARIA roles](https://frontendchecklist.io/rules/accessibility/aria-deprecated-role) ![Medium][medium_img]: Checks for deprecated or abstract ARIA roles to ensure long-term compatibility.
- [ ] [Create accessible tooltips](https://frontendchecklist.io/rules/accessibility/accessible-tooltips) ![Medium][medium_img]: Tooltips are accessible to keyboard users and screen readers with proper ARIA attributes and focus handling.
- [ ] [Define proper table headers](https://frontendchecklist.io/rules/accessibility/table-headers) ![Medium][medium_img]: Checks that data tables have proper headers
- [ ] [Do not use aria-hidden on the document body](https://frontendchecklist.io/rules/accessibility/aria-hidden-body) ![Critical][critical_img]: Ensures the document body is not set to aria-hidden, which would hide the entire page from screen readers.
- [ ] [Enable keyboard navigation for all elements](https://frontendchecklist.io/rules/accessibility/keyboard-navigation) ![Critical][critical_img]: All interactive elements are accessible via keyboard with logical focus order and hidden elements excluded from tab sequence.
- [ ] [Ensure accesskey values are unique](https://frontendchecklist.io/rules/accessibility/accesskeys) ![Medium][medium_img]: Checks that accesskey values are unique to avoid shortcut conflicts.
- [ ] [Ensure all input fields have accessible names](https://frontendchecklist.io/rules/accessibility/aria-input-field-name) ![Critical][critical_img]: Checks that input fields have accessible names so screen reader users know what data each field expects.
- [ ] [Ensure ARIA attributes are valid](https://frontendchecklist.io/rules/accessibility/aria-valid-attr) ![High][high_img]: All ARIA attributes must be valid and exist in the WAI-ARIA specification.
- [ ] [Ensure ARIA roles are contained by required parent roles](https://frontendchecklist.io/rules/accessibility/aria-required-parent) ![Medium][medium_img]: Checks that elements with certain roles have required parent roles
- [ ] [Ensure ARIA roles contain required child roles](https://frontendchecklist.io/rules/accessibility/aria-required-children) ![High][high_img]: Elements with certain ARIA roles must contain the required child roles or the widget structure will be broken for assistive technologies.
- [ ] [Ensure content remains usable without CSS](https://frontendchecklist.io/rules/accessibility/content-without-css) ![High][high_img]: Content structure, instructions, and primary tasks remain understandable and operable when author CSS is disabled or replaced by user styles.
- [ ] [Ensure dialogs have an accessible name](https://frontendchecklist.io/rules/accessibility/aria-dialog-name) ![Medium][medium_img]: Checks that dialog elements have accessible names to orient screen reader users.
- [ ] [Ensure headings contain text](https://frontendchecklist.io/rules/accessibility/empty-heading) ![Medium][medium_img]: All heading elements (h1-h6) must have visible, descriptive content.
- [ ] [Ensure identical links have consistent destinations](https://frontendchecklist.io/rules/accessibility/identical-links-same-purpose) ![Medium][medium_img]: Links with the same text must point to the same destination or be distinguishable.
- [ ] [Ensure logical focus order](https://frontendchecklist.io/rules/accessibility/focus-order) ![High][high_img]: Tab focus order follows the visual layout and logical reading sequence of the page.
- [ ] [Ensure table headers associate with data cells](https://frontendchecklist.io/rules/accessibility/th-has-data-cells) ![Medium][medium_img]: Checks that table headers have associated data cells
- [ ] [Ensure tables have unique accessible names](https://frontendchecklist.io/rules/accessibility/table-duplicate-name) ![Medium][medium_img]: Checks that data tables have unique accessible names
- [ ] [Fix empty and broken links](https://frontendchecklist.io/rules/accessibility/empty-links) ![Medium][medium_img]: All links contain accessible text content and do not lead to broken destinations.
- [ ] [Hide decorative elements from assistive technology](https://frontendchecklist.io/rules/accessibility/decorative-elements) ![Medium][medium_img]: Decorative images and visual elements are hidden from screen readers using aria-hidden or empty alt attributes.
- [ ] [Implement "Skip to Content" links](https://frontendchecklist.io/rules/accessibility/skip-link) ![Medium][medium_img]: Checks for bypass mechanisms for keyboard navigation
- [ ] [Include a skip navigation link](https://frontendchecklist.io/rules/accessibility/skip-navigation) ![High][high_img]: A skip navigation link is provided to allow keyboard users to bypass repetitive content and navigate directly to main content.
- [ ] [Include required ARIA attributes for roles](https://frontendchecklist.io/rules/accessibility/aria-required-attr) ![Medium][medium_img]: Checks that elements have required ARIA attributes for their roles
- [ ] [Keep focused elements unobscured](https://frontendchecklist.io/rules/accessibility/focus-not-obscured) ![High][high_img]: Sticky headers, footers, banners, and overlays must not fully hide the element that currently has keyboard focus.
- [ ] [Keep repeated help mechanisms in a consistent location](https://frontendchecklist.io/rules/accessibility/consistent-help) ![Medium][medium_img]: When help or support mechanisms appear on multiple pages in the same flow, they stay in the same relative order so users can find them predictably.
- [ ] [Link table cells to headers using IDs](https://frontendchecklist.io/rules/accessibility/td-headers-attr) ![Medium][medium_img]: Checks that td headers attribute references valid th ids
- [ ] [Maintain logical heading order](https://frontendchecklist.io/rules/accessibility/heading-order) ![Medium][medium_img]: Heading levels should follow a sequential, hierarchical order.
- [ ] [Make accordions keyboard navigable](https://frontendchecklist.io/rules/accessibility/accordion-accessibility) ![Medium][medium_img]: Accordion components use proper ARIA attributes and keyboard interactions for screen reader accessibility.
- [ ] [Make carousels accessible](https://frontendchecklist.io/rules/accessibility/carousel-accessibility) ![Medium][medium_img]: Carousels and sliders are accessible with pause controls, keyboard navigation, and proper ARIA attributes.
- [ ] [Make drag and drop accessible](https://frontendchecklist.io/rules/accessibility/draggable-accessibility) ![Medium][medium_img]: Drag and drop interfaces provide keyboard alternatives and proper ARIA attributes for accessibility.
- [ ] [Make links in text blocks visually distinguishable](https://frontendchecklist.io/rules/accessibility/link-in-text-block) ![Medium][medium_img]: Links within blocks of text must be distinguishable from surrounding non-link text by more than color alone.
- [ ] [Make modal dialogs keyboard accessible](https://frontendchecklist.io/rules/accessibility/modal-accessibility) ![High][high_img]: Modal dialogs are accessible with proper focus trapping, ARIA attributes, and keyboard dismissal.
- [ ] [Make notifications accessible](https://frontendchecklist.io/rules/accessibility/accessible-notifications) ![High][high_img]: Toast notifications and alerts are announced to screen readers using ARIA live regions and appropriate roles.
- [ ] [Make tabs keyboard navigable](https://frontendchecklist.io/rules/accessibility/tabs-accessibility) ![Medium][medium_img]: Tab components implement the ARIA tabs pattern with proper roles, states, and keyboard navigation.
- [ ] [Manage focus during dynamic interactions](https://frontendchecklist.io/rules/accessibility/focus-management) ![High][high_img]: Focus is programmatically managed during dynamic interactions like modals, page transitions, and content updates.
- [ ] [Match lang and xml:lang attributes](https://frontendchecklist.io/rules/accessibility/html-xml-lang-mismatch) ![Medium][medium_img]: The lang and xml:lang attributes on the html element must have identical values to avoid conflicting language signals across HTML and XML parsers.
- [ ] [Meet minimum color contrast ratios](https://frontendchecklist.io/rules/accessibility/color-contrast) ![High][high_img]: Text and background colors must have sufficient contrast to be readable by users with low vision or color blindness.
- [ ] [Place list items within list containers](https://frontendchecklist.io/rules/accessibility/listitem) ![Medium][medium_img]: List item elements (li) must always be direct children of a list container (ul, ol, or menu) to maintain valid HTML structure and correct screen reader announcements.
- [ ] [Prevent data loss from session timeouts](https://frontendchecklist.io/rules/accessibility/session-timeout-recovery) ![High][high_img]: Users are warned before session expiry, can extend time when appropriate, and can re-authenticate or resume work without losing entered data.
- [ ] [Prevent seizure-triggering flashing content](https://frontendchecklist.io/rules/accessibility/flashing-content) ![Critical][critical_img]: Content does not flash more than three times per second to prevent seizures in users with photosensitive epilepsy.
- [ ] [Provide accessible authentication methods](https://frontendchecklist.io/rules/accessibility/accessible-authentication) ![High][high_img]: Authentication flows avoid unnecessary cognitive tests and support assistive mechanisms such as password managers, paste, OTP autofill, and passkeys.
- [ ] [Provide accessible names for all interactive elements](https://frontendchecklist.io/rules/accessibility/aria-labels) ![High][high_img]: Checks that interactive elements have accessible names for clear navigation.
- [ ] [Provide accessible names for ARIA command elements](https://frontendchecklist.io/rules/accessibility/aria-command-name) ![Medium][medium_img]: Checks that command elements like buttons and links have accessible names for screen reader support.
- [ ] [Provide accessible names for buttons](https://frontendchecklist.io/rules/accessibility/button-name) ![Critical][critical_img]: All buttons must have a discernible, descriptive accessible name for screen readers.
- [ ] [Provide accessible names for meter elements](https://frontendchecklist.io/rules/accessibility/aria-meter-name) ![Medium][medium_img]: Checks that meter elements have accessible names to provide context for measurements.
- [ ] [Provide accessible names for progress bars](https://frontendchecklist.io/rules/accessibility/aria-progressbar-name) ![Medium][medium_img]: Checks that progressbar elements have accessible names
- [ ] [Provide accessible names for select elements](https://frontendchecklist.io/rules/accessibility/select-name) ![Medium][medium_img]: All `<select>` elements must have an associated label or an accessible name to be correctly identified by screen readers.
- [ ] [Provide accessible names for toggle fields](https://frontendchecklist.io/rules/accessibility/aria-toggle-field-name) ![Medium][medium_img]: Checks that toggle fields (checkbox, radio, switch) have accessible names
- [ ] [Provide accessible names for tooltips](https://frontendchecklist.io/rules/accessibility/aria-tooltip-name) ![Medium][medium_img]: Checks that tooltip elements have accessible names
- [ ] [Provide accessible names for tree items](https://frontendchecklist.io/rules/accessibility/aria-treeitem-name) ![Medium][medium_img]: All elements with role="treeitem" must have a descriptive accessible name so screen reader users can navigate hierarchical tree widgets.
- [ ] [Provide alt text for image buttons](https://frontendchecklist.io/rules/accessibility/input-image-alt) ![Critical][critical_img]: Input elements of type='image' must have a descriptive alt attribute.
- [ ] [Provide alternative text for objects](https://frontendchecklist.io/rules/accessibility/object-alt) ![Medium][medium_img]: The `<object>` element must contain alternative content to ensure accessibility for users who cannot view the primary content.
- [ ] [Provide alternatives to parallax effects](https://frontendchecklist.io/rules/accessibility/parallax-effects) ![Medium][medium_img]: Parallax scrolling effects have reduced-motion alternatives or can be disabled by users.
- [ ] [Provide audio descriptions for video](https://frontendchecklist.io/rules/accessibility/audio-descriptions) ![Medium][medium_img]: Videos with important visual content include audio descriptions that narrate visual information for blind users.
- [ ] [Provide captions for video content](https://frontendchecklist.io/rules/accessibility/video-captions) ![High][high_img]: Prerecorded video with audio must have synchronized captions. Live video must have real-time captions. This is required by WCAG 2.1 SC 1.2.2 and SC 1.2.4.
- [ ] [Provide instant anchor scroll option](https://frontendchecklist.io/rules/accessibility/anchor-smooth-scroll) ![Low][low_img]: Smooth scroll animations to anchor links respect motion preferences or provide an instant alternative.
- [ ] [Provide sufficient touch target size](https://frontendchecklist.io/rules/accessibility/touch-targets) ![Medium][medium_img]: Interactive elements must have large enough touch targets so users with motor impairments can activate them accurately on touchscreen devices.
- [ ] [Provide titles for iframes and frames](https://frontendchecklist.io/rules/accessibility/frame-title) ![Medium][medium_img]: iframes and frames must have a title attribute to describe their content.
- [ ] [Remove focusable elements from aria-hidden containers](https://frontendchecklist.io/rules/accessibility/aria-hidden-focus) ![Medium][medium_img]: Ensures aria-hidden elements do not contain focusable content to avoid "ghost" focus.
- [ ] [Respect reduced motion preferences](https://frontendchecklist.io/rules/accessibility/reduced-motion) ![High][high_img]: Animations respect user motion preferences, avoid seizure-triggering flashing, and include warnings for excessive motion.
- [ ] [Support both portrait and landscape orientation](https://frontendchecklist.io/rules/accessibility/orientation) ![High][high_img]: Content and functionality work in both portrait and landscape unless a specific orientation is essential to the activity.
- [ ] [Support content reflow at 400% zoom](https://frontendchecklist.io/rules/accessibility/zoom-reflow) ![Critical][critical_img]: Content reflows when zoomed to 400% without requiring horizontal scrolling or loss of functionality.
- [ ] [Support text resizing to 200%](https://frontendchecklist.io/rules/accessibility/text-resizing) ![High][high_img]: Text can be resized up to 200% without loss of content or functionality using browser settings.
- [ ] [Test with screen readers](https://frontendchecklist.io/rules/accessibility/screen-reader-testing) ![High][high_img]: Pages must be tested with actual screen reader software (NVDA, JAWS, VoiceOver, TalkBack) to verify announcements, focus order, and widget behavior beyond what automated tools can detect.
- [ ] [Use a single label for each form field](https://frontendchecklist.io/rules/accessibility/form-field-multiple-labels) ![Medium][medium_img]: Form fields should have exactly one associated <label> element for maximum clarity.
- [ ] [Use appropriate tabindex values](https://frontendchecklist.io/rules/accessibility/tabindex) ![Medium][medium_img]: Checks for appropriate tabindex values
- [ ] [Use correct definition list structure](https://frontendchecklist.io/rules/accessibility/definition-list) ![Medium][medium_img]: Definition lists (&lt;dl&gt;) must only contain valid &lt;dt&gt; and &lt;dd&gt; elements.
- [ ] [Use correct list structure](https://frontendchecklist.io/rules/accessibility/list-structure) ![Medium][medium_img]: Lists (ul, ol) should only contain list item elements (li) to ensure they are correctly interpreted by assistive technology.
- [ ] [Use descriptive link text](https://frontendchecklist.io/rules/accessibility/link-text) ![High][high_img]: Link text clearly describes the destination or purpose without relying on surrounding context.
- [ ] [Use exactly one main landmark](https://frontendchecklist.io/rules/accessibility/landmark-one-main) ![Medium][medium_img]: Each page must have one and only one main landmark.
- [ ] [Use inclusive language](https://frontendchecklist.io/rules/accessibility/inclusive-language) ![Medium][medium_img]: Content uses inclusive, non-discriminatory language that welcomes all users regardless of ability, gender, race, or background.
- [ ] [Use landmark regions correctly](https://frontendchecklist.io/rules/accessibility/landmark-regions) ![Medium][medium_img]: Proper landmark regions (main, nav, footer) help users navigate the page more efficiently.
- [ ] [Use logical heading hierarchy](https://frontendchecklist.io/rules/accessibility/heading-hierarchy) ![Critical][critical_img]: Headings follow a sequential structure (h1 to h6) that reflects the content hierarchy without skipping levels.
- [ ] [Use navigation landmark regions](https://frontendchecklist.io/rules/accessibility/navigation-landmark) ![High][high_img]: Page navigation uses nav elements with proper ARIA labels to distinguish multiple navigation regions.
- [ ] [Use only allowed ARIA attributes for each role](https://frontendchecklist.io/rules/accessibility/aria-allowed-attr) ![Medium][medium_img]: Checks that ARIA attributes are allowed on their elements to ensure valid accessibility trees.
- [ ] [Use semantic list elements](https://frontendchecklist.io/rules/accessibility/semantic-lists) ![Medium][medium_img]: Groups of related items use ul, ol, or dl elements so screen readers announce list context and item count.
- [ ] [Use semantic table markup for screen readers](https://frontendchecklist.io/rules/accessibility/accessible-tables) ![Medium][medium_img]: Data tables use proper semantic markup with headers, captions, and scope attributes for screen reader accessibility.
- [ ] [Use unique IDs for active elements](https://frontendchecklist.io/rules/accessibility/duplicate-id-active) ![High][high_img]: All focusable or active elements must have a unique ID attribute.
- [ ] [Use unique IDs for ARIA references](https://frontendchecklist.io/rules/accessibility/duplicate-id-aria) ![High][high_img]: IDs referenced by ARIA attributes must be unique to ensure correct accessibility relationships.
- [ ] [Use valid ARIA role values](https://frontendchecklist.io/rules/accessibility/aria-roles) ![Medium][medium_img]: Checks for valid ARIA role values
- [ ] [Use valid values for ARIA attributes](https://frontendchecklist.io/rules/accessibility/aria-valid-attr-value) ![Medium][medium_img]: Checks for valid values in ARIA attributes
- [ ] [Wrap definition items in a definition list](https://frontendchecklist.io/rules/accessibility/dlitem) ![Medium][medium_img]: Description terms (&lt;dt&gt;) and details (&lt;dd&gt;) must be contained within a &lt;dl&gt; element.
- [ ] [Write in plain language](https://frontendchecklist.io/rules/accessibility/plain-language) ![Medium][medium_img]: Content uses clear, simple language that is easy to understand for users with cognitive disabilities and non-native speakers.

**[Back to top](#front-end-checklist)**

### SEO

*94 rules. Crawlability, metadata, structured data, and search visibility rules.*

[Browse SEO on frontendchecklist.io](https://frontendchecklist.io/rules/seo)

- [ ] [4XX Pages in Sitemap](https://frontendchecklist.io/rules/seo/sitemap-4xx) ![High][high_img]: Checks for sitemap URLs that return 4XX HTTP status codes, indicating broken or removed pages.
- [ ] [Add a favicon to every page](https://frontendchecklist.io/rules/seo/favicon) ![Medium][medium_img]: Checks for favicon presence and correct link element configuration
- [ ] [Add disclaimers to sensitive content](https://frontendchecklist.io/rules/seo/disclaimers) ![Medium][medium_img]: Checks for appropriate disclaimers on sensitive content types such as medical, legal, financial, and affiliate pages
- [ ] [Add FAQPage schema markup](https://frontendchecklist.io/rules/seo/faq) ![Medium][medium_img]: Validates FAQPage JSON-LD structured data for question-and-answer content
- [ ] [Add internal links to key pages](https://frontendchecklist.io/rules/seo/internal-links) ![Medium][medium_img]: Validates that key pages receive adequate internal links from other site pages
- [ ] [Add internal links to orphan pages](https://frontendchecklist.io/rules/seo/orphan-pages) ![Medium][medium_img]: Detects pages with no internal links pointing to them
- [ ] [Add LocalBusiness schema markup](https://frontendchecklist.io/rules/seo/local-business) ![Medium][medium_img]: Validates LocalBusiness schema for local SEO
- [ ] [Add Organization schema markup](https://frontendchecklist.io/rules/seo/organization) ![Medium][medium_img]: Validates Organization schema for brand presence
- [ ] [Add outgoing links to dead-end pages](https://frontendchecklist.io/rules/seo/dead-end-pages) ![Medium][medium_img]: Pages with no outgoing internal links, potentially trapping users and crawlers
- [ ] [Add Product schema markup](https://frontendchecklist.io/rules/seo/product) ![Medium][medium_img]: Validates Product schema for e-commerce
- [ ] [Add relevant external links](https://frontendchecklist.io/rules/seo/external-links) ![Medium][medium_img]: Validates that pages include outgoing links to authoritative external sources where appropriate
- [ ] [Add Review schema markup](https://frontendchecklist.io/rules/seo/review) ![Medium][medium_img]: Validates Review and AggregateRating schema on product, service, and business pages to enable star-rating rich results.
- [ ] [Add share buttons to content pages](https://frontendchecklist.io/rules/seo/share-buttons) ![Low][low_img]: Checks for social sharing buttons on articles, blog posts, and other shareable content pages.
- [ ] [Add structured data markup](https://frontendchecklist.io/rules/seo/structured-data) ![High][high_img]: Schema.org structured data (JSON-LD) is implemented for rich search results.
- [ ] [Add Twitter Card meta tags](https://frontendchecklist.io/rules/seo/twitter-cards) ![Medium][medium_img]: Validates Twitter (X) Card meta tags for correct card type, image dimensions, and required fields.
- [ ] [Add VideoObject schema to video pages](https://frontendchecklist.io/rules/seo/video) ![Medium][medium_img]: Checks for VideoObject structured data on pages containing video content to enable video rich results in Google Search.
- [ ] [Audit all noindex pages](https://frontendchecklist.io/rules/seo/all-noindex-pages) ![Medium][medium_img]: Lists and reviews all pages blocked from indexing to ensure critical content is accessible.
- [ ] [Audit and refine AI-generated content](https://frontendchecklist.io/rules/seo/ai-content) ![Medium][medium_img]: Detects and reviews content that appears to be primarily AI-generated to ensure quality.
- [ ] [Avoid conflicting indexability signals](https://frontendchecklist.io/rules/seo/indexability-conflicts) ![Medium][medium_img]: Detects conflicting signals between robots.txt, meta robots, X-Robots-Tag headers, and canonical tags
- [ ] [Avoid duplicate meta descriptions](https://frontendchecklist.io/rules/seo/duplicate-description) ![Medium][medium_img]: Checks for duplicate meta descriptions across the site
- [ ] [Avoid keyword stuffing](https://frontendchecklist.io/rules/seo/keyword-stuffing) ![Medium][medium_img]: Detects excessive keyword repetition in content, titles, or meta tags that signals manipulative SEO
- [ ] [Avoid multi-hop redirect chains](https://frontendchecklist.io/rules/seo/redirect-chain) ![High][high_img]: Detects multi-hop redirect chains that waste crawl budget
- [ ] [Avoid nofollow on internal links](https://frontendchecklist.io/rules/seo/nofollow-internal) ![Medium][medium_img]: Flags internal links with rel=nofollow
- [ ] [Avoid nosnippet on important pages](https://frontendchecklist.io/rules/seo/nosnippet) ![Medium][medium_img]: Detects pages preventing search engine snippets
- [ ] [Avoid redirect chains on canonical URLs](https://frontendchecklist.io/rules/seo/canonical-chain) ![Medium][medium_img]: Ensures that canonical tags point directly to the final destination URL without intermediate redirects.
- [ ] [Avoid thin content on key pages](https://frontendchecklist.io/rules/seo/word-count) ![Medium][medium_img]: Checks content length on key pages to identify thin content that may underperform in search results.
- [ ] [Check for broken links](https://frontendchecklist.io/rules/seo/link-checker) ![Medium][medium_img]: All links are tested and none are broken. Links redirect to intended destinations.
- [ ] [Cite authoritative external sources](https://frontendchecklist.io/rules/seo/citations) ![Medium][medium_img]: Checks for citations to reputable external websites to back up factual claims and build trust.
- [ ] [Create a comprehensive Contact page](https://frontendchecklist.io/rules/seo/contact-page) ![Medium][medium_img]: Checks for a dedicated contact page with multiple methods for users to reach out.
- [ ] [Create a dedicated About page](https://frontendchecklist.io/rules/seo/about-page) ![Medium][medium_img]: Checks for a dedicated about or company page with meaningful content.
- [ ] [Create and submit an XML sitemap](https://frontendchecklist.io/rules/seo/sitemap) ![High][high_img]: An XML sitemap is available at /sitemap.xml and includes all important pages.
- [ ] [Display a physical business address](https://frontendchecklist.io/rules/seo/physical-address) ![Medium][medium_img]: Checks for visible physical address information
- [ ] [Display clear author bylines](https://frontendchecklist.io/rules/seo/author-byline) ![Medium][medium_img]: Checks for visible author names on content pages to establish transparency and trust.
- [ ] [Do not link from HTTPS to HTTP](https://frontendchecklist.io/rules/seo/https-downgrade) ![Medium][medium_img]: Detects links from HTTPS pages to HTTP destinations, which trigger mixed content warnings and lose ranking signals
- [ ] [Fix invalid links](https://frontendchecklist.io/rules/seo/invalid-links) ![Medium][medium_img]: Detects malformed, empty, or syntactically invalid link formats on the page
- [ ] [Fix malformed HTML structure](https://frontendchecklist.io/rules/seo/broken-html) ![Medium][medium_img]: Ensures that the HTML document is well-formed with correctly nested and closed tags.
- [ ] [Fix or remove broken external links](https://frontendchecklist.io/rules/seo/broken-external-links) ![Medium][medium_img]: Detects and resolves external links that return error codes or have timed out.
- [ ] [Geo Meta Tags](https://frontendchecklist.io/rules/seo/geo-meta) ![Medium][medium_img]: Checks for geographic meta tags for local or regional targeting
- [ ] [Highlight author credentials and expertise](https://frontendchecklist.io/rules/seo/author-expertise) ![Medium][medium_img]: Checks for author bios and credentials to establish expertise and trust.
- [ ] [Identify YMYL content on your site](https://frontendchecklist.io/rules/seo/ymyl-detection) ![High][high_img]: Detects Your Money or Your Life (YMYL) content that is subject to Google's elevated E-E-A-T quality standards.
- [ ] [Implement comprehensive author markup](https://frontendchecklist.io/rules/seo/author-info) ![Medium][medium_img]: Uses structured data to provide machine-readable metadata about content authors.
- [ ] [Implement valid Article structured data](https://frontendchecklist.io/rules/seo/article) ![High][high_img]: Validates that articles use the correct Schema.org properties for improved search visibility.
- [ ] [Implement valid BreadcrumbList schema](https://frontendchecklist.io/rules/seo/breadcrumb) ![Medium][medium_img]: Adds structured data to breadcrumb navigation for better site hierarchy and search appearance.
- [ ] [Include indexable pages in your sitemap](https://frontendchecklist.io/rules/seo/sitemap-coverage) ![Medium][medium_img]: Checks for canonical-url, indexable pages that are missing from the XML sitemap.
- [ ] [Include keywords in URL slugs](https://frontendchecklist.io/rules/seo/slug-keywords) ![Medium][medium_img]: Checks if URL slugs contain descriptive, keyword-relevant words instead of IDs, random strings, or vague terms.
- [ ] [Keep HTML documents under crawl limits](https://frontendchecklist.io/rules/seo/html-size) ![Medium][medium_img]: Checks HTML document size against Googlebot crawl limits
- [ ] [Keep linked PDFs under 60 MB](https://frontendchecklist.io/rules/seo/pdf-size) ![Medium][medium_img]: Checks linked PDF sizes against Googlebot 60MB truncation limit
- [ ] [Keep NAP details consistent](https://frontendchecklist.io/rules/seo/nap-consistency) ![Medium][medium_img]: Checks for consistent Name, Address, Phone across site
- [ ] [Keep page titles unique](https://frontendchecklist.io/rules/seo/title-unique) ![High][high_img]: Checks that the <title> tag is unique across all pages of the site to avoid duplicate title SEO issues.
- [ ] [Keep sitemap URLs on the correct domain](https://frontendchecklist.io/rules/seo/sitemap-domain) ![Medium][medium_img]: Checks that all URLs in the sitemap belong to the same domain and protocol as the sitemap itself.
- [ ] [Keep URLs concise](https://frontendchecklist.io/rules/seo/length) ![Medium][medium_img]: Checks URL length for optimal crawlability and usability
- [ ] [Keep XML sitemaps valid](https://frontendchecklist.io/rules/seo/sitemap-valid) ![High][high_img]: Validates sitemap XML structure against the sitemaps.org protocol, URL limits, and encoding requirements.
- [ ] [Limit unnecessary URL parameters](https://frontendchecklist.io/rules/seo/parameters) ![Medium][medium_img]: Checks for excessive URL parameters
- [ ] [Link directly to final destination URLs](https://frontendchecklist.io/rules/seo/redirect-chains) ![Medium][medium_img]: Detects URLs that redirect and links pointing to redirects
- [ ] [Link to active social profiles](https://frontendchecklist.io/rules/seo/social-profiles) ![Low][low_img]: Checks for links to the organization's social media profiles to help search engines connect the site to its social entity and build E-E-A-T signals.
- [ ] [Make content easy for LLMs to parse](https://frontendchecklist.io/rules/seo/llm-parsability) ![Medium][medium_img]: Analyzes how well LLMs can parse and understand the content
- [ ] [Make important pages indexable](https://frontendchecklist.io/rules/seo/indexability) ![Medium][medium_img]: Identifies important pages blocked from search engine indexing by noindex, robots.txt, or other directives
- [ ] [Meta Tags in Body](https://frontendchecklist.io/rules/seo/meta-in-body) ![High][high_img]: Detects meta tags incorrectly placed in document body
- [ ] [MIME Type Validation](https://frontendchecklist.io/rules/seo/mime-type) ![Medium][medium_img]: Detects Content-Type header mismatches with file extensions
- [ ] [Noindex in Sitemap](https://frontendchecklist.io/rules/seo/noindex-in-sitemap) ![High][high_img]: Checks for noindexed pages listed in sitemap
- [ ] [OG Image Size](https://frontendchecklist.io/rules/seo/og-image-size) ![Medium][medium_img]: Checks og:image meets recommended size (1200x630)
- [ ] [OG URL Match](https://frontendchecklist.io/rules/seo/og-url-match) ![Medium][medium_img]: Checks that og:url matches canonical URL
- [ ] [Open Graph Tags](https://frontendchecklist.io/rules/seo/og-tags) ![Medium][medium_img]: Validates Open Graph meta tags for social sharing
- [ ] [Optimize article link density](https://frontendchecklist.io/rules/seo/article-links) ![Medium][medium_img]: Ensures articles have a healthy balance of internal and external links relative to their length.
- [ ] [Provide clear affiliate disclosures](https://frontendchecklist.io/rules/seo/affiliate-disclosure) ![Medium][medium_img]: Checks for affiliate and sponsored content disclosures to maintain transparency.
- [ ] [Publish a robots.txt file](https://frontendchecklist.io/rules/seo/robots-txt) ![High][high_img]: Checks if robots.txt exists at the root, is accessible, and contains valid directives.
- [ ] [Publish an editorial policy page](https://frontendchecklist.io/rules/seo/editorial-policy) ![Medium][medium_img]: Checks for editorial and content policy pages that demonstrate site-wide trustworthiness
- [ ] [Publish high-quality content](https://frontendchecklist.io/rules/seo/quality) ![High][high_img]: LLM-based content quality analysis for SEO
- [ ] [Publish llms.txt for documentation-heavy sites](https://frontendchecklist.io/rules/seo/llms-txt) ![Medium][medium_img]: Offer an optional llms.txt index that points AI tools to high-value documentation pages and, when useful, a fuller llms-full.txt companion.
- [ ] [Resolve internal broken links](https://frontendchecklist.io/rules/seo/broken-links) ![High][high_img]: Detects and fixes internal links that return 404 or 5xx errors to improve user experience.
- [ ] [Robots Meta Conflict](https://frontendchecklist.io/rules/seo/robots-meta-conflict) ![High][high_img]: Detects pages blocked by robots.txt that also carry noindex meta tags, creating a paradox where the directive is never read.
- [ ] [Schema + Noindex Conflict](https://frontendchecklist.io/rules/seo/schema-noindex-conflict) ![High][high_img]: Detects pages that carry rich result schema markup but are blocked from indexing via noindex or robots.txt.
- [ ] [Service Area Pages](https://frontendchecklist.io/rules/seo/service-area) ![Medium][medium_img]: Checks for properly structured service-area or location pages for businesses serving multiple geographic regions.
- [ ] [Set canonical URLs for all pages](https://frontendchecklist.io/rules/seo/canonical-url) ![High][high_img]: A canonical URL tag is present to prevent duplicate content issues.
- [ ] [Set robots meta directives correctly](https://frontendchecklist.io/rules/seo/robots-meta) ![High][high_img]: Checks robots meta tag for valid indexing directives in the page head.
- [ ] [Show content freshness signals](https://frontendchecklist.io/rules/seo/freshness) ![Medium][medium_img]: Checks for last-modified and published date signals that help Google assess content currency
- [ ] [Show published and updated dates](https://frontendchecklist.io/rules/seo/content-dates) ![Medium][medium_img]: Checks for published and modified dates on content pages
- [ ] [Show trust signals on key pages](https://frontendchecklist.io/rules/seo/trust-signals) ![Medium][medium_img]: Checks for trust badges, certifications, client logos, testimonials, and social proof on high-conversion pages.
- [ ] [Sync HTML canonical tags and Link headers](https://frontendchecklist.io/rules/seo/canonical-header) ![Medium][medium_img]: Ensures consistency between HTML rel="canonical" tags and HTTP Link canonical-url headers.
- [ ] [Tel & Mailto Links](https://frontendchecklist.io/rules/seo/tel-mailto) ![Medium][medium_img]: Validates that phone numbers use the tel: scheme and email addresses use the mailto: scheme for one-click contact on mobile devices.
- [ ] [URL Special Characters](https://frontendchecklist.io/rules/seo/special-chars) ![Medium][medium_img]: Checks for problematic special characters in URL paths that can cause crawling, parsing, or canonicalization issues.
- [ ] [URL Stop Words](https://frontendchecklist.io/rules/seo/stop-words) ![Low][low_img]: Flags common stop words in URL slugs that add length without improving keyword relevance.
- [ ] [Use a single descriptive H1](https://frontendchecklist.io/rules/seo/h1) ![Medium][medium_img]: Validates that each page has exactly one H1 tag containing a descriptive, keyword-relevant heading
- [ ] [Use canonicals on paginated pages](https://frontendchecklist.io/rules/seo/pagination) ![Medium][medium_img]: Checks that paginated pages have proper canonicals
- [ ] [Use descriptive anchor text](https://frontendchecklist.io/rules/seo/anchor-text) ![Medium][medium_img]: Checks for descriptive, keyword-rich anchor text that provides context for users and search engines.
- [ ] [Use hyphens in URLs](https://frontendchecklist.io/rules/seo/hyphens) ![Medium][medium_img]: Checks that URL slugs use hyphens as word separators, not underscores or spaces
- [ ] [Use lowercase URLs](https://frontendchecklist.io/rules/seo/lowercase) ![Medium][medium_img]: Checks that URLs are lowercase
- [ ] [Use trailing slashes consistently](https://frontendchecklist.io/rules/seo/trailing-slash) ![Medium][medium_img]: Checks for consistent trailing slash usage across all URLs to avoid duplicate content and canonicalization issues.
- [ ] [Use valid JSON-LD structured data](https://frontendchecklist.io/rules/seo/json-ld-valid) ![Medium][medium_img]: Validates JSON-LD structured data for syntax correctness, required properties, and schema.org compliance
- [ ] [Weak Internal Links](https://frontendchecklist.io/rules/seo/weak-internal-links) ![Medium][medium_img]: Detects pages with very few dofollow internal links pointing to them, indicating poor link equity distribution and crawl discoverability.
- [ ] [WebSite Search Schema](https://frontendchecklist.io/rules/seo/website-search) ![Low][low_img]: Checks for WebSite schema with SearchAction to enable the Sitelinks Searchbox in Google Search results.
- [ ] [Write a descriptive page title](https://frontendchecklist.io/rules/seo/meta-title) ![High][high_img]: Validates page title presence and length
- [ ] [Write a meta description for each page](https://frontendchecklist.io/rules/seo/meta-description) ![High][high_img]: Validates meta description presence and length
- [ ] [Write at a clear reading level](https://frontendchecklist.io/rules/seo/reading-level) ![Medium][medium_img]: Analyzes content readability using Flesch-Kincaid

**[Back to top](#front-end-checklist)**

### Security

*22 rules. Headers, transport, safe linking, and frontend security rules.*

[Browse Security on frontendchecklist.io](https://frontendchecklist.io/rules/security)

- [ ] [Adblock Element Hiding](https://frontendchecklist.io/rules/security/element-hiding) ![Low][low_img]: Checks for HTML elements and CSS classes that would be hidden by common adblockers, causing layout breaks or missing functionality for users with ad blocking enabled.
- [ ] [Audit dependencies for known vulnerabilities](https://frontendchecklist.io/rules/security/dependency-audit) ![High][high_img]: Dependencies are regularly scanned for known security vulnerabilities using automated tooling, and critical findings are remediated before deployment.
- [ ] [Avoid mixed content on HTTPS pages](https://frontendchecklist.io/rules/security/mixed-content) ![High][high_img]: An HTTPS page that loads resources over HTTP has mixed content — browsers block or warn about these requests, breaking functionality and undermining transport security.
- [ ] [Blocked Tracking Links](https://frontendchecklist.io/rules/security/blocked-links) ![Low][low_img]: Links and resources pointing to known tracking or advertising domains may be blocked by adblockers, breaking navigation and functionality for a significant portion of users.
- [ ] [External Link Security](https://frontendchecklist.io/rules/security/new-tab) ![Medium][medium_img]: Links that open in a new tab using target='_blank' must include rel='noopener noreferrer' to prevent the opened page from accessing the opener's window context.
- [ ] [Implement a content security policy](https://frontendchecklist.io/rules/security/content-security-policy) ![High][high_img]: A Content Security Policy is implemented to prevent XSS attacks and control resource loading.
- [ ] [Leaked Environment Variables](https://frontendchecklist.io/rules/security/leaked-secrets) ![Critical][critical_img]: Checks for exposed API keys, tokens, passwords, and other secrets embedded in HTML source, JavaScript bundles, or client-accessible files.
- [ ] [Link to your terms of service in the footer](https://frontendchecklist.io/rules/security/terms-of-service) ![Medium][medium_img]: Websites offering services to users should publish Terms of Service and link to them from every page — this establishes the legal agreement governing use of the service.
- [ ] [Prevent stack trace exposure in production error responses](https://frontendchecklist.io/rules/security/stack-trace-exposure) ![High][high_img]: Production error responses never include stack traces, internal file paths, framework internals, or other debugging detail that could aid an attacker (OWASP A09).
- [ ] [Protect public forms with CAPTCHA](https://frontendchecklist.io/rules/security/form-captcha) ![Medium][medium_img]: Public forms that accept user input without authentication must include bot protection to prevent spam, credential stuffing, and automated abuse.
- [ ] [Redirect HTTP to HTTPS](https://frontendchecklist.io/rules/security/http-to-https) ![Critical][critical_img]: All HTTP requests must be permanently redirected (301) to HTTPS to prevent users from accessing your site over an insecure connection.
- [ ] [Secure password input fields](https://frontendchecklist.io/rules/security/password-field-security) ![High][high_img]: Password fields implement security best practices including proper autocomplete, show/hide toggle, and strength indicators.
- [ ] [Serve all pages over HTTPS](https://frontendchecklist.io/rules/security/https) ![Critical][critical_img]: Every page and resource on your site must be delivered over HTTPS to protect user data in transit and enable modern browser features.
- [ ] [Set a Permissions-Policy header](https://frontendchecklist.io/rules/security/permissions-policy) ![Medium][medium_img]: The Permissions-Policy header lets servers restrict which browser features (camera, microphone, geolocation, etc.) can be used in a page or its embedded iframes.
- [ ] [Set a Referrer-Policy header](https://frontendchecklist.io/rules/security/referrer-policy) ![Medium][medium_img]: The Referrer-Policy header controls how much referrer information is sent when navigating from your site to another, protecting user privacy and preventing leaking sensitive URL parameters.
- [ ] [Set an HSTS header](https://frontendchecklist.io/rules/security/hsts) ![High][high_img]: The Strict-Transport-Security response header tells browsers to always use HTTPS for your domain, preventing protocol downgrade attacks and cookie hijacking.
- [ ] [Set an X-Frame-Options header](https://frontendchecklist.io/rules/security/x-frame-options) ![High][high_img]: The X-Frame-Options header controls whether your page can be embedded in an iframe, frame, or object — preventing clickjacking attacks.
- [ ] [Set Secure, HttpOnly, and SameSite flags on session cookies](https://frontendchecklist.io/rules/security/session-cookie-flags) ![High][high_img]: All session and authentication cookies are issued with the Secure, HttpOnly, and an appropriate SameSite flag to prevent interception, JavaScript exfiltration, and cross-site request forgery.
- [ ] [Set X-Content-Type-Options: nosniff](https://frontendchecklist.io/rules/security/x-content-type) ![High][high_img]: The X-Content-Type-Options: nosniff header prevents browsers from MIME-sniffing a response away from the declared Content-Type, blocking a class of drive-by download and XSS attacks.
- [ ] [Store authentication tokens securely](https://frontendchecklist.io/rules/security/token-storage-security) ![High][high_img]: Sensitive authentication tokens are stored in httpOnly cookies rather than localStorage or sessionStorage to prevent theft via cross-site scripting attacks (OWASP A07).
- [ ] [Submit forms over HTTPS](https://frontendchecklist.io/rules/security/form-https) ![Critical][critical_img]: All HTML form actions must point to HTTPS URLs to ensure form data is encrypted in transit and cannot be intercepted by network attackers.
- [ ] [Use COOP, COEP, and CORP for cross-origin isolation when needed](https://frontendchecklist.io/rules/security/cross-origin-isolation) ![Medium][medium_img]: Sensitive or high-capability applications use COOP, COEP, and CORP deliberately, audit third-party embeds, and verify cross-origin isolation in the browser before relying on it.

**[Back to top](#front-end-checklist)**

### Images

*25 rules. Formats, responsive delivery, optimization, and media quality rules.*

[Browse Images on frontendchecklist.io](https://frontendchecklist.io/rules/images)

- [ ] [Compress images without quality loss](https://frontendchecklist.io/rules/images/image-compression) ![High][high_img]: All images are compressed without significant quality loss to reduce file sizes.
- [ ] [Fix broken images](https://frontendchecklist.io/rules/images/broken-images) ![High][high_img]: No images return 404 errors or display broken-image icons to users.
- [ ] [Handle image loading errors gracefully](https://frontendchecklist.io/rules/images/error-images) ![Low][low_img]: Broken images are handled gracefully with fallback images or placeholder content.
- [ ] [Implement responsive images with srcset](https://frontendchecklist.io/rules/images/responsive-images) ![High][high_img]: Images use srcset and sizes attributes for responsive delivery across devices.
- [ ] [Keep image file sizes within recommended limits](https://frontendchecklist.io/rules/images/image-file-size) ![High][high_img]: Individual image files are compressed to reasonable sizes to avoid wasted bandwidth and slow load times, especially on mobile networks.
- [ ] [Lazy load offscreen images](https://frontendchecklist.io/rules/images/offscreen-lazy) ![High][high_img]: Images below the visible viewport use loading="lazy" to defer download until the user scrolls near them, reducing initial page load time.
- [ ] [Manage inline SVG size and complexity](https://frontendchecklist.io/rules/images/svg-inline) ![Medium][medium_img]: Large or complex SVGs inlined in HTML are extracted to external files or components, preventing them from bloating the HTML document and blocking parsing.
- [ ] [Optimise images for faster loading](https://frontendchecklist.io/rules/images/optimized) ![High][high_img]: All images are compressed and metadata-stripped before deployment, removing unnecessary bytes without visible quality loss.
- [ ] [Optimize all images for web](https://frontendchecklist.io/rules/images/image-optimization) ![High][high_img]: Images are optimized with appropriate formats, compression, and modern techniques.
- [ ] [Optimize SVG files](https://frontendchecklist.io/rules/images/svg-optimization) ![Medium][medium_img]: SVG files are optimized with SVGO to remove unnecessary metadata and reduce size.
- [ ] [Prioritize loading critical images](https://frontendchecklist.io/rules/images/critical-images) ![High][high_img]: Hero and above-the-fold images are preloaded with high fetch priority for LCP.
- [ ] [Provide meaningful alt text for images](https://frontendchecklist.io/rules/images/alt-text) ![Critical][critical_img]: Every informative image has a descriptive alt attribute; decorative images use alt="" to be ignored by screen readers.
- [ ] [Serve images at the correct display size](https://frontendchecklist.io/rules/images/responsive-size) ![High][high_img]: Images are not significantly larger than their display dimensions—serving a 2000px image for a 400px container wastes bandwidth and hurts LCP.
- [ ] [Serve images from a CDN](https://frontendchecklist.io/rules/images/image-cdn) ![High][high_img]: Images are served from a CDN with automatic optimization, resizing, and format conversion.
- [ ] [Set explicit width and height on images](https://frontendchecklist.io/rules/images/dimensions) ![High][high_img]: All <img> elements have explicit width and height attributes so browsers can reserve space before the image loads, preventing layout shift.
- [ ] [Support high-DPI retina displays](https://frontendchecklist.io/rules/images/retina-display) ![Medium][medium_img]: High-resolution images (2x, 3x) are provided for retina and high-DPI displays.
- [ ] [Use <figure> and <figcaption> for image captions](https://frontendchecklist.io/rules/images/figure-figcaption) ![Medium][medium_img]: Images with visible captions are wrapped in <figure> with a <figcaption> child, creating a semantic association between image and caption.
- [ ] [Use <picture> with an <img> fallback](https://frontendchecklist.io/rules/images/picture-element) ![High][high_img]: Every <picture> element contains a required <img> fallback as its last child, ensuring images display in all browsers including those that don't support <picture>.
- [ ] [Use AVIF format for modern browsers](https://frontendchecklist.io/rules/images/avif-format) ![Medium][medium_img]: Images support AVIF format for superior compression with proper browser fallbacks.
- [ ] [Use descriptive image filenames](https://frontendchecklist.io/rules/images/filename-quality) ![Low][low_img]: Image filenames are descriptive and human-readable, using lowercase letters, hyphens as separators, and meaningful words that reflect the image content.
- [ ] [Use image sprites where appropriate](https://frontendchecklist.io/rules/images/sprite-generation) ![Low][low_img]: Small images and icons use sprites or SVG to reduce HTTP requests.
- [ ] [Use modern image formats (WebP, AVIF)](https://frontendchecklist.io/rules/images/modern-format) ![High][high_img]: Images are served in modern formats (WebP or AVIF) instead of legacy JPEG/PNG where browser support allows, reducing file size without visible quality loss.
- [ ] [Use progressive JPEG encoding](https://frontendchecklist.io/rules/images/progressive-jpeg) ![Low][low_img]: JPEG images use progressive format for better perceived loading performance.
- [ ] [Use srcset for responsive images](https://frontendchecklist.io/rules/images/srcset) ![High][high_img]: Images wider than 100px use the srcset attribute to offer multiple resolution variants, letting the browser download the optimal size for the user's viewport and device pixel ratio.
- [ ] [Use WebP format with fallbacks](https://frontendchecklist.io/rules/images/webp-format) ![High][high_img]: Images are served in WebP format with fallbacks for older browsers.

**[Back to top](#front-end-checklist)**

### Testing

*13 rules. Unit, integration, E2E, monitoring, and quality assurance rules.*

[Browse Testing on frontendchecklist.io](https://frontendchecklist.io/rules/testing)

- [ ] [Enforce performance budgets in CI](https://frontendchecklist.io/rules/testing/performance-budget) ![Medium][medium_img]: Define measurable performance thresholds (bundle size, Lighthouse scores, Core Web Vitals) and fail CI builds automatically when they're exceeded.
- [ ] [Follow mocking best practices](https://frontendchecklist.io/rules/testing/mock-best-practices) ![Medium][medium_img]: Use mocks strategically to isolate units under test without over-mocking.
- [ ] [Implement consumer-driven contract testing for API boundaries](https://frontendchecklist.io/rules/testing/contract-testing) ![Medium][medium_img]: Consumer-driven contract tests (Pact) define and verify the API contracts between the frontend consumer and backend provider, catching integration mismatches before they reach production.
- [ ] [Implement end-to-end testing](https://frontendchecklist.io/rules/testing/e2e-testing) ![High][high_img]: Use E2E testing frameworks like Playwright or Cypress to test critical user journeys.
- [ ] [Include accessibility testing](https://frontendchecklist.io/rules/testing/accessibility-testing) ![High][high_img]: Automate accessibility testing with tools like axe-core, jest-axe, or Playwright's accessibility testing.
- [ ] [Integrate real-time error monitoring in production](https://frontendchecklist.io/rules/testing/error-monitoring) ![High][high_img]: A real-time error monitoring service captures, groups, and alerts on unhandled exceptions and promise rejections in production so issues are discovered before users report them.
- [ ] [Maintain test coverage thresholds](https://frontendchecklist.io/rules/testing/test-coverage) ![Medium][medium_img]: Set and enforce minimum code coverage thresholds to ensure adequate test coverage.
- [ ] [Test across all major browsers](https://frontendchecklist.io/rules/testing/cross-browser-testing) ![High][high_img]: Website works correctly across major browsers (Chrome, Firefox, Safari, Edge).
- [ ] [Test on real mobile devices and viewports](https://frontendchecklist.io/rules/testing/mobile-testing) ![High][high_img]: Verify your application on real mobile devices and browser DevTools device emulation to catch touch interaction issues, viewport bugs, and mobile-specific rendering problems.
- [ ] [Use mutation testing to measure how well tests detect bugs](https://frontendchecklist.io/rules/testing/mutation-testing) ![Medium][medium_img]: Run Stryker mutation testing on critical business logic to verify that your test suite will actually catch real bugs, not just achieve line coverage.
- [ ] [Use visual regression testing](https://frontendchecklist.io/rules/testing/visual-regression) ![Medium][medium_img]: Capture screenshots of components and pages, then automatically compare them against approved baselines to detect unintended visual changes before they reach production.
- [ ] [Write integration tests for key workflows](https://frontendchecklist.io/rules/testing/integration-testing) ![High][high_img]: Test how multiple units of code work together — API routes with their database queries, form submissions with validation, and component trees with their state management.
- [ ] [Write unit tests](https://frontendchecklist.io/rules/testing/unit-tests) ![High][high_img]: Critical functionality has unit tests with good coverage for reliability.

**[Back to top](#front-end-checklist)**

### Privacy

*5 rules. Consent, tracking, retention, and user data rights rules.*

[Browse Privacy on frontendchecklist.io](https://frontendchecklist.io/rules/privacy)

- [ ] [Avoid third-party cookies](https://frontendchecklist.io/rules/privacy/third-party-cookies) ![Medium][medium_img]: Third-party cookies set by external domains track users across sites without their knowledge. Modern browsers are phasing them out, and regulations like GDPR and CCPA require consent before setting them.
- [ ] [Collect only the minimum personal data necessary](https://frontendchecklist.io/rules/privacy/data-minimisation) ![Medium][medium_img]: Limit data collection to only what is strictly required for the stated purpose, in line with GDPR Article 5(1)(c) data minimisation principles.
- [ ] [Implement a user-facing data deletion mechanism](https://frontendchecklist.io/rules/privacy/right-to-erasure) ![Medium][medium_img]: Provide users with a clear way to request deletion of their personal data, fulfilling GDPR Article 17 (right to erasure / right to be forgotten).
- [ ] [Link to your privacy policy in the footer](https://frontendchecklist.io/rules/privacy/privacy-policy) ![High][high_img]: Websites that collect any personal data must publish a privacy policy and link to it prominently — this is a legal requirement under GDPR, CCPA, and most other privacy regulations.
- [ ] [Show a cookie consent notice](https://frontendchecklist.io/rules/privacy/cookie-consent) ![High][high_img]: Websites that set non-essential cookies must obtain prior, informed user consent under GDPR, CCPA, and similar privacy regulations before cookies are placed.

**[Back to top](#front-end-checklist)**

### Internationalization

*5 rules. Localization, RTL, language handling, and translation workflow rules.*

[Browse Internationalization on frontendchecklist.io](https://frontendchecklist.io/rules/i18n)

- [ ] [Add hreflang tags for multilingual sites](https://frontendchecklist.io/rules/i18n/hreflang) ![Medium][medium_img]: Hreflang tags indicate language and regional variations for multilingual sites.
- [ ] [Design UI components to accommodate text expansion from translation](https://frontendchecklist.io/rules/i18n/text-expansion) ![Medium][medium_img]: Ensure that layouts use flexible sizing so that translated text — which can be 30–50% longer than English — does not overflow, clip, or break the UI.
- [ ] [Handle plural forms with Intl.PluralRules or ICU MessageFormat](https://frontendchecklist.io/rules/i18n/pluralization) ![Medium][medium_img]: Select the correct grammatical plural category for every language using Intl.PluralRules or an ICU-aware i18n library instead of simple singular/plural branching.
- [ ] [Use Intl APIs for currency, number, and date formatting](https://frontendchecklist.io/rules/i18n/currency-formatting) ![Medium][medium_img]: Format monetary values, numbers, and dates using the browser's built-in Intl.NumberFormat and Intl.DateTimeFormat APIs instead of manual string manipulation.
- [ ] [Use locale-neutral images and provide cultural overrides when needed](https://frontendchecklist.io/rules/i18n/locale-images) ![Low][low_img]: Default to abstract, culture-neutral icons and illustrations, and supply locale-specific image variants only when visual content carries meaning that differs across regions.

**[Back to top](#front-end-checklist)**

[critical_img]: ./apps/web/public/priority/critical.svg
[high_img]: ./apps/web/public/priority/high.svg
[medium_img]: ./apps/web/public/priority/medium.svg
[low_img]: ./apps/web/public/priority/low.svg
<!-- rules-catalog:end -->

## Monorepo overview

| Area | Purpose |
| --- | --- |
| `apps/web` | Public website, rule pages, checklists, and MCP HTTP entrypoints |
| `packages/content` | Source MDX content for rules and checklists |
| `packages/mcp` | MCP server and tool definitions |
| `packages/rules` | Public rules package for external consumers |
| `packages/design-system` | Shared UI primitives and custom components |
| `packages/auth`, `packages/data-layer`, `packages/schemas`, `packages/types` | Shared auth, data, schema, and type infrastructure |

## Common commands

- `pnpm dev` - Run local development tasks
- `pnpm build` - Build all apps and packages with Turborepo
- `pnpm lint` - Run Biome linting
- `pnpm typecheck` - Run TypeScript checks across the repo
- `pnpm test` - Run the test suite
- `pnpm validate:rule-structure` - Validate rule heading structure
- `pnpm score:rules` - Score the rule corpus against the quality gate
- `pnpm generate:skills` - Regenerate installable skills from the rules
- `pnpm generate:readme` - Regenerate the root README checklist and the generated catalog copy

## Contributing

Most content work happens in `packages/content/rules/en`. A typical rule-editing flow is:

1. Edit or add the relevant rule MDX files.
2. Run `pnpm score:rules`.
3. Run `pnpm validate:rule-structure`.
4. Run `pnpm validate:sources` when source metadata changes.
5. Run `pnpm generate:skills`.
6. Run `pnpm generate:readme` if rule titles or descriptions changed.

See [`AGENTS.md`](AGENTS.md), [`scripts/README.md`](scripts/README.md), and [`docs/generated/rules-catalog.md`](docs/generated/rules-catalog.md) for repo conventions, script docs, and the generated standalone catalog copy.

## Contributors

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<a href="https://github.com/thedaviddias/Front-End-Checklist/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=thedaviddias/Front-End-Checklist" />
</a>

## Support

- GitHub repo: [thedaviddias/Front-End-Checklist](https://github.com/thedaviddias/Front-End-Checklist)
- Issues: [open an issue](https://github.com/thedaviddias/Front-End-Checklist/issues)
- License: [MIT](LICENSE)


## 🌐 Web Resources & Interactive Index
- [PRINXY WINTERELLA](https://enskillcrafts.pages.dev/prinxy-winterella.html)
- [HIDDEN OBJECTS VACATION IN BRAZIL](https://quizverses.pages.dev/hidden-objects-vacation-in-brazil.html)
- [POPPING CANDIES](https://thelearnquester.web.app/popping-candies.html)
- [MR BEAN JUMP](https://studyquests.github.io/mr-bean-jump.html)
- [CATEGORY RACING DRIVING 2](https://studyplayings.web.app/category-racing-driving-2.html)
- [ELEMENTAL GLOVES MAGIC POWER](https://quizverses.github.io/elemental-gloves-magic-power.html)
- [CATEGORY FOOD](https://studyquests.github.io/category-food.html)
- [UNSCREW WOOD PUZZLE](https://quizverses.github.io/unscrew-wood-puzzle.html)
- [CATEGORY CASUAL 4](https://studyquests.github.io/category-casual-4.html)
- [INDEX6](https://studyquests.github.io/index6.html)
- [BRUTALMANIA IO](https://quizverses.pages.dev/brutalmania-io.html)
- [CATEGORY PUZZLE 8](https://studyquests.github.io/category-puzzle-8.html)
- [IDLE DAIRY FARM TYCOON](https://quizverses.pages.dev/idle-dairy-farm-tycoon.html)
- [DAYCARE TYCOON](https://quizverses.github.io/daycare-tycoon.html)
- [CATEGORY CONTROLLER59](https://studyquests.github.io/category-controller59.html)
- [CATEGORY IO](https://studyquests.github.io/category-io.html)
- [BULLET SUPERHERO](https://quizverses.github.io/bullet-superhero.html)
- [INDEX4](https://studyquests.github.io/index4.html)
- [DETECTIVE LOGIC PUZZLES](https://studyplaying.github.io/detective-logic-puzzles.html)
- [ICE FISHING 3D](https://quizverses.pages.dev/ice-fishing-3d.html)
- [TEACHER SIMULATOR](https://quizverses.pages.dev/teacher-simulator.html)
- [CATEGORY PIXEL313](https://thequizzone.pages.dev/category-pixel313.html)
- [UNSTACK TOWER](https://learnquester.pages.dev/unstack-tower.html)
- [CATEGORY BASKETBALL](https://studyquests.pages.dev/category-basketball.html)
- [OVER THE RAINBOW](https://quizverses.github.io/over-the-rainbow.html)
- [CRAZY PLANE LANDING](https://quizverses.github.io/crazy-plane-landing.html)
- [MAGNET TRUCK](https://quizverses.github.io/magnet-truck.html)
- [CATEGORY GROW99](https://theskillquest.pages.dev/category-grow99.html)
- [CRAZY SCREW KING](https://learnquesters.pages.dev/crazy-screw-king.html)
- [POP STAR](https://thelearnquester.web.app/pop-star.html)
- [ASMR PET TREATMENT](https://themindzone.pages.dev/asmr-pet-treatment.html)
- [MY FARM](https://learnquesters.pages.dev/my-farm.html)
- [CATEGORY MONSTER](https://themindzone.pages.dev/category-monster.html)
- [FILL THE BOTTLE](https://studyplayings.pages.dev/fill-the-bottle.html)
- [SNOW ROAD PUZZLE](https://studyplayings.web.app/snow-road-puzzle.html)
- [CATEGORY CASUAL](https://learnquester.github.io/category-casual.html)
- [HOSPITAL INC](https://thelearnquester.web.app/hospital-inc.html)
- [WORD OF FORTUNE](https://studyquesthub.web.app/word-of-fortune.html)
- [POTION SORT](https://quizverses.pages.dev/potion-sort.html)
- [VSCO GIRL AESTHETIC](https://theskillquest.pages.dev/vsco-girl-aesthetic.html)
- [MINETAP](https://quizverses.github.io/minetap.html)
- [BURGER HERE](https://themindzone.pages.dev/burger-here.html)
- [CATEGORY FPS GAME](https://studyquests.github.io/category-fps-game.html)
- [YARN FEVER UNRAVEL PUZZLE](https://studyquesthub.web.app/yarn-fever-unravel-puzzle.html)
- [GLAMOUR BEACHLIFE](https://studyquesthub.web.app/glamour-beachlife.html)
- [ARCHERS RANDOM](https://theskillquest.pages.dev/archers-random.html)
- [ALIEN INTELLIGENCE TEST](https://studyquests.github.io/alien-intelligence-test.html)
- [MERGE HOTEL EMPIRE](https://themindzone.pages.dev/merge-hotel-empire.html)
- [EMOJI MATCH](https://quizverses.github.io/emoji-match.html)
- [CATEGORY PUZZLE 9](https://theskillquest.pages.dev/category-puzzle-9.html)
- [DISASSEMBLE THE PICTURE PUZZLE](https://quizverses.github.io/disassemble-the-picture-puzzle.html)
- [TAP 3D BLOCKS](https://thequizzone.pages.dev/tap-3d-blocks.html)
- [RAMP BIKE JUMPING](https://learnquester.pages.dev/ramp-bike-jumping.html)
- [PEG SOLITAIRE](https://learnquester.pages.dev/peg-solitaire.html)
- [PRACTICE ON ME](https://studyquesthub.web.app/practice-on-me.html)
- [ROLLANCE GOING BALLS](https://theskillquest.pages.dev/rollance-going-balls.html)
- [FASHION BATTLE FOR SURVIVAL](https://thelearnquester.web.app/fashion-battle-for-survival.html)
- [SPOTDIFFERS](https://studyplayings.web.app/spotdiffers.html)
- [CATEGORY WATER39](https://themindzone.pages.dev/category-water39.html)
- [CATEGORY MMO25](https://themindzone.pages.dev/category-mmo25.html)
- [WORDS FROM WORDS](https://quizverses.github.io/words-from-words.html)
- [CRYSTAL CONNECT](https://iskillquest.pages.dev/crystal-connect.html)
- [CATEGORY BRAIN](https://learnquester.github.io/category-brain.html)
- [PRINCESS VALENTINES CRUSH](https://theskillquest.pages.dev/princess-valentines-crush.html)
- [CATEGORY 2048](https://thelearnquester.web.app/category-2048.html)
- [ARROW ESCAPE MASTER](https://iskillquest.pages.dev/arrow-escape-master.html)
- [CATEGORY SOLITAIRE](https://studyquesthub.web.app/category-solitaire.html)
- [STICK KILL 3D](https://theskillquest.pages.dev/stick-kill-3d.html)
- [CATEGORY TOWER DEFENSE 2](https://studyquesthub.web.app/category-tower-defense-2.html)
- [ALIENS HUNTER](https://studyplayings.pages.dev/aliens-hunter.html)
- [FARM BLAST](https://iskillquest.pages.dev/farm-blast.html)
- [CATEGORY BASKETBALL 2](https://studyquests.github.io/category-basketball-2.html)
- [BLOCKSSS](https://studyplayings.pages.dev/blocksss.html)
- [CATEGORY GOGUARDIANBYPASS](https://studyquests.github.io/category-goguardianbypass.html)
- [DYNAMONS 11](https://studyquesthub.web.app/dynamons-11.html)
- [CATEGORY DRAWING GAMES](https://studyplayings.pages.dev/category-drawing-games.html)
- [CATEGORY PUZZLE 6](https://studyquests.github.io/category-puzzle-6.html)
- [BUBBLE SHOOTER ULTIMATE](https://learnquester.pages.dev/bubble-shooter-ultimate.html)
- [BOLTS AND NUTS PUZZLE](https://quizverses.github.io/bolts-and-nuts-puzzle.html)
- [NEON BLAST](https://studyquesthub.web.app/neon-blast.html)
- [HERO STORY MONSTERS CROSSING](https://iskillquest.pages.dev/hero-story-monsters-crossing.html)
- [CUBATORIA MERGE 2048](https://thelearnquester.web.app/cubatoria-merge-2048.html)
- [CATEGORY BATTLE](https://learnquester.github.io/category-battle.html)
- [MEME WARS](https://learnquester.pages.dev/meme-wars.html)
- [MAHJONG EARTH](https://themindzone.pages.dev/mahjong-earth.html)
- [SAVE MY HERO](https://iskillquest.pages.dev/save-my-hero.html)
- [CATEGORY CAT](https://studyquesthub.web.app/category-cat.html)
- [CATEGORY MOBILE2 095](https://themindzone.pages.dev/category-mobile2-095.html)
- [CATEGORY COLLECT565](https://learnquesters.pages.dev/category-collect565.html)
- [HIDDEN OBJECT TIME TRAVEL](https://quizverses.github.io/hidden-object-time-travel.html)
- [KNIFE MASTER BALL RACING](https://theskillquest.pages.dev/knife-master-ball-racing.html)
- [BALL SORT COLOR PUZZLE](https://studyplayings.web.app/ball-sort-color-puzzle.html)
- [CUBICA](https://quizverses.github.io/cubica.html)
- [RED ESCAPE](https://studyplayings.web.app/red-escape.html)
- [CATEGORY RAGDOLL57](https://studyquests.github.io/category-ragdoll57.html)
- [ITALIAN BRAINROT JIGSAW](https://quizverses.github.io/italian-brainrot-jigsaw.html)
- [SUMMER CONNECT](https://iskillquest.pages.dev/summer-connect.html)
- [STICKMAN PRISON ESCAPE](https://studyplayings.pages.dev/stickman-prison-escape.html)
- [CATEGORY MOBILE2 095](https://iskillquest.pages.dev/category-mobile2-095.html)
- [MY HORSE IS AMAZING](https://themindzone.pages.dev/my-horse-is-amazing.html)
- [CATEGORY MOUSE1 697](https://themindzone.pages.dev/category-mouse1-697.html)
- [1010 ELIXIR ALCHEMY](https://quizverses.github.io/1010-elixir-alchemy.html)
- [COLLEGE GIRL COLORING DRESS UP](https://theskillquest.pages.dev/college-girl-coloring-dress-up.html)
- [SUPER DOG HERO DASH](https://themindzone.pages.dev/super-dog-hero-dash.html)
- [CATEGORY SOCCER](https://learnquester.pages.dev/category-soccer.html)
- [MOJICON GARDEN CONNECT](https://quizverses.github.io/mojicon-garden-connect.html)
- [COOKIE LAND](https://learnquesters.pages.dev/cookie-land.html)
- [CATEGORY HORROR90](https://themindzone.pages.dev/category-horror90.html)
- [QUIZ SQUID ROUND](https://iskillquest.pages.dev/quiz-squid-round.html)
- [FASHION WORLD SIMULATOR](https://thelearnquester.web.app/fashion-world-simulator.html)
- [TOY CARS 3D RACING](https://learnquesters.pages.dev/toy-cars-3d-racing.html)
- [SLOPE EMOJI 2](https://themindzone.pages.dev/slope-emoji-2.html)
- [INDEX16](https://studyquests.github.io/index16.html)
- [HEXA TAP AWAY](https://quizverses.github.io/hexa-tap-away.html)
- [DINOSAURS VS ASTEROIDS](https://thelearnquesters.pages.dev/dinosaurs-vs-asteroids.html)
- [RAGDOLL BEAT SIMULATOR](https://studyquests.pages.dev/ragdoll-beat-simulator.html)
- [WE WILL NOT SURVIVE](https://quizverses.github.io/we-will-not-survive.html)
- [COUNTRYSIDE TRUCK DRIVE](https://studyquesthub.web.app/countryside-truck-drive.html)
- [U SHAPE PUZZLE](https://studyquests.pages.dev/u-shape-puzzle.html)
- [FIND GOODS](https://theskillquest.pages.dev/find-goods.html)
- [KITTEN NEVER DIES](https://iskillquest.pages.dev/kitten-never-dies.html)
- [BUTTERFLY KYODAI RAINBOW](https://iskillquest.pages.dev/butterfly-kyodai-rainbow.html)
- [IDLE PINBALL MERGE CLICKER](https://themindzone.pages.dev/idle-pinball-merge-clicker.html)
- [CATEGORY AIRPLANE29](https://thelearnquesters.pages.dev/category-airplane29.html)
- [SHAPE TRANSFORM RACE](https://studyquesthub.web.app/shape-transform-race.html)
- [HOPNOVA](https://learnquesters.pages.dev/hopnova.html)
- [CATEGORY AVOID](https://studyquests.github.io/category-avoid.html)
- [SMARTLE](https://quizverses.github.io/smartle.html)
- [PAPAS BURGER COOK](https://studyquesthub.web.app/papas-burger-cook.html)
- [SNIPER MASTER](https://quizverses.github.io/sniper-master.html)
