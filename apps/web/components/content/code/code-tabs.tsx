'use client'

import { isChecklistFramework } from '@repo/config'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@repo/design-system/ui/tabs'
import {
  Children,
  isValidElement,
  type ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useState
} from 'react'
import {
  FRAMEWORK_PREFERENCE_EVENT,
  getStoredFrameworkPreference,
  resolveFrameworkTabSelection,
  setStoredFrameworkPreference
} from '@/lib/framework-preferences'

interface TabProps {
  value: string
  label: string
  children: ReactNode
}

interface CodeTabsProps {
  defaultTab?: string
  children: ReactNode
}

/**
 * CodeTabs function.
 * @param { defaultTab - { defaultTab.
 * @param children } - children }.
 */
export function CodeTabs({ defaultTab, children }: CodeTabsProps) {
  const tabs = useMemo(() => {
    const tabList: { value: string; label: string; content: ReactNode }[] = []

    Children.forEach(children, child => {
      if (isValidElement<TabProps>(child) && child.props.value && child.props.label) {
        tabList.push({
          value: child.props.value,
          label: child.props.label,
          content: child.props.children
        })
      }
    })

    return tabList
  }, [children])

  const [selection, setSelection] = useState<ReturnType<typeof resolveFrameworkTabSelection>>(
    () => ({
      activeTab: defaultTab || tabs[0]?.value || '',
      source: 'default'
    })
  )

  useEffect(() => {
    if (typeof window === 'undefined') {
      return
    }

    /**
     * Recompute the preferred tab when URL or stored framework context changes.
     */
    const updateSelection = () => {
      setSelection(resolveFrameworkTabSelection(tabs, defaultTab))
    }

    updateSelection()
    window.addEventListener('hashchange', updateSelection)
    window.addEventListener('popstate', updateSelection)
    window.addEventListener('storage', updateSelection)
    window.addEventListener(FRAMEWORK_PREFERENCE_EVENT, updateSelection)

    return () => {
      window.removeEventListener('hashchange', updateSelection)
      window.removeEventListener('popstate', updateSelection)
      window.removeEventListener('storage', updateSelection)
      window.removeEventListener(FRAMEWORK_PREFERENCE_EVENT, updateSelection)
    }
  }, [defaultTab, tabs])
  const activeTab = selection.activeTab
  const activeTabLabel = tabs.find(tab => tab.value === activeTab)?.label
  const canMakeDefault =
    Boolean(selection.checklistName) &&
    isChecklistFramework(activeTab) &&
    getStoredFrameworkPreference() !== activeTab

  const handleMakeDefault = useCallback(() => {
    if (!isChecklistFramework(activeTab)) {
      return
    }

    setStoredFrameworkPreference(activeTab)
  }, [activeTab])

  const handleTabChange = useCallback(
    (value: string) => {
      if (typeof window !== 'undefined') {
        const url = new URL(window.location.href)
        url.hash = value
        window.history.replaceState(null, '', url.toString())

        if (isChecklistFramework(value) && !selection.checklistName) {
          setStoredFrameworkPreference(value)
        } else {
          window.dispatchEvent(new Event(FRAMEWORK_PREFERENCE_EVENT))
        }
      }
    },
    [selection.checklistName]
  )

  if (tabs.length === 0) {
    return <div className="code-tabs-error">No tabs found</div>
  }

  return (
    <Tabs value={activeTab} onValueChange={handleTabChange} className="code-tabs">
      {selection.checklistName && activeTabLabel ? (
        <div className="mb-3 flex flex-wrap items-center justify-between gap-2 rounded-lg border border-border bg-background-subtle px-3 py-2 text-sm">
          <p className="text-foreground-muted">
            Showing {activeTabLabel} examples
            {` from ${selection.checklistName}`}.
          </p>
          {canMakeDefault ? (
            <button
              type="button"
              onClick={handleMakeDefault}
              className="font-medium text-accent transition-colors hover:text-accent-hover"
            >
              Make default
            </button>
          ) : null}
        </div>
      ) : null}
      <TabsList className="code-tabs-list" aria-label="Framework examples">
        {tabs.map(tab => (
          <TabsTrigger key={tab.value} value={tab.value} className="code-tabs-trigger">
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>

      {tabs.map(tab => (
        <TabsContent key={tab.value} value={tab.value} className="code-tabs-content">
          {tab.content}
        </TabsContent>
      ))}
    </Tabs>
  )
}

/**
 * Tab function.
 * @param { children } - { children }.
 */
export function Tab({ children }: TabProps) {
  return <>{children}</>
}
