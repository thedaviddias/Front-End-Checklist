import * as fs from 'node:fs'
import * as path from 'node:path'
import { z } from 'zod'
import type { ImpactTask, Split } from './cases'
import {
  BENCHMARK_VERSION,
  CONDITIONS,
  comparisonProblems,
  corpusHash,
  hash,
  metadataSchema,
  type RunMetadata,
  scoreTask,
  selectTasks,
  summarize
} from './score'

export const ROOT_PROMPT =
  'Complete each task in its README. Edit only candidate.html. Preserve functionality and content. Leave valid controls unchanged. Do not read grading files or other tasks outside this workspace.'
const manifestSchema = z
  .object({
    version: z.literal(BENCHMARK_VERSION),
    corpusHash: z.string(),
    split: z.enum(['development', 'held-out', 'all']),
    taskIds: z.array(z.string()),
    promptHash: z.string()
  })
  .strict()

/** Hash the common root instruction and every selected per-task instruction. */
export function promptHash(tasks: ImpactTask[]): string {
  return hash(JSON.stringify([ROOT_PROMPT, ...tasks.map(task => [task.id, task.prompt])]))
}

/** Initialize identical, answer-free workspaces, refusing to overwrite any existing directory. */
export function initBenchmark(directory: string, split: Split | 'all' = 'development'): void {
  const tasks = selectTasks(split)
  const root = path.resolve(directory)
  fs.mkdirSync(path.dirname(root), { recursive: true })
  fs.mkdirSync(root)
  for (const condition of CONDITIONS) {
    for (const task of tasks) {
      const taskDir = path.join(root, condition, task.id)
      fs.mkdirSync(taskDir, { recursive: true })
      fs.writeFileSync(path.join(taskDir, 'candidate.html'), task.initial)
      fs.writeFileSync(
        path.join(taskDir, 'README.md'),
        `${task.prompt}\n\nEdit candidate.html only.\n`
      )
    }
    fs.writeFileSync(path.join(root, condition, 'README.md'), ROOT_PROMPT)
  }
  fs.writeFileSync(
    path.join(root, 'manifest.json'),
    JSON.stringify(
      {
        version: BENCHMARK_VERSION,
        corpusHash: corpusHash(),
        split,
        taskIds: tasks.map(task => task.id),
        promptHash: promptHash(tasks)
      },
      null,
      2
    )
  )
  fs.writeFileSync(
    path.join(root, 'run-metadata.example.json'),
    JSON.stringify(
      {
        model: 'exact-model-snapshot',
        settings: 'temperature=0; effort=medium; client=VERSION; other-tools=LIST',
        timeBudgetSeconds: 600,
        promptHash: promptHash(tasks),
        mcpEnabled: false,
        mcpRevision: null,
        corpusRevision: null,
        toolCalls: 0,
        inputTokens: null,
        outputTokens: null,
        costUsd: null,
        elapsedSeconds: null,
        completedTaskIds: [],
        reviews: {}
      },
      null,
      2
    )
  )
}

/** Read evaluator-owned metadata, failing on malformed records rather than inventing zero costs. */
function readMetadata(root: string, condition: string): RunMetadata | null {
  const file = path.join(root, `${condition}.run.json`)
  return fs.existsSync(file)
    ? metadataSchema.parse(JSON.parse(fs.readFileSync(file, 'utf8')))
    : null
}

/** Read a candidate as data only; no submitted code is executed. */
function readCandidate(file: string): string | null {
  if (!fs.existsSync(file)) return null
  const stat = fs.lstatSync(file)
  if (!stat.isFile() || stat.size > 1_000_000) return null
  return fs.readFileSync(file, 'utf8')
}

/** Score only the exact initialized corpus and separate provisional from verified comparisons. */
export function scoreBenchmark(directory: string) {
  const root = path.resolve(directory)
  const manifest = manifestSchema.parse(
    JSON.parse(fs.readFileSync(path.join(root, 'manifest.json'), 'utf8'))
  )
  const tasks = selectTasks(manifest.split)
  if (
    manifest.corpusHash !== corpusHash() ||
    manifest.promptHash !== promptHash(tasks) ||
    JSON.stringify(manifest.taskIds) !== JSON.stringify(tasks.map(task => task.id))
  ) {
    throw new Error(
      'Benchmark manifest differs from this corpus; use the original revision or initialize a new run'
    )
  }
  const conditions = CONDITIONS.map(condition => {
    const metadata = readMetadata(root, condition)
    const scores = tasks.map(task =>
      scoreTask(
        task,
        readCandidate(path.join(root, condition, task.id, 'candidate.html')),
        metadata
      )
    )
    return {
      condition,
      metadata,
      summary: summarize(scores, metadata),
      tasks: scores,
      byCategory: Object.fromEntries(
        [...new Set(scores.map(task => task.category))].map(category => [
          category,
          summarize(
            scores.filter(task => task.category === category),
            null
          )
        ])
      ),
      bySplit: Object.fromEntries(
        ['development', 'held-out'].map(split => [
          split,
          summarize(
            scores.filter(task => task.split === split),
            null
          )
        ])
      )
    }
  })
  const [withoutMcp, withMcp] = conditions
  if (!withoutMcp || !withMcp) throw new Error('Missing condition')
  const problems = comparisonProblems(
    withoutMcp.metadata,
    withMcp.metadata,
    tasks,
    manifest.promptHash
  )
  if (conditions.some(condition => condition.tasks.some(task => task.humanReview === 'pending'))) {
    problems.push('Independent human review is pending or stale for one or more candidates')
  }
  return {
    version: BENCHMARK_VERSION,
    split: manifest.split,
    corpusHash: manifest.corpusHash,
    comparisonValid: problems.length === 0,
    comparisonProblems: problems,
    verifiedSuccessDelta: problems.length
      ? null
      : (withMcp.summary.verifiedSuccessRate ?? 0) - (withoutMcp.summary.verifiedSuccessRate ?? 0),
    provisionalAutomatedDelta:
      (withMcp.summary.automatedSuccessRate ?? 0) - (withoutMcp.summary.automatedSuccessRate ?? 0),
    withoutMcp,
    withMcp,
    limitations: [
      'Hand-authored HTML tasks, not a population estimate or runtime/browser validation.',
      'Static checks cover explicit requirements only. Human review must assess semantics, behavior and unlisted regressions.',
      'Metadata and reviews are evaluator attestations. Isolate agent workspaces from graders and hold-out definitions.',
      'One paired run does not establish statistical significance. Repeat matched trials.'
    ]
  }
}
