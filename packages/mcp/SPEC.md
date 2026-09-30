# Front-End Checklist MCP Server Specification

> **Package**: `@repo/mcp`
> **Route**: `/api/mcp`
> **Version**: 1.0.0
> **Status**: Draft

## Overview

An MCP (Model Context Protocol) server that exposes the Front-End Checklist rule corpus to AI agents. The server runs through the official TypeScript SDK, serves a remote HTTP endpoint from the web app, supports local stdio transport, and exposes tools, prompts, and read-only resources for rules and curated checklists.

### Design Principles

1. **Current scope** - 11 read-only tools covering discovery, workflows, audits, and rule guidance
2. **Explicit tool separation** - Separate `check_rule`, `fix_rule`, `explain_rule` tools for intentional AI actions
3. **Honest API** - Omit missing optional fields rather than defaulting
4. **Helpful errors** - Suggest alternatives when rules/categories not found
5. **Complement /llms.txt** - MCP for structured queries, existing endpoint for bulk context

---

## Architecture

### Data Flow

```
Content MDX Files
       ↓
content-collections (build-time compilation)
       ↓
Cached rule data (imported in API route)
       ↓
/api/mcp route (MCP protocol handler)
       ↓
AI Agent via MCP client
```

### Package Structure

```
packages/mcp/
├── src/
│   ├── index.ts              # Package entry, exports MCP handler
│   ├── server.ts             # MCP server setup and tool registration
│   ├── tools/
│   │   ├── get-rule.ts       # get_rule tool implementation
│   │   ├── search-rules.ts   # search_rules tool implementation
│   │   ├── check-rule.ts     # check_rule tool implementation
│   │   ├── fix-rule.ts       # fix_rule tool implementation
│   │   ├── explain-rule.ts   # explain_rule tool implementation
│   │   └── list-categories.ts# list_categories tool implementation
│   ├── utils/
│   │   ├── fuzzy-match.ts    # Levenshtein distance for suggestions
│   │   ├── mdx-to-markdown.ts# Strip MDX components, preserve markdown
│   │   └── pagination.ts     # Cursor-based pagination helpers
│   └── types.ts              # MCP-specific type definitions
├── tests/
│   └── integration/          # MCP client simulation tests
├── package.json
└── tsconfig.json
```

### Next.js Integration

```
apps/web/app/api/mcp/route.ts
```

The route imports the MCP handler from `@repo/mcp` and exposes it as a POST endpoint.

---

## Design Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Runtime | MCP SDK + Next.js route | Shared SDK-backed implementation across HTTP and stdio |
| Prompt surface | Tools + prompts + resources | Better client discoverability and reusable workflows |
| Relationships | Implicit via categories | No content changes needed |
| Content format | Markdown (strip MDX) | Readable, token-efficient |
| Missing fields | Omit, don't default | Honest API responses |
| Error handling | Suggest alternatives | Fuzzy matching for 404s |
| Pagination | Cursor-based | Future-proof |
| Auth | None (public) | Matches /llms.txt |
| Telemetry | Anonymous counters | Privacy-preserving |
| i18n | English only for v1 | Defer until translations exist |
| Tool naming | snake_case verbs | Standard MCP convention |
| Multi-value params | Arrays only | Type-safe JSON schema |
| Rule lookup | Slug only (strict) | No ambiguity |

---

## Tools Specification

### 1. `get_rule`

Retrieves a single rule by its slug.

**Parameters:**
| Name | Type | Required | Description |
|------|------|----------|-------------|
| `slug` | string | Yes | The rule's unique slug (e.g., "doctype", "alt-tags") |
| `includeUrl` | boolean | No | Include the rule's web URL in response (default: false) |

**Response:**
```typescript
{
  slug: string
  title: string
  description: string
  categories: Category[]
  priority: Priority
  content: string           // Markdown (MDX components stripped)
  prompts: {
    check: string
    fix: string
    explain: string
  }
  url?: string              // Only if includeUrl=true
  // Optional fields (omitted if not present in source):
  difficulty?: "beginner" | "intermediate" | "advanced" | "expert"
  estimatedTime?: number    // Minutes
  subcategory?: string
}
```

**Error handling:**
- If slug not found, return empty result with `suggestions` array of similar slugs (Levenshtein distance <= 3)

**Example:**
```json
{
  "name": "get_rule",
  "arguments": {
    "slug": "alt-tags"
  }
}
```

**Tool Description:**
> Retrieves a single frontend development rule by its unique slug. Use this tool when you need the complete details of a specific rule including its content, prompts (check/fix/explain), and metadata. The rule content is returned as Markdown with code examples. If the slug doesn't exist, the response includes suggestions for similar rules.

---

### 2. `search_rules`

Searches rules by query string and/or filters. Returns summary objects.

**Parameters:**
| Name | Type | Required | Description |
|------|------|----------|-------------|
| `query` | string | No | Free-text search query |
| `categories` | Category[] | No | Filter by categories (array) |
| `priorities` | Priority[] | No | Filter by priorities (array) |
| `limit` | number | No | Max results to return (default: 20, max: 100) |
| `cursor` | string | No | Pagination cursor from previous response |

**Response:**
```typescript
{
  rules: Array<{
    slug: string
    title: string
    priority: Priority
    categories: Category[]
    primaryCategory: string
  }>
  nextCursor?: string       // Present if more results available
  totalCount: number        // Total matching rules
}
```

**Search scoring (weighted):**
- Title match: 10 points (starts with query: +5)
- Category match: 5 points
- Priority match: 3 points
- Content match: 1 point

**Example:**
```json
{
  "name": "search_rules",
  "arguments": {
    "categories": ["accessibility", "html"],
    "priorities": ["critical", "high"],
    "limit": 10
  }
}
```

**Tool Description:**
> Searches and filters frontend development rules. Use this tool to find rules by keyword, filter by category or priority, or browse all available rules. Returns summary information for each match - use get_rule to fetch full details for a specific rule.

---

### 3. `check_rule`

Returns the check prompt for a rule, optionally with code analysis.

**Parameters:**
| Name | Type | Required | Description |
|------|------|----------|-------------|
| `slug` | string | Yes | The rule's slug |
| `code` | string | No | Code snippet to analyze against the rule |

**Response (without code):**
```typescript
{
  slug: string
  title: string
  checkPrompt: string       // The "how to check" guidance
}
```

**Response (with code):**
```typescript
{
  slug: string
  title: string
  checkPrompt: string
  analysis: string          // AI-friendly analysis of code against rule
  fixPrompt?: string        // Included ONLY if issues detected
}
```

When code is provided, the tool applies the check prompt to analyze the code and returns structured analysis. The `fixPrompt` is conditionally included only when potential issues are found, enabling efficient fix workflows.

**Example:**
```json
{
  "name": "check_rule",
  "arguments": {
    "slug": "alt-tags",
    "code": "<img src=\"hero.jpg\">"
  }
}
```

**Tool Description:**
> Checks code against a specific frontend rule. Without code, returns the verification prompt to guide manual checking. With code, analyzes the snippet and reports compliance status. If issues are found, also includes the fix prompt for immediate remediation.

---

### 4. `fix_rule`

Returns the fix prompt for implementing or correcting a rule violation.

**Parameters:**
| Name | Type | Required | Description |
|------|------|----------|-------------|
| `slug` | string | Yes | The rule's slug |

**Response:**
```typescript
{
  slug: string
  title: string
  fixPrompt: string         // The "how to fix" guidance
  priority: Priority        // Context for urgency
}
```

**Example:**
```json
{
  "name": "fix_rule",
  "arguments": {
    "slug": "doctype"
  }
}
```

**Tool Description:**
> Retrieves the fix/implementation prompt for a specific rule. Use this tool when you know what rule needs to be implemented or fixed and want detailed guidance on how to do it correctly. The priority is included to help prioritize fixes.

---

### 5. `explain_rule`

Returns the educational explanation for a rule.

**Parameters:**
| Name | Type | Required | Description |
|------|------|----------|-------------|
| `slug` | string | Yes | The rule's slug |

**Response:**
```typescript
{
  slug: string
  title: string
  explainPrompt: string     // Educational explanation
  categories: Category[]    // Context for related learning
}
```

**Example:**
```json
{
  "name": "explain_rule",
  "arguments": {
    "slug": "semantic-html"
  }
}
```

**Tool Description:**
> Retrieves the educational explanation for a frontend rule. Use this tool when you need to teach or explain why a rule matters, its background, and its impact on web development. Categories are included to help connect related concepts.

---

### 6. `list_categories`

Returns all available categories with metadata.

**Parameters:** None

**Response:**
```typescript
{
  categories: Array<{
    name: Category
    displayName: string     // Human-readable name
    description: string     // Brief description
    ruleCount: number       // Number of rules in category
    icon: string            // Lucide icon name
  }>
}
```

**Example Response:**
```json
{
  "categories": [
    {
      "name": "accessibility",
      "displayName": "Accessibility",
      "description": "Rules for making web content accessible to all users",
      "ruleCount": 32,
      "icon": "accessibility"
    },
    {
      "name": "html",
      "displayName": "HTML",
      "description": "Semantic markup and document structure rules",
      "ruleCount": 30,
      "icon": "code"
    }
  ]
}
```

**Tool Description:**
> Lists all available rule categories with their rule counts. Use this tool to discover what categories exist, understand the scope of each category, and plan which areas to focus on for code review or learning.

---

## Error Handling

### Rule Not Found

When a requested rule doesn't exist:

```typescript
{
  error: null,              // Not a fatal error
  result: null,             // No rule found
  suggestions: [            // Similar rules based on fuzzy matching
    { slug: "alt-tags", title: "Alternative Text for Images", similarity: 0.85 },
    { slug: "alt-attributes", title: "Alt Attributes on Media", similarity: 0.72 }
  ],
  message: "Rule 'alt-tag' not found. Did you mean one of these?"
}
```

### Invalid Category

When filtering by non-existent category:

```typescript
{
  error: null,
  result: { rules: [], totalCount: 0 },
  suggestions: ["accessibility", "html"],  // Valid categories
  message: "Category 'a11y' not found. Valid categories: accessibility, html, css, ..."
}
```

### Fuzzy Matching Algorithm

Uses Levenshtein distance for typo tolerance:
- Maximum edit distance: 3
- Minimum similarity threshold: 0.6
- Returns top 3-5 suggestions sorted by similarity

---

## Pagination

Cursor-based pagination for scalability:

```typescript
// First request
{ "name": "search_rules", "arguments": { "limit": 20 } }

// Response
{
  "rules": [...],
  "nextCursor": "eyJvZmZzZXQiOjIwfQ==",  // Base64 encoded cursor
  "totalCount": 116
}

// Next page
{ "name": "search_rules", "arguments": { "limit": 20, "cursor": "eyJvZmZzZXQiOjIwfQ==" } }
```

Cursor encodes offset position. Stable across requests for the same content version.

---

## Content Transformation

### MDX to Markdown

Rules are stored as MDX with custom components. The MCP server strips MDX-specific syntax:

**Source MDX:**
```mdx
<CodeExample language="html">
  <img src="hero.jpg" alt="Hero image">
</CodeExample>

<Warning>
  Don't forget alt attributes!
</Warning>
```

**Returned Markdown:**
````markdown
```html
<img src="hero.jpg" alt="Hero image">
```

> **Warning:** Don't forget alt attributes!
````

### Transformation Rules

| MDX Component | Markdown Output |
|---------------|-----------------|
| `<CodeExample>` | Fenced code block with language hint |
| `<Warning>` | Blockquote with bold "Warning:" prefix |
| `<Tip>` | Blockquote with bold "Tip:" prefix |
| `<ErrorBox>` | Blockquote with bold "Error:" prefix |
| `<Success>` | Blockquote with bold "Best Practice:" prefix |
| `<Exceptions>` | Bulleted list with "Exceptions:" header |
| `<CodeTabs>` | Sequential code blocks with framework labels |

---

## Caching Strategy

### Content-Collections Cache

The MCP server imports rules from content-collections, which compiles MDX at build time:

```typescript
import { allRules } from 'content-collections'
```

Rules are available immediately without runtime parsing.

### Cache Invalidation

- Rebuild triggers content-collections recompilation
- Next.js ISR can be configured for dynamic invalidation
- Future: Admin endpoint to trigger rebuild

---

## Telemetry

Anonymous usage counters for understanding tool adoption:

```typescript
{
  toolName: "check_rule",
  timestamp: "2025-01-11T...",
  // No parameters logged, no code content
}
```

Counters stored in-memory, aggregated daily. No PII collected.

---

## Testing Strategy

### Integration Tests

Simulate MCP client requests to the full handler:

```typescript
describe('MCP Server', () => {
  it('get_rule returns rule with markdown content', async () => {
    const response = await mcpHandler({
      method: 'tools/call',
      params: {
        name: 'get_rule',
        arguments: { slug: 'doctype' }
      }
    })

    expect(response.content[0].text).toContain('Doctype')
    expect(response.content[0].text).toContain('```html')
  })

  it('search_rules returns paginated results', async () => {
    const response = await mcpHandler({
      method: 'tools/call',
      params: {
        name: 'search_rules',
        arguments: { categories: ['html'], limit: 5 }
      }
    })

    expect(response.content[0].text).toMatch(/totalCount.*30/)
    expect(response.content[0].text).toMatch(/nextCursor/)
  })

  it('get_rule suggests alternatives for typos', async () => {
    const response = await mcpHandler({
      method: 'tools/call',
      params: {
        name: 'get_rule',
        arguments: { slug: 'alt-tag' } // Typo: missing 's'
      }
    })

    expect(response.content[0].text).toContain('suggestions')
    expect(response.content[0].text).toContain('alt-tags')
  })
})
```

### Test Fixtures

Use subset of real rules for consistent testing:
- 10 rules across 3 categories
- Known slugs for exact matching tests
- Edge cases (missing optional fields, long content)

---

## API Reference

### MCP Protocol

The server is built on `@modelcontextprotocol/server` v2 and is stateless on every protocol revision:
- **2026-07-28** (current): clients negotiate with `server/discover`; each request carries its protocol version and client info in `_meta`, plus the `MCP-Protocol-Version`, `Mcp-Method` and `Mcp-Name` headers. List and read results include `ttlMs`/`cacheScope` (1 hour, public).
- **2025-11-25 and earlier** (2025-06-18, 2025-03-26, 2024-11-05): clients negotiate with `initialize` as before.
- Transport: Streamable HTTP, `POST` to `/api/mcp` (`mcp.frontendchecklist.io`), JSON responses, no sessions. Local stdio via `serveStdio`.
- Content-Type: `application/json`
- Methods: `tools/list`, `tools/call`, `prompts/list`, `prompts/get`, `resources/list`, `resources/templates/list`, `resources/read`, `completion/complete`
- Unknown resources return a JSON-RPC resource-not-found error.

### Request Format

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "get_rule",
    "arguments": {
      "slug": "doctype"
    }
  }
}
```

### Response Format

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "content": [
      {
        "type": "text",
        "text": "{\"slug\":\"doctype\",\"title\":\"Doctype\",...}"
      }
    ]
  }
}
```

---

## Type Definitions

```typescript
type Category =
  | 'html' | 'css' | 'javascript' | 'performance'
  | 'accessibility' | 'seo' | 'security'
  | 'images' | 'testing' | 'general'

type Priority = 'critical' | 'high' | 'medium' | 'low'

interface RuleSummary {
  slug: string
  title: string
  priority: Priority
  categories: Category[]
  primaryCategory: string
}

interface Rule extends RuleSummary {
  description: string
  content: string
  prompts: RulePrompts
  url?: string
  difficulty?: Difficulty
  estimatedTime?: number
  subcategory?: string
}

interface RulePrompts {
  check: string
  fix: string
  explain: string
}

interface SearchResult {
  rules: RuleSummary[]
  nextCursor?: string
  totalCount: number
}

interface CategoryInfo {
  name: Category
  displayName: string
  description: string
  ruleCount: number
  icon: string
}

interface SuggestionResult {
  slug: string
  title: string
  similarity: number
}
```

---

## Future Considerations

### Additional Tools
- `get_statistics` - Aggregate counts by category/priority
- `get_checklist` - Return curated checklist with rules
- `check_category` - Batch check code against all rules in a category
- `refresh_cache` - Explicit cache invalidation

### Internationalization
- Add `language` parameter when translations are available
- Default to English, error on unsupported languages

### Enhanced Analysis
- Code snippet parsing for better analysis
- Framework detection (React, Vue, etc.)
- Severity scoring for violations

---

## References

- [MCP Protocol Specification](https://spec.modelcontextprotocol.io/)
- [Front-End Checklist Rules SPEC.md](../../SPEC.md)
- [Content Collections Documentation](https://www.content-collections.dev/)

---

*Last updated: January 2025*
