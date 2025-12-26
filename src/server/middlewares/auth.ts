import { createMiddleware } from '@tanstack/react-start'

import { requireAuth } from '@/server/modules/guards'

export const requireAuthMiddleware = createMiddleware().server(async ({ next }) => {
  const session = await requireAuth()

  return next({
    context: {
      ...session,
    },
  })
})
