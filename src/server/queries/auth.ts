import { createServerFn } from '@tanstack/react-start'

import { findSession } from '@/server/modules/auth'

export const finsSessionFn = createServerFn().handler(async () => {
  return await findSession()
})
