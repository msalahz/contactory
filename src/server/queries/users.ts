import { z } from 'zod'
import { createServerFn } from '@tanstack/react-start'

import { findUser } from '@/server/modules/users'

export const findUserFn = createServerFn()
  .inputValidator(z.object({ userId: z.string() }))
  .handler(async ({ data }) => {
    const user = await findUser(data.userId)
    return user ?? null
  })
