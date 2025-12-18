import { redirect } from '@tanstack/react-router'
import { createMiddleware } from '@tanstack/react-start'

import { auth } from '@/integrations/better-auth/auth'

export const authRequestMiddleware = createMiddleware().server(async ({ next, request }) => {
  const session = await auth.api.getSession({ headers: request.headers })

  if (!session) {
    throw redirect({ to: '/signin' })
  }

  return next({ context: { session } })
})
