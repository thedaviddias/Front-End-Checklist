import { notFound } from 'next/navigation'

/** Require an owner-approved public contact before publishing legal pages. */
export function getLegalContactEmail(): string {
  const email = process.env.PUBLIC_SUPPORT_EMAIL?.trim()
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) notFound()
  return email
}
