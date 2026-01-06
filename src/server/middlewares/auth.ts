import { createMiddleware } from '@tanstack/react-start'

import { requireAdmin, requireAuth } from '@/server/modules/guards'

export const requireAuthMiddleware = createMiddleware().server(async ({ next }) => {
  const session = await requireAuth()

  return next({
    context: {
      authUser: session.user,
    },
  })
})

export const requireAdminMiddleware = createMiddleware().server(async ({ next }) => {
  const session = await requireAdmin()

  return next({
    context: {
      authUser: session.user,
    },
  })
})
