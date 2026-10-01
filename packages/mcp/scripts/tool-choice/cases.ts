/**
 * Tool-choice eval cases.
 *
 * Each case is a single user turn and the set of tools a well-behaved agent may call
 * first. `expect: []` means no tool should be called (the agent should just answer),
 * which catches descriptions that make models over-trigger. Groups tag what a case
 * probes so the report can show where the tool surface is ambiguous.
 */

export type CaseGroup = 'clear' | 'confusable' | 'no-tool'

export interface ToolChoiceCase {
  id: string
  group: CaseGroup
  prompt: string
  /** Acceptable first tool calls; empty means the agent should not call any tool. */
  expect: string[]
}

/**
 * Tool names that cases expect but the server does not expose (a renamed tool).
 *
 * @param cases - Eval cases.
 * @param toolNames - Names the server exposes.
 * @returns Unknown names, deduplicated.
 */
export function unknownExpectedTools(cases: ToolChoiceCase[], toolNames: string[]): string[] {
  const known = new Set(toolNames)
  return [...new Set(cases.flatMap(testCase => testCase.expect))].filter(name => !known.has(name))
}

export const TOOL_CHOICE_CASES: ToolChoiceCase[] = [
  // Clear intent: one obviously right tool.
  {
    id: 'review-html-snippet',
    group: 'clear',
    prompt:
      'Can you review this markup before I ship it?\n<img src="hero.jpg"><div onclick="buy()">Buy</div>',
    expect: ['review_code']
  },
  {
    id: 'review-css',
    group: 'clear',
    prompt:
      "Here's my stylesheet, anything wrong with it?\n.btn { outline: none }\n.muted { color: #aaa; background: #fff }",
    expect: ['review_code']
  },
  {
    id: 'review-js',
    group: 'clear',
    prompt: "Is this script OK to ship?\ndocument.write('<p>hi</p>'); eval(userInput)",
    expect: ['review_code']
  },
  {
    id: 'audit-live-url',
    group: 'clear',
    prompt: 'Audit https://example.com for accessibility problems.',
    expect: ['audit_url']
  },
  {
    id: 'audit-url-performance',
    group: 'clear',
    prompt: 'How does https://vercel.com do on the Front-End Checklist? Focus on performance.',
    expect: ['audit_url']
  },
  {
    id: 'list-coverage',
    group: 'clear',
    prompt: 'What areas does the Front-End Checklist cover?',
    expect: ['list_categories']
  },
  {
    id: 'search-fonts',
    group: 'clear',
    prompt: 'What are the best practices for loading web fonts?',
    expect: ['search_rules']
  },
  {
    id: 'search-forms',
    group: 'clear',
    prompt: 'Which checklist rules apply to form inputs and labels?',
    expect: ['search_rules']
  },
  {
    id: 'search-lazy-loading',
    group: 'clear',
    prompt: 'Is there a checklist rule about lazy-loading images?',
    expect: ['search_rules']
  },
  {
    id: 'get-rule-by-slug',
    group: 'clear',
    prompt: 'Show me the full guidance for the alt-text rule, including code examples.',
    expect: ['get_rule']
  },
  {
    id: 'get-rule-csp',
    group: 'clear',
    prompt: 'What does the content-security-policy rule say?',
    expect: ['get_rule']
  },
  {
    id: 'launch-audit',
    group: 'clear',
    prompt:
      "We're launching our marketing site next week. Walk me through a structured pre-launch audit.",
    expect: ['get_workflow', 'get_checklist_rules']
  },
  {
    id: 'quick-reference-pr-template',
    group: 'clear',
    prompt:
      'Give me a short accessibility checklist I can paste into our PR template, critical items only.',
    expect: ['get_quick_reference']
  },

  // Confusable: sibling tools that overlap; the description has to disambiguate.
  {
    id: 'explain-vs-get',
    group: 'confusable',
    prompt: 'Why does the checklist insist on the doctype rule? It seems pointless.',
    expect: ['explain_rule']
  },
  {
    id: 'explain-unknown-slug',
    group: 'confusable',
    prompt: 'My designer says removing focus outlines is fine. Why does the checklist disagree?',
    expect: ['explain_rule', 'search_rules']
  },
  {
    id: 'fix-vs-get',
    group: 'confusable',
    prompt:
      'review_code flagged button-name on my icon button. How do I fix it?\n<button><svg></svg></button>',
    expect: ['fix_rule']
  },
  {
    id: 'fix-after-audit',
    group: 'confusable',
    prompt:
      'audit_url reported the meta-description rule failing on my homepage. What exactly should I add?',
    expect: ['fix_rule']
  },
  {
    id: 'check-vs-review',
    group: 'confusable',
    prompt: 'Check this snippet only against the alt-text rule: <img src="a.png">',
    expect: ['check_rule']
  },
  {
    id: 'check-fix-worked',
    group: 'confusable',
    prompt:
      'I added aria-label to my button. Does it satisfy the button-name rule now?\n<button aria-label="Close"><svg aria-hidden="true"></svg></button>',
    expect: ['check_rule']
  },
  {
    id: 'review-vs-audit-code-given',
    group: 'confusable',
    prompt:
      'Here\'s the HTML I copied from https://example.com, what\'s wrong with it?\n<html><body><img src="x.png"></body></html>',
    expect: ['review_code']
  },
  {
    id: 'audit-vs-review-no-source',
    group: 'confusable',
    prompt:
      "I don't have the source, but the site is live at https://example.org. Is it accessible?",
    expect: ['audit_url']
  },
  {
    id: 'quick-reference-vs-search',
    group: 'confusable',
    prompt: 'List the critical and high-priority SEO rules as a markdown checklist.',
    expect: ['get_quick_reference']
  },
  {
    id: 'workflow-vs-checklist-rules',
    group: 'confusable',
    prompt: 'Give me an ordered, step-by-step plan for the launch checklist.',
    expect: ['get_workflow']
  },
  {
    id: 'checklist-rules-vs-get-rule',
    group: 'confusable',
    prompt:
      'Fetch every rule in the launch-checklist with its fix prompts so I can audit against all of them at once.',
    expect: ['get_checklist_rules']
  },
  {
    id: 'category-counts',
    group: 'confusable',
    prompt: 'How many performance rules are in the checklist?',
    expect: ['list_categories', 'search_rules']
  },

  // No tool: general coding or chit-chat the checklist has nothing to add to.
  {
    id: 'no-tool-debounce',
    group: 'no-tool',
    prompt: 'Write a debounce function in TypeScript.',
    expect: []
  },
  {
    id: 'no-tool-let-const',
    group: 'no-tool',
    prompt: "What's the difference between let and const in JavaScript?",
    expect: []
  },
  {
    id: 'no-tool-arrow-function',
    group: 'no-tool',
    prompt: 'Convert this to arrow function syntax: function add(a, b) { return a + b }',
    expect: []
  },
  {
    id: 'no-tool-rename',
    group: 'no-tool',
    prompt: 'Rename the variable x to count in: let x = 0; x++',
    expect: []
  },
  {
    id: 'no-tool-thanks',
    group: 'no-tool',
    prompt: "Thanks, that's all for today!",
    expect: []
  },
  {
    id: 'no-tool-trivia',
    group: 'no-tool',
    prompt: 'What is the capital of Japan?',
    expect: []
  }
]
