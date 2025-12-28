import { redirect } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start'
import { getRequest } from '@tanstack/react-start/server'

import { authServer } from '@/integrations/better-auth/authServer'

export const signOutFn = createServerFn({ method: 'POST' }).handler(async () => {
  const request = getRequest()
  const response = await authServer.api.signOut({
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
    href: '/sign-in',
  })
})
