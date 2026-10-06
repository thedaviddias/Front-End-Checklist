import { parse, valid } from 'node-html-parser'
import type { ImpactTask } from './cases'
import { scoreTask } from './score'

/** Accept a complete HTML artifact, excluding prose outside the document's elements. */
function isHtmlArtifact(value: string): boolean {
  const text = value.trim()
  if (!text.startsWith('<') || !text.endsWith('>') || !valid(text)) return false
  return parse(text).childNodes.every(node => node.nodeType !== 3 || !node.textContent.trim())
}

/** Extract one explicit HTML artifact, never guessing between before/after snippets or inline code. */
export function extractHtmlArtifact(output: string): string | null {
  if (!output.includes('```')) return isHtmlArtifact(output) ? output.trim() : null
  const match = /^([\s\S]*?)```(?:html)?\s*\n([\s\S]*?)\n```([\s\S]*)$/i.exec(output)
  if (!match) return null
  const [, before = '', body = '', after = ''] = match
  if ([before, body, after].some(part => part.includes('```'))) return null
  // Prose wrappers may explain the answer, but must not contain competing markup.
  if (/<\/?[a-z!]/i.test(before + after) || !isHtmlArtifact(body)) return null
  return body.trim()
}

/** Separate machine-readable format from extracted static correctness; semantic review stays pending. */
export function scoreModelOutput(task: ImpactTask, output: string) {
  const artifact = extractHtmlArtifact(output)
  const formatPass = !output.includes('```') && isHtmlArtifact(output)
  const staticScore = scoreTask(task, artifact, null)
  return {
    formatPass,
    staticPass: staticScore.automatedPass,
    artifact,
    staticScore,
    semanticReview: 'pending' as const,
    verifiedPass: null
  }
}
