import { parse } from '@babel/parser'
import { isSyntaxNode } from './eval-reference'

/**
 * Mask JSX children whose rendered markup cannot be inferred statically.
 * Expression containers and custom components are unknown output, not literal list text.
 * @param code - Component source to analyze.
 * @returns Markup with unknown children blanked, or undefined when parsing fails.
 */
export function maskDynamicJsx(code: string): string | undefined {
  try {
    const ast = parse(code, {
      sourceType: 'unambiguous',
      plugins: ['typescript', 'jsx'],
      allowReturnOutsideFunction: true,
      errorRecovery: true
    })
    const ranges: Array<{ start: number; end: number }> = []
    const pending: unknown[] = [ast]
    while (pending.length > 0) {
      const node = pending.pop()
      if (!isSyntaxNode(node)) continue
      const opening = node.openingElement
      const name = isSyntaxNode(opening) ? opening.name : undefined
      const custom =
        node.type === 'JSXElement' &&
        isSyntaxNode(name) &&
        (name.type === 'JSXMemberExpression' ||
          (typeof name.name === 'string' && /^[A-Z]/.test(name.name)))
      if (node.type === 'JSXExpressionContainer' || custom) {
        if (typeof node.start === 'number' && typeof node.end === 'number') {
          ranges.push({ start: node.start, end: node.end })
        }
        continue
      }
      for (const value of Object.values(node)) {
        if (Array.isArray(value)) pending.push(...value)
        else if (isSyntaxNode(value)) pending.push(value)
      }
    }
    ranges.sort((a, b) => a.start - b.start)
    let offset = 0
    const parts: string[] = []
    for (const range of ranges) {
      parts.push(code.slice(offset, range.start), ' ')
      offset = range.end
    }
    parts.push(code.slice(offset))
    return parts.join('')
  } catch {
    return undefined
  }
}
