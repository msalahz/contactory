import { redirect } from '@tanstack/react-router'

import { findAuthSession } from '@/server/modules/auth'

export async function requireAuth() {
  const session = await findAuthSession()

  if (!session) {
    throw redirect({ to: '/sign-in' })
  }

  return session
}
