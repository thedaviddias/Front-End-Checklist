'use client'

import { authClient } from '@repo/auth/auth-client'
import { ConfirmDialog } from '@repo/design-system/custom/feedback/confirm-dialog'
import { Download, Trash2 } from '@repo/design-system/icons'
import { cn } from '@repo/utils'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useCallback, useState } from 'react'
import { NewsletterSettings } from '@/components/account/newsletter-settings'
import { signOutCurrentUser } from '@/lib/auth-actions'

/**
 * Client-side settings page for account management, data export, and deletion.
 */
export function SettingsPageClient() {
  const router = useRouter()
  const { data: session, isPending: isSessionPending } = authClient.useSession()
  const isSignedIn = Boolean(session?.user?.id)

  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [isExporting, setIsExporting] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const handleExportData = useCallback(async () => {
    setErrorMessage(null)
    setIsExporting(true)
    try {
      const res = await fetch('/api/account/export')
      if (!res.ok) throw new Error('Export failed')
      const blob = await res.blob()
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `frontend-checklist-export-${new Date().toISOString().split('T')[0]}.json`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
    } catch {
      setErrorMessage('Failed to export data. Please try again.')
    } finally {
      setIsExporting(false)
    }
  }, [])

  const handleDeleteAccount = useCallback(async () => {
    setErrorMessage(null)
    setIsDeleting(true)
    try {
      const res = await fetch('/api/account', { method: 'DELETE' })
      if (!res.ok) throw new Error('Delete failed')
      await signOutCurrentUser()
      router.push('/')
    } catch {
      setErrorMessage('Failed to delete account. Please try again.')
      setIsDeleting(false)
    }
  }, [router])

  if (isSessionPending) {
    return (
      <div className="animate-pulse space-y-6">
        <div className="h-8 w-48 rounded bg-background-muted" />
        <div className="h-32 rounded-lg bg-background-muted" />
        <div className="h-32 rounded-lg bg-background-muted" />
      </div>
    )
  }

  if (!isSignedIn) {
    return (
      <div className="rounded-lg border border-border bg-card p-8 text-center sm:p-12">
        <p className="text-foreground-muted text-lg">Sign in to access your settings.</p>
      </div>
    )
  }

  const user = session!.user
  const joinedDate = user.createdAt
    ? new Date(user.createdAt).toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric'
      })
    : null

  return (
    <>
      <h1 className="font-bold text-3xl text-foreground">Settings</h1>

      {errorMessage && (
        <div className="mt-4 rounded-md border border-destructive/30 bg-destructive/10 px-4 py-3 text-destructive text-sm">
          {errorMessage}
        </div>
      )}

      {/* Account section */}
      <section className="mt-8">
        <h2 className="mb-4 font-semibold text-foreground text-lg">Account</h2>
        <div className="rounded-lg border border-border bg-card p-6">
          <div className="flex items-center gap-4">
            {user.image ? (
              <Image src={user.image} alt="" width={64} height={64} className="rounded-full" />
            ) : (
              <span className="flex h-16 w-16 items-center justify-center rounded-full bg-background-muted font-semibold text-foreground-muted text-xl">
                {(user.name ?? user.email ?? '?')[0]?.toUpperCase()}
              </span>
            )}
            <div>
              <p className="font-medium text-foreground">{user.name ?? 'Anonymous'}</p>
              <p className="text-foreground-muted text-sm">{user.email}</p>
              {joinedDate && (
                <p className="mt-1 text-foreground-muted text-xs">Joined {joinedDate}</p>
              )}
            </div>
          </div>
          <p className="mt-4 text-foreground-muted text-xs">
            Account details are managed through your GitHub account.
          </p>
        </div>
      </section>

      <NewsletterSettings />

      {/* Data section */}
      <section className="mt-8">
        <h2 className="mb-4 font-semibold text-foreground text-lg">Your Data</h2>
        <div className="space-y-4">
          {/* Export */}
          <div className="flex items-center justify-between rounded-lg border border-border bg-card p-6">
            <div>
              <p className="font-medium text-foreground">Export all data</p>
              <p className="mt-1 text-foreground-muted text-sm">
                Download a JSON file with your checklists, progress, and audit history.
              </p>
            </div>
            <button
              type="button"
              onClick={handleExportData}
              disabled={isExporting}
              className={cn(
                'inline-flex items-center gap-2 rounded-md border border-border px-4 py-2',
                'font-medium text-sm transition-colors',
                'hover:bg-background-subtle',
                'disabled:cursor-not-allowed disabled:opacity-50'
              )}
            >
              <Download className="h-4 w-4" aria-hidden={true} />
              <span>{isExporting ? 'Exporting...' : 'Export'}</span>
            </button>
          </div>

          {/* Delete account */}
          <div className="flex items-center justify-between rounded-lg border border-destructive/30 bg-card p-6">
            <div>
              <p className="font-medium text-destructive">Delete account</p>
              <p className="mt-1 text-foreground-muted text-sm">
                Permanently delete your account and all associated data. This cannot be undone.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setShowDeleteConfirm(true)}
              disabled={isDeleting}
              className={cn(
                'inline-flex items-center gap-2 rounded-md px-4 py-2',
                'bg-destructive font-medium text-destructive-foreground text-sm transition-colors',
                'hover:bg-destructive/90',
                'disabled:cursor-not-allowed disabled:opacity-50'
              )}
            >
              <Trash2 className="h-4 w-4" aria-hidden={true} />
              <span>{isDeleting ? 'Deleting...' : 'Delete'}</span>
            </button>
          </div>
        </div>
      </section>

      <ConfirmDialog
        isOpen={showDeleteConfirm}
        onConfirm={handleDeleteAccount}
        onCancel={() => setShowDeleteConfirm(false)}
        title="Delete your account?"
        description="This will permanently delete your account, checklists, progress, and all associated data. This action cannot be undone."
        confirmLabel="Delete my account"
        cancelLabel="Cancel"
        variant="danger"
      />
    </>
  )
}
