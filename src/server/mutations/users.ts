import { z } from 'zod'
import { createServerFn } from '@tanstack/react-start'
import { userAvatarFileSchema } from '@/server/schemas/users'
import { uploadUserAvatarToR2 } from '@/server/modules/users'

export const uploadUserAvatarToR2Fn = createServerFn({ method: 'POST' })
  .inputValidator((data: FormData) => {
    const formDataObj = Object.fromEntries(data.entries())
    z.object({ avatar: userAvatarFileSchema }).parse(formDataObj)
    return data
  })
  .handler(async ({ data }) => {
    const avatar = data.get('avatar') as File
    const avatarUrl = await uploadUserAvatarToR2(avatar)
    return avatarUrl.href
  })
