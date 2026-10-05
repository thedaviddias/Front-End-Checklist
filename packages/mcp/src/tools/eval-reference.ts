type SyntaxNode = Record<string, unknown> & { type: string }

/**
 * Narrow unknown parser fields to AST nodes without casting their shape.
 * @param value - Candidate parser field.
 * @returns Whether the value is a syntax node.
 */
export function isSyntaxNode(value: unknown): value is SyntaxNode {
  return (
    typeof value === 'object' && value !== null && 'type' in value && typeof value.type === 'string'
  )
}

/**
 * Read a static member name, including bracket notation.
 * @param node - Member-expression node.
 * @returns Static property name, if known.
 */
function memberName(node: SyntaxNode): string | undefined {
  const property = node.property
  if (!isSyntaxNode(property)) return undefined
  const name = node.computed ? property.value : property.name
  return typeof name === 'string' ? name : undefined
}

/**
 * Recognize direct and common indirect references to the eval function.
 * @param value - Expression used as the callee.
 * @returns Whether calling this expression invokes eval.
 */
export function isEvalReference(value: unknown): boolean {
  if (!isSyntaxNode(value)) return false
  if (value.type === 'Identifier') return value.name === 'eval'
  if (value.type === 'SequenceExpression' && Array.isArray(value.expressions)) {
    return isEvalReference(value.expressions.at(-1))
  }
  if (
    [
      'ParenthesizedExpression',
      'TSAsExpression',
      'TSTypeAssertion',
      'TSNonNullExpression'
    ].includes(value.type)
  ) {
    return isEvalReference(value.expression)
  }
  if (value.type === 'MemberExpression' || value.type === 'OptionalMemberExpression') {
    const name = memberName(value)
    if (name === 'call' || name === 'apply') return isEvalReference(value.object)
    return (
      name === 'eval' &&
      isSyntaxNode(value.object) &&
      value.object.type === 'Identifier' &&
      ['window', 'globalThis', 'self'].includes(String(value.object.name))
    )
  }
  if (value.type === 'CallExpression' && isSyntaxNode(value.callee)) {
    return (
      value.callee.type === 'MemberExpression' &&
      memberName(value.callee) === 'bind' &&
      isEvalReference(value.callee.object)
    )
  }
  return false
}
