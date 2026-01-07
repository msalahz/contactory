import { z } from 'zod'

import { createServerFn } from '@tanstack/react-start'
import { deleteFromR2 } from '@/server/modules/r2'
import { userAvatarFileSchema } from '@/server/schemas/users'
import { uploadUserAvatarToR2 } from '@/server/modules/users'
import { requireAuthMiddleware } from '@/server/middlewares/auth'
import { getUserAvatarR2KeyFromUrl } from '@/features/users/lib/getUserAvatarR2KeyFromUrl'

export const uploadUserAvatarToR2Fn = createServerFn({ method: 'POST' })
  .inputValidator((data: FormData) => {
    const formDataObj = Object.fromEntries(data.entries())
    z.object({ avatar: userAvatarFileSchema }).parse(formDataObj)
    return data
  })
  .middleware([requireAuthMiddleware])
  .handler(async ({ data, context }) => {
    const avatar = data.get('avatar') as File
    const avatarUrl = await uploadUserAvatarToR2(avatar, context.authUser.id)
    return avatarUrl.href
  })

export const deleteUserAvatarFromR2Fn = createServerFn({ method: 'POST' })
  .inputValidator(z.object({ avatarUrl: z.url() }))
  .middleware([requireAuthMiddleware])
  .handler(async ({ data }) => {
    await deleteFromR2(getUserAvatarR2KeyFromUrl(data.avatarUrl))
    return true
  })
