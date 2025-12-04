import { redirect } from '@tanstack/react-router'
import { createMiddleware } from '@tanstack/react-start'

import { auth } from './auth'

export const authRequestMiddleware = createMiddleware().server(
  async ({ next, request }) => {
    const session = await auth.api.getSession({ headers: request.headers })

    if (!session) {
      throw redirect({ to: '/signin' })
    }

    return next()
  },
)
