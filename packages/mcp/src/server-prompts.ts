import { completable, type McpServer } from '@modelcontextprotocol/server'
import type { CuratedChecklist, Rule } from '@repo/types'
import * as z from 'zod'

const MAX_COMPLETIONS = 25

/**
 * Register prompt templates on the MCP server.
 *
 * @param server - MCP server instance.
 * @param getRules - Rule loader callback, used for slug completion.
 * @param getChecklists - Checklist loader callback.
 */
export function registerPrompts(
  server: McpServer,
  getRules: () => Rule[] | Promise<Rule[]>,
  getChecklists: () => CuratedChecklist[]
): void {
  /**
   * Build a rule-slug argument schema that autocompletes from the rule corpus.
   *
   * @returns Completable string schema for a rule slug.
   */
  const ruleSlug = () =>
    completable(z.string().describe('Rule slug, e.g. "doctype"'), async value =>
      (await Promise.resolve(getRules()))
        .map(rule => rule.slug)
        .filter(slug => slug.startsWith(value))
        .slice(0, MAX_COMPLETIONS)
    )

  server.registerPrompt(
    'review_code_prompt',
    {
      title: 'Review Frontend Code',
      description: 'Guide the model to review provided frontend code with the review_code tool.',
      argsSchema: z.object({
        code: z.string().optional(),
        focus: z.array(z.string()).optional(),
        minPriority: z.enum(['critical', 'high', 'medium', 'low']).optional()
      })
    },
    async ({ code, focus, minPriority }) => ({
      messages: [
        {
          role: 'user',
          content: {
            type: 'text',
            text: [
              'Review the frontend code using the `review_code` tool.',
              '`review_code` is a conservative static heuristic pass; zero issues means no provable static issue was found, not that the implementation is automatically clean.',
              ...(code
                ? [`Code:\n${code}`]
                : ['If I provide code next, pass it to `review_code`.']),
              ...(focus && focus.length > 0 ? [`Focus categories: ${focus.join(', ')}`] : []),
              ...(minPriority ? [`Minimum priority: ${minPriority}`] : []),
              'Summarize issues by priority. If there are no issues, follow `review_code` suggestions with `search_rules` or `get_rule` before concluding clean. Call `fix_rule` only when remediation detail is needed.'
            ].join('\n\n')
          }
        }
      ]
    })
  )

  server.registerPrompt(
    'explain_rule_prompt',
    {
      title: 'Explain a Frontend Rule',
      description: 'Guide the model to explain why a frontend rule matters.',
      argsSchema: z.object({
        slug: ruleSlug()
      })
    },
    async ({ slug }) => ({
      messages: [
        {
          role: 'user',
          content: {
            type: 'text',
            text: `Use the \`explain_rule\` tool for the rule slug \`${slug}\`, then explain the rule in plain language with practical implications.`
          }
        }
      ]
    })
  )

  server.registerPrompt(
    'fix_rule_prompt',
    {
      title: 'Fix a Rule Violation',
      description: 'Guide the model to retrieve remediation guidance for a specific rule.',
      argsSchema: z.object({
        slug: ruleSlug(),
        codeSnippet: z.string().optional()
      })
    },
    async ({ slug, codeSnippet }) => ({
      messages: [
        {
          role: 'user',
          content: {
            type: 'text',
            text: [
              `Use the \`fix_rule\` tool for the rule slug \`${slug}\`.`,
              ...(codeSnippet ? [`Provide this code snippet as context:\n${codeSnippet}`] : []),
              'Return concrete remediation steps and highlight any caveats.'
            ].join('\n\n')
          }
        }
      ]
    })
  )

  server.registerPrompt(
    'audit_url_prompt',
    {
      title: 'Audit a Live URL',
      description: 'Guide the model to audit a live website using the audit_url tool.',
      argsSchema: z.object({
        url: z.string(),
        focus: z.array(z.string()).optional(),
        minPriority: z.enum(['critical', 'high', 'medium', 'low']).optional()
      })
    },
    async ({ url, focus, minPriority }) => ({
      messages: [
        {
          role: 'user',
          content: {
            type: 'text',
            text: [
              `Audit the site \`${url}\` with the \`audit_url\` tool.`,
              ...(focus && focus.length > 0 ? [`Focus categories: ${focus.join(', ')}`] : []),
              ...(minPriority ? [`Minimum priority: ${minPriority}`] : []),
              'Summarize the highest-severity findings first and cite the affected rule slugs.'
            ].join('\n\n')
          }
        }
      ]
    })
  )

  server.registerPrompt(
    'workflow_prompt',
    {
      title: 'Run a Checklist Workflow',
      description: 'Guide the model through a curated frontend checklist workflow.',
      argsSchema: z.object({
        checklist: completable(
          z.string().describe(
            `Available: ${getChecklists()
              .map(item => item.slug)
              .join(', ')}`
          ),
          value =>
            getChecklists()
              .map(item => item.slug)
              .filter(slug => slug.startsWith(value))
              .slice(0, MAX_COMPLETIONS)
        )
      })
    },
    async ({ checklist }) => ({
      messages: [
        {
          role: 'user',
          content: {
            type: 'text',
            text: [
              `Use the \`get_workflow\` tool for the checklist slug \`${checklist}\`.`,
              'Then walk through the ordered steps, and fetch rule details or checklist resources when more context is needed.'
            ].join('\n\n')
          }
        }
      ]
    })
  )
}
