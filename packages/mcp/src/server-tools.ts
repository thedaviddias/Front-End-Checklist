import { fromJsonSchema, type JsonSchemaType, type McpServer } from '@modelcontextprotocol/server'
import type { CuratedChecklist, Rule } from '@repo/types'
import {
  type AuditUrlInput,
  auditUrlDefinition,
  buildGetChecklistRulesDefinition,
  buildGetWorkflowDefinition,
  type CheckRuleInput,
  checkRuleDefinition,
  type ExplainRuleInput,
  executeAuditUrl,
  executeCheckRule,
  executeExplainRule,
  executeFixRule,
  executeGetChecklistRules,
  executeGetQuickReference,
  executeGetRule,
  executeGetWorkflow,
  executeListCategories,
  executeReviewCode,
  executeSearchRules,
  explainRuleDefinition,
  type FixRuleInput,
  fixRuleDefinition,
  type GetChecklistRulesInput,
  type GetQuickReferenceInput,
  type GetRuleInput,
  type GetWorkflowInput,
  getQuickReferenceDefinition,
  getRuleDefinition,
  listCategoriesDefinition,
  type ReviewCodeInput,
  reviewCodeDefinition,
  type SearchRulesInput,
  searchRulesDefinition
} from './tools'
import { MCP_SERVER_ICON } from './tools/metadata'
import { capResponseText } from './utils/response-cap'

export type ToolResultPayload = Record<string, unknown>

interface ToolExecutionResult {
  isError: boolean
  result: ToolResultPayload
}

/**
 * Base tool definitions that are always available, regardless of checklists.
 */
const BASE_TOOL_DEFINITIONS = [
  reviewCodeDefinition,
  auditUrlDefinition,
  getQuickReferenceDefinition,
  getRuleDefinition,
  searchRulesDefinition,
  checkRuleDefinition,
  fixRuleDefinition,
  explainRuleDefinition,
  listCategoriesDefinition
]

/**
 * Build the effective tool definition list for the current checklist set.
 *
 * @param checklists - Available curated checklists.
 * @returns Tool definitions exposed by the MCP server.
 */
export function getToolDefinitions(checklists: CuratedChecklist[] = []) {
  if (checklists.length === 0) {
    return BASE_TOOL_DEFINITIONS
  }

  return [
    BASE_TOOL_DEFINITIONS[0],
    BASE_TOOL_DEFINITIONS[1],
    buildGetWorkflowDefinition(checklists),
    buildGetChecklistRulesDefinition(checklists),
    ...BASE_TOOL_DEFINITIONS.slice(2)
  ]
}

/**
 * Convert a tool result payload into plain text content for the SDK transport.
 *
 * @param result - Structured tool payload.
 * @param maxResponseChars - Maximum text length allowed in the response.
 * @returns Text content blocks for the SDK response.
 */
function toTextContent(
  result: ToolResultPayload,
  maxResponseChars: number
): Array<{ type: 'text'; text: string }> {
  return [
    {
      type: 'text',
      text: capResponseText(JSON.stringify(result, null, 2), maxResponseChars)
    }
  ]
}

/**
 * Execute a single MCP tool against the current rules and checklists.
 *
 * @param name - Tool name.
 * @param args - Tool arguments.
 * @param rules - Available rules.
 * @param checklists - Available checklists.
 * @returns Structured result plus error state.
 */
async function executeTool(
  name: string,
  args: Record<string, unknown>,
  rules: Rule[],
  checklists: CuratedChecklist[]
): Promise<ToolExecutionResult> {
  switch (name) {
    case 'get_rule': {
      const output = executeGetRule(args as unknown as GetRuleInput, rules)
      return output.success
        ? { isError: false, result: output.rule as unknown as ToolResultPayload }
        : { isError: true, result: output.error as unknown as ToolResultPayload }
    }

    case 'search_rules':
      return {
        isError: false,
        result: executeSearchRules(
          args as unknown as SearchRulesInput,
          rules
        ) as unknown as ToolResultPayload
      }

    case 'check_rule': {
      const output = executeCheckRule(args as unknown as CheckRuleInput, rules)
      return output.success
        ? { isError: false, result: output.result as unknown as ToolResultPayload }
        : { isError: true, result: output.error as unknown as ToolResultPayload }
    }

    case 'fix_rule': {
      const output = executeFixRule(args as unknown as FixRuleInput, rules)
      return output.success
        ? { isError: false, result: output.result as unknown as ToolResultPayload }
        : { isError: true, result: output.error as unknown as ToolResultPayload }
    }

    case 'explain_rule': {
      const output = executeExplainRule(args as unknown as ExplainRuleInput, rules)
      return output.success
        ? { isError: false, result: output.result as unknown as ToolResultPayload }
        : { isError: true, result: output.error as unknown as ToolResultPayload }
    }

    case 'list_categories':
      return {
        isError: false,
        result: executeListCategories(rules) as unknown as ToolResultPayload
      }

    case 'review_code':
      return {
        isError: false,
        result: executeReviewCode(
          args as unknown as ReviewCodeInput,
          rules
        ) as unknown as ToolResultPayload
      }

    case 'audit_url': {
      const result = (await executeAuditUrl(
        args as unknown as AuditUrlInput,
        rules
      )) as unknown as ToolResultPayload

      return {
        isError: 'error' in result,
        result
      }
    }

    case 'get_checklist_rules': {
      const output = executeGetChecklistRules(
        args as unknown as GetChecklistRulesInput,
        rules,
        checklists
      )

      return output.success
        ? { isError: false, result: output as unknown as ToolResultPayload }
        : { isError: true, result: output.error as unknown as ToolResultPayload }
    }

    case 'get_workflow': {
      const output = executeGetWorkflow(args as unknown as GetWorkflowInput, rules, checklists)
      return output.success
        ? { isError: false, result: output.workflow as unknown as ToolResultPayload }
        : { isError: true, result: output.error as unknown as ToolResultPayload }
    }

    case 'get_quick_reference': {
      const output = executeGetQuickReference(args as unknown as GetQuickReferenceInput, rules)
      return output.success
        ? { isError: false, result: output.reference as unknown as ToolResultPayload }
        : { isError: true, result: output.error as unknown as ToolResultPayload }
    }

    default:
      return {
        isError: true,
        result: {
          message: `Unknown tool: ${name}`
        }
      }
  }
}

/**
 * Register MCP tools on the server instance.
 *
 * @param server - MCP server instance.
 * @param getRules - Rule loader callback.
 * @param getChecklists - Checklist loader callback.
 * @param maxResponseChars - Text response cap.
 * @param telemetryEnabled - Whether telemetry callbacks should run.
 * @param recordTelemetry - Telemetry callback.
 */
export function registerTools(
  server: McpServer,
  getRules: () => Rule[] | Promise<Rule[]>,
  getChecklists: () => CuratedChecklist[],
  maxResponseChars: number,
  telemetryEnabled: boolean,
  recordTelemetry: (toolName: string) => void
): void {
  const toolDefinitions = getToolDefinitions(getChecklists())

  for (const definition of toolDefinitions) {
    server.registerTool(
      definition.name,
      {
        title: definition.title,
        description: definition.description,
        // Register the JSON Schema as-is so descriptions and constraints reach clients.
        inputSchema: fromJsonSchema(definition.inputSchema as JsonSchemaType),
        outputSchema: fromJsonSchema(definition.outputSchema as JsonSchemaType),
        icons: [MCP_SERVER_ICON],
        annotations: definition.annotations
      },
      async (args: unknown) => {
        const rules = await Promise.resolve(getRules())
        const checklists = getChecklists()

        if (telemetryEnabled) {
          recordTelemetry(definition.name)
        }

        const { isError, result } = await executeTool(
          definition.name,
          (args || {}) as Record<string, unknown>,
          rules,
          checklists
        )

        return {
          content: toTextContent(result, maxResponseChars),
          structuredContent: result,
          ...(isError ? { isError: true } : {})
        }
      }
    )
  }
}
