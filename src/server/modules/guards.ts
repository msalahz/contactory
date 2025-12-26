import { redirect } from '@tanstack/react-router'

import { findSession } from '@/server/modules/auth'

export async function requireAuth() {
  const session = await findSession()

  if (!session) {
    throw redirect({ to: '/sign-in' })
  }

  return session
}
