import { MDXContent } from '@content-collections/mdx/react'
import { mdxComponents } from '@/components/rules/detail/mdx-components'

interface ChecklistMdxContentProps {
  code: string
}

/**
 * Render checklist MDX with the shared rule content component map.
 */
export function ChecklistMdxContent({ code }: ChecklistMdxContentProps) {
  return <MDXContent code={code} components={mdxComponents} />
}
