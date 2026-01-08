import { redirect } from '@tanstack/react-router'

import { findAuthSession } from '@/server/modules/auth'

export async function requireAuth() {
  const session = await findAuthSession()
  // if the user is not logged in
  if (!session) {
    throw redirect({ to: '/sign-in' })
  }
  return session
}

export async function requireAdmin() {
  const session = await findAuthSession()

  const roleString = session?.user?.role || undefined

  const roles = roleString
    ?.split(',')
    .map((r) => r.trim())
    .filter(Boolean)

  // if the user is not logged in or is not an admin
  if (!session || !roles?.includes('admin')) {
    throw redirect({ to: '/' })
  }
  return session
}
