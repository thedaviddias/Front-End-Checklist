import {
  type McpServer,
  ResourceNotFoundError,
  ResourceTemplate
} from '@modelcontextprotocol/server'
import type { CuratedChecklist, Rule } from '@repo/types'
import type { ToolResultPayload } from './server-tools'
import { executeGetRule, executeGetWorkflow } from './tools'

/**
 * Build a stable MCP resource URI for a rule.
 *
 * @param slug - Rule slug.
 * @returns Rule resource URI.
 */
function buildRuleResourceUri(slug: string): string {
  return `frontendchecklist://rules/${slug}`
}

/**
 * Build a stable MCP resource URI for a checklist.
 *
 * @param slug - Checklist slug.
 * @returns Checklist resource URI.
 */
function buildChecklistResourceUri(slug: string): string {
  return `frontendchecklist://checklists/${slug}`
}

/**
 * Format a rule payload as markdown resource content.
 *
 * @param rule - Tool payload for a rule.
 * @returns Markdown resource body.
 */
function formatRuleResource(rule: ToolResultPayload): string {
  const data = rule as Record<string, unknown>
  const sourceSummary =
    typeof data.sourceSummary === 'object' && data.sourceSummary !== null
      ? (data.sourceSummary as Record<string, unknown>)
      : null
  const lines = [
    `# ${String(data.title || '')}`,
    '',
    `- Slug: ${String(data.slug || '')}`,
    `- Priority: ${String(data.priority || '')}`,
    `- Categories: ${Array.isArray(data.categories) ? data.categories.join(', ') : ''}`,
    ...(typeof data.url === 'string' ? [`- URL: ${data.url}`] : []),
    ...(sourceSummary
      ? [
          `- Sources: ${String(sourceSummary.sourceCount ?? '')}`,
          `- Primary sources: ${String(sourceSummary.primarySourceCount ?? '')}`,
          `- Source roles: ${String(sourceSummary.sourceRoleCount ?? '')}`
        ]
      : []),
    '',
    typeof data.description === 'string' ? data.description : '',
    '',
    typeof data.content === 'string' ? data.content : ''
  ]

  return lines.filter(Boolean).join('\n')
}

/**
 * Format a checklist and workflow payload as markdown resource content.
 *
 * @param checklist - Checklist metadata.
 * @param workflow - Optional workflow payload.
 * @returns Markdown resource body.
 */
function formatChecklistResource(
  checklist: CuratedChecklist,
  workflow: ToolResultPayload | null
): string {
  const workflowData = workflow as Record<string, unknown> | null
  const steps = Array.isArray(workflowData?.steps)
    ? workflowData.steps
        .map(step => {
          const item = step as Record<string, unknown>
          return `1. ${String(item.title || item.slug || '')} (${String(item.slug || '')})`
        })
        .join('\n')
    : checklist.rules.map(ruleRef => `1. ${ruleRef}`).join('\n')

  return [
    `# ${checklist.title}`,
    '',
    checklist.description,
    '',
    `- Slug: ${checklist.slug}`,
    `- Rules: ${checklist.rules.length}`,
    ...(checklist.estimatedTime ? [`- Estimated time: ${checklist.estimatedTime}`] : []),
    ...(checklist.difficulty ? [`- Difficulty: ${checklist.difficulty}`] : []),
    '',
    '## Ordered Rules',
    '',
    steps
  ]
    .filter(Boolean)
    .join('\n')
}

/**
 * Register rule and checklist resources on the MCP server.
 *
 * @param server - MCP server instance.
 * @param getRules - Rule loader callback.
 * @param getChecklists - Checklist loader callback.
 * @param ruleTemplateUri - Rule resource template URI.
 * @param checklistTemplateUri - Checklist resource template URI.
 */
export function registerResources(
  server: McpServer,
  getRules: () => Rule[] | Promise<Rule[]>,
  getChecklists: () => CuratedChecklist[],
  ruleTemplateUri: string,
  checklistTemplateUri: string
): void {
  const ruleResourceTemplate = new ResourceTemplate(ruleTemplateUri, {
    list: async () => {
      const rules = await Promise.resolve(getRules())
      return {
        resources: rules.map(rule => ({
          name: `rule-${rule.slug}`,
          title: rule.title,
          uri: buildRuleResourceUri(rule.slug),
          description: `${rule.content.slice(0, 160).replace(/\n/g, ' ').trim()}...`,
          mimeType: 'text/markdown'
        }))
      }
    },
    complete: {
      slug: async value => {
        const rules = await Promise.resolve(getRules())
        return rules
          .map(rule => rule.slug)
          .filter(slug => slug.startsWith(value))
          .slice(0, 25)
      }
    }
  })

  server.registerResource(
    'rule_resource',
    ruleResourceTemplate,
    {
      title: 'Front-End Checklist Rule',
      description: 'Read a single frontend rule as normalized markdown.',
      mimeType: 'text/markdown'
    },
    async (_uri, variables) => {
      const rules = await Promise.resolve(getRules())
      const slug = String(variables.slug || '')
      const output = executeGetRule({ slug, includeUrl: true }, rules)

      if (!output.success) {
        throw new ResourceNotFoundError(buildRuleResourceUri(slug), output.error.message)
      }

      return {
        contents: [
          {
            uri: buildRuleResourceUri(slug),
            text: formatRuleResource(output.rule as unknown as ToolResultPayload),
            mimeType: 'text/markdown'
          }
        ]
      }
    }
  )

  const checklistResourceTemplate = new ResourceTemplate(checklistTemplateUri, {
    list: async () => {
      const checklists = getChecklists()
      return {
        resources: checklists.map(checklist => ({
          name: `checklist-${checklist.slug}`,
          title: checklist.title,
          uri: buildChecklistResourceUri(checklist.slug),
          description: checklist.description,
          mimeType: 'text/markdown'
        }))
      }
    },
    complete: {
      slug: async value =>
        getChecklists()
          .map(checklist => checklist.slug)
          .filter(slug => slug.startsWith(value))
          .slice(0, 25)
    }
  })

  server.registerResource(
    'checklist_resource',
    checklistResourceTemplate,
    {
      title: 'Front-End Checklist Workflow',
      description: 'Read a curated checklist with ordered rule references.',
      mimeType: 'text/markdown'
    },
    async (_uri, variables) => {
      const slug = String(variables.slug || '')
      const checklists = getChecklists()
      const checklist = checklists.find(item => item.slug === slug)

      if (!checklist) {
        throw new ResourceNotFoundError(
          buildChecklistResourceUri(slug),
          `Unknown checklist: '${slug}'.`
        )
      }

      const workflow = executeGetWorkflow({ slug }, await Promise.resolve(getRules()), checklists)
      return {
        contents: [
          {
            uri: buildChecklistResourceUri(slug),
            text: formatChecklistResource(
              checklist,
              workflow.success ? (workflow.workflow as unknown as ToolResultPayload) : null
            ),
            mimeType: 'text/markdown'
          }
        ]
      }
    }
  )
}
