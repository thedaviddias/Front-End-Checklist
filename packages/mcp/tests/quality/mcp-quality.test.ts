import type { CuratedChecklist, Rule } from '@repo/types'
import { retrievalMetrics } from '../../scripts/retrieval-metrics'
import { getToolDefinitions } from '../../src/server-tools'
import { executeReviewCode, executeSearchRules, type ReviewCodeInput } from '../../src/tools'
import { ACCESSIBILITY, HTML, IMAGES, JAVASCRIPT, loadRulesFromMdx, SECURITY } from './rule-loader'

interface RetrievalCase {
  query: string
  expectedSlugs: string[]
}

interface ReviewEvalCase {
  name: string
  input: ReviewCodeInput
  expectPresent?: string[]
  expectAbsent?: string[]
}

interface ImprovementScenario {
  name: string
  before: ReviewCodeInput
  after: ReviewCodeInput
  expectedFixedRules: string[]
}

interface QualityReport {
  retrieval: {
    cases: number
    hitRateAtFive: number
    recallAtFive: number
    meanReciprocalRank: number
  }
  reviewCode: {
    truePositives: number
    falseNegatives: number
    falsePositives: number
    trueNegatives: number
    precision: number
    recall: number
    falsePositiveRate: number
  }
  improvementImpact: {
    scenarios: number
    defectDetectionRate: number
    verificationClearRate: number
    guidanceRate: number
    missedRules: string[]
  }
  toolContracts: {
    toolsChecked: number
  }
}

const CHECKLIST: CuratedChecklist = {
  id: 'mcp-quality-eval',
  slug: 'mcp-quality-eval',
  title: 'MCP Quality Eval',
  description: 'Small checklist fixture used to expose checklist-backed tools.',
  icon: 'check',
  rules: ['html/doctype', 'accessibility/alt-text', 'seo/canonical-url'],
  language: 'en',
  url: '/checklists/mcp-quality-eval'
}

const RETRIEVAL_CASES: RetrievalCase[] = [
  {
    query: 'image alt text accessibility',
    expectedSlugs: ['alt-text', 'decorative-elements']
  },
  {
    query: 'canonical duplicate url seo',
    expectedSlugs: ['canonical-url', 'canonical-chain', 'canonical-header']
  },
  {
    query: 'dangerous eval javascript security',
    expectedSlugs: ['avoid-eval']
  },
  {
    query: 'reduced motion animation accessibility',
    expectedSlugs: ['reduced-motion', 'animated-content']
  },
  {
    query: 'content security policy header',
    expectedSlugs: ['content-security-policy']
  },
  {
    query: 'lazy loading images performance',
    expectedSlugs: ['lazy-loading']
  },
  {
    query: 'button accessible name',
    expectedSlugs: ['button-name']
  },
  {
    query: 'hreflang localized pages seo',
    expectedSlugs: ['hreflang']
  }
]

const REVIEW_EVAL_CASES: ReviewEvalCase[] = [
  {
    name: 'document missing doctype',
    input: {
      code: '<html lang="en"><head><title>Example</title></head><body></body></html>',
      focus: HTML,
      minPriority: 'low'
    },
    expectPresent: ['doctype']
  },
  {
    name: 'missing image alt text',
    input: {
      code: '<main><img src="/hero.jpg"></main>',
      focus: IMAGES,
      minPriority: 'low'
    },
    expectPresent: ['alt-text']
  },
  {
    name: 'decorative image with empty alt text',
    input: {
      code: '<main><img src="/divider.svg" alt=""></main>',
      focus: IMAGES,
      minPriority: 'low'
    },
    expectAbsent: ['alt-text']
  },
  {
    name: 'image without intrinsic dimensions',
    input: {
      code: '<img src="/gallery.jpg" alt="Gallery preview">',
      focus: IMAGES,
      minPriority: 'low'
    },
    expectPresent: ['dimensions']
  },
  {
    name: 'image with intrinsic dimensions',
    input: {
      code: '<img src="/gallery.jpg" alt="Gallery preview" width="640" height="360">',
      focus: IMAGES,
      minPriority: 'low'
    },
    expectAbsent: ['dimensions']
  },
  {
    name: 'empty button accessible name',
    input: {
      code: '<button type="button"><svg aria-hidden="true"></svg></button>',
      focus: ACCESSIBILITY,
      minPriority: 'low'
    },
    expectPresent: ['button-name']
  },
  {
    name: 'button with aria-label accessible name',
    input: {
      code: '<button type="button" aria-label="Close"><svg aria-hidden="true"></svg></button>',
      focus: ACCESSIBILITY,
      minPriority: 'low'
    },
    expectAbsent: ['button-name']
  },
  {
    name: 'eval usage in JavaScript',
    input: {
      code: 'const result = eval(userInput)',
      focus: JAVASCRIPT,
      minPriority: 'low'
    },
    expectPresent: ['avoid-eval']
  },
  {
    name: 'safe string containing eval call text',
    input: {
      code: 'const label = "eval(userInput)"',
      focus: JAVASCRIPT,
      minPriority: 'low'
    },
    expectAbsent: ['avoid-eval']
  },
  {
    name: 'comment containing eval call text',
    input: {
      code: '// eval(userInput) is unsafe\nconst value = Number(userInput)',
      focus: JAVASCRIPT,
      minPriority: 'low'
    },
    expectAbsent: ['avoid-eval']
  },
  {
    name: 'indirect eval call',
    input: {
      code: 'const value = (0, eval)(userInput)',
      focus: JAVASCRIPT,
      minPriority: 'low'
    },
    expectPresent: ['avoid-eval']
  },
  {
    name: 'mixed content asset',
    input: {
      code: '<main data-origin="https://example.com"><img src="http://cdn.example.com/photo.jpg" alt="Photo"></main>',
      focus: SECURITY,
      minPriority: 'low'
    },
    expectPresent: ['mixed-content']
  },
  {
    name: 'secure asset URL',
    input: {
      code: '<img src="https://cdn.example.com/photo.jpg" alt="Photo">',
      focus: SECURITY,
      minPriority: 'low'
    },
    expectAbsent: ['mixed-content']
  },
  {
    name: 'viewport disables zoom',
    input: {
      code: '<meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no">',
      focus: ACCESSIBILITY,
      minPriority: 'low'
    },
    expectPresent: ['viewport-zoom']
  },
  {
    name: 'viewport allows zoom',
    input: {
      code: '<meta name="viewport" content="width=device-width, initial-scale=1">',
      focus: ACCESSIBILITY,
      minPriority: 'low'
    },
    expectAbsent: ['viewport-zoom']
  }
]

const IMPROVEMENT_SCENARIOS: ImprovementScenario[] = [
  {
    name: 'image markup improvement',
    before: {
      code: '<img src="/hero.jpg">',
      focus: IMAGES,
      minPriority: 'low'
    },
    after: {
      code: '<img src="/hero.jpg" alt="Dashboard preview" width="1200" height="630">',
      focus: IMAGES,
      minPriority: 'low'
    },
    expectedFixedRules: ['alt-text', 'dimensions']
  },
  {
    name: 'icon button accessibility improvement',
    before: {
      code: '<button type="button"><svg aria-hidden="true"></svg></button>',
      focus: ACCESSIBILITY,
      minPriority: 'low'
    },
    after: {
      code: '<button type="button" aria-label="Close"><svg aria-hidden="true"></svg></button>',
      focus: ACCESSIBILITY,
      minPriority: 'low'
    },
    expectedFixedRules: ['button-name']
  },
  {
    name: 'unsafe JavaScript improvement',
    before: {
      code: 'const result = eval(userInput)',
      focus: JAVASCRIPT,
      minPriority: 'low'
    },
    after: {
      code: 'const result = parseAllowedExpression(userInput)',
      focus: JAVASCRIPT,
      minPriority: 'low'
    },
    expectedFixedRules: ['avoid-eval']
  },
  {
    name: 'new-tab link hardening improvement',
    before: {
      code: '<a href="https://example.com" target="_blank">Documentation</a>',
      focus: SECURITY,
      minPriority: 'low'
    },
    after: {
      code: '<a href="https://example.com" target="_blank" rel="noopener noreferrer">Documentation</a>',
      focus: SECURITY,
      minPriority: 'low'
    },
    expectedFixedRules: ['new-tab']
  },
  {
    name: 'viewport zoom accessibility improvement',
    before: {
      code: '<meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no">',
      focus: ACCESSIBILITY,
      minPriority: 'low'
    },
    after: {
      code: '<meta name="viewport" content="width=device-width, initial-scale=1">',
      focus: ACCESSIBILITY,
      minPriority: 'low'
    },
    expectedFixedRules: ['viewport-zoom']
  }
]

function calculateRetrievalMetrics(rules: Rule[]): QualityReport['retrieval'] {
  const metrics = RETRIEVAL_CASES.map(evalCase => {
    const result = executeSearchRules({ query: evalCase.query, limit: 10 }, rules)
    return retrievalMetrics(
      result.rules.map(rule => rule.slug),
      evalCase.expectedSlugs
    )
  })
  return {
    cases: metrics.length,
    hitRateAtFive: metrics.reduce((sum, metric) => sum + metric.hit, 0) / metrics.length,
    recallAtFive: metrics.reduce((sum, metric) => sum + metric.recall, 0) / metrics.length,
    meanReciprocalRank:
      metrics.reduce((sum, metric) => sum + metric.reciprocalRank, 0) / metrics.length
  }
}

function calculateReviewMetrics(rules: Rule[]): QualityReport['reviewCode'] {
  let truePositives = 0
  let falseNegatives = 0
  let falsePositives = 0
  let trueNegatives = 0

  for (const evalCase of REVIEW_EVAL_CASES) {
    const result = executeReviewCode(evalCase.input, rules)
    const detectedSlugs = new Set(result.issues.map(issue => issue.rule))

    for (const expectedSlug of evalCase.expectPresent ?? []) {
      if (detectedSlugs.has(expectedSlug)) {
        truePositives += 1
      } else {
        falseNegatives += 1
      }
    }

    for (const forbiddenSlug of evalCase.expectAbsent ?? []) {
      if (detectedSlugs.has(forbiddenSlug)) {
        falsePositives += 1
      } else {
        trueNegatives += 1
      }
    }
  }

  return {
    truePositives,
    falseNegatives,
    falsePositives,
    trueNegatives,
    precision: truePositives / Math.max(truePositives + falsePositives, 1),
    recall: truePositives / Math.max(truePositives + falseNegatives, 1),
    falsePositiveRate: falsePositives / Math.max(falsePositives + trueNegatives, 1)
  }
}

function calculateImprovementImpact(rules: Rule[]): QualityReport['improvementImpact'] {
  let expectedDefects = 0
  let detectedDefects = 0
  let clearedDefects = 0
  let guidedDefects = 0
  const missedRules: string[] = []

  for (const scenario of IMPROVEMENT_SCENARIOS) {
    const beforeIssues = executeReviewCode(scenario.before, rules).issues
    const afterIssues = executeReviewCode(scenario.after, rules).issues
    const beforeIssueMap = new Map(beforeIssues.map(issue => [issue.rule, issue]))
    const afterIssueSlugs = new Set(afterIssues.map(issue => issue.rule))

    for (const expectedRule of scenario.expectedFixedRules) {
      expectedDefects += 1

      const beforeIssue = beforeIssueMap.get(expectedRule)
      if (beforeIssue) {
        detectedDefects += 1

        if ((beforeIssue.issue.length >= 20 || beforeIssue.fixPrompt) && beforeIssue.title) {
          guidedDefects += 1
        }
      } else {
        missedRules.push(`${scenario.name}: ${expectedRule}`)
      }

      if (!afterIssueSlugs.has(expectedRule)) {
        clearedDefects += 1
      }
    }
  }

  return {
    scenarios: IMPROVEMENT_SCENARIOS.length,
    defectDetectionRate: detectedDefects / Math.max(expectedDefects, 1),
    verificationClearRate: clearedDefects / Math.max(expectedDefects, 1),
    guidanceRate: guidedDefects / Math.max(expectedDefects, 1),
    missedRules
  }
}

function formatPercent(value: number): string {
  return `${Math.round(value * 100)}%`
}

function buildQualityReport(rules: Rule[]): QualityReport {
  return {
    retrieval: calculateRetrievalMetrics(rules),
    reviewCode: calculateReviewMetrics(rules),
    improvementImpact: calculateImprovementImpact(rules),
    toolContracts: {
      toolsChecked: getToolDefinitions([CHECKLIST]).length
    }
  }
}

describe('MCP quality evaluation', () => {
  const rules = loadRulesFromMdx()

  it('meets retrieval quality thresholds for golden discovery queries', () => {
    const metrics = calculateRetrievalMetrics(rules)

    expect(metrics.hitRateAtFive).toBeGreaterThanOrEqual(0.8)
    expect(metrics.recallAtFive).toBeGreaterThanOrEqual(0.8)
    expect(metrics.meanReciprocalRank).toBeGreaterThanOrEqual(0.5)
  })

  it('meets review_code precision and recall thresholds on labeled fixtures', () => {
    const metrics = calculateReviewMetrics(rules)

    expect(metrics.precision).toBeGreaterThanOrEqual(0.9)
    expect(metrics.recall).toBeGreaterThanOrEqual(0.85)
    expect(metrics.falsePositiveRate).toBeLessThanOrEqual(0.1)
  })

  it('shows MCP guidance can identify and verify code improvements', () => {
    const metrics = calculateImprovementImpact(rules)

    expect(metrics.defectDetectionRate).toBeGreaterThanOrEqual(0.9)
    expect(metrics.verificationClearRate).toBeGreaterThanOrEqual(0.95)
    expect(metrics.guidanceRate).toBeGreaterThanOrEqual(0.9)
  })

  it('keeps exposed tool contracts agent-friendly', () => {
    const definitions = getToolDefinitions([CHECKLIST])
    const names = definitions.map(definition => definition.name)

    expect(new Set(names).size).toBe(definitions.length)
    expect(names).toEqual(
      expect.arrayContaining([
        'review_code',
        'audit_url',
        'get_workflow',
        'get_checklist_rules',
        'get_quick_reference',
        'get_rule',
        'search_rules',
        'check_rule',
        'fix_rule',
        'explain_rule',
        'list_categories'
      ])
    )

    for (const definition of definitions) {
      expect(definition.name).toMatch(/^[a-z]+(?:_[a-z]+)*$/)
      expect(definition.description.length).toBeGreaterThanOrEqual(80)
      expect(definition.inputSchema.type).toBe('object')
      expect(definition.outputSchema.type).toBe('object')
      expect(definition.annotations?.readOnlyHint).toBe(true)
      expect(definition.annotations?.destructiveHint).toBe(false)
      expect(definition.annotations?.idempotentHint).toBe(true)
    }
  })

  it('prints a compact report for pnpm mcp:evaluate', () => {
    const report = buildQualityReport(rules)

    console.log('\nMCP Quality Report')
    console.log(`  Tools checked: ${report.toolContracts.toolsChecked}`)
    console.log(
      `  Retrieval: Hit@5 ${formatPercent(report.retrieval.hitRateAtFive)}, Recall@5 ${formatPercent(report.retrieval.recallAtFive)}, MRR ${report.retrieval.meanReciprocalRank.toFixed(2)} across ${report.retrieval.cases} cases`
    )
    console.log(
      `  review_code: precision ${formatPercent(report.reviewCode.precision)}, recall ${formatPercent(report.reviewCode.recall)}, false-positive rate ${formatPercent(report.reviewCode.falsePositiveRate)}`
    )
    console.log(
      `  improvement impact: detects ${formatPercent(report.improvementImpact.defectDetectionRate)}, verifies fixes ${formatPercent(report.improvementImpact.verificationClearRate)}, guides ${formatPercent(report.improvementImpact.guidanceRate)} across ${report.improvementImpact.scenarios} scenarios`
    )
    if (report.improvementImpact.missedRules.length > 0) {
      console.log(`  missed improvement checks: ${report.improvementImpact.missedRules.join(', ')}`)
    }

    expect(report.toolContracts.toolsChecked).toBe(11)
  })
})
