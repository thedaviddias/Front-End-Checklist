'use client'

import { ErrorBoundary, SectionErrorFallback } from '@/components/feedback/status/error-boundary'
import { CommandPaletteProvider, useCommandPalette } from './command-palette-provider'
import { Header } from './header'

interface Rule {
  id: string
  title: string
  description?: string
  slug: string
  priority: 'critical' | 'high' | 'medium' | 'low'
  primaryCategory: string
  language: string
}

interface AppShellProps {
  rules: Rule[]
  githubStars: number | null
}

/**
 * AppShell function.
 * @param rules - rules.
 * @param githubStars } - githubStars }.
 */
export function AppShell({ rules, githubStars }: AppShellProps) {
  return (
    <CommandPaletteProvider rules={rules}>
      <AppShellContent githubStars={githubStars} />
    </CommandPaletteProvider>
  )
}

interface AppShellContentProps {
  githubStars: number | null
}

/** Renders the page layout with header, main content area, and footer. */
function AppShellContent({ githubStars }: AppShellContentProps) {
  const { openPalette } = useCommandPalette()

  return (
    <ErrorBoundary
      fallback={reset => <SectionErrorFallback sectionName="Header" onRetry={reset} />}
    >
      <Header onOpenSearch={openPalette} githubStars={githubStars} />
    </ErrorBoundary>
  )
}
