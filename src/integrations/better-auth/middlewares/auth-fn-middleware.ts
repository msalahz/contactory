import { redirect } from '@tanstack/react-router'
import { createMiddleware } from '@tanstack/react-start'

import { getRequest } from '@tanstack/react-start/server'
import { auth } from '@/integrations/better-auth/auth'

export const authFnMiddleware = createMiddleware({ type: 'function' })
  .client(async ({ next }) => {
    return next()
  })
  .server(async ({ next }) => {
    const request = getRequest()
    const session = await auth.api.getSession({ headers: request.headers })

    if (!session) {
      throw redirect({ to: '/signin' })
    }

    return next()
  })
