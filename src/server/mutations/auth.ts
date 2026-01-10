import { z } from 'zod'
import { redirect } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start'
import { getRequest } from '@tanstack/react-start/server'

import { getAuth } from '@/integrations/better-auth/auth'
import { userAvatarFileSchema } from '@/server/schemas/auth'
import { requireAuthMiddleware } from '@/server/middlewares/auth'
import { deleteUserAvatar, uploadUserAvatar } from '@/server/lib/auth'

export const signOutFn = createServerFn({ method: 'POST' })
  .inputValidator(z.object({ redirectTo: z.string() }).optional())
  .middleware([requireAuthMiddleware])
  .handler(async ({ data }) => {
    const request = getRequest()
    const auth = getAuth()
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

export const uploadUserAvatarFn = createServerFn({ method: 'POST' })
  .inputValidator((data: FormData) => {
    const formDataObj = Object.fromEntries(data.entries())
    z.object({ avatar: userAvatarFileSchema }).parse(formDataObj)
    return data
  })
  .middleware([requireAuthMiddleware])
  .handler(async ({ data, context }) => {
    const avatar = data.get('avatar') as File
    const avatarUrl = await uploadUserAvatar(avatar, context.authUser.id)
    return avatarUrl.href
  })

export const deleteUserAvatarFn = createServerFn({ method: 'POST' })
  .inputValidator(z.object({ avatarUrl: z.url() }))
  .middleware([requireAuthMiddleware])
  .handler(async ({ data }) => {
    await deleteUserAvatar(data.avatarUrl)
  })
