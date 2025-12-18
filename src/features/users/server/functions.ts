import { redirect } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start'
import { getRequest } from '@tanstack/react-start/server'

import { auth } from '@/integrations/better-auth/auth'
import { authFnMiddleware } from '@/integrations/better-auth/middlewares'

export const findSessionFn = createServerFn()
  .middleware([authFnMiddleware])
  .handler(() => {
    const request = getRequest()
    return auth.api.getSession({ headers: request.headers })
  })

export const signOutFn = createServerFn({ method: 'POST' }).handler(async () => {
  const request = getRequest()
  const response = await auth.api.signOut({
    headers: request.headers,
    asResponse: true,
  })

  if (!response.ok) {
    return {
      error: true,
      message: response.statusText || 'Sign out failed',
    }
  }

  throw redirect({
    href: '/signin',
  })
})
