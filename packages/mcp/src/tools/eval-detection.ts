import { parse } from '@babel/parser'
import { parse as parseHtml } from 'node-html-parser'

import { isEvalReference, isSyntaxNode } from './eval-reference'

/**
 * Visit executable syntax, excluding comment text and literal contents.
 * @param root - Parsed program.
 * @returns Whether an eval call exists in the syntax tree.
 */
function containsEvalCall(root: unknown): boolean {
  const pending: unknown[] = [root]
  while (pending.length > 0) {
    const node = pending.pop()
    if (!isSyntaxNode(node)) continue
    if (
      (node.type === 'CallExpression' || node.type === 'OptionalCallExpression') &&
      isEvalReference(node.callee)
    ) {
      return true
    }
    for (const [key, value] of Object.entries(node)) {
      if (
        [
          'comments',
          'leadingComments',
          'trailingComments',
          'innerComments',
          'loc',
          'extra',
          'errors'
        ].includes(key)
      )
        continue
      if (Array.isArray(value)) pending.push(...value)
      else if (isSyntaxNode(value)) pending.push(value)
    }
  }
  return false
}

/**
 * Parse a JavaScript, TypeScript or JSX snippet without executing it.
 * @param code - Executable source snippet.
 * @returns Whether its parsed syntax contains an eval call.
 */
function snippetHasEval(code: string): boolean {
  // A supported eval reference needs its spelling or an escaped identifier/property.
  if (!code.includes('eval') && !code.includes('\\')) return false
  for (const jsx of [true, false]) {
    try {
      return containsEvalCall(
        parse(code, {
          sourceType: 'unambiguous',
          plugins: jsx ? ['typescript', 'jsx'] : ['typescript'],
          allowReturnOutsideFunction: true,
          allowAwaitOutsideFunction: true,
          errorRecovery: true,
          attachComment: false
        })
      )
    } catch {
      // Incomplete or unsupported syntax is not evidence of an eval call.
    }
  }
  return false
}

/**
 * Detect eval calls in source or executable parts of an HTML snippet.
 * This does not perform alias tracking or lexical binding analysis.
 * @param code - Pasted JavaScript, TypeScript, JSX or HTML.
 * @returns Whether a supported eval call is present.
 */
export function hasEvalCall(code: string): boolean {
  if (!code.trimStart().startsWith('<')) return snippetHasEval(code)

  const document = parseHtml(code)
  for (const script of document.querySelectorAll('script')) {
    const type = (script.getAttribute('type') ?? '').trim().toLowerCase().split(';')[0]
    if (
      !script.hasAttribute('src') &&
      ['', 'module', 'text/javascript', 'application/javascript'].includes(type ?? '')
    ) {
      if (snippetHasEval(script.rawText)) return true
    }
  }
  for (const element of document.querySelectorAll('*')) {
    for (const [name, value] of Object.entries(element.attributes)) {
      if (/^on[a-z]/i.test(name) && snippetHasEval(value)) return true
    }
  }
  return snippetHasEval(code)
}
