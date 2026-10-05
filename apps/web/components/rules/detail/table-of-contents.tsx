'use client'

import { cn } from '@repo/utils'
import { useEffect, useState } from 'react'

interface TocItem {
  id: string
  text: string
  level: number
}

interface TableOfContentsProps {
  /** Selector for the content container to scan for headings */
  contentSelector?: string
  /** Minimum heading level to include (default: 2) */
  minLevel?: number
  /** Maximum heading level to include (default: 3) */
  maxLevel?: number
}

/**
 * TableOfContents function.
 */
export function TableOfContents({
  contentSelector = 'article',
  minLevel = 2,
  maxLevel = 3
}: TableOfContentsProps) {
  const [activeId, setActiveId] = useState('')
  const [headings, setHeadings] = useState<TocItem[]>([])

  useEffect(() => {
    setActiveId(window.location.hash.slice(1))
    const content = document.querySelector(contentSelector)
    if (!content) {
      setHeadings([])
      return
    }

    const selector = Array.from(
      { length: maxLevel - minLevel + 1 },
      (_, i) => `h${minLevel + i}[id]`
    ).join(', ')

    setHeadings(
      Array.from(content.querySelectorAll(selector)).map(el => ({
        id: el.id,
        text: el.textContent || '',
        level: Number.parseInt(el.tagName.charAt(1), 10)
      }))
    )
  }, [contentSelector, minLevel, maxLevel])

  // Track active heading on scroll
  useEffect(() => {
    if (headings.length === 0) return

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      {
        rootMargin: '-80px 0px -80% 0px',
        threshold: 0
      }
    )

    headings.forEach(heading => {
      const element = document.getElementById(heading.id)
      if (element) {
        observer.observe(element)
      }
    })

    return () => observer.disconnect()
  }, [headings])

  if (headings.length === 0) {
    return null
  }

  return (
    <nav aria-label="Table of contents">
      <h2 className="mb-3 font-semibold text-foreground text-sm">On This Page</h2>
      <ul className="m-0 list-none p-0">
        {headings.map(heading => (
          <li key={heading.id} className="mb-1">
            <a
              href={`#${heading.id}`}
              className={cn(
                'block py-1 text-[13px] text-foreground-muted transition-colors duration-150 hover:text-foreground',
                activeId === heading.id && 'font-medium text-accent',
                heading.level === 3 && 'pl-4 text-xs'
              )}
              data-level={heading.level}
              aria-current={activeId === heading.id ? 'location' : undefined}
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
