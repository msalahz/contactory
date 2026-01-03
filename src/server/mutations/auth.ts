import { z } from 'zod'
import { redirect } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start'
import { getRequest } from '@tanstack/react-start/server'

import { auth } from '@/integrations/better-auth/auth'

export const signOutFn = createServerFn({ method: 'POST' })
  .inputValidator(z.object({ redirectTo: z.string() }).optional())
  .handler(async ({ data }) => {
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
      href: data?.redirectTo ?? '/',
    })
  })
