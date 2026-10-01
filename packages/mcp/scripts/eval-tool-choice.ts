/**
 * MCP tool-choice eval.
 *
 * Sends single-turn prompts to Claude with this server's tool definitions and records
 * which tool the model calls first (or whether it answers directly). Each case runs k
 * times so the report can show pass@k (gets it at least once) and pass^k (gets it every
 * time), plus where sibling tools get confused and whether descriptions over-trigger.
 *
 * Usage (from the repo root):
 *   pnpm mcp:eval-tools -- --dry-run                       # validate cases, no API calls
 *   pnpm mcp:eval-tools                                    # claude-opus-5-5, k=3
 *   pnpm mcp:eval-tools -- --models claude-opus-5-5,claude-sonnet-5-5,claude-haiku-4-5
 *   pnpm mcp:eval-tools -- --only confusable --trials 5
 *   pnpm mcp:eval-tools -- --min-pass-hat-k 0.9             # exit 1 below threshold
 *
 * Needs Anthropic credentials (ANTHROPIC_API_KEY or an `ant auth login` profile).
 * Every non-dry run spends API credits; the dry run prints the request count first.
 */
import { mkdirSync, writeFileSync } from 'node:fs'
import path from 'node:path'
import { parseArgs } from 'node:util'
import Anthropic from '@anthropic-ai/sdk'
import { loadLocalChecklists } from '../src/content-loader'
import { getToolDefinitions } from '../src/server-tools'
import { TOOL_CHOICE_CASES, type ToolChoiceCase, unknownExpectedTools } from './tool-choice/cases'
import {
  type CaseResult,
  scoreToolChoice,
  sumUsage,
  type ToolChoiceScore,
  type TrialOutcome,
  type TrialUsage
} from './tool-choice/score'

const REPO_ROOT = path.resolve(__dirname, '../../..')
const EFFORTS = ['low', 'medium', 'high', 'xhigh', 'max'] as const
type Effort = (typeof EFFORTS)[number]

/** Neutral client prompt: it must not nudge the model toward (or away from) tools. */
const SYSTEM_PROMPT =
  'You are a coding assistant helping a web developer. You have access to tools from the Front-End Checklist MCP server. Call a tool when it would help with the request; otherwise answer directly.'

interface Options {
  models: string[]
  trials: number
  concurrency: number
  effort: Effort
  only?: string
  dryRun: boolean
  minPassHatK?: number
  out: string
}

interface ModelReport {
  model: string
  score: ToolChoiceScore
  usage: TrialUsage
  cases: CaseResult[]
}

/**
 * Narrow a CLI string to a supported effort level.
 *
 * @param value - Raw flag value.
 * @returns True when the value is an effort level.
 */
function isEffort(value: string): value is Effort {
  return EFFORTS.some(effort => effort === value)
}

/**
 * Parse CLI flags.
 *
 * @param argv - Arguments after the script name.
 * @returns Options.
 */
function parseOptions(argv: string[]): Options {
  const { values } = parseArgs({
    args: argv.filter(arg => arg !== '--'),
    options: {
      models: { type: 'string', default: 'claude-opus-5-5' },
      trials: { type: 'string', default: '3' },
      concurrency: { type: 'string', default: '4' },
      effort: { type: 'string', default: 'medium' },
      only: { type: 'string' },
      'dry-run': { type: 'boolean', default: false },
      'min-pass-hat-k': { type: 'string' },
      out: { type: 'string' }
    }
  })
  if (!isEffort(values.effort)) throw new Error(`--effort must be one of ${EFFORTS.join(', ')}`)
  const baseDir = process.env.INIT_CWD ?? process.cwd()
  const stamp = new Date().toISOString().replace(/[:.]/g, '-')
  return {
    models: values.models
      .split(',')
      .map(model => model.trim())
      .filter(Boolean),
    trials: Math.max(1, Number.parseInt(values.trials, 10)),
    concurrency: Math.max(1, Number.parseInt(values.concurrency, 10)),
    effort: values.effort,
    only: values.only,
    dryRun: values['dry-run'],
    minPassHatK: values['min-pass-hat-k'] ? Number(values['min-pass-hat-k']) : undefined,
    out: values.out
      ? path.resolve(baseDir, values.out)
      : path.join(REPO_ROOT, '.mcp-evals', `tool-choice-${stamp}.json`)
  }
}

/**
 * The server's tool definitions in Messages API shape.
 *
 * @returns Tools exactly as an MCP client would forward them to Claude.
 */
function buildTools(): Anthropic.Tool[] {
  return getToolDefinitions(loadLocalChecklists(REPO_ROOT)).map(definition => ({
    name: definition.name,
    description: definition.description,
    input_schema: {
      type: 'object',
      properties: definition.inputSchema.properties,
      required: [...(definition.inputSchema.required ?? [])]
    }
  }))
}

/**
 * Whether the model accepts `output_config.effort` (Haiku 4.5 does not).
 *
 * @param model - Model ID.
 * @returns True when effort can be sent.
 */
function supportsEffort(model: string): boolean {
  return !model.startsWith('claude-haiku')
}

/**
 * Run one trial: one request, record the first action.
 *
 * Rate limits, server errors, and connection failures (after the SDK's retries) are
 * recorded as `error`; any other failure aborts the run.
 *
 * @param client - Anthropic client.
 * @param tools - Tool definitions.
 * @param model - Model ID.
 * @param effort - Effort level.
 * @param testCase - Case to run.
 * @returns Outcome and token usage.
 */
async function runTrial(
  client: Anthropic,
  tools: Anthropic.Tool[],
  model: string,
  effort: Effort,
  testCase: ToolChoiceCase
): Promise<{ outcome: TrialOutcome; usage: TrialUsage }> {
  const noUsage = { inputTokens: 0, outputTokens: 0, cacheReadTokens: 0, cacheWriteTokens: 0 }
  try {
    const response = await client.messages.create({
      model,
      max_tokens: 16000,
      // Tools render before system, so this breakpoint caches tools + system.
      system: [{ type: 'text', text: SYSTEM_PROMPT, cache_control: { type: 'ephemeral' } }],
      tools,
      tool_choice: { type: 'auto' },
      ...(supportsEffort(model) ? { output_config: { effort } } : {}),
      messages: [{ role: 'user', content: testCase.prompt }]
    })
    const usage = {
      inputTokens: response.usage.input_tokens,
      outputTokens: response.usage.output_tokens,
      cacheReadTokens: response.usage.cache_read_input_tokens ?? 0,
      cacheWriteTokens: response.usage.cache_creation_input_tokens ?? 0
    }
    if (response.stop_reason === 'refusal') return { outcome: 'refusal', usage }
    const firstTool = response.content.find(
      (block): block is Anthropic.ToolUseBlock => block.type === 'tool_use'
    )
    return { outcome: firstTool?.name ?? 'none', usage }
  } catch (error) {
    // Only transient failures count as a failed trial; anything systemic (bad
    // credentials, unknown model, malformed request) would fail every trial, so abort.
    const transient =
      error instanceof Anthropic.RateLimitError ||
      error instanceof Anthropic.InternalServerError ||
      error instanceof Anthropic.APIConnectionError
    if (!transient) throw error
    console.warn(`  ${model} ${testCase.id}: ${error.message}`)
    return { outcome: 'error', usage: noUsage }
  }
}

/**
 * Run async jobs with a concurrency cap.
 *
 * @param jobs - Job factories.
 * @param limit - Max jobs in flight.
 * @returns Results in job order.
 */
async function runPool<T>(jobs: Array<() => Promise<T>>, limit: number): Promise<T[]> {
  const results: T[] = new Array(jobs.length)
  let next = 0
  /**
   * Pull jobs off the shared queue until it is empty.
   */
  const worker = async () => {
    while (next < jobs.length) {
      const index = next++
      results[index] = await jobs[index]()
    }
  }
  await Promise.all(Array.from({ length: Math.min(limit, jobs.length) }, worker))
  return results
}

/**
 * Run every case k times against one model.
 *
 * @param client - Anthropic client.
 * @param tools - Tool definitions.
 * @param model - Model ID.
 * @param cases - Cases to run.
 * @param options - CLI options.
 * @returns Model report.
 */
async function evaluateModel(
  client: Anthropic,
  tools: Anthropic.Tool[],
  model: string,
  cases: ToolChoiceCase[],
  options: Options
): Promise<ModelReport> {
  const jobs = cases.flatMap(testCase =>
    Array.from(
      { length: options.trials },
      () => () => runTrial(client, tools, model, options.effort, testCase)
    )
  )
  const trials = await runPool(jobs, options.concurrency)
  const results: CaseResult[] = cases.map((testCase, index) => ({
    id: testCase.id,
    group: testCase.group,
    expect: testCase.expect,
    outcomes: trials
      .slice(index * options.trials, (index + 1) * options.trials)
      .map(trial => trial.outcome)
  }))
  return {
    model,
    score: scoreToolChoice(results),
    usage: sumUsage(trials.map(trial => trial.usage)),
    cases: results
  }
}

/**
 * Format a ratio as a percentage.
 *
 * @param value - Ratio in [0, 1].
 * @returns Percentage string.
 */
function percent(value: number): string {
  return `${Math.round(value * 100)}%`
}

/**
 * Print one model's results.
 *
 * @param report - Model report.
 */
function printReport(report: ModelReport): void {
  const { score, usage } = report
  console.log(`\n== ${report.model} (k=${score.trialsPerCase})`)
  console.table(
    Object.fromEntries(
      [['overall', score.overall] as const, ...Object.entries(score.byGroup)].map(
        ([group, groupScore]) => [
          group,
          {
            cases: groupScore?.cases,
            accuracy: percent(groupScore?.accuracy ?? 0),
            'pass@k': percent(groupScore?.passAtK ?? 0),
            'pass^k': percent(groupScore?.passHatK ?? 0)
          }
        ]
      )
    )
  )
  console.log(
    `  over-trigger ${percent(score.overTriggerRate)} · under-trigger ${percent(score.underTriggerRate)} · refusals ${score.refusals} · errors ${score.errors}`
  )
  console.log(
    `  tokens: ${usage.inputTokens} in (+${usage.cacheReadTokens} cache read, +${usage.cacheWriteTokens} cache write), ${usage.outputTokens} out`
  )
  const misses = report.cases.filter(result =>
    result.outcomes.some(outcome =>
      result.expect.length === 0 ? outcome !== 'none' : !result.expect.includes(outcome)
    )
  )
  for (const miss of misses) {
    console.log(
      `  ✗ ${miss.id}: expected ${miss.expect.join('|') || 'none'}, got ${miss.outcomes.join(', ')}`
    )
  }
}

/**
 * Validate cases and print the plan without calling the API.
 *
 * @param tools - Tool definitions.
 * @param cases - Selected cases.
 * @param options - CLI options.
 */
function printPlan(tools: Anthropic.Tool[], cases: ToolChoiceCase[], options: Options): void {
  const requests = cases.length * options.trials * options.models.length
  // Rough: ~4 characters per token. Use count_tokens for an exact figure.
  const approxPrefixTokens = Math.round((JSON.stringify(tools).length + SYSTEM_PROMPT.length) / 4)
  console.log(
    `${cases.length} cases × ${options.trials} trials × ${options.models.length} model(s) = ${requests} requests`
  )
  console.log(
    `~${approxPrefixTokens} prefix tokens per request (tools + system; cached when above the model's minimum cacheable prefix)`
  )
  console.log(`models: ${options.models.join(', ')} · effort: ${options.effort}`)
}

/**
 * Entry point.
 */
async function main(): Promise<void> {
  const options = parseOptions(process.argv.slice(2))
  const tools = buildTools()
  const unknown = unknownExpectedTools(
    TOOL_CHOICE_CASES,
    tools.map(tool => tool.name)
  )
  if (unknown.length > 0) throw new Error(`Cases expect unknown tools: ${unknown.join(', ')}`)

  const cases = options.only
    ? TOOL_CHOICE_CASES.filter(
        testCase => testCase.id.includes(options.only ?? '') || testCase.group === options.only
      )
    : TOOL_CHOICE_CASES
  printPlan(tools, cases, options)
  if (options.dryRun) return

  const client = new Anthropic({ maxRetries: 4 })
  const reports: ModelReport[] = []
  for (const model of options.models) {
    const report = await evaluateModel(client, tools, model, cases, options)
    printReport(report)
    reports.push(report)
  }

  mkdirSync(path.dirname(options.out), { recursive: true })
  writeFileSync(
    options.out,
    `${JSON.stringify({ date: new Date().toISOString(), options, reports }, null, 2)}\n`
  )
  console.log(`\nReport: ${options.out}`)

  const threshold = options.minPassHatK
  if (
    threshold !== undefined &&
    reports.some(report => report.score.overall.passHatK < threshold)
  ) {
    console.error(`pass^k below ${threshold} for at least one model.`)
    process.exitCode = 1
  }
}

main().catch(error => {
  const missingCredentials =
    error instanceof Anthropic.AuthenticationError ||
    (error instanceof Error && /authentication method/i.test(error.message))
  if (missingCredentials) {
    console.error(
      'Anthropic credentials missing or invalid: export ANTHROPIC_API_KEY or run `ant auth login`.'
    )
  } else {
    console.error(error instanceof Error ? error.message : error)
  }
  process.exitCode = 2
})
